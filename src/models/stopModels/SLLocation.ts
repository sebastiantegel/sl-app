import type { Parent } from "./Parent";
import type { Property } from "./Property";

export type SLLocation = {
  id: string;
  isGlobalId: boolean;
  name: string;
  disassembledName: string;
  coord: string[]; //lat, lng
  type: string;
  matchQuality: number;
  isBest: boolean;
  productClasses: number[];
  parent: Parent;
  properties: Property;
};
