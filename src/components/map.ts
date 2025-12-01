import type { Journey } from "../models/journeyModels/Journey";

export async function renderJourneyMap(journey: Journey, mapElementId: string) {
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;
  const { AdvancedMarkerElement } = (await google.maps.importLibrary(
    "marker"
  )) as google.maps.MarkerLibrary;

  const map = new Map(document.getElementById(mapElementId) as HTMLElement, {
    zoom: 14,
    center: {
      lat: journey.legs[0].origin.coord[0],
      lng: journey.legs[0].origin.coord[1],
    },
    mapId: "journey-map",
  });

  const polylines: google.maps.Polyline[] = [];
  const originalOptions: google.maps.PolylineOptions[] = []; // store original styles
  const fullBounds = new google.maps.LatLngBounds();
  let highlightedIndex = -1; // currently highlighted leg index

  journey.legs.forEach((leg, index) => {
    // Markers
    new AdvancedMarkerElement({
      position: { lat: leg.origin.coord[0], lng: leg.origin.coord[1] },
      map,
    });

    new AdvancedMarkerElement({
      position: {
        lat: leg.destination.coord[0],
        lng: leg.destination.coord[1],
      },
      map,
    });

    // Polyline
    const pathCoords = leg.coords.map((c) => ({ lat: c[0], lng: c[1] }));
    pathCoords.forEach((pt) => fullBounds.extend(pt)); // extend full bounds

    const opts: google.maps.PolylineOptions = {
      path: pathCoords,
      geodesic: true,
      strokeColor: index % 2 === 0 ? "#FF0000" : "#0000FF",
      strokeOpacity: 1.0,
      strokeWeight: 3,
    };

    const polyline = new google.maps.Polyline(opts);
    polyline.setMap(map);
    polylines.push(polyline);
    originalOptions.push(opts);
  });

  // initially fit the whole route (defer to next frame to ensure layout)
  if (!fullBounds.isEmpty()) {
    requestAnimationFrame(() =>
      map.fitBounds(fullBounds, { top: 40, bottom: 40, left: 40, right: 40 })
    );
  }

  function restorePolylineStyle(pl: google.maps.Polyline, idx: number) {
    const opts = originalOptions[idx];
    // apply original options (explicitly)
    pl.setOptions({
      strokeWeight: opts.strokeWeight ?? 3,
      strokeOpacity: opts.strokeOpacity ?? 1,
      strokeColor: opts.strokeColor ?? (idx % 2 === 0 ? "#FF0000" : "#0000FF"),
    });
  }

  function clearHighlight() {
    // nothing to do if no polylines
    if (polylines.length === 0) return;

    polylines.forEach((pl, idx) => restorePolylineStyle(pl, idx));
    highlightedIndex = -1;

    // defer fitBounds so map container has time to render/layout
    if (!fullBounds.isEmpty()) {
      requestAnimationFrame(() =>
        map.fitBounds(fullBounds, { top: 40, bottom: 40, left: 40, right: 40 })
      );
    }
  }

  function getPolylineLatLngs(pl: google.maps.Polyline) {
    // getPath() may return MVCArray or the path may be accessible via get("path")
    try {
      const path = (pl.getPath &&
        pl.getPath()) as google.maps.MVCArray<google.maps.LatLng>;
      if (path && typeof path.getLength === "function") {
        const arr: google.maps.LatLngLiteral[] = [];
        for (let i = 0; i < path.getLength(); i++) {
          const at = path.getAt(i);
          arr.push({ lat: at.lat(), lng: at.lng() });
        }
        return arr;
      }
    } catch {
      // fall through
    }

    // fallback if the path was stored as a plain array on the polyline options
    const raw = pl.get("path") as google.maps.LatLngLiteral[] | undefined;
    if (Array.isArray(raw)) return raw;
    return [];
  }

  function highlightLeg(index: number) {
    // toggle logic: if clicking same index, clear and return
    if (index === highlightedIndex) {
      clearHighlight();
      return;
    }

    // reset all to original first
    clearHighlight();

    const pl = polylines[index];
    if (!pl) return;

    pl.setOptions({
      strokeWeight: 7,
      strokeOpacity: 1.0,
      strokeColor: "#00CC00",
    });

    highlightedIndex = index;

    // Fit bounds to the polyline (defer to next frame)
    const latLngs = getPolylineLatLngs(pl);
    if (latLngs.length === 0) return;

    const bounds = new google.maps.LatLngBounds();
    latLngs.forEach((p) => bounds.extend(p));
    requestAnimationFrame(() =>
      map.fitBounds(bounds, { top: 40, bottom: 40, left: 40, right: 40 })
    );
  }

  return { highlightLeg, clearHighlight };
}
