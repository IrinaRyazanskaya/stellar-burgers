import type { ReactNode } from "react";
import { Navigate } from "react-router-dom";

import { selectUserStatus } from "../../services/slices/profile";
import { useSelector } from "../../services/store";

export type AnonymousRouteProps = {
  children: ReactNode;
};

export function AnonymousRoute({ children }: AnonymousRouteProps) {
  const userStatus = useSelector(selectUserStatus);

  if (userStatus === "authorized") {
    return <Navigate to="/profile" />;
  }

  return children;
}
