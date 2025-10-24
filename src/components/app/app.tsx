import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";

import { AnonymousRoute } from "../anonymous-route";
import { AppHeader } from "../app-header";
import { ConstructorPage } from "../../pages/constructor-page";
import { Feed } from "../../pages/feed";
import { fetchBurgerIngredients } from "../../services/slices/burger-ingredients";
import { getUser } from "../../services/slices/profile";
import { ForgotPassword } from "../../pages/forgot-password";
import { Login } from "../../pages/login";
import { NotFound404 } from "../../pages/not-fount-404";
import { Profile } from "../../pages/profile";
import { ProfileOrders } from "../../pages/profile-orders";
import { ProtectedRoute } from "../protected-route";
import { Register } from "../../pages/register";
import { ResetPassword } from "../../pages/reset-password";
import { useDispatch } from "../../services/store";
import { useRedirectOnLogout } from "../../utils/redirects";

import "../../index.css";
import styles from "./app.module.css";

const App = () => {
  const dispatch = useDispatch();

  useRedirectOnLogout();

  useEffect(() => {
    dispatch(getUser());
    dispatch(fetchBurgerIngredients());
  }, [dispatch]);

  return (
    <div className={styles.app}>
      <AppHeader />
      <Routes>
        <Route path="/*" element={<ConstructorPage />} />
        <Route path="/feed/*" element={<Feed />} />
        <Route
          path="/login"
          element={
            <AnonymousRoute>
              <Login />
            </AnonymousRoute>
          }
        />
        <Route
          path="/register"
          element={
            <AnonymousRoute>
              <Register />
            </AnonymousRoute>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <AnonymousRoute>
              <ForgotPassword />
            </AnonymousRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <AnonymousRoute>
              <ResetPassword />
            </AnonymousRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          }
        />
        <Route
          path="/profile/orders/*"
          element={
            <ProtectedRoute>
              <ProfileOrders />
            </ProtectedRoute>
          }
        />
        <Route path="*" element={<NotFound404 />} />
      </Routes>
    </div>
  );
};

export default App;
