import { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { mockClients, mockServices, mockStaff } from '../lib/mockData';
import { ChevronLeft, ChevronRight, Check, Calendar, Clock, User, Scissors, DollarSign } from 'lucide-react';
import { toast } from 'sonner';

interface NewBookingModalProps {
  onClose: () => void;
}

export default function NewBookingModal({ onClose }: NewBookingModalProps) {
  const [step, setStep] = useState(1);
  const [selectedClient, setSelectedClient] = useState('');
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [selectedStaff, setSelectedStaff] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [notes, setNotes] = useState('');
  const [paymentStatus, setPaymentStatus] = useState('unpaid');
  const [smsReminder, setSmsReminder] = useState(true);
  const [searchClient, setSearchClient] = useState('');
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleSubmit = () => {
    setIsConfirmed(true);
    toast.success('Booking Confirmed!', {
      description: 'The appointment has been successfully scheduled.',
      duration: 3000,
    });
    setTimeout(() => {
      onClose();
    }, 2500);
  };

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
    client.phone.includes(searchClient)
  );

  const timeSlots = [
    '9:00 AM', '9:30 AM', '10:00 AM', '10:30 AM', '11:00 AM', '11:30 AM',
    '12:00 PM', '12:30 PM', '1:00 PM', '1:30 PM', '2:00 PM', '2:30 PM',
    '3:00 PM', '3:30 PM', '4:00 PM', '4:30 PM', '5:00 PM', '5:30 PM',
    '6:00 PM', '6:30 PM', '7:00 PM', '7:30 PM'
  ];

  const stepTitles = [
    'Select a client for the booking',
    'Choose services to be provided',
    'Select staff member',
    'Choose date and time',
    'Add notes and confirm details'
  ];

  const client = mockClients.find(c => c.id === selectedClient);
  const services = mockServices.filter(s => selectedServices.includes(s.id));
  const staff = mockStaff.find(s => s.id === selectedStaff);
  const totalPrice = services.reduce((sum, s) => sum + s.price, 0);
  const totalDuration = services.reduce((sum, s) => sum + s.duration, 0);

  return (
    <Dialog open={true} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        {!isConfirmed ? (
          <>
            <DialogHeader>
              <DialogTitle className="text-2xl">New Booking</DialogTitle>
              <DialogDescription>
                {stepTitles[step - 1]}
              </DialogDescription>
            </DialogHeader>

            {/* Progress Steps */}
            <div className="flex items-center justify-between mb-6">
              {[1, 2, 3, 4, 5].map((s) => (
                <div key={s} className="flex items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 ${
                    step >= s ? 'bg-primary text-primary-foreground luxury-shadow' : 'bg-muted text-muted-foreground'
                  }`}>
                    {step > s ? <Check className="w-5 h-5" /> : s}
                  </div>
                  {s < 5 && <div className={`w-8 md:w-12 h-1 transition-all duration-300 ${step > s ? 'bg-primary' : 'bg-border'}`} />}
                </div>
              ))}
            </div>

            {/* Step 1: Select Client */}
            {step === 1 && (
              <div className="space-y-4">
                <div>
                  <Label>Search Client</Label>
                  <Input
                    placeholder="Search by name or phone..."
                    value={searchClient}
                    onChange={(e) => setSearchClient(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div className="space-y-2 max-h-80 overflow-y-auto">
                  {filteredClients.map((client) => (
                    <div
                      key={client.id}
                      onClick={() => setSelectedClient(client.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:luxury-shadow ${
                        selectedClient === client.id ? 'border-primary bg-accent luxury-shadow' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <User className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{client.name}</p>
                          <p className="text-sm text-muted-foreground">{client.phone} • {client.email}</p>
                        </div>
                        {selectedClient === client.id && (
                          <Check className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
                <Button variant="outline" className="w-full border-dashed border-2">
                  + Add New Client
                </Button>
              </div>
            )}

            {/* Step 2: Select Services */}
            {step === 2 && (
              <div className="space-y-4">
                <p className="text-sm text-muted-foreground">Select one or more services</p>
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mockServices.map((service) => (
                    <div
                      key={service.id}
                      onClick={() => {
                        if (selectedServices.includes(service.id)) {
                          setSelectedServices(selectedServices.filter(id => id !== service.id));
                        } else {
                          setSelectedServices([...selectedServices, service.id]);
                        }
                      }}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:luxury-shadow ${
                        selectedServices.includes(service.id) ? 'border-primary bg-accent luxury-shadow' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                          <Scissors className="w-6 h-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <p className="font-medium">{service.name}</p>
                            <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                              {service.category}
                            </span>
                          </div>
                          <p className="text-sm text-muted-foreground">{service.description}</p>
                          <div className="flex gap-4 mt-2">
                            <span className="text-sm font-medium text-primary">${service.price}</span>
                            <span className="text-sm text-muted-foreground">{service.duration} min</span>
                          </div>
                        </div>
                        {selectedServices.includes(service.id) && (
                          <Check className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Select Staff */}
            {step === 3 && (
              <div className="space-y-4">
                <div className="space-y-3 max-h-96 overflow-y-auto">
                  {mockStaff.map((staff) => (
                    <div
                      key={staff.id}
                      onClick={() => setSelectedStaff(staff.id)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all duration-200 hover:luxury-shadow ${
                        selectedStaff === staff.id ? 'border-primary bg-accent luxury-shadow' : 'border-border hover:border-primary/50'
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                          <span className="text-xl font-medium text-primary">
                            {staff.name.split(' ').map(n => n[0]).join('')}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="font-medium">{staff.name}</p>
                          <p className="text-sm text-muted-foreground">{staff.role}</p>
                          <p className="text-sm text-muted-foreground">{staff.email}</p>
                        </div>
                        {selectedStaff === staff.id && (
                          <Check className="w-6 h-6 text-primary" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Select Date & Time */}
            {step === 4 && (
              <div className="space-y-4">
                <div>
                  <Label>Select Date</Label>
                  <Input
                    type="date"
                    value={selectedDate}
                    onChange={(e) => setSelectedDate(e.target.value)}
                    min={new Date().toISOString().split('T')[0]}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Select Time</Label>
                  <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mt-2 max-h-64 overflow-y-auto">
                    {timeSlots.map((time) => (
                      <button
                        key={time}
                        onClick={() => setSelectedTime(time)}
                        className={`p-3 rounded-lg border-2 transition-all duration-200 hover:luxury-shadow ${
                          selectedTime === time ? 'border-primary bg-accent luxury-shadow' : 'border-border hover:border-primary/50'
                        }`}
                      >
                        <Clock className="w-4 h-4 mx-auto mb-1 text-primary" />
                        <p className="text-sm">{time}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Step 5: Confirmation & Notes */}
            {step === 5 && (
              <div className="space-y-6">
                {/* Booking Summary */}
                <div className="bg-accent p-6 rounded-lg luxury-shadow">
                  <h3 className="text-lg font-medium mb-4 text-primary">Booking Summary</h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Client</p>
                        <p className="font-medium">{client?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Scissors className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Services ({services.length})</p>
                        <p className="font-medium">{services.map(s => s.name).join(', ')}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <User className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Staff</p>
                        <p className="font-medium">{staff?.name}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Date & Time</p>
                        <p className="font-medium">{selectedDate} at {selectedTime}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Clock className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Duration</p>
                        <p className="font-medium">{totalDuration} minutes</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <DollarSign className="w-5 h-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">Total Price</p>
                        <p className="text-xl font-medium text-primary">${totalPrice}</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <Label>Notes (Optional)</Label>
                  <Textarea
                    placeholder="Add any special notes or requests..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="mt-2"
                  />
                </div>
                <div>
                  <Label>Payment Status</Label>
                  <Select value={paymentStatus} onValueChange={setPaymentStatus}>
                    <SelectTrigger className="mt-2">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="unpaid">Unpaid</SelectItem>
                      <SelectItem value="paid">Paid</SelectItem>
                      <SelectItem value="deposit">Deposit Paid</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex items-center justify-between p-4 bg-muted rounded-lg">
                  <Label>Send SMS Reminder</Label>
                  <Switch checked={smsReminder} onCheckedChange={setSmsReminder} />
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between pt-4 border-t">
              <Button
                variant="outline"
                onClick={() => setStep(Math.max(1, step - 1))}
                disabled={step === 1}
              >
                <ChevronLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
              {step < 5 ? (
                <Button
                  onClick={() => setStep(step + 1)}
                  disabled={
                    (step === 1 && !selectedClient) ||
                    (step === 2 && selectedServices.length === 0) ||
                    (step === 3 && !selectedStaff) ||
                    (step === 4 && (!selectedDate || !selectedTime))
                  }
                >
                  Next
                  <ChevronRight className="w-4 h-4 ml-2" />
                </Button>
              ) : (
                <Button onClick={handleSubmit} className="luxury-gradient text-white">
                  Confirm Booking
                </Button>
              )}
            </div>
          </>
        ) : (
          <div className="text-center py-12">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 luxury-shadow-lg">
              <Check className="w-12 h-12 text-primary" />
            </div>
            <DialogTitle className="text-2xl mb-2">Booking Confirmed!</DialogTitle>
            <DialogDescription className="text-lg mb-6">
              Your appointment has been successfully scheduled
            </DialogDescription>
            <div className="bg-accent p-6 rounded-lg luxury-shadow max-w-md mx-auto">
              <p className="font-medium mb-2">{client?.name}</p>
              <p className="text-sm text-muted-foreground mb-4">{services.map(s => s.name).join(', ')}</p>
              <p className="text-sm"><span className="text-primary">📅</span> {selectedDate} at {selectedTime}</p>
              <p className="text-sm"><span className="text-primary">💰</span> Total: ${totalPrice}</p>
              {smsReminder && (
                <p className="text-sm mt-4 text-muted-foreground">✓ SMS reminder will be sent</p>
              )}
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
