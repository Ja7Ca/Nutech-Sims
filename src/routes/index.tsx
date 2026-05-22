import type React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import PublicRoute from './PublicRoute';
import Login from '../features/auth/pages/Login';
import Register from '../features/auth/pages/Register';
import Dashboard from '../features/dashboard/pages/Dashboard';
import TopUp from '../features/dashboard/pages/TopUp';
import Transaction from '../features/dashboard/pages/Transaction';
import Akun from '../features/dashboard/pages/Akun';
import Payment from '../features/dashboard/pages/Payment';

export type PageId = 'login' | 'dashboard' | 'topup' | 'transaction' | 'akun' | 'payment';

export interface RouteConfig {
  id: PageId;
  path: string;
  label: string;
  component: React.ComponentType;
  showInNavbar: boolean;
}

export const routes: RouteConfig[] = [
  {
    id: 'login',
    path: '/login',
    label: 'Masuk',
    component: Login,
    showInNavbar: false,
  },
  {
    id: 'dashboard',
    path: '/',
    label: 'Dashboard',
    component: Dashboard,
    showInNavbar: false,
  },
  {
    id: 'topup',
    path: '/topup',
    label: 'Top Up',
    component: TopUp,
    showInNavbar: true,
  },
  {
    id: 'transaction',
    path: '/transaction',
    label: 'Transaction',
    component: Transaction,
    showInNavbar: true,
  },
  {
    id: 'akun',
    path: '/profile',
    label: 'Akun',
    component: Akun,
    showInNavbar: true,
  },
  {
    id: 'payment',
    path: '/payment/:serviceCode',
    label: 'Pembayaran',
    component: Payment,
    showInNavbar: false,
  },
];

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
      <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />

      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/topup"
        element={
          <ProtectedRoute>
            <TopUp />
          </ProtectedRoute>
        }
      />
      <Route
        path="/transaction"
        element={
          <ProtectedRoute>
            <Transaction />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute>
            <Akun />
          </ProtectedRoute>
        }
      />
      <Route
        path="/payment/:serviceCode"
        element={
          <ProtectedRoute>
            <Payment />
          </ProtectedRoute>
        }
      />

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

