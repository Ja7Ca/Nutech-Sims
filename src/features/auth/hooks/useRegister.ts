import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { registerApi } from '../api/authApi';
import type { RegisterPayload } from '../api/authApi';

interface RegisterFormData extends RegisterPayload {
  confirmPassword: string;
}

export function useRegister() {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<RegisterFormData>({
    defaultValues: {
      email: '',
      first_name: '',
      last_name: '',
      password: '',
      confirmPassword: '',
    },
  });

  const passwordValue = watch('password');

  const onSubmit = async (data: RegisterFormData) => {
    setLoading(true);
    setError(null);
    try {
      const payload: RegisterPayload = {
        email: data.email,
        first_name: data.first_name,
        last_name: data.last_name,
        password: data.password,
      };
      const response = await registerApi(payload);

      if (response.status === 0) {
        toast.success('Akun Anda berhasil dibuat. Silakan masuk.');
        navigate('/login', { replace: true });
      } else {
        setError(response.message || 'Registrasi gagal. Silakan coba kembali.');
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
        (err as { message?: string })?.message ||
        'Koneksi ke server gagal. Silakan coba kembali.';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const toggleShowPassword = () => setShowPassword((prev) => !prev);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((prev) => !prev);

  return {
    register,
    handleSubmit: handleSubmit(onSubmit),
    errors,
    loading,
    error,
    passwordValue,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
  };
}
