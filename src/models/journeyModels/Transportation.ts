import type { Product } from "./Product";
import type { TransportationProperty } from "./TransportationProperty";

export type Transportation = {
  isSamtrafik: boolean;
  name?: string;
  number: string;
  disassembledName: string;
  product: Product;
  properties: TransportationProperty;
};
