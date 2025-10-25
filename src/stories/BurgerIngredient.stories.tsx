import type { Meta, StoryObj } from "@storybook/react";

import { BurgerIngredientUI } from "../components/ui/burger-ingredient";

const meta = {
  title: "Example/BurgerIngredient",
  component: BurgerIngredientUI,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BurgerIngredientUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultIngredient: Story = {
  args: {
    ingredient: {
      _id: "111",
      name: "Булка",
      type: "top",
      proteins: 12,
      fat: 33,
      carbohydrates: 22,
      calories: 33,
      price: 123,
      image: "https://code.s3.yandex.net/react/code/bun-01.png",
      image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
    },
    count: 2,
    locationState: {
      background: {
        hash: "",
        key: "eitkep27",
        pathname: "/",
        search: "",
        state: null,
      },
    },
    handleAdd: () => {},
  },
};
