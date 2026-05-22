export interface Transaction {
  id: string;
  amount: number;
  type: 'TOPUP' | 'PAYMENT';
  desc: string;
  date: string;
}

export interface UserProfile {
  firstName: string;
  lastName: string;
  email: string;
  profileImage?: string | null;
}
