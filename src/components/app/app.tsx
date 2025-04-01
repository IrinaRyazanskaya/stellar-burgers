import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';

import { AppHeader, ProtectedRoute, AnonymousRoute } from '@components';
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
  const dispatch = useDispatch();

  useRedirectOnLogout();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchBurgerIngredients());
  }, []);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path='/*' element={<ConstructorPage />} />
        <Route path='/feed/*' element={<Feed />} />
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
          path='/profile/orders/*'
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path='*' element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
