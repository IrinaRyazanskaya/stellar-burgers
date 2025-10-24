import type { Order } from "../../../../utils/types";

export type FeedUIProps = {
  orders: Order[];
  handleGetFeeds: () => void;
};
