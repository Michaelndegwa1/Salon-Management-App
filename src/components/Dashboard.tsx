import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Calendar, Users, DollarSign, TrendingUp, Clock, Star, Plus, UserCheck, FileText } from 'lucide-react';
import { mockAppointments, mockClients, mockStaff, mockRevenueData } from '../lib/mockData';
import { Link } from 'react-router-dom';
import { BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { formatKSH } from './ui/utils';
import NewBookingModal from './NewBookingModal';

interface DashboardProps {
  isMobile: boolean;
}

export default function Dashboard({ isMobile }: DashboardProps) {
  const [showNewBooking, setShowNewBooking] = useState(false);

  // Memoize expensive calculations
  const stats = useMemo(() => {
    const today = new Date().toISOString().split('T')[0];
    const todayAppointments = mockAppointments.filter(apt => apt.date === today);
    const todayRevenue = todayAppointments
      .filter(apt => apt.paymentStatus === 'paid')
      .reduce((sum, apt) => sum + apt.price, 0);
    
    const staffOnDuty = mockStaff.length;
    const newClientsThisWeek = 3;

    // Top services
    const serviceBookings = mockAppointments.reduce((acc, apt) => {
      acc[apt.serviceName] = (acc[apt.serviceName] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    const topServices = Object.entries(serviceBookings)
      .sort(([, a], [, b]) => b - a)
      .slice(0, 5)
      .map(([name, count]) => ({ name, bookings: count }));

    return {
      todayRevenue,
      todayAppointments,
      staffOnDuty,
      newClientsThisWeek,
      topServices
    };
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className={isMobile ? 'text-2xl' : ''}>Dashboard</h1>
          <p className="text-gray-600">Welcome back! Here's what's happening today.</p>
        </div>
        <div className={`flex flex-wrap gap-2 ${isMobile ? 'w-full' : ''}`}>
          <Button onClick={() => setShowNewBooking(true)} className={isMobile ? 'flex-1' : ''}>
            <Plus className="w-4 h-4 mr-2" />
            {isMobile ? 'Book' : 'Add Booking'}
          </Button>
          {!isMobile && (
            <>
              <Button variant="outline">
                <Users className="w-4 h-4 mr-2" />
                Add Walk-in
              </Button>
              <Link to="/reports">
                <Button variant="outline">
                  <FileText className="w-4 h-4 mr-2" />
                  Reports
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className={`bg-green-100 p-2 rounded-full ${isMobile ? 'mb-2' : ''}`}>
                  <DollarSign className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-green-600`} />
                </div>
              </div>
              <div>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Today's Revenue</p>
                <p className={isMobile ? 'text-xl' : 'text-2xl mt-1'}>{formatKSH(stats.todayRevenue)}</p>
                {!isMobile && (
                  <p className="text-xs text-green-600 flex items-center gap-1 mt-1">
                    <TrendingUp className="w-3 h-3" />
                    +12.5%
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className={`bg-blue-100 p-2 rounded-full ${isMobile ? 'mb-2' : ''}`}>
                  <Calendar className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-blue-600`} />
                </div>
              </div>
              <div>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Appointments</p>
                <p className={isMobile ? 'text-xl' : 'text-2xl mt-1'}>{stats.todayAppointments.length}</p>
                {!isMobile && (
                  <p className="text-xs text-blue-600 mt-1">
                    {stats.todayAppointments.filter(a => a.status === 'confirmed').length} confirmed
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className={`bg-purple-100 p-2 rounded-full ${isMobile ? 'mb-2' : ''}`}>
                  <Users className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-purple-600`} />
                </div>
              </div>
              <div>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>New Clients</p>
                <p className={isMobile ? 'text-xl' : 'text-2xl mt-1'}>{stats.newClientsThisWeek}</p>
                {!isMobile && (
                  <p className="text-xs text-purple-600 mt-1">
                    This week
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="pt-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <div className={`bg-orange-100 p-2 rounded-full ${isMobile ? 'mb-2' : ''}`}>
                  <UserCheck className={`${isMobile ? 'w-4 h-4' : 'w-6 h-6'} text-orange-600`} />
                </div>
              </div>
              <div>
                <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>Staff On Duty</p>
                <p className={isMobile ? 'text-xl' : 'text-2xl mt-1'}>{stats.staffOnDuty}</p>
                {!isMobile && (
                  <p className="text-xs text-orange-600 mt-1">
                    All available
                  </p>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Schedule */}
      <div className="grid lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card>
          <CardHeader>
            <CardTitle className={isMobile ? 'text-lg' : ''}>Weekly Revenue</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
              <LineChart data={mockRevenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="day" tick={{ fontSize: isMobile ? 10 : 12 }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <Tooltip />
                <Line type="monotone" dataKey="revenue" stroke="#8b5cf6" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Top Services */}
        <Card>
          <CardHeader>
            <CardTitle className={isMobile ? 'text-lg' : ''}>Top Services</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={isMobile ? 200 : 300}>
              <BarChart data={stats.topServices}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" angle={-45} textAnchor="end" height={isMobile ? 80 : 100} tick={{ fontSize: isMobile ? 8 : 10 }} />
                <YAxis tick={{ fontSize: isMobile ? 10 : 12 }} />
                <Tooltip />
                <Bar dataKey="bookings" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Today's Schedule */}
      <Card>
        <CardHeader>
          <CardTitle className={isMobile ? 'text-lg' : ''}>Today's Schedule</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {stats.todayAppointments.length === 0 ? (
              <p className="text-center text-gray-500 py-8">No appointments scheduled for today</p>
            ) : (
              stats.todayAppointments.slice(0, isMobile ? 5 : 10).map((apt) => (
                <div key={apt.id} className={`flex items-center gap-4 p-3 md:p-4 border rounded-lg hover:bg-gray-50 ${isMobile ? 'flex-wrap' : ''}`}>
                  <div className="flex items-center gap-2">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <span className={`${isMobile ? 'text-sm' : ''}`}>{apt.time}</span>
                  </div>
                  <div className="flex-1">
                    <p className={isMobile ? 'text-sm' : ''}>{apt.clientName}</p>
                    <p className={`text-gray-600 ${isMobile ? 'text-xs' : 'text-sm'}`}>{apt.serviceName} with {apt.staffName}</p>
                  </div>
                  <div className={`px-3 py-1 rounded-full text-xs md:text-sm ${
                    apt.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                    apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                    apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                    'bg-red-100 text-red-700'
                  }`}>
                    {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                  </div>
                  <p className={isMobile ? 'text-sm' : ''}>{formatKSH(apt.price)}</p>
                </div>
              ))
            )}
          </div>
        </CardContent>
      </Card>

      {/* Staff Performance */}
      {!isMobile && (
        <Card>
          <CardHeader>
            <CardTitle>Staff Performance (This Week)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {mockStaff.slice(0, 5).map((staff) => {
                const staffBookings = mockAppointments.filter(apt => apt.staffId === staff.id);
                const revenue = staffBookings.reduce((sum, apt) => sum + apt.price, 0);
                return (
                  <div key={staff.id} className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                      <span className="text-sm">{staff.name.split(' ').map(n => n[0]).join('')}</span>
                    </div>
                    <div className="flex-1">
                      <p>{staff.name}</p>
                      <p className="text-sm text-gray-600">{staff.role}</p>
                    </div>
                    <div className="text-right">
                      <p>{staffBookings.length} bookings</p>
                      <p className="text-sm text-gray-600">{formatKSH(revenue)}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>
      )}

      {showNewBooking && (
        <NewBookingModal onClose={() => setShowNewBooking(false)} />
      )}
    </div>
  );
}