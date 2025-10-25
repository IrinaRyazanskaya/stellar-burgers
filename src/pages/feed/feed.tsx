import { useEffect } from "react";
import type { FC } from "react";
import { Route, Routes, useNavigate } from "react-router-dom";

import { Preloader } from "../../components/ui/preloader";
import { OrderInfo } from "../../components/order-info";
import { FeedUI } from "../../components/ui/pages/feed";
import {
  getOrdersFeed,
  selectOrdersFeed,
  selectOrdersFeedStatus,
} from "../../services/slices/orders-feed";
import { useDispatch, useSelector } from "../../services/store";

const Feed: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const orders = useSelector(selectOrdersFeed);
  const requestStatus = useSelector(selectOrdersFeedStatus);

  const goToFeed = () => navigate("/feed");
  const refreshFeed = () => dispatch(getOrdersFeed());

  useEffect(() => {
    dispatch(getOrdersFeed());
  }, [dispatch]);

  if (requestStatus === "pending") {
    return <Preloader />;
  }

  return (
    <>
      <FeedUI orders={orders} handleGetFeeds={refreshFeed} />
      <Routes>
        <Route path=":number" element={<OrderInfo onClose={goToFeed} />} />
      </Routes>
    </>
  );
};

Feed.displayName = "Feed";

export { Feed };
