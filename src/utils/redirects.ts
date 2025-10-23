import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { selectUserStatus } from "../services/slices/profile";
import { useSelector } from "../services/store";

export const useRedirectOnLogout = (redirectPath = "/login") => {
  const navigate = useNavigate();
  const userStatus = useSelector(selectUserStatus);
  const previousUserStatus = useRef(userStatus);

  useEffect(() => {
    if (previousUserStatus.current === "authorized" && userStatus === "unauthorized") {
      navigate(redirectPath);
    }
    previousUserStatus.current = userStatus;
  }, [userStatus, navigate, redirectPath]);
};
