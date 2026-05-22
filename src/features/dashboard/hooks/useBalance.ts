import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { toggleShowBalance, setBalance } from '../slices/simsSlice';
import { getBalanceApi } from '../api/dashboardApi';

// Handle duplicate fetch
let activeBalancePromise: Promise<any> | null = null;

export function useBalance() {
  const dispatch = useAppDispatch();
  const balance = useAppSelector((state) => state.sims.balance);
  const showBalance = useAppSelector((state) => state.sims.showBalance);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchBalance = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!activeBalancePromise) {
          activeBalancePromise = getBalanceApi();
        }

        const response = await activeBalancePromise;
        if (!active) return;

        if (response.status === 0 && response.data) {
          dispatch(setBalance(response.data.balance));
        } else {
          setError(response.message || 'Gagal memuat saldo');
        }
      } catch (err: unknown) {
        if (!active) return;
        const errorMessage =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
          (err as { message?: string })?.message ||
          'Gagal memuat saldo dari server';
        setError(errorMessage);
      } finally {
        if (active) {
          setLoading(false);
        }
        activeBalancePromise = null;
      }
    };

    void fetchBalance();

    return () => {
      active = false;
    };
  }, [dispatch]);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleToggleShowBalance = () => {
    dispatch(toggleShowBalance());
  };

  return {
    balance,
    showBalance,
    loading,
    error,
    formatCurrency,
    handleToggleShowBalance,
  };
}
