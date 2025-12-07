import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { 
  Calendar, 
  DollarSign, 
  AlertTriangle, 
  UserPlus, 
  X,
  CheckCheck
} from 'lucide-react';

export default function Notifications() {
  const notifications = [
    {
      id: '1',
      type: 'booking',
      title: 'New Booking',
      message: 'Sarah Johnson booked Balayage for Nov 15 at 2:00 PM',
      time: '5 minutes ago',
      read: false,
      icon: Calendar,
      color: 'blue'
    },
    {
      id: '2',
      type: 'payment',
      title: 'Payment Received',
      message: '$180 payment received from Emily Parker',
      time: '1 hour ago',
      read: false,
      icon: DollarSign,
      color: 'green'
    },
    {
      id: '3',
      type: 'cancellation',
      title: 'Appointment Cancelled',
      message: 'David Martinez cancelled haircut appointment for today',
      time: '2 hours ago',
      read: false,
      icon: X,
      color: 'red'
    },
    {
      id: '4',
      type: 'inventory',
      title: 'Low Stock Alert',
      message: 'Hair Color - Blonde is running low (5 units remaining)',
      time: '3 hours ago',
      read: true,
      icon: AlertTriangle,
      color: 'yellow'
    },
    {
      id: '5',
      type: 'client',
      title: 'New Client Registered',
      message: 'Jessica Smith created a new account',
      time: '5 hours ago',
      read: true,
      icon: UserPlus,
      color: 'purple'
    },
    {
      id: '6',
      type: 'booking',
      title: 'Booking Confirmed',
      message: 'Appointment with Michael Chen confirmed for tomorrow',
      time: '1 day ago',
      read: true,
      icon: CheckCheck,
      color: 'blue'
    }
  ];

  const getIconBgColor = (color: string) => {
    const colors = {
      blue: 'bg-blue-100',
      green: 'bg-green-100',
      red: 'bg-red-100',
      yellow: 'bg-yellow-100',
      purple: 'bg-purple-100'
    };
    return colors[color as keyof typeof colors];
  };

  const getIconColor = (color: string) => {
    const colors = {
      blue: 'text-blue-600',
      green: 'text-green-600',
      red: 'text-red-600',
      yellow: 'text-yellow-600',
      purple: 'text-purple-600'
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Notifications</h1>
          <p className="text-gray-600">Stay updated with your salon activities</p>
        </div>
        <Button variant="outline">
          Mark All as Read
        </Button>
      </div>

      {/* Notifications List */}
      <div className="space-y-3">
        {notifications.map((notification) => {
          const Icon = notification.icon;
          return (
            <Card key={notification.id} className={notification.read ? 'opacity-60' : ''}>
              <CardContent className="pt-6">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getIconBgColor(notification.color)}`}>
                    <Icon className={`w-5 h-5 ${getIconColor(notification.color)}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-4 mb-1">
                      <div className="flex-1">
                        <p className="flex items-center gap-2">
                          {notification.title}
                          {!notification.read && (
                            <Badge className="bg-purple-600">New</Badge>
                          )}
                        </p>
                      </div>
                      <Button variant="ghost" size="sm">
                        <X className="w-4 h-4" />
                      </Button>
                    </div>
                    <p className="text-sm text-gray-600">{notification.message}</p>
                    <p className="text-xs text-gray-400 mt-2">{notification.time}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Empty State (for when no notifications) */}
      {notifications.length === 0 && (
        <Card>
          <CardContent className="pt-6">
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gray-100 mb-4">
                <CheckCheck className="w-8 h-8 text-gray-400" />
              </div>
              <p className="text-gray-600">No new notifications</p>
              <p className="text-sm text-gray-400 mt-1">You're all caught up!</p>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
