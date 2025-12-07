import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { mockClients, mockAppointments } from '../lib/mockData';
import { 
  ArrowLeft, 
  Phone, 
  Mail, 
  Calendar, 
  DollarSign, 
  Star, 
  Edit, 
  Trash2,
  Gift,
  User,
  History
} from 'lucide-react';

export default function ClientDetail() {
  const { id } = useParams();
  const client = mockClients.find(c => c.id === id);
  const clientAppointments = mockAppointments.filter(apt => apt.clientId === id);

  if (!client) {
    return (
      <div className="text-center py-12">
        <p>Client not found</p>
        <Link to="/clients">
          <Button className="mt-4">Back to Clients</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Link to="/clients">
            <Button variant="outline" size="sm">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back
            </Button>
          </Link>
          <div>
            <h1>{client.name}</h1>
            <p className="text-gray-600">Client Profile</p>
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
        {/* Client Info */}
        <div className="lg:col-span-1 space-y-6">
          <Card>
            <CardContent className="pt-6">
              <div className="flex flex-col items-center text-center space-y-4">
                <div className="w-24 h-24 rounded-full bg-purple-100 flex items-center justify-center text-2xl">
                  {client.name.split(' ').map(n => n[0]).join('')}
                </div>
                <div>
                  <h2>{client.name}</h2>
                  <p className="text-sm text-gray-600">VIP Customer</p>
                </div>
                <div className="w-full space-y-3 text-left">
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Phone</p>
                      <p className="text-sm">{client.phone}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Mail className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Email</p>
                      <p className="text-sm break-all">{client.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg">
                    <Gift className="w-4 h-4 text-gray-400" />
                    <div className="flex-1">
                      <p className="text-xs text-gray-600">Birthday</p>
                      <p className="text-sm">{new Date(client.birthday).toLocaleDateString()}</p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Stats */}
          <Card>
            <CardHeader>
              <CardTitle>Statistics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-blue-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="text-xs text-gray-600">Total Visits</p>
                    <p className="text-xl">{client.totalVisits}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-green-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <DollarSign className="w-5 h-5 text-green-600" />
                  <div>
                    <p className="text-xs text-gray-600">Total Spent</p>
                    <p className="text-xl">${client.totalSpent}</p>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-yellow-50 rounded-lg">
                <div className="flex items-center gap-3">
                  <Star className="w-5 h-5 text-yellow-600" />
                  <div>
                    <p className="text-xs text-gray-600">Loyalty Points</p>
                    <p className="text-xl">{client.loyaltyPoints}</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Preferences */}
          <Card>
            <CardHeader>
              <CardTitle>Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div>
                <p className="text-sm text-gray-600">Favorite Services</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {client.favoriteServices.map((service, idx) => (
                    <span key={idx} className="px-3 py-1 bg-purple-100 text-purple-700 rounded-full text-sm">
                      {service}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-sm text-gray-600">Preferred Staff</p>
                <p className="mt-1">{client.preferredStaff}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Booking History and Notes */}
        <div className="lg:col-span-2 space-y-6">
          {/* Notes */}
          <Card>
            <CardHeader>
              <CardTitle>Notes & Allergies</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-700">{client.notes || 'No notes recorded'}</p>
            </CardContent>
          </Card>

          {/* Booking History */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <History className="w-5 h-5" />
                  Booking History
                </CardTitle>
                <Button size="sm">
                  <Calendar className="w-4 h-4 mr-2" />
                  Book Appointment
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {clientAppointments.length === 0 ? (
                  <p className="text-center text-gray-500 py-8">No booking history</p>
                ) : (
                  clientAppointments.map((apt) => (
                    <div key={apt.id} className="flex items-center gap-4 p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <p>{apt.serviceName}</p>
                          <span className={`px-3 py-1 rounded-full text-sm ${
                            apt.status === 'confirmed' ? 'bg-blue-100 text-blue-700' :
                            apt.status === 'pending' ? 'bg-yellow-100 text-yellow-700' :
                            apt.status === 'completed' ? 'bg-green-100 text-green-700' :
                            'bg-red-100 text-red-700'
                          }`}>
                            {apt.status.charAt(0).toUpperCase() + apt.status.slice(1)}
                          </span>
                        </div>
                        <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                          <span className="flex items-center gap-1">
                            <User className="w-3 h-3" />
                            {apt.staffName}
                          </span>
                          <span className="flex items-center gap-1">
                            <Calendar className="w-3 h-3" />
                            {new Date(apt.date).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            {apt.time}
                          </span>
                          <span className="flex items-center gap-1">
                            <DollarSign className="w-3 h-3" />
                            ${apt.price}
                          </span>
                        </div>
                      </div>
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
