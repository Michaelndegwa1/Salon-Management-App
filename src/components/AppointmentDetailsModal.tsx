import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { mockAppointments, mockClients } from '../lib/mockData';
import { Calendar, Clock, DollarSign, User, Phone, Mail, FileText, History } from 'lucide-react';
import { Badge } from './ui/badge';

interface AppointmentDetailsModalProps {
  appointmentId: string;
  onClose: () => void;
}

export default function AppointmentDetailsModal({ appointmentId, onClose }: AppointmentDetailsModalProps) {
  const appointment = mockAppointments.find(apt => apt.id === appointmentId);
  const client = mockClients.find(c => c.id === appointment?.clientId);

  if (!appointment || !client) return null;

  const getStatusBadge = (status: string) => {
    const colors = {
      confirmed: 'bg-blue-100 text-blue-700',
      pending: 'bg-yellow-100 text-yellow-700',
      completed: 'bg-green-100 text-green-700',
      cancelled: 'bg-red-100 text-red-700'
    };
    return colors[status as keyof typeof colors] || colors.pending;
  };

  const getPaymentBadge = (status: string) => {
    const colors = {
      paid: 'bg-green-100 text-green-700',
      unpaid: 'bg-red-100 text-red-700',
      deposit: 'bg-yellow-100 text-yellow-700'
    };
    return colors[status as keyof typeof colors] || colors.unpaid;
  };

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Appointment Details</DialogTitle>
          <DialogDescription>View and manage appointment details.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Status Badges */}
          <div className="flex gap-2">
            <Badge className={getStatusBadge(appointment.status)}>
              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
            </Badge>
            <Badge className={getPaymentBadge(appointment.paymentStatus)}>
              {appointment.paymentStatus.charAt(0).toUpperCase() + appointment.paymentStatus.slice(1)}
            </Badge>
          </div>

          {/* Client Information */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="flex items-center gap-2">
              <User className="w-4 h-4" />
              Client Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Name</p>
                <p>{client.name}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Phone</p>
                <p className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  {client.phone}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Email</p>
                <p className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  {client.email}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Loyalty Points</p>
                <p>{client.loyaltyPoints} points</p>
              </div>
            </div>
          </div>

          {/* Service Details */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3>Service Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-gray-600">Service</p>
                <p>{appointment.serviceName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Staff Member</p>
                <p>{appointment.staffName}</p>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Date</p>
                  <p>{new Date(appointment.date).toLocaleDateString()}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-400" />
                <div>
                  <p className="text-sm text-gray-600">Time</p>
                  <p>{appointment.time} ({appointment.duration} min)</p>
                </div>
              </div>
            </div>
          </div>

          {/* Price Breakdown */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="flex items-center gap-2">
              <DollarSign className="w-4 h-4" />
              Price Breakdown
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between">
                <span>{appointment.serviceName}</span>
                <span>${appointment.price}</span>
              </div>
              <div className="flex justify-between border-t pt-2">
                <span>Total</span>
                <span>${appointment.price}</span>
              </div>
            </div>
          </div>

          {/* Notes */}
          {appointment.notes && (
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <h3 className="flex items-center gap-2">
                <FileText className="w-4 h-4" />
                Notes
              </h3>
              <p className="text-gray-700">{appointment.notes}</p>
            </div>
          )}

          {/* Client History */}
          <div className="bg-gray-50 rounded-lg p-4 space-y-3">
            <h3 className="flex items-center gap-2">
              <History className="w-4 h-4" />
              Client History
            </h3>
            <div className="grid grid-cols-3 gap-4">
              <div>
                <p className="text-sm text-gray-600">Total Visits</p>
                <p className="text-xl">{client.totalVisits}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Total Spent</p>
                <p className="text-xl">${client.totalSpent}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Last Visit</p>
                <p className="text-xl">{new Date(client.lastVisit).toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2 pt-4 border-t">
            <Button className="flex-1">Confirm</Button>
            <Button variant="outline" className="flex-1">Reschedule</Button>
            <Button variant="destructive" className="flex-1">Cancel</Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}