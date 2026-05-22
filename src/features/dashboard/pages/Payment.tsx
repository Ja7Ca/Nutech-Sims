import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useAppDispatch, useAppSelector } from '../../../app/store';
import RootLayout from '../../../layouts/RootLayout';
import { useServices } from '../hooks/useServices';
import { getLocalIconPath, getIconClass } from '../components/ServicesGrid';
import { createTransactionApi, getBalanceApi } from '../api/dashboardApi';
import { setBalance } from '../slices/simsSlice';
import StatusModal from '../../../components/ui/StatusModal';
import Button from '../../../components/ui/Button';
import { CreditCard } from 'lucide-react';

export default function Payment() {
  const { serviceCode } = useParams<{ serviceCode: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const { services, loading: servicesLoading, error: servicesError } = useServices();
  const balance = useAppSelector((state) => state.sims.balance);

  const [paying, setPaying] = useState(false);
  const [activeModal, setActiveModal] = useState<'none' | 'confirm' | 'success' | 'failure'>('none');

  const service = services.find(
    (s) => s.service_code.toUpperCase() === serviceCode?.toUpperCase()
  );

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handlePaymentInitiate = () => {
    if (!service) return;

    if (balance < service.service_tariff) {
      toast.error(
        `Saldo Anda tidak mencukupi untuk melakukan pembayaran ${service.service_name} sebesar Rp ${formatCurrency(service.service_tariff)}.`
      );
      return;
    }

    setActiveModal('confirm');
  };

  const executePayment = async () => {
    if (!service) return;

    setPaying(true);
    try {
      const response = await createTransactionApi({ service_code: service.service_code });

      if (response.status === 0) {
        const localNewBalance = balance - service.service_tariff;
        dispatch(setBalance(localNewBalance));

        try {
          const freshBalanceRes = await getBalanceApi();
          if (freshBalanceRes.status === 0 && freshBalanceRes.data) {
            dispatch(setBalance(freshBalanceRes.data.balance));
          }
        } catch { }

        setActiveModal('success');
      } else {
        setActiveModal('failure');
      }
    } catch {
      setActiveModal('failure');
    } finally {
      setPaying(false);
    }
  };

  if (servicesLoading) {
    return (
      <RootLayout>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs space-y-8 max-w-4xl mx-auto animate-pulse">
          <div className="h-6 bg-slate-100 rounded-sm w-1/4" />
          <div className="h-12 bg-slate-100 rounded-md w-full" />
          <div className="h-10 bg-slate-100 rounded-md w-full" />
        </div>
      </RootLayout>
    );
  }

  if (servicesError || !service) {
    return (
      <RootLayout>
        <div className="bg-white p-8 rounded-2xl border border-slate-100 text-center space-y-4 max-w-4xl mx-auto py-12">
          <div className="text-rose-500 font-medium">
            {servicesError || 'Layanan tidak ditemukan atau tidak tersedia.'}
          </div>
          <button
            className="sims-btn sims-btn-primary w-fit mx-auto"
            onClick={() => navigate('/')}
          >
            Kembali ke Dashboard
          </button>
        </div>
      </RootLayout>
    );
  }

  return (
    <RootLayout>
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs space-y-8 max-w-4xl mx-auto">
        <div className="text-left space-y-2">
          <span className="text-sm font-semibold tracking-wide text-slate-500 uppercase">
            Pembayaran
          </span>
          <div className="flex items-center gap-3">
            <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${getIconClass(service.service_code)}`}>
              <img
                src={getLocalIconPath(service.service_code)}
                alt={service.service_name}
                className="w-5 h-5 object-contain"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = service.service_icon;
                }}
              />
            </div>
            <h2 className="text-2xl font-bold text-slate-900">
              {service.service_name}
            </h2>
          </div>
        </div>

        <div className="space-y-4 text-left">
          <div className="sims-input-group">
            <span className="sims-input-label">Jumlah Pembayaran (Rp)</span>
            <div className="sims-input-wrapper">
              <span className="sims-input-icon">
                <CreditCard size={18} />
              </span>
              <input
                type="text"
                className="sims-input font-bold bg-slate-50 text-slate-600 border-slate-100"
                disabled
                value={`Rp ${formatCurrency(service.service_tariff)}`}
              />
            </div>
          </div>

          <Button
            variant="primary"
            fullWidth
            isLoading={paying}
            loadingText="Memproses Pembayaran..."
            onClick={handlePaymentInitiate}
          >
            Bayar
          </Button>
        </div>
      </div>

      {/* Modal Confirm */}
      <StatusModal
        isOpen={activeModal === 'confirm'}
        type="confirm"
        title={`Anda yakin untuk membayar ${service.service_name} sebesar`}
        highlightText={`Rp${formatCurrency(service.service_tariff)} ?`}
        primaryActionText={paying ? 'Memproses...' : 'Ya, lanjutkan Pembayaran'}
        onPrimaryAction={executePayment}
        secondaryActionText="Batalkan"
        onSecondaryAction={() => setActiveModal('none')}
        isLoading={paying}
      />

      {/* Modal Success */}
      <StatusModal
        isOpen={activeModal === 'success'}
        type="success"
        title={`Pembayaran ${service.service_name} sebesar`}
        highlightText={`Rp${formatCurrency(service.service_tariff)}`}
        suffixText="berhasil!"
        primaryActionText="Kembali ke Beranda"
        onPrimaryAction={() => {
          setActiveModal('none');
          navigate('/');
        }}
        secondaryActionText="Tutup"
        onSecondaryAction={() => setActiveModal('none')}
      />

      {/* Modal Error */}
      <StatusModal
        isOpen={activeModal === 'failure'}
        type="failure"
        title={`Pembayaran ${service.service_name} sebesar`}
        highlightText={`Rp${formatCurrency(service.service_tariff)}`}
        suffixText="gagal"
        primaryActionText="Kembali ke Beranda"
        onPrimaryAction={() => {
          setActiveModal('none');
          navigate('/');
        }}
        secondaryActionText="Tutup"
        onSecondaryAction={() => setActiveModal('none')}
      />
    </RootLayout>
  );
}
