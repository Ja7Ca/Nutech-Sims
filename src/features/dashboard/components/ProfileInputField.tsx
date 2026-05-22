import type { InputHTMLAttributes, ReactNode } from 'react';

interface ProfileInputFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  icon: ReactNode;
}

export default function ProfileInputField({
  label,
  icon,
  className = '',
  ...props
}: ProfileInputFieldProps) {
  return (
    <div className="sims-input-group">
      <span className="sims-input-label">{label}</span>
      <div className="sims-input-wrapper">
        <span className="sims-input-icon">{icon}</span>
        <input
          className={`sims-input ${className}`}
          {...props}
        />
      </div>
    </div>
  );
}
