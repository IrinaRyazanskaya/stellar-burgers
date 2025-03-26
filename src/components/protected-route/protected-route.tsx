import React from 'react';
import { Navigate } from 'react-router-dom';

import { Preloader } from '@ui';
import { selectGetUserRequestStatus } from '@slices';
import { useSelector } from '../../services/store';

export type ProtectedRouteProps = {
  children: React.ReactNode;
};

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const requestStatus = useSelector(selectGetUserRequestStatus);

  if (requestStatus === 'pending') {
    return <Preloader />;
  }

  if (requestStatus === 'failed') {
    return <Navigate to='/login' />;
  }

  return children;
}
