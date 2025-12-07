import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Textarea } from './ui/textarea';
import { Badge } from './ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Phone, PhoneOff, ArrowUpRight, Plus, Search, TrendingUp, Clock, CheckCircle, XCircle, AlertCircle, Calendar, User } from 'lucide-react';
import { toast } from 'sonner@2.0.3';

interface CallLog {
  id: string;
  callerName: string;
  callerPhone: string;
  callType: 'booking' | 'inquiry' | 'service-question' | 'follow-up' | 'cancellation' | 'other';
  callStatus: 'answered' | 'missed' | 'voicemail';
  callDirection: 'inbound' | 'outbound';
  duration: number; // in minutes
  date: string;
  time: string;
  outcome: 'booked' | 'follow-up-needed' | 'not-interested' | 'rescheduled' | 'information-provided' | 'no-action';
  notes: string;
  assignedTo?: string;
}

interface CallLogsProps {
  isMobile: boolean;
}

const mockCallLogs: CallLog[] = [
  {
    id: '1',
    callerName: 'Sarah Johnson',
    callerPhone: '+1 (555) 123-4567',
    callType: 'booking',
    callStatus: 'answered',
    callDirection: 'inbound',
    duration: 5,
    date: '2025-11-12',
    time: '10:30 AM',
    outcome: 'booked',
    notes: 'Booked haircut appointment for Nov 15th at 2 PM with Maria',
    assignedTo: 'Maria Garcia'
  },
  {
    id: '2',
    callerName: 'Michael Chen',
    callerPhone: '+1 (555) 234-5678',
    callType: 'inquiry',
    callStatus: 'answered',
    callDirection: 'inbound',
    duration: 8,
    date: '2025-11-12',
    time: '11:15 AM',
    outcome: 'follow-up-needed',
    notes: 'Asked about wedding package pricing. Sent email with details. Call back in 2 days.',
    assignedTo: 'James Smith'
  },
  {
    id: '3',
    callerName: 'Emma Williams',
    callerPhone: '+1 (555) 345-6789',
    callType: 'service-question',
    callStatus: 'answered',
    callDirection: 'inbound',
    duration: 3,
    date: '2025-11-12',
    time: '09:45 AM',
    outcome: 'information-provided',
    notes: 'Asked about balayage process and pricing. Provided information.',
    assignedTo: 'Maria Garcia'
  },
  {
    id: '4',
    callerName: 'Unknown',
    callerPhone: '+1 (555) 456-7890',
    callType: 'inquiry',
    callStatus: 'missed',
    callDirection: 'inbound',
    duration: 0,
    date: '2025-11-11',
    time: '05:30 PM',
    outcome: 'follow-up-needed',
    notes: 'Missed call - need to call back',
  },
  {
    id: '5',
    callerName: 'David Brown',
    callerPhone: '+1 (555) 567-8901',
    callType: 'cancellation',
    callStatus: 'answered',
    callDirection: 'inbound',
    duration: 4,
    date: '2025-11-11',
    time: '03:20 PM',
    outcome: 'rescheduled',
    notes: 'Canceled Nov 13 appointment, rescheduled to Nov 20',
    assignedTo: 'Sarah Parker'
  },
  {
    id: '6',
    callerName: 'Lisa Anderson',
    callerPhone: '+1 (555) 678-9012',
    callType: 'follow-up',
    callStatus: 'voicemail',
    callDirection: 'outbound',
    duration: 2,
    date: '2025-11-11',
    time: '02:00 PM',
    outcome: 'follow-up-needed',
    notes: 'Left voicemail regarding appointment reminder for tomorrow',
    assignedTo: 'James Smith'
  },
  {
    id: '7',
    callerName: 'Jessica Martinez',
    callerPhone: '+1 (555) 789-0123',
    callType: 'booking',
    callStatus: 'answered',
    callDirection: 'inbound',
    duration: 6,
    date: '2025-11-11',
    time: '01:15 PM',
    outcome: 'booked',
    notes: 'Booked color treatment and cut for Nov 18th at 10 AM',
    assignedTo: 'Maria Garcia'
  },
  {
    id: '8',
    callerName: 'Robert Taylor',
    callerPhone: '+1 (555) 890-1234',
    callType: 'inquiry',
    callStatus: 'answered',
    callDirection: 'inbound',
    duration: 10,
    date: '2025-11-10',
    time: '04:45 PM',
    outcome: 'not-interested',
    notes: 'Asked about mens services, but location too far for them',
  },
];

