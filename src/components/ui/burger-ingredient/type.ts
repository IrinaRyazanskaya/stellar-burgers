import { Location } from "react-router-dom";

import type { Ingredient } from "../../../utils/types";

export type TBurgerIngredientUIProps = {
  ingredient: Ingredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
