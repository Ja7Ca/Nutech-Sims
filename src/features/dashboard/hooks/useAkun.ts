import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch } from '../../../app/store';
import { updateProfile, resetSims } from '../slices/simsSlice';
import { logout } from '../../auth/slices/authSlice';
import { useProfile } from './useProfile';
import { updateProfileApi, updateProfileImageApi } from '../api/dashboardApi';

export function useAkun() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  
  const { profile, loading: profileLoading } = useProfile();
  
  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [editForm, setEditForm] = useState({ ...profile });

  // Sinkronisasi data form saat data profile berhasil dimuat dari API
  useEffect(() => {
    setEditForm({ ...profile });
  }, [profile]);

  const handleSaveProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    try {
      const response = await updateProfileApi({
        first_name: editForm.firstName,
        last_name: editForm.lastName,
      });

      if (response.status === 0 && response.data) {
        dispatch(
          updateProfile({
            firstName: response.data.first_name || '',
            lastName: response.data.last_name || '',
            email: response.data.email || '',
            profileImage: response.data.profile_image,
          })
        );
        setIsEditing(false);
        toast.success('Profil berhasil diperbarui!');
      } else {
        toast.error(response.message || 'Profil gagal diperbarui');
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
        (err as { message?: string })?.message ||
        'Terjadi kesalahan saat menyimpan profil';
      toast.error(errorMessage);
    } finally {
      setSaving(false);
    }
  };

  const handleUploadImage = async (file: File) => {
    // Validasi tipe file
    if (!['image/jpeg', 'image/png'].includes(file.type)) {
      toast.error('Format gambar tidak valid! Harus berupa JPEG atau PNG.');
      return;
    }

    // Validasi ukuran file (maksimal 100KB sesuai spesifikasi Nutech)
    if (file.size > 100 * 1024) {
      toast.error('Ukuran gambar terlalu besar! Maksimal adalah 100 KB.');
      return;
    }

    setUploading(true);
    try {
      const response = await updateProfileImageApi(file);
      if (response.status === 0 && response.data) {
        dispatch(
          updateProfile({
            firstName: response.data.first_name || '',
            lastName: response.data.last_name || '',
            email: response.data.email || '',
            profileImage: response.data.profile_image,
          })
        );
        toast.success('Foto profil berhasil diperbarui!');
      } else {
        toast.error(response.message || 'Foto profil gagal diperbarui');
      }
    } catch (err: unknown) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } }; message?: string })?.response?.data?.message ||
        (err as { message?: string })?.message ||
        'Terjadi kesalahan saat mengunggah foto profil';
      toast.error(errorMessage);
    } finally {
      setUploading(false);
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    dispatch(resetSims());
    navigate('/login', { replace: true });
  };

  const startEditing = () => {
    setIsEditing(true);
    setEditForm({ ...profile });
  };

  const cancelEditing = () => {
    setIsEditing(false);
    setEditForm({ ...profile });
  };

  const updateField = (field: 'firstName' | 'lastName' | 'email', value: string) => {
    setEditForm((prev) => ({ ...prev, [field]: value }));
  };

  return {
    profile,
    profileLoading,
    isEditing,
    saving,
    uploading,
    editForm,
    handleSaveProfile,
    handleUploadImage,
    handleLogout,
    startEditing,
    cancelEditing,
    updateField,
  };
}
