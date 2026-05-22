import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { payment } from '../slices/simsSlice';

export function useDashboard() {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.sims.balance);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePaymentClick = (serviceName: string, amount: number) => {
    if (balance < amount) {
      toast.error(
        `Saldo Anda tidak mencukupi untuk membayar ${serviceName} sebesar Rp ${formatCurrency(amount)}.`
      );
      return;
    }
    
    const confirmPay = window.confirm(`Apakah Anda yakin ingin membayar ${serviceName} sebesar Rp ${formatCurrency(amount)}?`);
    if (!confirmPay) return;
    
    dispatch(payment({ serviceName, amount }));
    toast.success(
      `Pembayaran ${serviceName} sebesar Rp ${formatCurrency(amount)} berhasil!`
    );
  };

  return {
    balance,
    formatCurrency,
    handlePaymentClick,
  };
}
