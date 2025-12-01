import type { Leg } from "./Leg";

export type Journey = {
  interchanges: number;
  isAdditional: boolean;
  legs: Leg[];
  rating: number;
  tripDuration: number;
  tripRtDuration: number;
};
