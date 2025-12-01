import type { Destination } from "./Destination";
import type { Origin } from "./Origin";
import type { Path } from "./Path";
import type { Transportation } from "./Transportation";

export type Leg = {
  coords: number[][];
  destination: Destination;
  distance: number;
  duration: number;
  origin: Origin;
  pathDescriptions: Path[];
  stopSequence: [];
  transportation: Transportation;
};
