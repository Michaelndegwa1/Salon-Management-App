import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { mockStaff, mockAppointments } from '../lib/mockData';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Calendar,
  Star,
  Edit,
  Trash2,
  DollarSign,
  Clock,
  TrendingUp
} from 'lucide-react';

export default function StaffDetail() {
  const { id } = useParams();
  const staff = mockStaff.find(s => s.id === id);
  const staffAppointments = mockAppointments.filter(apt => apt.staffId === id);
  const totalRevenue = staffAppointments.reduce((sum, apt) => sum + apt.price, 0);
  const commission = totalRevenue * (staff?.commissionRate || 0) / 100;

  if (!staff) {
    return (
      <div className="text-center py-12">
        <p>Staff member not found</p>
        <Link to="/staff">
          <Button className="mt-4">Back to Staff</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/staff">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1>{staff.name}</h1>
            <p className="text-gray-600">{staff.role}</p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Edit className="w-4 h-4 mr-2" />
            Edit
          </Button>
          <Button variant="outline" size="sm">
            <Trash2 className="w-4 h-4 mr-2" />
            Delete
          </Button>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        {/* Staff Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                  {staff.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2>{staff.name}</h2>
                  <p className="text-sm text-gray-600">{staff.role}</p>
                  <div className="flex items-center justify-center gap-1 mt-2">
                    <Star className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                    <span className="text-lg">{staff.rating}</span>
                  </div>
                </div>
                <div className="w-full space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="text-sm">{staff.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm break-all">{staff.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Clock className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Working Hours</p>
                      <p className="text-sm">{staff.workingHours}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Performance */}
          <Card>
            <CardHeader>
              <CardTitle>Performance</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Total Bookings</p>
                    <p className="text-xl">{staff.totalBookings}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Commission Rate</p>
                    <p className="text-xl">{staff.commissionRate}%</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-purple-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <TrendingUp className="w-5 h-5 text-purple-600" />
                  <div>
                    <p className="text-xs text-gray-600">This Week Revenue</p>
                    <p className="text-xl">${totalRevenue}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-xs text-gray-600">Commission Earned</p>
                    <p className="text-xl">${commission.toFixed(2)}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Schedule and Services */}
        <div className="lg:col-span-2 space-y-6">
          {/* Services */}
          <Card>
            <CardHeader>
              <CardTitle>Services Provided</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {staff.services.map((service, idx) => (
                  <span key={idx} className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg">
                    {service}
                  </span>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Days Off */}
          <Card>
            <CardHeader>
              <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div>
                  <p className="text-sm text-gray-600">Working Hours</p>
                  <p className="text-lg">{staff.workingHours}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Days Off</p>
                  <div className="flex flex-wrap gap-2 mt-2">
                    {staff.daysOff.map((day, idx) => (
                      <span key={idx} className="px-3 py-1 bg-red-100 text-red-700 rounded">
                        {day}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Today's Schedule */}
          <Card>
            <CardHeader>
              <CardTitle>Today's Appointments</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {staffAppointments.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No appointments today</p>
                ) : (
                  staffAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-400" />
                        <span>{apt.time}</span>
                      </div>
                      <div className="flex-1">
                        <p>{apt.clientName}</p>
                        <p className="text-sm text-gray-600">{apt.serviceName}</p>
                      </div>
                      <div className={`px-3 py-1 rounded-full text-sm ${
                        apt.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                        apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                        apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                        'bg-red-100 text-red-700'
                      }`}>
                        {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                      </div>
                      <p>${apt.price}</p>
                    </div>
                  ))
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
