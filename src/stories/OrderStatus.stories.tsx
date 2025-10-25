import type { Meta, StoryObj } from "@storybook/react";

import { OrderStatusUI } from "../components/ui/order-status";

const meta = {
  title: "Example/OrderStatus",
  component: OrderStatusUI,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof OrderStatusUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultOrderStatus: Story = {
  args: {
    textStyle: "#E52B1A",
    text: "Готовится",
  },
};
