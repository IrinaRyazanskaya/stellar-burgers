export type Ingredient = {
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

export type ConstructorIngredient = Ingredient & {
  id: string;
};

export type Order = {
  _id: string;
  status: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  number: number;
  ingredients: string[];
};

export type TOrdersData = {
  orders: Order[];
  total: number;
  totalToday: number;
};

export type User = {
  email: string;
  name: string;
};

export type TTabMode = "bun" | "sauce" | "main";
