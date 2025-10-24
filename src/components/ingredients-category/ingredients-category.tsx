import { forwardRef, useMemo } from "react";

import { IngredientsCategoryUI } from "../ui/ingredients-category";
import { selectBurgerConstructorItems } from "../../services/slices/burger-constructor";
import { useSelector } from "../../services/store";
import type { Ingredient } from "../../utils/types";

type IngredientsCategoryProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: Ingredient[];
};

const IngredientsCategory = forwardRef<HTMLUListElement, IngredientsCategoryProps>(
  ({ title, titleRef, ingredients }, ref) => {
    const burgerConstructor = useSelector(selectBurgerConstructorItems);

    const ingredientsCounters = useMemo(() => {
      const { bun, ingredients } = burgerConstructor;
      const counters: { [key: string]: number } = {};
      ingredients.forEach((ingredient: Ingredient) => {
        if (!counters[ingredient._id]) counters[ingredient._id] = 0;
        counters[ingredient._id]++;
      });
      if (bun) counters[bun._id] = 2;
      return counters;
    }, [burgerConstructor]);

    return (
      <IngredientsCategoryUI
        title={title}
        titleRef={titleRef}
        ingredients={ingredients}
        ingredientsCounters={ingredientsCounters}
        ref={ref}
      />
    );
  },
);

IngredientsCategory.displayName = "IngredientsCategory";

export { IngredientsCategory };
export type { IngredientsCategoryProps };
