import type { Meta, StoryObj } from "@storybook/react";

import { FeedInfoUI } from "../components/ui/feed-info";

const meta = {
  title: "Example/FeedInfo",
  component: FeedInfoUI,
  tags: ["autodocs"],
  parameters: {
    layout: "fullscreen",
  },
} satisfies Meta<typeof FeedInfoUI>;

export default meta;

type Story = StoryObj<typeof meta>;

export const DefaultFeedInfo: Story = {
  args: {
    feed: {
      total: 12,
      totalToday: 2,
    },
    pendingOrders: [126, 127],
    readyOrders: [123, 124, 125],
  },
};
