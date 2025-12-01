import type { JourneyProperty } from "./JourneyProperty";

export type Destination = {
  arrivalTimeBaseTimetable: string;
  arrivalTimeEstimated: string;
  arrivalTimePlanned: string;
  coord: number[];
  disassembledName: string;
  id: string;
  isGlobalId: boolean;
  name: string;
  niveau: number;
  productClasses: number[];
  properties: JourneyProperty;
  type: string;
};
