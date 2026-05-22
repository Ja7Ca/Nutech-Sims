import { Link } from 'react-router-dom';
import FormInput from '../../../components/ui/FormInput';
import Button from '../../../components/ui/Button';
import { useRegister } from '../hooks/useRegister';
import { User, Lock, Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const {
    register,
    handleSubmit,
    errors,
    loading,
    error,
    passwordValue,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
  } = useRegister();

  return (
    <div className="min-h-screen w-full flex bg-white font-sans">
      {/* Kiri: Form Registrasi (50%) */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center px-8 sm:px-16 lg:px-24 py-12">
        <div className="w-full max-w-[400px] space-y-6 animate-fade-in">
          {/* Logo SIMS PPOB */}
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

          {/* Heading */}
          <div className="text-center">
            <h1 className="font-sans text-2xl sm:text-3xl font-extrabold text-slate-900 leading-tight">
              Lengkapi data diri<br />untuk bergabung
            </h1>
          </div>

          {/* Error Message Alert */}
          {error && (
            <div className="p-3 text-xs text-red-600 bg-red-50 border border-red-100 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4 pt-1">
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

            <FormInput
              type="text"
              placeholder="nama depan"
              isInvalid={!!errors.first_name}
              errorMessage={errors.first_name?.message}
              startContent={
                <User className="w-4 h-4 text-slate-400" strokeWidth={2.2} />
              }
              {...register('first_name', {
                required: 'Nama depan wajib diisi',
              })}
            />

            <FormInput
              type="text"
              placeholder="nama belakang"
              isInvalid={!!errors.last_name}
              errorMessage={errors.last_name?.message}
              startContent={
                <User className="w-4 h-4 text-slate-400" strokeWidth={2.2} />
              }
              {...register('last_name', {
                required: 'Nama belakang wajib diisi',
              })}
            />

            <FormInput
              type={showPassword ? 'text' : 'password'}
              placeholder="buat password"
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
            <FormInput
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="konfirmasi password"
              isInvalid={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword?.message}
              startContent={
                <Lock className="w-4 h-4 text-slate-400" strokeWidth={2.2} />
              }
              endContent={
                <button
                  type="button"
                  onClick={toggleShowConfirmPassword}
                  className="text-slate-400 hover:text-slate-600 transition-colors cursor-pointer focus:outline-none"
                >
                  {showConfirmPassword ? (
                    <Eye className="w-4 h-4" strokeWidth={2.2} />
                  ) : (
                    <EyeOff className="w-4 h-4" strokeWidth={2.2} />
                  )}
                </button>
              }
              {...register('confirmPassword', {
                required: 'Konfirmasi password wajib diisi',
                validate: (value) =>
                  value === passwordValue || 'Password tidak cocok',
              })}
            />

            <Button
              type="submit"
              variant="primary"
              size="md"
              fullWidth
              isLoading={loading}
              loadingText="Mendaftarkan..."
              className="mt-2"
            >
              Daftar
            </Button>
          </form>

          <div className="text-center text-xs text-slate-500">
            sudah punya akun?{' '}
            <Link
              to="/login"
              className="font-bold text-red-600 hover:underline"
            >
              masuk di sini
            </Link>
          </div>
        </div>
      </div>

      <div className="hidden lg:flex lg:w-1/2 bg-[#FFF3F2] items-center justify-center p-12 select-none">
        <div className="w-full max-w-[550px] flex items-center justify-center">
          <img
            src="/core/Illustrasi Login.png"
            alt="SIMS PPOB Illustration"
            className="w-full h-auto object-contain max-h-[85vh]"
          />
        </div>
      </div>
    </div>
  );
}
