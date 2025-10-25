import type { FC } from "react";

import type { Order } from "../../../../utils/types";
import { ProfileMenu } from "../../../profile-menu";
import { OrdersList } from "../../../orders-list";

import styles from "./profile-orders.module.css";

type ProfileOrdersUIProps = {
  orders: Order[];
};

const ProfileOrdersUI: FC<ProfileOrdersUIProps> = ({ orders }) => (
  <main className={`${styles.main}`}>
    <div className={`mt-30 mr-15 ${styles.menu}`}>
      <ProfileMenu />
    </div>
    <div className={`mt-10 ${styles.orders}`}>
      <OrdersList orders={orders} />
    </div>
  </main>
);

ProfileOrdersUI.displayName = "ProfileOrdersUI";

export { ProfileOrdersUI };
export type { ProfileOrdersUIProps };
