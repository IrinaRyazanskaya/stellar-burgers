import type { FC } from "react";

type OrderStatusUIProps = {
  text: string;
  textStyle: string;
};

const OrderStatusUI: FC<OrderStatusUIProps> = ({ textStyle, text }) => (
  <span className="text text_type_main-default pt-2" style={{ color: textStyle }}>
    {text}
  </span>
);

OrderStatusUI.displayName = "OrderStatusUI";

export { OrderStatusUI };
export type { OrderStatusUIProps };
