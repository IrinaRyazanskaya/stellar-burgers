import { useEffect } from 'react';
import type { FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import {
  getProfileOrders,
  selectProfileOrders,
  selectProfileOrdersRequestStatus
} from '@slices';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { OrderInfo } from '@components';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useSelector(selectProfileOrders);
  const requestStatus = useSelector(selectProfileOrdersRequestStatus);

  const goToProfileOrders = () => navigate('/profile/orders');

  useEffect(() => {
    dispatch(getProfileOrders());
  }, []);

  if (requestStatus === 'pending') {
    return <Preloader />;
  }

  return (
    <>
      <ProfileOrdersUI orders={orders} />
      <Routes>
        <Route
          path=':number'
          element={<OrderInfo onClose={goToProfileOrders} />}
        />
      </Routes>
    </>
  );
};
