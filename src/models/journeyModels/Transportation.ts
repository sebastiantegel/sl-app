import type { Product } from "./Product";
import type { TransportationProperty } from "./TransportationProperty";

export type Transportation = {
  isSamtrafik: boolean;
  product: Product;
  properties: TransportationProperty;
};
