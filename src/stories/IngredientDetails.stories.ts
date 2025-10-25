import type { Meta, StoryObj } from "@storybook/react";

import { IngredientDetailsUI } from "../components/ui/ingredient-details";

const meta = {
  title: "Example/IngredientDetails",
  component: IngredientDetailsUI,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof IngredientDetailsUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultIngredientDetails: Story = {
  args: {
    ingredientData: {
      _id: "111",
      name: "Начинка",
      type: "main",
      proteins: 23,
      fat: 34,
      carbohydrates: 45,
      calories: 56,
      price: 67,
      image: "https://code.s3.yandex.net/react/code/meat-01.png",
      image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
      image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
    },
  },
};
