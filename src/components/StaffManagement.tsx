import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { mockStaff } from '../lib/mockData';
import { Plus, Star, Phone, Mail, Calendar } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function StaffManagement() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Staff Management</h1>
          <p className="text-gray-600">Manage your team members</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add Staff Member
        </Button>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {mockStaff.map((staff) => (
          <Card key={staff.id} className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 rounded-full bg-purple-100 flex items-center justify-center text-xl">
                    {staff.name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div className="flex-1">
                    <h3>{staff.name}</h3>
                    <p className="text-sm text-gray-600">{staff.role}</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      <span className="text-sm">{staff.rating}</span>
                    </div>
                  </div>
                </div>

                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2 text-gray-600">
                    <Phone className="w-4 h-4" />
                    {staff.phone}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Mail className="w-4 h-4" />
                    {staff.email}
                  </div>
                  <div className="flex items-center gap-2 text-gray-600">
                    <Calendar className="w-4 h-4" />
                    {staff.workingHours}
                  </div>
                </div>

                <div className="pt-3 border-t">
                  <p className="text-xs text-gray-600 mb-2">Services</p>
                  <div className="flex flex-wrap gap-1">
                    {staff.services.slice(0, 3).map((service, idx) => (
                      <span key={idx} className="px-2 py-1 bg-purple-50 text-purple-700 rounded text-xs">
                        {service}
                      </span>
                    ))}
                    {staff.services.length > 3 && (
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded text-xs">
                        +{staff.services.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 pt-3 border-t">
                  <div>
                    <p className="text-xs text-gray-600">Total Bookings</p>
                    <p className="text-lg">{staff.totalBookings}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-600">Commission</p>
                    <p className="text-lg">{staff.commissionRate}%</p>
                  </div>
                </div>

                <Link to={`/staff/${staff.id}`}>
                  <Button variant="outline" className="w-full">
                    View Details
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
