import type { Ingredient } from "../../utils/types";

export type TIngredientsCategoryProps = {
  title: string;
  titleRef: React.RefObject<HTMLHeadingElement>;
  ingredients: Ingredient[];
};
