import { useNavigate } from 'react-router-dom';
import RootLayout from '../../../layouts/RootLayout';
import { useTopUp } from '../hooks/useTopUp';
import StatusModal from '../../../components/ui/StatusModal';
import Button from '../../../components/ui/Button';
import { CreditCard } from 'lucide-react';

export default function TopUp() {
  const navigate = useNavigate();
  const {
    topUpAmount,
    activeModal,
    submitting,
    formatCurrency,
    handleTopUpConfirm,
    executeTopUp,
    handleSelectPreset,
    handleInputChange,
    resetForm,
  } = useTopUp();

  return (
    <RootLayout>
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs space-y-8 max-w-4xl mx-auto relative">
        <div className="text-left space-y-1">
          <span className="text-sm font-semibold tracking-wide text-slate-500 uppercase">Silakan masukkan</span>
          <h2 className="text-2xl font-bold text-slate-900">Nominal Top Up</h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-4">
            <div className="sims-input-group">
              <span className="sims-input-label">Jumlah Top Up (Rp)</span>
              <div className="sims-input-wrapper">
                <span className="sims-input-icon">
                  <CreditCard size={18} />
                </span>
                <input
                  type="text"
                  className="sims-input font-bold"
                  placeholder="Masukkan nominal Top Up (min. Rp 10.000)"
                  value={topUpAmount !== '' ? formatCurrency(topUpAmount) : ''}
                  onChange={(e) => handleInputChange(e.target.value)}
                />
              </div>
            </div>

            <Button
              variant="primary"
              fullWidth
              disabled={topUpAmount === '' || topUpAmount < 10000}
              onClick={handleTopUpConfirm}
            >
              Top Up
            </Button>
          </div>

          <div className="lg:col-span-1 space-y-2 text-left">
            <span className="text-xs font-semibold text-slate-400">Pilih Nominal Instan:</span>
            <div className="grid grid-cols-3 lg:grid-cols-2 gap-3">
              {[10000, 20000, 50000, 100000, 250000, 500000].map((nominal) => (
                <button
                  key={nominal}
                  className={`border rounded-xl py-3 px-1 text-center text-sm font-bold transition-all cursor-pointer ${topUpAmount === nominal
                    ? 'border-primary bg-primary-light text-primary'
                    : 'border-slate-200 bg-slate-50/50 hover:border-slate-350 text-slate-800'
                    }`}
                  onClick={() => handleSelectPreset(nominal)}
                >
                  Rp{formatCurrency(nominal)}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Modal Confirm */}
      <StatusModal
        isOpen={activeModal === 'confirm'}
        type="confirm"
        title="Anda yakin untuk Top Up sebesar"
        highlightText={`Rp${formatCurrency(Number(topUpAmount))} ?`}
        primaryActionText={submitting ? 'Memproses...' : 'Ya, lanjutkan Top Up'}
        onPrimaryAction={executeTopUp}
        secondaryActionText="Batalkan"
        onSecondaryAction={resetForm}
        isLoading={submitting}
      />

      {/* Modal Success */}
      <StatusModal
        isOpen={activeModal === 'success'}
        type="success"
        title="Top Up sebesar"
        highlightText={`Rp${formatCurrency(Number(topUpAmount))}`}
        suffixText="berhasil!"
        primaryActionText="Kembali ke Beranda"
        onPrimaryAction={() => {
          resetForm();
          navigate('/');
        }}
        secondaryActionText="Tutup"
        onSecondaryAction={resetForm}
      />

      {/* Modal Error */}
      <StatusModal
        isOpen={activeModal === 'failure'}
        type="failure"
        title="Top Up sebesar"
        highlightText={`Rp${formatCurrency(Number(topUpAmount))}`}
        suffixText="gagal"
        primaryActionText="Kembali ke Beranda"
        onPrimaryAction={() => {
          resetForm();
          navigate('/');
        }}
        secondaryActionText="Tutup"
        onSecondaryAction={resetForm}
      />
    </RootLayout>
  );
}


