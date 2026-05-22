import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import type { Transaction, UserProfile } from '../../../types';

interface SimsState {
  showBalance: boolean;
  balance: number;
  profile: UserProfile;
  transactions: Transaction[];
}

const initialState: SimsState = {
  showBalance: false,
  balance: 0,
  profile: {
    firstName: '',
    lastName: '',
    email: '',
    profileImage: null,
  },
  transactions: [],
};

const simsSlice = createSlice({
  name: 'sims',
  initialState,
  reducers: {
    toggleShowBalance: (state) => {
      state.showBalance = !state.showBalance;
    },
    topUp: (state, action: PayloadAction<number>) => {
      const amount = action.payload;
      state.balance += amount;
      
      const now = new Date();
      const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + 
        ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
      state.transactions.unshift({
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        amount,
        type: 'TOPUP',
        desc: 'Top Up Saldo',
        date: dateStr,
      });
    },
    payment: (state, action: PayloadAction<{ serviceName: string; amount: number }>) => {
      const { serviceName, amount } = action.payload;
      if (state.balance < amount) return;
      
      state.balance -= amount;
      
      const now = new Date();
      const dateStr = now.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' }) + 
        ' ' + now.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
        
      state.transactions.unshift({
        id: `TX-${Math.floor(100000 + Math.random() * 900000)}`,
        amount,
        type: 'PAYMENT',
        desc: `Pembayaran ${serviceName}`,
        date: dateStr,
      });
    },
    updateProfile: (state, action: PayloadAction<UserProfile>) => {
      state.profile = action.payload;
    },
    setBalance: (state, action: PayloadAction<number>) => {
      state.balance = action.payload;
    },
    resetSims: () => initialState,
  },
});

export const { toggleShowBalance, topUp, payment, updateProfile, setBalance, resetSims } = simsSlice.actions;
export default simsSlice.reducer;
