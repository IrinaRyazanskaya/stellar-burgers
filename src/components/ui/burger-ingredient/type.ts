import { Location } from "react-router-dom";

import type { TIngredient } from "../../../utils/types";

export type TBurgerIngredientUIProps = {
  ingredient: TIngredient;
  count: number;
  locationState: { background: Location };
  handleAdd: () => void;
};
