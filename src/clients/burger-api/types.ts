import type { Ingredient, Order, User } from "../../utils/types";

export type EmptyResponse = {
  success: boolean;
};

export type DataResponse<T> = EmptyResponse & T;

export type RefreshResponse = DataResponse<{
  accessToken: string;
  refreshToken: string;
}>;

export type NewOrderData = string[];

export type IngredientsResponse = DataResponse<{
  data: Ingredient[];
}>;

export type FeedsResponse = DataResponse<{
  total: number;
  orders: Order[];
  totalToday: number;
}>;

export type OrdersResponse = DataResponse<{
  data: Order[];
}>;

export type NewOrderResponse = DataResponse<{
  name: string;
  order: Order;
}>;

export type OrderResponse = DataResponse<{
  orders: Order[];
}>;

export type RegisterData = {
  name: string;
  email: string;
  password: string;
};

export type AuthResponse = DataResponse<{
  user: User;
  accessToken: string;
  refreshToken: string;
}>;

export type LoginData = {
  email: string;
  password: string;
};

export type ForgotPasswordRequest = {
  email: string;
};

export type ResetPasswordRequest = {
  token: string;
  password: string;
};

export type UserResponse = DataResponse<{
  user: User;
}>;

export type BurgerAPIClient = {
  getIngredients: () => Promise<Ingredient[]>;
  getFeeds: () => Promise<FeedsResponse>;
  getOrders: () => Promise<Order[]>;
  getOrder: (number: number) => Promise<OrderResponse>;
  orderBurger: (data: NewOrderData) => Promise<NewOrderResponse>;

  getUser: () => Promise<UserResponse>;
  loginUser: (data: LoginData) => Promise<AuthResponse>;
  logoutUser: () => Promise<EmptyResponse>;
  refreshToken: () => Promise<RefreshResponse>;
  registerUser: (data: RegisterData) => Promise<AuthResponse>;
  updateUser: (user: Partial<RegisterData>) => Promise<UserResponse>;
  resetPassword: (data: ResetPasswordRequest) => Promise<EmptyResponse>;
  forgotPassword: (data: ForgotPasswordRequest) => Promise<EmptyResponse>;
};
