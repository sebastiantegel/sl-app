import { renderJourneyInfo } from "../components/info";
import { renderJourneyMap } from "../components/map";
import type { Journey } from "../models/journeyModels/Journey";
import type { SLLocation } from "../models/stopModels/SLLocation";

export const showAutoComplete = (locations: SLLocation[]) => {
  const theInput = document.getElementsByName(
    "destination"
  )[0] as HTMLInputElement;
  const hiddenInput = document.getElementsByName(
    "locationid"
  )[0] as HTMLInputElement;

  const suggestionBox = document.getElementsByClassName("autocomplete")[0];
  suggestionBox.innerHTML = "";

  locations.forEach((loc) => {
    const item = document.createElement("div");
    item.textContent = loc.disassembledName;
    item.style.padding = "8px";
    item.style.cursor = "pointer";

    item.addEventListener("click", () => {
      theInput.value = loc.disassembledName;
      hiddenInput.value = String(loc.id); // Set hidden input
      suggestionBox.innerHTML = ""; // Clear suggestions
      suggestionBox.classList.toggle("hidden");
    });

    suggestionBox.appendChild(item);
  });

  suggestionBox.classList.remove("hidden");
};

export const renderJourney = (journeys: Journey[]) => {
  const container = document.getElementById("result");

  if (!container) return;

  journeys.forEach(async (journey, idx) => {
    const controller = await renderJourneyMap(journey, "map");
    renderJourneyInfo(
      journey,
      "infos",
      (index) => {
        controller.highlightLeg(index);
      },
      () => {
        controller.clearHighlight();
      }
    );

    // scroll to the result section after the first journey is rendered
    if (idx === 0) {
      // defer to next frame so layout (map etc.) has updated
      requestAnimationFrame(() => {
        container.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    }
  });
};
