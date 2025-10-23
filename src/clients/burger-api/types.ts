import type { TIngredient, TOrder, TUser } from '../../utils/types';

export type TServerResponse<T> = {
  success: boolean;
} & T;

export type TRefreshResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
}>;

export type TNewOrderData = string[];

export type TIngredientsResponse = TServerResponse<{
  data: TIngredient[];
}>;

export type TFeedsResponse = TServerResponse<{
  orders: TOrder[];
  total: number;
  totalToday: number;
}>;

export type TOrdersResponse = TServerResponse<{
  data: TOrder[];
}>;

export type TNewOrderResponse = TServerResponse<{
  order: TOrder;
  name: string;
}>;

export type TOrderResponse = TServerResponse<{
  orders: TOrder[];
}>;

export type TRegisterData = {
  email: string;
  name: string;
  password: string;
};

export type TAuthResponse = TServerResponse<{
  refreshToken: string;
  accessToken: string;
  user: TUser;
}>;

export type TLoginData = {
  email: string;
  password: string;
};

export type TForgotPasswordRequest = {
  email: string;
};

export type TResetPasswordRequest = {
  password: string;
  token: string;
};

export type TUserResponse = TServerResponse<{
  user: TUser;
}>;

export type TEmptyServerResponse = TServerResponse<{}>;

export type BurgerAPIClient = {
  refreshToken: () => Promise<TRefreshResponse>;
  getIngredients: () => Promise<TIngredient[]>;
  getFeeds: () => Promise<TFeedsResponse>;
  getOrders: () => Promise<TOrder[]>;
  orderBurger: (data: TNewOrderData) => Promise<TNewOrderResponse>;
  getOrder: (number: number) => Promise<TOrderResponse>;
  registerUser: (data: TRegisterData) => Promise<TAuthResponse>;
  loginUser: (data: TLoginData) => Promise<TAuthResponse>;
  forgotPassword: (
    data: TForgotPasswordRequest
  ) => Promise<TEmptyServerResponse>;
  resetPassword: (data: TResetPasswordRequest) => Promise<TEmptyServerResponse>;
  getUser: () => Promise<TUserResponse>;
  updateUser: (user: Partial<TRegisterData>) => Promise<TUserResponse>;
  logoutUser: () => Promise<TEmptyServerResponse>;
};
