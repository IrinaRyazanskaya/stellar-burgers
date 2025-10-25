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
  EmptyResponse,
  AuthResponse,
  FeedsResponse,
  ForgotPasswordRequest,
  IngredientsResponse,
  LoginData,
  NewOrderData,
  NewOrderResponse,
  OrderResponse,
  RefreshResponse,
  RegisterData,
  ResetPasswordRequest,
  DataResponse,
  UserResponse,
} from "./types";

export { burgerAPIClient };
