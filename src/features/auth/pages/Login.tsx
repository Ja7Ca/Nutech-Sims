import { Link } from 'react-router-dom';
import FormInput from '../../../components/ui/FormInput';
import Button from '../../../components/ui/Button';
import { useLogin } from '../hooks/useLogin';
import { Lock, Eye, EyeOff } from 'lucide-react';

export default function Login() {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    error,
    showPassword,
    toggleShowPassword,
  } = useLogin();

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="w-full max-w-[400px] space-y-8 animate-fade-in">
          <div className="flex items-center justify-center gap-2">
            <img
              src="/core/Logo.png"
              alt="SIMS PPOB Logo"
              className="w-6 h-6 object-contain"
            />
            <span className="font-sans font-bold text-lg text-slate-800 tracking-tight">
              SIMS PPOB
            </span>
          </div>

          <div className="text-center">
            <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Masuk atau buat akun<br />untuk memulai
            </h1>
          </div>

          {error && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5 pt-2">
            <FormInput
              type="email"
              placeholder="masukan email anda"
              isInvalid={!!errors.email}
              errorMessage={errors.email?.message}
              startContent={
                <span className="text-sm font-semibold">@</span>
              }
              {...register('email', {
                required: 'Email wajib diisi',
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: 'Format email tidak valid',
                },
              })}
            />

            {/* Input Password */}
            <FormInput
              type={showPassword ? 'text' : 'password'}
              placeholder="masukan password anda"
              isInvalid={!!errors.password}
              errorMessage={errors.password?.message}
              startContent={
                <Lock className="w-4 h-4 text-slate-400" strokeWidth={2.2} />
              }
              endContent={
                <button
                  type="button"
                  onClick={toggleShowPassword}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer focus:outline-none"
                >
                  {showPassword ? (
                    <Eye className="w-4 h-4" strokeWidth={2.2} />
                  ) : (
                    <EyeOff className="w-4 h-4" strokeWidth={2.2} />
                  )}
                </button>
              }
              {...register('password', {
                required: 'Password wajib diisi',
                minLength: {
                  value: 8,
                  message: 'Password minimal 8 karakter',
                },
              })}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={loading}
              loadingText="Menghubungkan..."
              className="mt-2"
            >
              Masuk
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500">
            belum punya akun? registrasi{' '}
            <Link
              to="/register"
              className="font-bold text-red-600 hover:underline"
            >
              di sini
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:block lg:w-1/2 select-none max-h-screen">
        <img
          src="/core/Illustrasi Login.png"
          alt="SIMS PPOB Illustration"
          className="w-full h-full object-cover max-h-screen"
        />
      </div>
    </div>
  );
}
