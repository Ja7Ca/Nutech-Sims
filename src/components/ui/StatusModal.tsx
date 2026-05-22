import Button from './Button';
import { Wallet, Check, X } from 'lucide-react';

export type StatusModalType = 'confirm' | 'success' | 'failure';

interface StatusModalProps {
  isOpen: boolean;
  type: StatusModalType;
  title: string;
  highlightText?: string;
  suffixText?: string;
  primaryActionText: string;
  onPrimaryAction: () => void;
  secondaryActionText?: string;
  onSecondaryAction?: () => void;
  isLoading?: boolean;
}

export default function StatusModal({
  isOpen,
  type,
  title,
  highlightText,
  suffixText,
  primaryActionText,
  onPrimaryAction,
  secondaryActionText,
  onSecondaryAction,
  isLoading = false,
}: StatusModalProps) {
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget && onSecondaryAction && !isLoading) {
      onSecondaryAction();
    }
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-[2px] p-4 cursor-pointer"
      onClick={handleBackdropClick}
    >
      <div className="bg-white rounded-2xl max-w-xs w-full p-6 text-center space-y-5 shadow-2xl transform scale-100 cursor-default">

        {type === 'confirm' && (
          <div className="w-14 h-14 bg-primary rounded-full flex items-center justify-center mx-auto shadow-sm text-white">
            <Wallet size={24} />
          </div>
        )}

        {type === 'success' && (
          <div className="w-14 h-14 bg-emerald-500 rounded-full flex items-center justify-center mx-auto shadow-sm text-white">
            <Check size={26} strokeWidth={3} />
          </div>
        )}

        {type === 'failure' && (
          <div className="w-14 h-14 bg-rose-500 rounded-full flex items-center justify-center mx-auto shadow-sm text-white">
            <X size={26} strokeWidth={3} />
          </div>
        )}

        <div className="space-y-1">
          <p className="text-slate-500 text-xs font-semibold">{title}</p>
          {highlightText && (
            <p className="text-xl font-extrabold text-slate-900 tracking-tight">
              {highlightText}
            </p>
          )}
          {suffixText && (
            <p className="text-slate-500 text-xs font-semibold">{suffixText}</p>
          )}
        </div>

        <div className="space-y-2 pt-2">
          <Button
            variant="ghost"
            fullWidth
            onClick={onPrimaryAction}
            isLoading={isLoading}
            className="text-sm py-2 font-bold"
          >
            {primaryActionText}
          </Button>

          {secondaryActionText && onSecondaryAction && (
            <Button
              variant="ghost"
              fullWidth
              onClick={onSecondaryAction}
              disabled={isLoading}
              className="text-slate-400 hover:text-slate-600 hover:bg-slate-50 text-sm py-2 font-bold"
            >
              {secondaryActionText}
            </Button>
          )}
        </div>

      </div>
    </div>
  );
}
