import type { Ingredient } from "../../../utils/types";

export type TIngredientsCategoryUIProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: Ingredient[];
  ingredientsCounters: Record<string, number>;
};
