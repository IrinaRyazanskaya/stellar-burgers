import type { FC, FormEvent } from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { RegisterUI } from '../../components/ui/pages/register';
import {
  clearRegisterStatus,
  registerUser,
  selectRegisterError,
  selectRegisterRequestStatus
} from '../../services/slices/profile';
import { useDispatch, useSelector } from '../../services/store';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const registerError = useSelector(selectRegisterError) || undefined;
  const requestStatus = useSelector(selectRegisterRequestStatus);

  useEffect(() => {
    if (requestStatus === 'succeeded') {
      navigate('/');
      dispatch(clearRegisterStatus());
    }
  }, [requestStatus, navigate, dispatch]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(
      registerUser({
        name: userName,
        email,
        password
      })
    );
  };

  return (
    <RegisterUI
      errorText={registerError}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
