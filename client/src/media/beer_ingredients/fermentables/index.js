import { adjuncts } from "./adjuncts";
import { sugars } from "./sugars";
import { grains } from "./grains";

export const fermentables = [
  ...grains,
  ...adjuncts,
  ...sugars,
];

