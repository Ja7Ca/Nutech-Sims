import { useProfile } from '../hooks/useProfile';

export default function ProfileHeader() {
  const { profile, loading } = useProfile();

  const isDefaultOrNullImage =
    !profile.profileImage ||
    profile.profileImage.includes('default.png') ||
    profile.profileImage.endsWith('/null') ||
    profile.profileImage === 'null';

  const profileImageSrc = isDefaultOrNullImage
    ? '/core/Profile Photo.png'
    : (profile.profileImage || undefined);

  return (
    <div className="flex flex-col items-start items-center gap-4 text-left">
      <div className="sims-avatar-wrapper border-2 border-primary/20 bg-white shadow-sm flex items-center justify-center p-1 overflow-hidden relative rounded-full">
        {loading ? (
          <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin"></div>
        ) : (
          <img
            src={profileImageSrc}
            alt={`${profile.firstName} ${profile.lastName}`}
            className="w-full h-full object-cover rounded-full"
          />
        )}
      </div>
      <div className="sims-profile-info text-left">
        <span className="sims-welcome-title font-medium tracking-wide">Selamat datang,</span>
        <h1 className="sims-welcome-name">
          {loading ? (
            <span className="inline-block w-32 h-5 bg-slate-200 rounded animate-pulse"></span>
          ) : (
            `${profile.firstName || 'User'} ${profile.lastName}`
          )}
        </h1>
      </div>
    </div>
  );
}
