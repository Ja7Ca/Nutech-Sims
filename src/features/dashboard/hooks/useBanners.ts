import { useEffect, useState } from 'react';
import { getBannersApi } from '../api/dashboardApi';
import type { ApiBannerItem } from '../api/dashboardApi';

// Handle duplicate fetch
let activeBannersPromise: Promise<any> | null = null;

export function useBanners() {
  const [banners, setBanners] = useState<ApiBannerItem[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let active = true;

    const fetchBanners = async () => {
      setLoading(true);
      setError(null);

      try {
        if (!activeBannersPromise) {
          activeBannersPromise = getBannersApi();
        }

        const response = await activeBannersPromise;
        if (!active) return;

        if (response.status === 0 && response.data) {
          setBanners(response.data);
        } else {
          setError(response.message || 'Gagal memuat banner promo');
        }
      } catch (err: unknown) {
        if (!active) return;
        const errorMessage =
          (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
          (err as { message?: string })?.message ||
          'Gagal memuat daftar banner promo dari server';
        setError(errorMessage);
      } finally {
        if (active) {
          setLoading(false);
        }
        activeBannersPromise = null;
      }
    };

    void fetchBanners();

    return () => {
      active = false;
    };
  }, []);

  return {
    banners,
    loading,
    error,
  };
}
