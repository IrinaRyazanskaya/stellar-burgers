import { burgerConstructorSlice } from "./slices/burger-constructor";
import { burgerIngredientsSlice } from "./slices/burger-ingredients";
import { burgerOrderSlice } from "./slices/burger-order";
import { orderInfoSlice } from "./slices/order-info";
import { ordersFeedSlice } from "./slices/orders-feed";
import { profileSlice } from "./slices/profile";
import { profileOrdersSlice } from "./slices/profile-orders";
import { rootReducer } from "./store";

describe("rootReducer", () => {
  test("should return the correct initial state", () => {
    const initialState = rootReducer(undefined, { type: "@@INIT" });

    expect(initialState).toEqual({
      burgerConstructor: burgerConstructorSlice.getInitialState(),
      burgerIngredients: burgerIngredientsSlice.getInitialState(),
      burgerOrder: burgerOrderSlice.getInitialState(),
      profile: profileSlice.getInitialState(),
      profileOrders: profileOrdersSlice.getInitialState(),
      ordersFeed: ordersFeedSlice.getInitialState(),
      orderInfo: orderInfoSlice.getInitialState(),
    });
  });
});
