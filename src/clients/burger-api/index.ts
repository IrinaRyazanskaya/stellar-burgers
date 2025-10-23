import type { BurgerAPIClient } from "./types";
import { mockBurgerAPIClient } from "./mock";
import { realBurgerAPIClient } from "./real";

let burgerAPIClient: BurgerAPIClient;

switch (__BURGER_API_CLIENT__) {
  case "mock":
    burgerAPIClient = mockBurgerAPIClient;
    break;
  case "real":
    burgerAPIClient = realBurgerAPIClient;
    break;
  default:
    burgerAPIClient = mockBurgerAPIClient;
}

export type {
  BurgerAPIClient,
  TAuthResponse,
  TEmptyServerResponse,
  TFeedsResponse,
  TForgotPasswordRequest,
  TIngredientsResponse,
  TLoginData,
  TNewOrderData,
  TNewOrderResponse,
  TOrderResponse,
  TRefreshResponse,
  TRegisterData,
  TResetPasswordRequest,
  TServerResponse,
  TUserResponse,
} from "./types";

export { burgerAPIClient };
