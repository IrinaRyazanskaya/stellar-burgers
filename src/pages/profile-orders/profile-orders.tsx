import { useEffect } from 'react';
import type { FC } from 'react';

import {
  getProfileOrders,
  selectProfileOrders,
  selectProfileOrdersRequestStatus
} from '@slices';
import { Preloader } from '@ui';
import { ProfileOrdersUI } from '@ui-pages';
import { useDispatch, useSelector } from '../../services/store';

export const ProfileOrders: FC = () => {
  const dispatch = useDispatch();
  const orders = useSelector(selectProfileOrders);
  const requestStatus = useSelector(selectProfileOrdersRequestStatus);

  useEffect(() => {
    dispatch(getProfileOrders());
  }, []);

  if (requestStatus === 'pending') {
    return <Preloader />;
  }

  return <ProfileOrdersUI orders={orders} />;
};
