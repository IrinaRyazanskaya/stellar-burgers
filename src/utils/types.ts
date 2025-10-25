type TabMode = "bun" | "sauce" | "main";

type Ingredient = {
  _id: string;
  name: string;
  type: string;
  proteins: number;
  fat: number;
  carbohydrates: number;
  calories: number;
  price: number;
  image: string;
  image_large: string;
  image_mobile: string;
};

type ConstructorIngredient = Ingredient & {
  id: string;
};

type Order = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

type User = {
  name: string;
  email: string;
};

export type { TabMode, Ingredient, ConstructorIngredient, Order, User };
