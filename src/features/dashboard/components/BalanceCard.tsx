import { useBalance } from '../hooks/useBalance';
import Button from '../../../components/ui/Button';
import { Eye, EyeOff } from 'lucide-react';

export default function BalanceCard() {
  const { balance, showBalance, formatCurrency, handleToggleShowBalance, loading } = useBalance();

  return (
    <div className="sims-saldo-card w-full max-w-[700px]">
      <span className="sims-saldo-header">Saldo anda</span>
      <div className="sims-saldo-amount">
        <span className="font-semibold text-2xl opacity-90">Rp</span>
        {loading ? (
          <div className="h-9 w-40 bg-white/20 animate-pulse rounded-md my-1" />
        ) : showBalance ? (
          <span className="font-bold tracking-tight text-3xl md:text-4xl">{formatCurrency(balance)}</span>
        ) : (
          <span className="sims-saldo-amount-hidden font-bold text-3xl">*********</span>
        )}
      </div>
      <Button
        variant="ghost"
        size="sm"
        className="sims-saldo-toggle mt-2 text-white hover:bg-white/10 text-xs border border-white/20"
        onClick={handleToggleShowBalance}
        startContent={showBalance ? <EyeOff size={14} /> : <Eye size={14} />}
      >
        {showBalance ? 'Sembunyikan Saldo' : 'Lihat Saldo'}
      </Button>
    </div>
  );
}
