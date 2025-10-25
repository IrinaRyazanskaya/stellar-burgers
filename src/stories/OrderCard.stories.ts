import type { Meta, StoryObj } from "@storybook/react";

import { OrderCardUI } from "../components/ui/order-card";

const meta = {
  title: "Example/OrderCard",
  component: OrderCardUI,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof OrderCardUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultOrderCard: Story = {
  args: {
    orderInfo: {
      ingredientsInfo: [
        {
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
      ],
      ingredientsToShow: [
        {
          _id: "111",
          name: "Булка",
          type: "top",
          proteins: 12,
          fat: 33,
          carbohydrates: 22,
          calories: 33,
          price: 123,
          image: "https://code.s3.yandex.net/react/code/bun-02.png",
          image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
        },
        {
          _id: "111",
          name: "Начинка",
          type: "top",
          proteins: 12,
          fat: 33,
          carbohydrates: 22,
          calories: 33,
          price: 123,
          image: "https://code.s3.yandex.net/react/code/meat-01.png",
          image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
          image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png",
        },
      ],
      remains: 2,
      total: 2,
      date: new Date("2024-01-25"),
      _id: "32",
      status: "ready",
      name: "Начинка",
      createdAt: "",
      updatedAt: "",
      number: 3,
      ingredients: ["Булка", "Начинка"],
    },
    maxIngredients: 5,
    locationState: {
      background: {
        hash: "",
        key: "eitkep27",
        pathname: "/",
        search: "",
        state: null,
      },
    },
  },
};
