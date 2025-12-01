import "./scss/style.scss";
import { getJourney, getLocations } from "./services/sl";
import { debounce } from "./utils/debounce";
import { renderJourney, showAutoComplete } from "./utils/html";
import { hideSpinner, showSpinner } from "./utils/spinner";

let position: GeolocationPosition | null = null;
const errorElement = document.getElementById("error");

showSpinner("Getting your position...");
navigator.geolocation.getCurrentPosition((pos) => {
  position = pos;
  hideSpinner();
});

const handleLocationSearch = debounce(async (value: string) => {
  errorElement?.classList.toggle("hidden");

  const locations = await getLocations(value);

  if (!locations) {
    errorElement!.innerHTML = "Hittade inga platser, försök igen";
    errorElement?.classList.toggle("hidden");
    return;
  }

  showAutoComplete(locations);
}, 400);

document
  .getElementsByName("destination")[0]
  .addEventListener("input", async (e) => {
    handleLocationSearch((e.target as HTMLInputElement).value);
  });

document.getElementById("searchForm")?.addEventListener("submit", async (e) => {
  e.preventDefault();

  const form = e.target as HTMLFormElement;
  const formData = new FormData(form);
  const locationId = formData.get("locationid") as string;

  const journeys = await getJourney(position!, locationId);

  renderJourney(journeys);
});

async function initMap() {
  // Load the Maps library dynamically
  const { Map } = (await google.maps.importLibrary(
    "maps"
  )) as google.maps.MapsLibrary;

  // Create the map
  new Map(document.getElementById("map") as HTMLElement, {
    center: { lat: 59.33101, lng: 17.98392 },
    zoom: 12,
    mapId: "journey-map",
  });
}

initMap();
