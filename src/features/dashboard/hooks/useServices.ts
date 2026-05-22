import { useEffect, useState } from 'react';
import { getServicesApi } from '../api/dashboardApi';
import type { ApiServiceItem } from '../api/dashboardApi';

// Handle duplicate fetch
let activeServicesPromise: Promise<any> | null = null;

export function useServices() {
  const [services, setServices] = useState<ApiServiceItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchServices = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!activeServicesPromise) {
          activeServicesPromise = getServicesApi();
        }

        const response = await activeServicesPromise;
        if (!active) return;

        if (response.status === 0 && response.data) {
          setServices(response.data);
        } else {
          setError(response.message || 'Gagal memuat layanan');
        }
      } catch (err: unknown) {
        if (!active) return;
        const errorMessage =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
          (err as { message?: string })?.message ||
          'Gagal memuat daftar layanan dari server';
        setError(errorMessage);
      } finally {
        if (active) {
          setLoading(false);
        }
        activeServicesPromise = null;
      }
    };

    void fetchServices();

    return () => {
      active = false;
    };
  }, []);

  return {
    services,
    loading,
    error,
  };
}
