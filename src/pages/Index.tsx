
import React, { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import AuthForm from '@/components/AuthForm';
import Navigation from '@/components/Navigation';
import UserDashboard from '@/components/UserDashboard';
import AdminDashboard from '@/components/AdminDashboard';

const Index = () => {
  const { user, isAuthenticated, isLoading } = useAuth();
  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="text-center">
          <div className="w-16 h-16 bg-gradient-loyalty rounded-full animate-pulse mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your loyalty dashboard...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <AuthForm />;
  }

  // Show different dashboards based on user role
  const showUserDashboard = user?.role === 'customer';
  const showAdminDashboard = user?.role === 'business_admin';

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100">
      <Navigation 
        activeTab={activeTab} 
        setActiveTab={setActiveTab}
        userRole={user?.role}
      />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {showUserDashboard && <UserDashboard />}
        {showAdminDashboard && <AdminDashboard />}
        {!showUserDashboard && !showAdminDashboard && activeTab === 'user' && <UserDashboard />}
        {!showUserDashboard && !showAdminDashboard && activeTab === 'admin' && <AdminDashboard />}
      </main>
    </div>
  );
};

export default Index;
