import type { Meta, StoryObj } from "@storybook/react";

import { OrderDetailsUI } from "../components/ui/order-details";

const meta = {
  title: "Example/OrderDetails",
  component: OrderDetailsUI,
  parameters: { layout: "fullscreen" },
} satisfies Meta<typeof OrderDetailsUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultOrderDetails: Story = {
  args: {
    orderNumber: 12,
  },
};
