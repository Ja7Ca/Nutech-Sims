import { useState } from 'react';
import { useAppDispatch } from '../../../app/store';
import { setBalance } from '../slices/simsSlice';
import { postTopUpApi } from '../api/dashboardApi';

export type TopUpModalState = 'none' | 'confirm' | 'success' | 'failure';

export function useTopUp() {
  const dispatch = useAppDispatch();
  const [topUpAmount, setTopUpAmount] = useState<number | ''>('');
  const [activeModal, setActiveModal] = useState<TopUpModalState>('none');
  const [submitting, setSubmitting] = useState(false);

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleTopUpConfirm = () => {
    if (topUpAmount === '' || topUpAmount < 10000) return;
    setActiveModal('confirm');
  };

  const executeTopUp = async () => {
    if (topUpAmount === '' || topUpAmount < 10000) return;

    setSubmitting(true);
    try {
      const response = await postTopUpApi({ top_up_amount: topUpAmount });
      if (response.status === 0 && response.data) {
        dispatch(setBalance(response.data.balance));
        setActiveModal('success');
      } else {
        setActiveModal('failure');
      }
    } catch {
      setActiveModal('failure');
    } finally {
      setSubmitting(false);
    }
  };

  const handleSelectPreset = (nominal: number) => {
    setTopUpAmount(nominal);
  };

  const handleInputChange = (value: string) => {
    const val = value.replace(/\D/g, '');
    setTopUpAmount(val ? parseInt(val) : '');
  };

  const resetForm = () => {
    setTopUpAmount('');
    setActiveModal('none');
  };

  return {
    topUpAmount,
    activeModal,
    submitting,
    formatCurrency,
    handleTopUpConfirm,
    executeTopUp,
    handleSelectPreset,
    handleInputChange,
    setActiveModal,
    resetForm,
  };
}
