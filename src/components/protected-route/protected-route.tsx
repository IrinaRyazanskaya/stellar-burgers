import React from 'react';
import { Navigate } from 'react-router-dom';

import { Preloader } from '@ui';
import { selectUser, selectUserIsLoading } from '@slices';
import { useSelector } from '../../services/store';

export type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const user = useSelector(selectUser);
  const isLoading = useSelector(selectUserIsLoading);

  if (isLoading) {
    return <Preloader />;
  }

  if (!user) {
    return <Navigate to='/login' />;
  }

  return children;
}
