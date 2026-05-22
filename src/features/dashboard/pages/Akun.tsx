import RootLayout from '../../../layouts/RootLayout';
import { useAkun } from '../hooks/useAkun';
import ProfileInputField from '../components/ProfileInputField';
import ProfileAvatar from '../components/ProfileAvatar';
import Button from '../../../components/ui/Button';
import { Mail, User } from 'lucide-react';

export default function Akun() {
  const {
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
  } = useAkun();

  const isDefaultOrNullImage =
    !profile.profileImage ||
    profile.profileImage.includes('default.png') ||
    profile.profileImage.endsWith('/null') ||
    profile.profileImage === 'null';

  const profileImageSrc = isDefaultOrNullImage
    ? '/core/Profile Photo.png'
    : (profile.profileImage || '/core/Profile Photo.png');

  if (profileLoading) {
    return (
      <RootLayout showProfileSection={false}>
        <div className="flex items-center justify-center min-h-[400px]">
          <div className="flex flex-col items-center gap-3">
            <div className="w-10 h-10 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            <p className="text-xs text-slate-500 font-medium">Memuat profil Anda...</p>
          </div>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout showProfileSection={false}>
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs max-w-2xl mx-auto space-y-8 mt-6">
        <div className="flex flex-col items-center gap-4 text-center">
          <ProfileAvatar
            imageSrc={profileImageSrc}
            name={`${profile.firstName} ${profile.lastName}`}
            uploading={uploading}
            onFileChange={(file) => void handleUploadImage(file)}
          />

          <div className="space-y-1">
            <h2 className="text-xl font-bold">{profile.firstName || 'User'} {profile.lastName}</h2>
          </div>
        </div>

        <form onSubmit={handleSaveProfile} className="space-y-6">
          <div className="grid grid-cols-1 gap-6 text-left">
            <ProfileInputField
              type="email"
              label="Email"
              value={profile.email}
              disabled={true}
              required
              icon={<Mail size={18} />}
            />

            <ProfileInputField
              type="text"
              label="Nama Depan"
              value={isEditing ? editForm.firstName : profile.firstName}
              disabled={!isEditing || saving}
              onChange={(e) => updateField('firstName', e.target.value)}
              required
              icon={<User size={18} />}
            />

            <ProfileInputField
              type="text"
              label="Nama Belakang"
              value={isEditing ? editForm.lastName : profile.lastName}
              disabled={!isEditing || saving}
              onChange={(e) => updateField('lastName', e.target.value)}
              required
              icon={<User size={18} />}
            />


          </div>

          <div className="pt-4">
            {isEditing ? (
              <div className="flex gap-4">
                <Button
                  type="button"
                  variant="secondary"
                  fullWidth
                  onClick={cancelEditing}
                  disabled={saving}
                >
                  Batal
                </Button>
                <Button
                  type="submit"
                  variant="primary"
                  fullWidth
                  isLoading={saving}
                  loadingText="Menyimpan..."
                >
                  Simpan Perubahan
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Button
                  type="button"
                  variant="primary"
                  fullWidth
                  onClick={startEditing}
                >
                  Edit Profil
                </Button>
                <Button
                  type="button"
                  variant="danger-outline"
                  fullWidth
                  onClick={handleLogout}
                >
                  Keluar
                </Button>
              </div>
            )}
          </div>
        </form>
      </div>
    </RootLayout>
  );
}
