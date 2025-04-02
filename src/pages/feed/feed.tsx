import { useEffect } from 'react';
import { type FC } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { OrderInfo } from '@components';
import { Preloader } from '@ui';
import { FeedUI } from '@ui-pages';
import {
  getOrdersFeed,
  selectOrdersFeed,
  selectOrdersFeedRequestStatus
} from '@slices';
import { useDispatch, useSelector } from '../../services/store';

export const Feed: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useSelector(selectOrdersFeed);
  const requestStatus = useSelector(selectOrdersFeedRequestStatus);

  const goToFeed = () => navigate('/feed');
  const refreshFeed = () => dispatch(getOrdersFeed());

  useEffect(() => {
    dispatch(getOrdersFeed());
  }, []);

  if (requestStatus === 'pending') {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={refreshFeed} />
      <Routes>
        <Route path=':number' element={<OrderInfo onClose={goToFeed} />} />
      </Routes>
    </>
  );
};
