
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { Star, TrendingUp, Gift, Calendar } from 'lucide-react';

const UserDashboard: React.FC = () => {
  const { user } = useAuth();

  if (!user) return null;

  const nextLevel = {
    name: 'Platinum',
    minPoints: 2000,
    color: '#e5e7eb'
  };

  const progressToNextLevel = ((user.totalPoints - user.loyaltyLevel.minPoints) / (nextLevel.minPoints - user.loyaltyLevel.minPoints)) * 100;
  const pointsNeeded = nextLevel.minPoints - user.totalPoints;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Welcome Section */}
      <div className="loyalty-card">
        <div className="relative z-10">
          <h1 className="text-2xl font-bold mb-2">
            Welcome back, {user.firstName}!
          </h1>
          <p className="text-white/80 mb-4">
            You're doing great! Keep earning points and unlock amazing rewards.
          </p>
          <div className="flex items-center gap-4">
            <Badge 
              variant="secondary" 
              className="glass-effect text-white border-white/30"
              style={{ backgroundColor: user.loyaltyLevel.color + '40' }}
            >
              <Star className="w-4 h-4 mr-1" />
              {user.loyaltyLevel.name} Member
            </Badge>
            <span className="text-white/80 text-sm">
              Member since {new Date(user.dateJoined).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Current Points
            </CardTitle>
            <Gift className="h-4 w-4 text-loyalty-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-loyalty-primary">
              {user.totalPoints.toLocaleString()}
            </div>
            <p className="text-xs text-muted-foreground">
              +125 this month
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              This Month Spent
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-loyalty-success" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-loyalty-success">
              ${user.currentMonthPurchases.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              +12% from last month
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Spent
            </CardTitle>
            <Calendar className="h-4 w-4 text-loyalty-accent" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-loyalty-accent">
              ${user.totalPurchases.toFixed(2)}
            </div>
            <p className="text-xs text-muted-foreground">
              Lifetime purchases
            </p>
          </CardContent>
        </Card>

        <Card className="metric-card">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Discount Rate
            </CardTitle>
            <Star className="h-4 w-4 text-loyalty-gold" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-loyalty-gold">
              {user.loyaltyLevel.discountPercentage}%
            </div>
            <p className="text-xs text-muted-foreground">
              Current level discount
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Progress to Next Level */}
      <Card className="animate-scale-in">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Star className="h-5 w-5 text-loyalty-primary" />
            Progress to {nextLevel.name}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span>Current: {user.totalPoints} points</span>
              <span>Next level: {nextLevel.minPoints} points</span>
            </div>
            <Progress 
              value={Math.max(0, Math.min(100, progressToNextLevel))} 
              className="h-3"
            />
          </div>
          <p className="text-sm text-muted-foreground">
            You need {pointsNeeded > 0 ? pointsNeeded : 0} more points to reach {nextLevel.name} level!
          </p>
        </CardContent>
      </Card>

      {/* Current Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Your {user.loyaltyLevel.name} Benefits</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {user.loyaltyLevel.benefits.map((benefit, index) => (
              <div key={index} className="flex items-center gap-2 p-3 bg-gradient-card rounded-lg">
                <div className="w-2 h-2 rounded-full bg-loyalty-primary"></div>
                <span className="text-sm">{benefit}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserDashboard;
