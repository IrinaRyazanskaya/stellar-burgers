import React from 'react';
import { Navigate } from 'react-router-dom';

import { Preloader } from '@ui';
import { selectUserStatus } from '@slices';
import { useSelector } from '../../services/store';

export type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const userStatus = useSelector(selectUserStatus);

  if (userStatus === 'unknown') {
    return <Preloader />;
  }

  if (userStatus === 'unauthorized') {
    return <Navigate to='/login' />;
  }

  return children;
}
