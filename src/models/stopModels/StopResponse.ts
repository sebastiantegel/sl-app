import type { SystemMessage } from "../SystemMessage";
import type { SLLocation } from "./SLLocation";

export type StopResponse = {
  systemMessages: SystemMessage[];
  locations: SLLocation[];
};
