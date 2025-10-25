import type { ReactNode, FC } from "react";
import { Navigate } from "react-router-dom";

import { selectUserStatus } from "../../services/slices/profile";
import { useSelector } from "../../services/store";

type AnonymousRouteProps = {
  children: ReactNode;
};

const AnonymousRoute: FC<AnonymousRouteProps> = ({ children }) => {
  const userStatus = useSelector(selectUserStatus);

  if (userStatus === "authorized") {
    return <Navigate to="/profile" />;
  }

  return children;
};

AnonymousRoute.displayName = "AnonymousRoute";

export { AnonymousRoute };
export type { AnonymousRouteProps };
