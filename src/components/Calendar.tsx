import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, Mail, Bell } from 'lucide-react';
import { mockAppointments } from '../lib/mockData';
import AppointmentDetailsModal from './AppointmentDetailsModal';
import { toast } from 'sonner@2.0.3';
import { Badge } from './ui/badge';

interface CalendarProps {
  isMobile: boolean;
}

export default function Calendar({ isMobile }: CalendarProps) {
  const [view, setView] = useState<'day' | 'week' | 'month'>('day');
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState<string | null>(null);

  const timeSlots = useMemo(() => {
    const slots = [];
    for (let hour = 8; hour < 20; hour++) {
      slots.push(`${hour}:00`, `${hour}:30`);
    }
    return slots;
  }, []);

  const filteredAppointments = useMemo(() => {
    const dateStr = selectedDate.toISOString().split('T')[0];
    return mockAppointments.filter(apt => apt.date === dateStr);
  }, [selectedDate]);

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const nextDay = () => {
    const next = new Date(selectedDate);
    next.setDate(next.getDate() + 1);
    setSelectedDate(next);
  };

  const prevDay = () => {
    const prev = new Date(selectedDate);
    prev.setDate(prev.getDate() - 1);
    setSelectedDate(prev);
  };

  const sendReminderToClient = (appointmentId: string) => {
    const appointment = mockAppointments.find(apt => apt.id === appointmentId);
    if (appointment) {
      toast.success(`Reminder sent to ${appointment.clientName}!`, {
        description: `Appointment on ${appointment.date} at ${appointment.time}`
      });
    }
  };

  const sendReminderToAll = () => {
    if (filteredAppointments.length === 0) {
      toast.error('No appointments to send reminders for');
      return;
    }
    toast.success(`Reminders sent to ${filteredAppointments.length} clients!`, {
      description: `For appointments on ${formatDate(selectedDate)}`
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className={`flex ${isMobile ? 'flex-col gap-3' : 'flex-row items-center justify-between'}`}>
        <div className="flex items-center gap-4">
          <h1 className={isMobile ? 'text-2xl' : ''}>Calendar</h1>
          {!isMobile && (
            <div className="flex gap-2">
              <Button
                variant={view === 'day' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('day')}
              >
                Day
              </Button>
              <Button
                variant={view === 'week' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('week')}
              >
                Week
              </Button>
              <Button
                variant={view === 'month' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setView('month')}
              >
                Month
              </Button>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={prevDay}>
            <ChevronLeft className="w-4 h-4" />
          </Button>
          <div className={`flex items-center gap-2 ${isMobile ? 'text-sm' : ''}`}>
            <CalendarIcon className="w-4 h-4" />
            <span>{formatDate(selectedDate)}</span>
          </div>
          <Button variant="outline" size="sm" onClick={nextDay}>
            <ChevronRight className="w-4 h-4" />
          </Button>
          <Button 
            size="sm" 
            onClick={() => setSelectedDate(new Date())}
            className={isMobile ? 'text-xs px-2' : ''}
          >
            Today
          </Button>
        </div>
      </div>

      {/* Day View */}
      {view === 'day' && (
        <Card>
          <CardHeader>
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
              <CardTitle className={isMobile ? 'text-lg' : ''}>
                {filteredAppointments.length} appointments scheduled
              </CardTitle>
              {filteredAppointments.length > 0 && (
                <Button 
                  size="sm" 
                  onClick={sendReminderToAll}
                  className="luxury-gradient text-white"
                >
                  <Bell className="w-4 h-4 mr-2" />
                  Send Reminders to All
                </Button>
              )}
            </div>
          </CardHeader>
          <CardContent>
            <div className={`${isMobile ? 'space-y-2' : 'grid grid-cols-12 gap-2'}`}>
              {!isMobile && (
                <div className="col-span-2">
                  <div className="h-full space-y-16 pt-10">
                    {timeSlots.filter((_, i) => i % 2 === 0).map((slot) => (
                      <div key={slot} className="text-sm text-gray-500">
                        {slot}
                      </div>
                    ))}
                  </div>
                </div>
              )}
              <div className={isMobile ? 'space-y-2' : 'col-span-10 relative min-h-[600px]'}>
                {filteredAppointments.length === 0 ? (
                  <div className="text-center py-12 text-gray-500">
                    No appointments scheduled for this day
                  </div>
                ) : (
                  filteredAppointments.map((apt) => {
                    const [hour, minutePart] = apt.time.split(':');
                    const isPM = minutePart.includes('PM');
                    const hourNum = parseInt(hour);
                    const adjustedHour = isPM && hourNum !== 12 ? hourNum + 12 : hourNum;
                    const topPosition = ((adjustedHour - 8) * 128);

                    return (
                      <div
                        key={apt.id}
                        className={`${
                          isMobile
                            ? 'p-3 border rounded-lg'
                            : 'absolute left-0 right-0 p-3 rounded-lg cursor-pointer hover:shadow-md transition-shadow'
                        } ${
                          apt.status === 'confirmed'
                            ? 'bg-blue-50 border-blue-300'
                            : apt.status === 'pending'
                            ? 'bg-yellow-50 border-yellow-300'
                            : apt.status === 'completed'
                            ? 'bg-green-50 border-green-300'
                            : 'bg-red-50 border-red-300'
                        }`}
                        style={!isMobile ? { top: `${topPosition}px` } : undefined}
                      >
                        <div className="flex justify-between items-start gap-2">
                          <div className="flex-1" onClick={() => setSelectedAppointment(apt.id)}>
                            <p className={isMobile ? 'text-sm' : ''}>{apt.time}</p>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
                              {apt.clientName}
                            </p>
                            <p className={`${isMobile ? 'text-xs' : 'text-sm'} text-gray-600`}>
                              {apt.serviceName}
                            </p>
                          </div>
                          <div className="flex flex-col gap-2 items-end">
                            <div className={`text-xs px-2 py-1 rounded ${
                              apt.status === 'confirmed' ? 'bg-blue-200' :
                              apt.status === 'pending' ? 'bg-yellow-200' :
                              apt.status === 'completed' ? 'bg-green-200' :
                              'bg-red-200'
                            }`}>
                              {apt.status}
                            </div>
                            <Button 
                              size="sm" 
                              variant="ghost"
                              onClick={(e) => {
                                e.stopPropagation();
                                sendReminderToClient(apt.id);
                              }}
                              className="h-6 px-2 text-xs hover:bg-primary/10"
                            >
                              <Mail className="w-3 h-3 mr-1" />
                              Remind
                            </Button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedAppointment && (
        <AppointmentDetailsModal
          appointmentId={selectedAppointment}
          onClose={() => setSelectedAppointment(null)}
        />
      )}
    </div>
  );
}