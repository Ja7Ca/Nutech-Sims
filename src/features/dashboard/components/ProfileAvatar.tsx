import { useRef } from 'react';
import { Camera } from 'lucide-react';

interface ProfileAvatarProps {
  imageSrc: string;
  name: string;
  uploading: boolean;
  onFileChange: (file: File) => void;
}

export default function ProfileAvatar({
  imageSrc,
  name,
  uploading,
  onFileChange,
}: ProfileAvatarProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onFileChange(file);
    }
  };

  return (
    <div className="relative group">
      <div
        className={`w-28 h-28 rounded-full p-1 bg-white relative overflow-hidden transition-all duration-300 ${uploading ? 'opacity-60 scale-95' : 'hover:scale-105'
          }`}
      >
        <img
          src={imageSrc}
          alt={name}
          className="w-full h-full object-cover rounded-full"
        />

        {uploading && (
          <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center rounded-full">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>

      <input
        type="file"
        ref={fileInputRef}
        className="hidden"
        accept="image/png, image/jpeg"
        onChange={handleFileChange}
      />

      <button
        type="button"
        onClick={handleAvatarClick}
        disabled={uploading}
        className="absolute bottom-1 right-1 w-8 h-8 rounded-full bg-white border border-slate-200 shadow-md flex items-center justify-center text-slate-600 hover:text-primary transition-all duration-200 hover:scale-110 cursor-pointer disabled:opacity-50"
        title="Ganti Foto Profil"
      >
        <Camera size={14} />
      </button>
    </div>
  );
}
