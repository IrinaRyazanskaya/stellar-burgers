import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { Preloader } from "../../components/ui/preloader";
import { selectUserStatus } from "../../services/slices/profile";
import { useSelector } from "../../services/store";

export type ProtectedRouteProps = {
  children: ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userStatus = useSelector(selectUserStatus);

  if (userStatus === "unknown") {
    return <Preloader />;
  }

  if (userStatus === "unauthorized") {
    return <Navigate to="/login" />;
  }

  return children;
}
