import type { FC } from 'react';

import { AppHeaderUI } from '../../components/ui/app-header';
import { selectUser } from '../../services/slices/profile';
import { useSelector } from '../../services/store';

export const AppHeader: FC = () => {
  const user = useSelector(selectUser);

  return <AppHeaderUI userName={user?.name} />;
};
