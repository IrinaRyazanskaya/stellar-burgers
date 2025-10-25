import type { FC } from "react";
import { useLocation } from "react-router-dom";

import { ProfileMenuUI } from "../../components/ui/profile-menu";
import { logoutUser } from "../../services/slices/profile";
import { useDispatch } from "../../services/store";

const ProfileMenu: FC = () => {
  const dispatch = useDispatch();
  const { pathname } = useLocation();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};

ProfileMenu.displayName = "ProfileMenu";

export { ProfileMenu };
