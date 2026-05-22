import type { ButtonHTMLAttributes, ReactNode } from 'react';
import { Loader2 } from 'lucide-react';

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger' | 'danger-outline';
export type ButtonSize = 'sm' | 'md' | 'lg';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  isLoading?: boolean;
  loadingText?: string;
  startContent?: ReactNode;
  children: ReactNode;
  fullWidth?: boolean;
}

const variantClasses: Record<ButtonVariant, string> = {
  primary: 'bg-primary hover:bg-primary-hover text-white shadow-sm',
  secondary: 'bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-200',
  ghost: 'bg-transparent hover:bg-slate-100 text-primary',
  danger: 'bg-red-500 hover:bg-red-600 text-white shadow-sm',
  'danger-outline': 'bg-transparent border border-red-500 text-red-500 hover:bg-red-50',
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'py-1.5 px-3 text-xs',
  md: 'py-3 px-4 text-sm',
  lg: 'py-4 px-6 text-base',
};

export default function Button({
  variant = 'primary',
  size = 'md',
  isLoading = false,
  loadingText,
  startContent,
  children,
  fullWidth = false,
  disabled,
  className = '',
  ...props
}: ButtonProps) {
  const isDisabled = disabled || isLoading;

  return (
    <button
      {...props}
      disabled={isDisabled}
      className={[
        'flex items-center justify-center gap-2 rounded-lg font-bold transition-all duration-200 select-none',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        'disabled:opacity-60 disabled:cursor-not-allowed',
        'cursor-pointer',
        variantClasses[variant],
        sizeClasses[size],
        fullWidth ? 'w-full' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
    >
      {isLoading ? (
        <>
          <Loader2 className="animate-spin h-4 w-4 shrink-0" />
          {loadingText ?? children}
        </>
      ) : (
        <>
          {startContent}
          {children}
        </>
      )}
    </button>
  );
}
