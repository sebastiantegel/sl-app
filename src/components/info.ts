import { convertToReadableTime } from "./../utils/time";
import type { Journey } from "../models/journeyModels/Journey";

export function renderJourneyInfo(
  journey: Journey,
  containerId: string,
  onLegClick?: (index: number) => void,
  clear?: () => void
) {
  const container = document.getElementById(containerId);
  if (!container) return;

  container.innerHTML = `<h2>Trip Duration: ${convertToReadableTime(
    journey.tripDuration
  )} min | Rating: ${journey.rating}</h2>`;

  journey.legs.forEach((leg, index) => {
    const legDiv = document.createElement("div");
    legDiv.className = "leg";
    legDiv.innerHTML = `
      <h3>Leg ${index + 1}</h3>
      <p><strong>From:</strong> ${leg.origin.name} (kl: ${convertToReadableTime(
      leg.origin.departureTimePlanned
    )})</p>
      <p><strong>To:</strong> ${
        leg.destination.name
      } (kl: ${convertToReadableTime(leg.destination.arrivalTimePlanned)})</p>
      <p><strong>Transport:</strong> ${leg.transportation.name ?? "Gång"}</p>
      <p><strong>Distance:</strong> ${
        leg.distance
      } m | Duration: ${convertToReadableTime(leg.duration)} min</p>
    `;
    legDiv.addEventListener("click", () => {
      const shouldClear = legDiv.classList.contains("selected");

      // toggle selected visual
      document
        .querySelectorAll(`#${containerId} .leg`)
        .forEach((el) => el.classList.remove("selected"));

      if (!shouldClear) {
        legDiv.classList.add("selected");
        if (onLegClick) onLegClick(index);
      } else if (clear) clear();
    });

    container.appendChild(legDiv);
  });
}
