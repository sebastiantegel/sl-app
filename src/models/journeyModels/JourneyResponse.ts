import type { SystemMessage } from "../SystemMessage";
import type { Journey } from "./Journey";

export type JourneyResponse = {
  systemMessages: SystemMessage[];
  journeys: Journey[];
};
