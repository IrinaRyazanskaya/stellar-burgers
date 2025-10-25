import { memo } from "react";
import type { FC } from "react";
import { useLocation } from "react-router-dom";

import { BurgerIngredientUI } from "../../components/ui/burger-ingredient";
import { addIngredientToConstructor } from "../../services/slices/burger-constructor";
import { useDispatch } from "../../services/store";
import type { Ingredient } from "../../utils/types";

type BurgerIngredientProps = {
  count: number;
  ingredient: Ingredient;
};

const BurgerIngredient: FC<BurgerIngredientProps> = memo(({ ingredient, count }) => {
  const location = useLocation();
  const dispatch = useDispatch();

  const handleAdd = () => {
    dispatch(addIngredientToConstructor(ingredient));
  };

  return (
    <BurgerIngredientUI
      ingredient={ingredient}
      count={count}
      locationState={{ background: location }}
      handleAdd={handleAdd}
    />
  );
});

BurgerIngredient.displayName = "BurgerIngredient";

export { BurgerIngredient };
export type { BurgerIngredientProps };
