
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { useToast } from '@/hooks/use-toast';
import { User, Users, TrendingUp, Gift, Plus, Search } from 'lucide-react';
import { DashboardStats } from '@/types/loyalty';

const AdminDashboard: React.FC = () => {
  const { toast } = useToast();
  const [isAwardingPoints, setIsAwardingPoints] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Mock data
  const stats: DashboardStats = {
    totalUsers: 1247,
    activeUsers: 892,
    totalPointsAwarded: 125000,
    totalPurchases: 45000,
    averageOrderValue: 85.50,
    monthlyGrowth: 12.5
  };

  const recentUsers = [
    { id: '1', name: 'John Doe', email: 'john@example.com', points: 1250, level: 'Gold', lastActivity: '2024-06-10' },
    { id: '2', name: 'Jane Smith', email: 'jane@example.com', points: 850, level: 'Silver', lastActivity: '2024-06-09' },
    { id: '3', name: 'Mike Johnson', email: 'mike@example.com', points: 2100, level: 'Platinum', lastActivity: '2024-06-11' },
  ];

  const handleAwardPoints = async (userId: string, points: number, reason: string) => {
    setIsAwardingPoints(true);
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      toast({
        title: "Points Awarded Successfully",
        description: `${points} points have been awarded to the user.`,
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to award points. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsAwardingPoints(false);
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-loyalty bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground">
            Manage your loyalty program and award points to users
          </p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-gradient-loyalty hover:opacity-90">
              <Plus className="w-4 h-4 mr-2" />
              Award Points
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Award Points to User</DialogTitle>
            </DialogHeader>
            <AwardPointsForm onSubmit={handleAwardPoints} isLoading={isAwardingPoints} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Users
            </CardTitle>
            <Users className="h-4 w-4 text-loyalty-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-loyalty-primary">
              {stats.totalUsers.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              {stats.activeUsers} active this month
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Points Awarded
            </CardTitle>
            <Gift className="h-4 w-4 text-loyalty-secondary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-loyalty-secondary">
              {stats.totalPointsAwarded.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              This month
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Revenue
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-loyalty-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-loyalty-success">
              ${stats.totalPurchases.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +{stats.monthlyGrowth}% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Avg. Order Value
            </CardTitle>
            <User className="h-4 w-4 text-loyalty-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-loyalty-accent">
              ${stats.averageOrderValue.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Per transaction
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Users */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Recent Users
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search users..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 w-64"
              />
            </div>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentUsers.map((user) => (
              <div key={user.id} className="flex items-center justify-between p-4 bg-gradient-card rounded-lg hover:shadow-md transition-shadow">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gradient-loyalty rounded-full flex items-center justify-center text-white font-semibold">
                    {user.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <h3 className="font-semibold">{user.name}</h3>
                    <p className="text-sm text-muted-foreground">{user.email}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <div className="text-right">
                    <p className="font-semibold">{user.points.toLocaleString()} pts</p>
                    <Badge variant="secondary" className="text-xs">
                      {user.level}
                    </Badge>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="sm">
                        Award Points
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Award Points to {user.name}</DialogTitle>
                      </DialogHeader>
                      <AwardPointsForm 
                        onSubmit={(userId, points, reason) => handleAwardPoints(user.id, points, reason)}
                        isLoading={isAwardingPoints}
                        prefilledUserId={user.id}
                      />
                    </DialogContent>
                  </Dialog>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

interface AwardPointsFormProps {
  onSubmit: (userId: string, points: number, reason: string) => void;
  isLoading: boolean;
  prefilledUserId?: string;
}

const AwardPointsForm: React.FC<AwardPointsFormProps> = ({ onSubmit, isLoading, prefilledUserId }) => {
  const [userId, setUserId] = useState(prefilledUserId || '');
  const [points, setPoints] = useState('');
  const [reason, setReason] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userId && points && reason) {
      onSubmit(userId, parseInt(points), reason);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <Label htmlFor="userId">User ID or Email</Label>
        <Input
          id="userId"
          value={userId}
          onChange={(e) => setUserId(e.target.value)}
          placeholder="Enter user ID or email"
          disabled={!!prefilledUserId}
        />
      </div>
      <div>
        <Label htmlFor="points">Points to Award</Label>
        <Input
          id="points"
          type="number"
          value={points}
          onChange={(e) => setPoints(e.target.value)}
          placeholder="Enter points amount"
        />
      </div>
      <div>
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          value={reason}
          onChange={(e) => setReason(e.target.value)}
          placeholder="Enter reason for awarding points"
        />
      </div>
      <Button 
        type="submit" 
        className="w-full bg-gradient-loyalty hover:opacity-90"
        disabled={isLoading || !userId || !points || !reason}
      >
        {isLoading ? 'Awarding...' : 'Award Points'}
      </Button>
    </form>
  );
};

export default AdminDashboard;