export default function CallLogs({ isMobile }: CallLogsProps) {
  const [callLogs, setCallLogs] = useState<CallLog[]>(mockCallLogs);
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterType, setFilterType] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [filterOutcome, setFilterOutcome] = useState<string>('all');

  // New call form state
  const [newCall, setNewCall] = useState<Partial<CallLog>>({
    callerName: '',
    callerPhone: '',
    callType: 'inquiry',
    callStatus: 'answered',
    callDirection: 'inbound',
    duration: 0,
    date: new Date().toISOString().split('T')[0],
    time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
    outcome: 'no-action',
    notes: '',
    assignedTo: ''
  });

  const handleAddCall = () => {
    const call: CallLog = {
      id: (callLogs.length + 1).toString(),
      callerName: newCall.callerName || 'Unknown',
      callerPhone: newCall.callerPhone || '',
      callType: newCall.callType as any || 'inquiry',
      callStatus: newCall.callStatus as any || 'answered',
      callDirection: newCall.callDirection as any || 'inbound',
      duration: newCall.duration || 0,
      date: newCall.date || new Date().toISOString().split('T')[0],
      time: newCall.time || new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      outcome: newCall.outcome as any || 'no-action',
      notes: newCall.notes || '',
      assignedTo: newCall.assignedTo
    };

    setCallLogs([call, ...callLogs]);
    setShowAddModal(false);
    setNewCall({
      callerName: '',
      callerPhone: '',
      callType: 'inquiry',
      callStatus: 'answered',
      callDirection: 'inbound',
      duration: 0,
      date: new Date().toISOString().split('T')[0],
      time: new Date().toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }),
      outcome: 'no-action',
      notes: '',
      assignedTo: ''
    });
    toast.success('Call log added successfully');
  };

  // Filter calls
  const filteredCalls = callLogs.filter(call => {
    const matchesSearch = 
      call.callerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      call.callerPhone.includes(searchTerm) ||
      call.notes.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesType = filterType === 'all' || call.callType === filterType;
    const matchesStatus = filterStatus === 'all' || call.callStatus === filterStatus;
    const matchesOutcome = filterOutcome === 'all' || call.outcome === filterOutcome;

    return matchesSearch && matchesType && matchesStatus && matchesOutcome;
  });

  // Calculate statistics
  const totalCalls = callLogs.length;
  const answeredCalls = callLogs.filter(c => c.callStatus === 'answered').length;
  const missedCalls = callLogs.filter(c => c.callStatus === 'missed').length;
  const bookingConversions = callLogs.filter(c => c.outcome === 'booked').length;
  const conversionRate = totalCalls > 0 ? ((bookingConversions / totalCalls) * 100).toFixed(1) : 0;
  const avgDuration = callLogs.length > 0 
    ? (callLogs.reduce((sum, c) => sum + c.duration, 0) / callLogs.filter(c => c.duration > 0).length).toFixed(1)
    : 0;

  const getCallTypeIcon = (type: string) => {
    switch (type) {
      case 'booking': return <Calendar className="w-4 h-4" />;
      case 'inquiry': return <AlertCircle className="w-4 h-4" />;
      case 'service-question': return <Phone className="w-4 h-4" />;
      case 'follow-up': return <TrendingUp className="w-4 h-4" />;
      case 'cancellation': return <XCircle className="w-4 h-4" />;
      default: return <Phone className="w-4 h-4" />;
    }
  };

  const getCallTypeColor = (type: string) => {
    switch (type) {
      case 'booking': return 'bg-green-500/10 text-green-600 border-green-500/20';
      case 'inquiry': return 'bg-blue-500/10 text-blue-600 border-blue-500/20';
      case 'service-question': return 'bg-purple-500/10 text-purple-600 border-purple-500/20';
      case 'follow-up': return 'bg-yellow-500/10 text-yellow-600 border-yellow-500/20';
      case 'cancellation': return 'bg-red-500/10 text-red-600 border-red-500/20';
      default: return 'bg-gray-500/10 text-gray-600 border-gray-500/20';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'answered':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle className="w-3 h-3 mr-1" /> Answered</Badge>;
      case 'missed':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20"><PhoneOff className="w-3 h-3 mr-1" /> Missed</Badge>;
      case 'voicemail':
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20"><Phone className="w-3 h-3 mr-1" /> Voicemail</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getOutcomeBadge = (outcome: string) => {
    switch (outcome) {
      case 'booked':
        return <Badge className="luxury-gradient text-white">✓ Booked</Badge>;
      case 'follow-up-needed':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">↻ Follow-up</Badge>;
      case 'not-interested':
        return <Badge variant="outline">✗ Not Interested</Badge>;
      case 'rescheduled':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">⟳ Rescheduled</Badge>;
      case 'information-provided':
        return <Badge className="bg-purple-500/10 text-purple-600 border-purple-500/20">ℹ Info Provided</Badge>;
      default:
        return <Badge variant="outline">No Action</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header - Fixed on mobile */}
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div>
            <h1 className="text-3xl mb-2 text-primary">Call Logs & Traffic</h1>
            <p className="text-muted-foreground">Track all customer calls, inquiries, and booking attempts</p>
          </div>
          <Button onClick={() => setShowAddModal(true)} className="luxury-gradient text-white shadow-lg">
            <Plus className="w-4 h-4 mr-2" />
            Add Call Log
          </Button>
        </div>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mb-6">
        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Total Calls</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-primary">{totalCalls}</p>
              <Phone className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Answered</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-green-600">{answeredCalls}</p>
              <CheckCircle className="w-8 h-8 text-green-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Missed</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-red-600">{missedCalls}</p>
              <PhoneOff className="w-8 h-8 text-red-600/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Conversion</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-primary">{conversionRate}%</p>
              <TrendingUp className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>

        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Duration</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-primary">{avgDuration}m</p>
              <Clock className="w-8 h-8 text-primary/20" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Search and Filters */}
      <Card className="luxury-shadow mb-6 border-0">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
            <div className="md:col-span-1">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="Search calls..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 border-0 bg-muted/50"
                />
              </div>
            </div>
            <div>
              <Select value={filterType} onValueChange={setFilterType}>
                <SelectTrigger className="border-0 bg-muted/50">
                  <SelectValue placeholder="Call Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="booking">Booking</SelectItem>
                  <SelectItem value="inquiry">Inquiry</SelectItem>
                  <SelectItem value="service-question">Service Question</SelectItem>
                  <SelectItem value="follow-up">Follow-up</SelectItem>
                  <SelectItem value="cancellation">Cancellation</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="border-0 bg-muted/50">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="answered">Answered</SelectItem>
                  <SelectItem value="missed">Missed</SelectItem>
                  <SelectItem value="voicemail">Voicemail</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterOutcome} onValueChange={setFilterOutcome}>
                <SelectTrigger className="border-0 bg-muted/50">
                  <SelectValue placeholder="Outcome" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Outcomes</SelectItem>
                  <SelectItem value="booked">Booked</SelectItem>
                  <SelectItem value="follow-up-needed">Follow-up Needed</SelectItem>
                  <SelectItem value="not-interested">Not Interested</SelectItem>
                  <SelectItem value="rescheduled">Rescheduled</SelectItem>
                  <SelectItem value="information-provided">Info Provided</SelectItem>
                  <SelectItem value="no-action">No Action</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call Logs List */}
      <div className="space-y-3 pb-6">
        {filteredCalls.length === 0 ? (
          <Card className="luxury-shadow border-0">
            <CardContent className="py-12 text-center">
              <Phone className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
              <p className="text-muted-foreground">No call logs found matching your filters</p>
            </CardContent>
          </Card>
        ) : (
          filteredCalls.map((call) => (
            <Card key={call.id} className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0 hover:scale-[1.01]">
              <CardContent className="p-4 md:p-6">
                <div className="flex flex-col md:flex-row md:items-start gap-4">
                  {/* Call Icon */}
                  <div className={`p-3 rounded-full ${getCallTypeColor(call.callType)} flex-shrink-0 shadow-sm`}>
                    {call.callDirection === 'inbound' ? (
                      <Phone className="w-6 h-6" />
                    ) : (
                      <ArrowUpRight className="w-6 h-6" />
                    )}
                  </div>

                  {/* Call Details */}
                  <div className="flex-1 space-y-2">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                      <div>
                        <h3 className="font-medium">{call.callerName}</h3>
                        <p className="text-sm text-muted-foreground">{call.callerPhone}</p>
                      </div>
                      <div className="flex flex-wrap gap-2">
                        <Badge className={getCallTypeColor(call.callType)} variant="outline">
                          {getCallTypeIcon(call.callType)}
                          <span className="ml-1 capitalize">{call.callType.replace('-', ' ')}</span>
                        </Badge>
                        {getStatusBadge(call.callStatus)}
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        {call.date} at {call.time}
                      </div>
                      {call.duration > 0 && (
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {call.duration} min
                        </div>
                      )}
                      {call.assignedTo && (
                        <div className="flex items-center gap-1">
                          <User className="w-4 h-4" />
                          {call.assignedTo}
                        </div>
                      )}
                    </div>

                    {call.notes && (
                      <p className="text-sm bg-accent/30 p-3 rounded-lg border border-primary/5">{call.notes}</p>
                    )}

                    <div className="pt-2">
                      {getOutcomeBadge(call.outcome)}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      {/* Add Call Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Add New Call Log</DialogTitle>
            <DialogDescription>Record details of customer calls and inquiries</DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Caller Name</Label>
                <Input
                  placeholder="Enter caller name"
                  value={newCall.callerName}
                  onChange={(e) => setNewCall({ ...newCall, callerName: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Phone Number</Label>
                <Input
                  placeholder="+1 (555) 123-4567"
                  value={newCall.callerPhone}
                  onChange={(e) => setNewCall({ ...newCall, callerPhone: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Call Type</Label>
                <Select value={newCall.callType} onValueChange={(value) => setNewCall({ ...newCall, callType: value as any })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booking">Booking</SelectItem>
                    <SelectItem value="inquiry">Inquiry</SelectItem>
                    <SelectItem value="service-question">Service Question</SelectItem>
                    <SelectItem value="follow-up">Follow-up</SelectItem>
                    <SelectItem value="cancellation">Cancellation</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Call Direction</Label>
                <Select value={newCall.callDirection} onValueChange={(value) => setNewCall({ ...newCall, callDirection: value as any })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="inbound">Inbound</SelectItem>
                    <SelectItem value="outbound">Outbound</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Call Status</Label>
                <Select value={newCall.callStatus} onValueChange={(value) => setNewCall({ ...newCall, callStatus: value as any })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="answered">Answered</SelectItem>
                    <SelectItem value="missed">Missed</SelectItem>
                    <SelectItem value="voicemail">Voicemail</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Duration (minutes)</Label>
                <Input
                  type="number"
                  placeholder="0"
                  value={newCall.duration}
                  onChange={(e) => setNewCall({ ...newCall, duration: parseInt(e.target.value) || 0 })}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Date</Label>
                <Input
                  type="date"
                  value={newCall.date}
                  onChange={(e) => setNewCall({ ...newCall, date: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label>Time</Label>
                <Input
                  type="time"
                  value={newCall.time}
                  onChange={(e) => setNewCall({ ...newCall, time: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label>Outcome</Label>
                <Select value={newCall.outcome} onValueChange={(value) => setNewCall({ ...newCall, outcome: value as any })}>
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="booked">Booked</SelectItem>
                    <SelectItem value="follow-up-needed">Follow-up Needed</SelectItem>
                    <SelectItem value="not-interested">Not Interested</SelectItem>
                    <SelectItem value="rescheduled">Rescheduled</SelectItem>
                    <SelectItem value="information-provided">Information Provided</SelectItem>
                    <SelectItem value="no-action">No Action</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label>Assigned To (Optional)</Label>
                <Input
                  placeholder="Staff member name"
                  value={newCall.assignedTo}
                  onChange={(e) => setNewCall({ ...newCall, assignedTo: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div>
              <Label>Notes</Label>
              <Textarea
                placeholder="Add any notes about this call..."
                value={newCall.notes}
                onChange={(e) => setNewCall({ ...newCall, notes: e.target.value })}
                className="mt-2"
                rows={4}
              />
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-4">
            <Button variant="outline" onClick={() => setShowAddModal(false)}>
              Cancel
            </Button>
            <Button onClick={handleAddCall} className="luxury-gradient text-white">
              Add Call Log
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}