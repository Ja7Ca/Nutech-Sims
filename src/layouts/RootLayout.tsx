import type { ReactNode } from 'react';
import Navbar from './Navbar';
import ProfileHeader from '../features/dashboard/components/ProfileHeader';
import BalanceCard from '../features/dashboard/components/BalanceCard';

interface RootLayoutProps {
  children: ReactNode;
  showProfileSection?: boolean;
}

export default function RootLayout({ children, showProfileSection = true }: RootLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen bg-slate-50/50">
      <Navbar />

      <main className="max-w-6xl w-full mx-auto px-6 py-8 flex-grow animate-fade-in">
        {showProfileSection && (
          <div className="sims-profile-section flex flex-col md:flex-row items-start md:items-center justify-between gap-6 mb-10">
            <ProfileHeader />
            <BalanceCard />
          </div>
        )}

        {children}
      </main>

      <footer className="py-6 border-t border-slate-100 text-center text-xs text-slate-400">
        <p>SIMS PPOB - Jarot Setiawan</p>
      </footer>
    </div>
  );
}
