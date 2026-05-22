import { useState, useEffect } from 'react';
import { getTransactionHistoryApi } from '../api/dashboardApi';
import type { ApiTransactionHistoryItem } from '../api/dashboardApi';
import { toast } from 'react-toastify';

export function useTransaction() {
  const [history, setHistory] = useState<ApiTransactionHistoryItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [offset, setOffset] = useState(0);
  const [hasMore, setHasMore] = useState(true);

  const limit = 5;

  const fetchHistory = async (currentOffset: number) => {
    setLoading(true);
    try {
      const response = await getTransactionHistoryApi(currentOffset, limit);
      if (response.status === 0 && response.data) {
        const newRecords = response.data.records || [];
        setHistory((prev) => (currentOffset === 0 ? newRecords : [...prev, ...newRecords]));
        setHasMore(newRecords.length === limit);
      } else {
        toast.error(response.message || 'Gagal memuat riwayat transaksi');
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
        (err as { message?: string })?.message ||
        'Terjadi kesalahan saat memuat riwayat transaksi';
      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHistory(0);
  }, []);

  const loadMore = () => {
    const nextOffset = offset + limit;
    setOffset(nextOffset);
    fetchHistory(nextOffset);
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateStr: string) => {
    try {
      const d = new Date(dateStr);
      const dateString = d.toLocaleDateString('id-ID', {
        day: 'numeric',
        month: 'long',
        year: 'numeric',
      });
      const timeString = d.toLocaleTimeString('id-ID', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      });
      return `${dateString}  ${timeString.replace('.', ':')} WIB`;
    } catch {
      return dateStr;
    }
  };

  return {
    history,
    loading,
    hasMore,
    loadMore,
    formatCurrency,
    formatDate,
  };
}
