import type { InputHTMLAttributes, ReactNode } from 'react';

interface FormInputProps extends InputHTMLAttributes<HTMLInputElement> {
  startContent?: ReactNode;
  endContent?: ReactNode;
  errorMessage?: string;
  isInvalid?: boolean;
}

export default function FormInput({
  startContent,
  endContent,
  errorMessage,
  isInvalid,
  className = '',
  ...props
}: FormInputProps) {
  return (
    <div className="space-y-1 w-full">
      <div className="relative">
        {startContent && (
          <span className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400 z-10">
            {startContent}
          </span>
        )}

        <input
          {...props}
          className={[
            'w-full py-3 border rounded-lg',
            'focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary',
            'text-sm bg-white transition-all placeholder-slate-400 text-slate-700',
            startContent ? 'pl-9' : 'pl-4',
            endContent ? 'pr-10' : 'pr-4',
            isInvalid
              ? 'border-red-400 ring-2 ring-red-100'
              : 'border-slate-200',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
        />

        {endContent && (
          <span className="absolute inset-y-0 right-0 pr-3 flex items-center z-10">
            {endContent}
          </span>
        )}
      </div>

      {isInvalid && errorMessage && (
        <p className="text-[11px] text-red-500 pl-1 animate-fade-in">
          {errorMessage}
        </p>
      )}
    </div>
  );
}
