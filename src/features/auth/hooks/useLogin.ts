import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { loginStart, loginSuccess, loginFailure } from '../slices/authSlice';
import { loginApi } from '../api/authApi';
import type { LoginPayload } from '../api/authApi';

export function useLogin() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useAppSelector((state) => state.auth);

  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginPayload>({
    defaultValues: {
      email: '',
      password: '',
    }
  });

  const onSubmit = async (data: LoginPayload) => {
    dispatch(loginStart());
    try {
      const response = await loginApi(data);

      if (response.status === 0 && response.data?.token) {
        dispatch(loginSuccess(response.data.token));
        toast.success(`Selamat datang, ${data.email}!`);
      } else {
        dispatch(loginFailure(response.message || 'Login gagal. Silakan cek kembali data Anda.'));
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
        (err as { message?: string })?.message ||
        'Koneksi ke server gagal. Silakan coba kembali.';
      dispatch(loginFailure(errorMessage));
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    error,
    showPassword,
    toggleShowPassword,
  };
}

