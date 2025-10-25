import type { FC, ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { Preloader } from "../../components/ui/preloader";
import { selectUserStatus } from "../../services/slices/profile";
import { useSelector } from "../../services/store";

type ProtectedRouteProps = {
  children: ReactNode;
};

const ProtectedRoute: FC<ProtectedRouteProps> = ({ children }) => {
  const userStatus = useSelector(selectUserStatus);

  if (userStatus === "unknown") {
    return <Preloader />;
  }

  if (userStatus === "unauthorized") {
    return <Navigate to="/login" />;
  }

  return children;
};

export { ProtectedRoute };
export type { ProtectedRouteProps };
