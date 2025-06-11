
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
  dateJoined: string;
  loyaltyLevel: LoyaltyLevel;
  totalPurchases: number;
  totalPoints: number;
  currentMonthPurchases: number;
  isActive: boolean;
}

export interface LoyaltyLevel {
  id: string;
  name: string;
  minPoints: number;
  discountPercentage: number;
  color: string;
  benefits: string[];
}

export interface Transaction {
  id: string;
  userId: string;
  amount: number;
  pointsEarned: number;
  description: string;
  date: string;
  type: 'purchase' | 'manual_award' | 'bonus';
  awardedBy?: string; // admin who awarded manual points
}

export interface PointsActivity {
  id: string;
  userId: string;
  points: number;
  type: 'earned' | 'redeemed' | 'expired';
  description: string;
  date: string;
  transactionId?: string;
}

export interface AdminUser {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'manager';
  permissions: Permission[];
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface LoyaltyProgram {
  id: string;
  name: string;
  pointsPerDollar: number;
  levels: LoyaltyLevel[];
  settings: ProgramSettings;
}

export interface ProgramSettings {
  pointsExpiration: number; // days
  minimumRedemption: number; // minimum points to redeem
  welcomeBonus: number; // points given on registration
  birthdayBonus: number; // points given on birthday
}

export interface DashboardStats {
  totalUsers: number;
  activeUsers: number;
  totalPointsAwarded: number;
  totalPurchases: number;
  averageOrderValue: number;
  monthlyGrowth: number;
}
