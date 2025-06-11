
import React from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useAuth } from '@/contexts/AuthContext';
import { Star, User, Settings, LogOut, Shield } from 'lucide-react';

interface NavigationProps {
  activeTab: 'user' | 'admin';
  setActiveTab: (tab: 'user' | 'admin') => void;
}

const Navigation: React.FC<NavigationProps> = ({ activeTab, setActiveTab }) => {
  const { user, logout } = useAuth();

  if (!user) return null;

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo and Brand */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-loyalty rounded-lg flex items-center justify-center">
              <Star className="w-5 h-5 text-white" />
            </div>
            <h1 className="text-xl font-bold bg-gradient-loyalty bg-clip-text text-transparent">
              LoyaltyHub
            </h1>
          </div>

          {/* Tab Navigation */}
          <div className="flex items-center space-x-4">
            <div className="flex bg-gray-100 rounded-lg p-1">
              <Button
                variant={activeTab === 'user' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('user')}
                className={activeTab === 'user' ? 'bg-white shadow-sm' : ''}
              >
                <User className="w-4 h-4 mr-2" />
                Dashboard
              </Button>
              <Button
                variant={activeTab === 'admin' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => setActiveTab('admin')}
                className={activeTab === 'admin' ? 'bg-white shadow-sm' : ''}
              >
                <Shield className="w-4 h-4 mr-2" />
                Admin
              </Button>
            </div>
          </div>

          {/* User Menu */}
          <div className="flex items-center gap-4">
            {/* Points Display */}
            <div className="hidden sm:flex items-center gap-2">
              <Badge 
                variant="secondary" 
                className="bg-gradient-loyalty text-white border-0"
              >
                {user.totalPoints.toLocaleString()} pts
              </Badge>
              <Badge 
                variant="outline"
                style={{ 
                  borderColor: user.loyaltyLevel.color,
                  color: user.loyaltyLevel.color 
                }}
              >
                {user.loyaltyLevel.name}
              </Badge>
            </div>

            {/* User Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                  <div className="h-10 w-10 bg-gradient-loyalty rounded-full flex items-center justify-center text-white font-semibold">
                    {user.firstName.charAt(0)}{user.lastName.charAt(0)}
                  </div>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-white" align="end" forceMount>
                <div className="flex flex-col space-y-1 p-2">
                  <p className="text-sm font-medium">{user.firstName} {user.lastName}</p>
                  <p className="text-xs text-muted-foreground">{user.email}</p>
                </div>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Settings className="mr-2 h-4 w-4" />
                  Settings
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={logout} className="text-red-600">
                  <LogOut className="mr-2 h-4 w-4" />
                  Log out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
