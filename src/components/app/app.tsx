import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

import {
  AppHeader,
  OrderInfo,
  IngredientDetails,
  ProtectedRoute,
  AnonymousRoute
} from '@components';
import { fetchBurgerIngredients, getUser } from '@slices';
import {
  ConstructorPage,
  Feed,
  Login,
  Register,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  NotFound404
} from '@pages';
import { useDispatch } from '../../services/store';

import '../../index.css';
import styles from './app.module.css';
import { useRedirectOnLogout } from '../../utils/redirects';

const App = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useRedirectOnLogout();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchBurgerIngredients());
  }, []);

  const goToConstructor = () => navigate('/');
  const goToFeed = () => navigate('/feed');
  const goToProfileOrders = () => navigate('/profile/orders');

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/' element={<ConstructorPage />} />
        <Route path='/feed' element={<Feed />} />
        <Route
          path='/login'
          element={
            <AnonymousRoute>
              <Login />
            </AnonymousRoute>
          }
        />
        <Route
          path='/register'
          element={
            <AnonymousRoute>
              <Register />
            </AnonymousRoute>
          }
        />
        <Route
          path='/forgot-password'
          element={
            <AnonymousRoute>
              <ForgotPassword />
            </AnonymousRoute>
          }
        />
        <Route
          path='/reset-password'
          element={
            <AnonymousRoute>
              <ResetPassword />
            </AnonymousRoute>
          }
        />
        <Route
          path='/profile'
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path='/profile/orders'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />

        <Route
          path='/feed/:number'
          element={<OrderInfo onClose={goToFeed} />}
        />
        <Route
          path='/ingredients/:id'
          element={<IngredientDetails onClose={goToConstructor} />}
        />
        <Route
          path='/profile/orders/:number'
          element={
            <ProtectedRoute>
              <OrderInfo onClose={goToProfileOrders} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
};

export default App;
