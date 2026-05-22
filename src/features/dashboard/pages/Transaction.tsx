import RootLayout from '../../../layouts/RootLayout';
import { useTransaction } from '../hooks/useTransaction';
import Button from '../../../components/ui/Button';

export default function Transaction() {
  const { history, loading, hasMore, loadMore, formatCurrency, formatDate } = useTransaction();

  const SkeletonLoader = () => (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div
          key={i}
          className="sims-transaction-item animate-pulse border border-slate-100 flex justify-between items-center"
        >
          <div className="space-y-2">
            <div className="h-5 bg-slate-200/60 rounded-md w-32" />
            <div className="h-3 bg-slate-100 rounded-sm w-24" />
          </div>
          <div className="text-right space-y-2">
            <div className="h-4 bg-slate-200/60 rounded-sm w-28 align-right" />
            <div className="h-4 bg-slate-100 rounded-sm w-12 ml-auto" />
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <RootLayout>
      <div className="bg-white p-8 rounded-2xl border border-slate-100 shadow-xs max-w-4xl mx-auto space-y-6">
        <div className="flex justify-between items-center pb-2">
          <h2 className="text-xl font-bold text-slate-800">Semua Transaksi</h2>
        </div>

        <div className="space-y-4">
          {history.length > 0 ? (
            <>
              {history.map((tx) => (
                <div
                  key={tx.invoice_number}
                  className="sims-transaction-item hover:border-slate-300 transition-all duration-200 py-4 px-6 border border-slate-200/80 rounded-xl flex justify-between items-center bg-white"
                >
                  <div className="sims-trans-details text-left space-y-1">
                    <span
                      className={`text-xl font-bold block ${
                        tx.transaction_type === 'TOPUP' ? 'text-emerald-500' : 'text-primary'
                      }`}
                    >
                      {tx.transaction_type === 'TOPUP' ? '+ ' : '- '}Rp.
                      {formatCurrency(tx.total_amount)}
                    </span>
                    <span className="text-[11px] text-slate-400 font-medium block">
                      {formatDate(tx.created_on)}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="text-[13px] font-medium text-slate-700">
                      {tx.description}
                    </span>
                  </div>
                </div>
              ))}

              {hasMore && (
                <div className="pt-4 flex justify-center">
                  <Button
                    onClick={loadMore}
                    isLoading={loading}
                    loadingText="Memproses..."
                    variant="ghost"
                    size="sm"
                    className="hover:text-primary-hover font-bold text-sm"
                  >
                    Show more
                  </Button>
                </div>
              )}
            </>
          ) : loading ? (
            <SkeletonLoader />
          ) : (
            <div className="py-12 text-center text-slate-400">
              Belum ada riwayat transaksi.
            </div>
          )}
        </div>
      </div>
    </RootLayout>
  );
}
