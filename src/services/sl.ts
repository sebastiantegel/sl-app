import type { JourneyResponse } from "../models/journeyModels/JourneyResponse";
import type { StopResponse } from "../models/stopModels/StopResponse";
import { get } from "./base";

const BASE_URL_JOURNEY =
  "https://journeyplanner.integration.sl.se/v2/trips?type_origin=coord&type_destination=any&calc_number_of_trips=1&";
const BASE_URL_LOCATIONS =
  "https://journeyplanner.integration.sl.se/v2/stop-finder?any_obj_filter_sf=14&type_sf=any&";

export const getJourney = async (from: GeolocationPosition, to: string) => {
  const origin = `${from.coords.longitude.toFixed(
    5
  )}:${from.coords.latitude.toFixed(5)}:WGS84[dd.ddddd]`;
  const response = await get<JourneyResponse>(
    `${BASE_URL_JOURNEY}name_origin=${origin}&name_destination=${to}`
  );

  if (response.systemMessages.length > 0)
    throw new Error(
      `${response.systemMessages[0].code} - ${response.systemMessages[0].text}`
    );

  return response.journeys;
};

export const getLocations = async (to: string) => {
  const stopResponse = await get<StopResponse>(
    `${BASE_URL_LOCATIONS}name_sf=${to}`
  );

  if (stopResponse.locations.length > 0) return stopResponse.locations;

  if (stopResponse.systemMessages.length > 0) {
    throw new Error(
      `${stopResponse.systemMessages[0].code} - ${stopResponse.systemMessages[0].text}`
    );
  }

  return null;
};
