
import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from '@/types/loyalty';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (userData: RegisterData) => Promise<void>;
  logout: () => void;
  updateProfile: (userData: Partial<User>) => Promise<void>;
}

interface RegisterData {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const storedUser = localStorage.getItem('loyaltyUser');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock user data
      const userData: User = {
        id: '1',
        email,
        firstName: 'John',
        lastName: 'Doe',
        phone: '+1234567890',
        dateJoined: '2024-01-01',
        loyaltyLevel: {
          id: 'gold',
          name: 'Gold',
          minPoints: 1000,
          discountPercentage: 10,
          color: '#f59e0b',
          benefits: ['10% discount', 'Free shipping', 'Priority support']
        },
        totalPurchases: 2500.00,
        totalPoints: 1250,
        currentMonthPurchases: 450.00,
        isActive: true
      };
      
      setUser(userData);
      localStorage.setItem('loyaltyUser', JSON.stringify(userData));
    } catch (error) {
      throw new Error('Login failed');
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (userData: RegisterData) => {
    setIsLoading(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const newUser: User = {
        id: Date.now().toString(),
        email: userData.email,
        firstName: userData.firstName,
        lastName: userData.lastName,
        phone: userData.phone,
        dateJoined: new Date().toISOString(),
        loyaltyLevel: {
          id: 'bronze',
          name: 'Bronze',
          minPoints: 0,
          discountPercentage: 0,
          color: '#cd7f32',
          benefits: ['Welcome bonus points']
        },
        totalPurchases: 0,
        totalPoints: 100, // Welcome bonus
        currentMonthPurchases: 0,
        isActive: true
      };
      
      setUser(newUser);
      localStorage.setItem('loyaltyUser', JSON.stringify(newUser));
    } catch (error) {
      throw new Error('Registration failed');
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('loyaltyUser');
  };

  const updateProfile = async (userData: Partial<User>) => {
    if (!user) return;
    
    const updatedUser = { ...user, ...userData };
    setUser(updatedUser);
    localStorage.setItem('loyaltyUser', JSON.stringify(updatedUser));
  };

  const value = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    register,
    logout,
    updateProfile
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
