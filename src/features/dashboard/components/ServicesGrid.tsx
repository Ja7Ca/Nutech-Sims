import { useNavigate } from 'react-router-dom';
import { useServices } from '../hooks/useServices';

export const getLocalIconPath = (serviceCode: string) => {
  const code = serviceCode.toUpperCase();
  switch (code) {
    case 'PAJAK':
      return '/core/PBB.png';
    case 'PLN':
      return '/core/Listrik.png';
    case 'PULSA':
      return '/core/Pulsa.png';
    case 'PDAM':
      return '/core/PDAM.png';
    case 'GAS':
      return '/core/PGN.png';
    case 'TV':
      return '/core/Televisi.png';
    case 'MUSIK':
      return '/core/Musik.png';
    case 'GAME':
      return '/core/Game.png';
    case 'VOUCHER':
      return '/core/Voucher Makanan.png';
    case 'KURBAN':
      return '/core/Kurban.png';
    case 'ZAKAT':
      return '/core/Zakat.png';
    case 'DATA':
      return '/core/Paket Data.png';
    default:
      return `/core/${serviceCode}.png`;
  }
};

export const getIconClass = (serviceCode: string) => {
  const code = serviceCode.toUpperCase();
  switch (code) {
    case 'PAJAK':
      return 'icon-box-pbb text-emerald-600';
    case 'PLN':
      return 'icon-box-listrik text-amber-500';
    case 'PULSA':
      return 'icon-box-pulsa text-blue-600';
    case 'PDAM':
      return 'icon-box-pdam text-sky-500';
    case 'GAS':
      return 'icon-box-pgn text-red-500';
    case 'TV':
      return 'icon-box-tv text-purple-600';
    case 'MUSIK':
      return 'icon-box-musik text-pink-500';
    case 'GAME':
      return 'icon-box-game text-lime-600';
    case 'VOUCHER':
      return 'icon-box-makanan text-cyan-600';
    case 'KURBAN':
      return 'icon-box-kurban text-amber-800';
    case 'ZAKAT':
      return 'icon-box-zakat text-emerald-600';
    case 'DATA':
      return 'icon-box-data text-teal-600';
    default:
      return 'bg-slate-50 text-slate-600';
  }
};

export default function ServicesGrid() {
  const navigate = useNavigate();
  const { services, loading, error } = useServices();

  if (loading) {
    return (
      <div className="sims-services-grid bg-white p-6 rounded-2xl">
        {Array.from({ length: 12 }).map((_, index) => (
          <div key={index} className="sims-service-item animate-pulse">
            <div className="sims-service-icon-box bg-slate-100 w-14 h-14 rounded-xl" />
            <div className="h-3 w-12 bg-slate-100 rounded mt-1" />
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="sims-services-grid bg-white p-6 rounded-2xl text-center flex flex-col items-center justify-center py-8">
        <span className="text-rose-500 font-medium text-sm mb-2">{error}</span>
        <button
          className="text-xs text-primary font-bold hover:underline"
          onClick={() => window.location.reload()}
        >
          Coba Lagi
        </button>
      </div>
    );
  }

  return (
    <div className="sims-services-grid bg-white p-6 rounded-2xl animate-fade-in">
      {services.map((service) => (
        <div
          key={service.service_code}
          className="sims-service-item"
          onClick={() => navigate(`/payment/${service.service_code}`)}
        >
          <div className={`sims-service-icon-box ${getIconClass(service.service_code)}`}>
            <img
              src={getLocalIconPath(service.service_code)}
              alt={service.service_name}
              className="sims-service-icon"
              onError={(e) => {
                (e.target as HTMLImageElement).src = service.service_icon;
              }}
            />
          </div>
          <span className="sims-service-label">{service.service_name}</span>
        </div>
      ))}
    </div>
  );
}
