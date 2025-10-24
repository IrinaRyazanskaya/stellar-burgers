import type { FC } from "react";
import { useEffect } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Preloader } from "../../components/ui/preloader";
import { OrderInfo } from "../../components/order-info";
import { ProfileOrdersUI } from "../../components/ui/pages/profile-orders";
import {
  getProfileOrders,
  selectProfileOrders,
  selectProfileOrdersRequestStatus,
} from "../../services/slices/profile-orders";
import { useDispatch, useSelector } from "../../services/store";

export const ProfileOrders: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useSelector(selectProfileOrders);
  const requestStatus = useSelector(selectProfileOrdersRequestStatus);

  const goToProfileOrders = () => navigate("/profile/orders");

  useEffect(() => {
    dispatch(getProfileOrders());
  }, [dispatch]);

  if (requestStatus === "pending") {
    return <Preloader />;
  }

  return (
    <>
      <ProfileOrdersUI orders={orders} />
      <Routes>
        <Route path=":number" element={<OrderInfo onClose={goToProfileOrders} />} />
      </Routes>
    </>
  );
};
