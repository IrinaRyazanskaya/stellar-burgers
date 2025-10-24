import type { Ingredient, ConstructorIngredient } from "../../utils/types";
import {
  burgerConstructorSlice,
  burgerConstructorInitialState,
  addIngredientToConstructor,
  removeIngredientFromConstructor,
  moveIngredientUpInConstructor,
  moveIngredientDownInConstructor,
} from "./burger-constructor";
import type { BurgerConstructorState } from "./burger-constructor";

describe("burgerConstructorSlice", () => {
  const bunIngredient: Ingredient = {
    _id: "bun123",
    name: "Bun",
    type: "bun",
    proteins: 10,
    fat: 20,
    carbohydrates: 30,
    calories: 40,
    price: 50,
    image: "img",
    image_large: "img-large",
    image_mobile: "img-mobile",
  };

  const fillingIngredient: Ingredient = {
    _id: "filling123",
    name: "Filling",
    type: "filling",
    proteins: 5,
    fat: 10,
    carbohydrates: 15,
    calories: 20,
    price: 25,
    image: "img",
    image_large: "img-large",
    image_mobile: "img-mobile",
  };

  it("adds bun to constructor", () => {
    const newState = burgerConstructorSlice.reducer(
      burgerConstructorInitialState,
      addIngredientToConstructor(bunIngredient),
    );

    expect(newState.bun).toMatchObject({ ...bunIngredient });
    expect(newState.bun).toHaveProperty("id");
  });

  it("adds filling to constructor", () => {
    const newState = burgerConstructorSlice.reducer(
      burgerConstructorInitialState,
      addIngredientToConstructor(fillingIngredient),
    );

    expect(newState.ingredients).toHaveLength(1);
    expect(newState.ingredients[0]).toHaveProperty("id");
    expect(newState.ingredients[0]).toMatchObject({ ...fillingIngredient });
  });

  it("removes ingredient from constructor by id", () => {
    const ingredientWithId = { ...fillingIngredient, id: "test-id" };
    const stateWithIngredient: BurgerConstructorState = {
      bun: null,
      ingredients: [ingredientWithId],
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredient,
      removeIngredientFromConstructor("test-id"),
    );

    expect(newState.ingredients).toHaveLength(0);
  });

  it("moves ingredient up in constructor", () => {
    const ingredients: ConstructorIngredient[] = [
      { ...fillingIngredient, id: "id1" },
      { ...fillingIngredient, id: "id2" },
      { ...fillingIngredient, id: "id3" },
    ];
    const stateWithIngredients: BurgerConstructorState = {
      bun: null,
      ingredients,
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      moveIngredientUpInConstructor(1),
    );

    expect(newState.ingredients[0].id).toBe("id2");
    expect(newState.ingredients[1].id).toBe("id1");
    expect(newState.ingredients[2].id).toBe("id3");
  });

  it("moves ingredient down in constructor", () => {
    const ingredients: ConstructorIngredient[] = [
      { ...fillingIngredient, id: "id1" },
      { ...fillingIngredient, id: "id2" },
      { ...fillingIngredient, id: "id3" },
    ];
    const stateWithIngredients: BurgerConstructorState = {
      bun: null,
      ingredients,
    };

    const newState = burgerConstructorSlice.reducer(
      stateWithIngredients,
      moveIngredientDownInConstructor(1),
    );

    expect(newState.ingredients[0].id).toBe("id1");
    expect(newState.ingredients[1].id).toBe("id3");
    expect(newState.ingredients[2].id).toBe("id2");
  });
});
