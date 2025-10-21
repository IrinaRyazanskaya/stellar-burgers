import { FC, FormEvent, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  clearLoginStatus,
  loginUser,
  selectLoginError,
  selectLoginRequestStatus
} from '@slices';
import { LoginUI } from '../../components/ui/pages';
import { useDispatch, useSelector } from '../../services/store';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginError = useSelector(selectLoginError) || undefined;
  const requestStatus = useSelector(selectLoginRequestStatus);

  useEffect(() => {
    if (requestStatus === 'succeeded') {
      navigate('/');
      dispatch(clearLoginStatus());
    }
  }, [requestStatus, navigate, dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      loginUser({
        email,
        password
      })
    );
  };

  return (
    <LoginUI
      errorText={loginError}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
