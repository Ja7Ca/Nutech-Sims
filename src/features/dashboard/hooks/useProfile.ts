import { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import { updateProfile } from '../slices/simsSlice';
import { getProfileApi } from '../api/dashboardApi';

// Handle duplicate fetch
let activeProfilePromise: Promise<any> | null = null;

export function useProfile() {
  const dispatch = useAppDispatch();
  const profile = useAppSelector((state) => state.sims.profile);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!profile.email) {
      let active = true;

      const fetchProfile = async () => {
        setLoading(true);
        setError(null);

        try {
          if (!activeProfilePromise) {
            activeProfilePromise = getProfileApi();
          }

          const response = await activeProfilePromise;
          if (!active) return;

          if (response.status === 0 && response.data) {
            dispatch(
              updateProfile({
                firstName: response.data.first_name || '',
                lastName: response.data.last_name || '',
                email: response.data.email || '',
                profileImage: response.data.profile_image,
              })
            );
          } else {
            setError(response.message || 'Gagal memuat profil');
          }
        } catch (err: unknown) {
          if (!active) return;
          const errorMessage =
            (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
            (err as { message?: string })?.message ||
            'Gagal memuat profil dari server';
          setError(errorMessage);
        } finally {
          if (active) {
            setLoading(false);
          }
          // Clear cached promise on completion
          activeProfilePromise = null;
        }
      };

      fetchProfile();

      return () => {
        active = false;
      };
    }
  }, [profile.email, dispatch]);

  return {
    profile,
    loading,
    error,
  };
}
