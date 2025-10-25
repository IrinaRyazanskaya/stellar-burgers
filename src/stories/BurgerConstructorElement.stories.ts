import type { Meta, StoryObj } from "@storybook/react";

import { BurgerConstructorElementUI } from "../components/ui/burger-constructor-element";

const meta = {
  title: "Example/BurgerConstructorElement",
  component: BurgerConstructorElementUI,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof BurgerConstructorElementUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultElement: Story = {
  args: {
    ingredient: {
      _id: "111",
      id: "222",
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
    index: 0,
    totalItems: 1,
    handleMoveUp: () => {},
    handleMoveDown: () => {},
    handleClose: () => {},
  },
};
