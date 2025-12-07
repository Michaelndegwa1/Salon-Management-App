import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { 
  TrendingUp, 
  TrendingDown, 
  Users, 
  Calendar,
  Clock,
  DollarSign,
  AlertCircle,
  CheckCircle,
  Star,
  Search,
  Mail,
  Phone,
  BarChart3
} from 'lucide-react';
import { BarChart, Bar, LineChart, Line, PieChart, Pie, Cell, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import { mockClients, mockAppointments } from '../lib/mockData';
import { toast } from 'sonner';
import { formatKSH } from './ui/utils';

interface ClientRetentionProps {
  isMobile: boolean;
}

// Calculate client visit frequency and retention data
const calculateRetentionData = () => {
  const clients = mockClients.map(client => {
    const clientAppointments = mockAppointments.filter(apt => apt.clientId === client.id);
    const totalVisits = clientAppointments.length;
    const totalSpent = clientAppointments.reduce((sum, apt) => sum + apt.price, 0);
    
    // Calculate days since last visit
    const lastVisit = clientAppointments.length > 0 
      ? new Date(clientAppointments[clientAppointments.length - 1].date)
      : new Date('2024-01-01');
    const daysSinceLastVisit = Math.floor((new Date().getTime() - lastVisit.getTime()) / (1000 * 60 * 60 * 24));
    
    // Determine frequency category
    let frequencyCategory = 'inactive';
    if (totalVisits >= 10) frequencyCategory = 'very-frequent';
    else if (totalVisits >= 6) frequencyCategory = 'frequent';
    else if (totalVisits >= 3) frequencyCategory = 'regular';
    else if (totalVisits >= 1) frequencyCategory = 'occasional';
    
    // Determine retention status
    let retentionStatus = 'active';
    if (daysSinceLastVisit > 90) retentionStatus = 'at-risk';
    if (daysSinceLastVisit > 180) retentionStatus = 'lost';
    
    return {
      ...client,
      totalVisits,
      totalSpent,
      averageSpent: totalVisits > 0 ? totalSpent / totalVisits : 0,
      daysSinceLastVisit,
      frequencyCategory,
      retentionStatus,
      lastVisit: lastVisit.toISOString().split('T')[0]
    };
  });
  
  return clients;
};

export default function ClientRetention({ isMobile }: ClientRetentionProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filterFrequency, setFilterFrequency] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  
  const retentionData = calculateRetentionData();
  
  // Filter clients
  const filteredClients = retentionData.filter(client => {
    const matchesSearch = 
      client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      client.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFrequency = filterFrequency === 'all' || client.frequencyCategory === filterFrequency;
    const matchesStatus = filterStatus === 'all' || client.retentionStatus === filterStatus;
    
    return matchesSearch && matchesFrequency && matchesStatus;
  });
  
  // Calculate statistics
  const totalClients = retentionData.length;
  const activeClients = retentionData.filter(c => c.retentionStatus === 'active').length;
  const atRiskClients = retentionData.filter(c => c.retentionStatus === 'at-risk').length;
  const lostClients = retentionData.filter(c => c.retentionStatus === 'lost').length;
  const retentionRate = totalClients > 0 ? ((activeClients / totalClients) * 100).toFixed(1) : 0;
  const avgVisitsPerClient = (retentionData.reduce((sum, c) => sum + c.totalVisits, 0) / totalClients).toFixed(1);
  const avgLifetimeValue = (retentionData.reduce((sum, c) => sum + c.totalSpent, 0) / totalClients).toFixed(0);
  
  // Frequency distribution for chart
  const frequencyDistribution = [
    { name: 'Very Frequent (10+)', value: retentionData.filter(c => c.frequencyCategory === 'very-frequent').length, color: '#10B981' },
    { name: 'Frequent (6-9)', value: retentionData.filter(c => c.frequencyCategory === 'frequent').length, color: '#C9A55A' },
    { name: 'Regular (3-5)', value: retentionData.filter(c => c.frequencyCategory === 'regular').length, color: '#60A5FA' },
    { name: 'Occasional (1-2)', value: retentionData.filter(c => c.frequencyCategory === 'occasional').length, color: '#F59E0B' },
    { name: 'Inactive (0)', value: retentionData.filter(c => c.frequencyCategory === 'inactive').length, color: '#EF4444' },
  ];
  
  // Monthly retention trend
  const monthlyTrend = [
    { month: 'Jan', retained: 85, new: 12, lost: 3 },
    { month: 'Feb', retained: 88, new: 15, lost: 2 },
    { month: 'Mar', retained: 90, new: 18, lost: 1 },
    { month: 'Apr', retained: 87, new: 10, lost: 5 },
    { month: 'May', retained: 92, new: 20, lost: 2 },
    { month: 'Jun', retained: 94, new: 22, lost: 1 },
  ];
  
  const sendReminder = (client: any) => {
    toast.success(`Reminder sent to ${client.name}!`);
  };
  
  const getFrequencyBadge = (category: string) => {
    switch (category) {
      case 'very-frequent':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><Star className="w-3 h-3 mr-1" /> Very Frequent</Badge>;
      case 'frequent':
        return <Badge className="luxury-gradient text-white"><Star className="w-3 h-3 mr-1" /> Frequent</Badge>;
      case 'regular':
        return <Badge className="bg-blue-500/10 text-blue-600 border-blue-500/20">Regular</Badge>;
      case 'occasional':
        return <Badge className="bg-yellow-500/10 text-yellow-600 border-yellow-500/20">Occasional</Badge>;
      case 'inactive':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Inactive</Badge>;
      default:
        return <Badge>{category}</Badge>;
    }
  };
  
  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/10 text-green-600 border-green-500/20"><CheckCircle className="w-3 h-3 mr-1" /> Active</Badge>;
      case 'at-risk':
        return <Badge className="bg-orange-500/10 text-orange-600 border-orange-500/20"><AlertCircle className="w-3 h-3 mr-1" /> At Risk</Badge>;
      case 'lost':
        return <Badge className="bg-red-500/10 text-red-600 border-red-500/20">Lost</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  return (
    <div className="min-h-screen">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm pb-4">
        <div>
          <h1 className="text-3xl mb-2 text-primary">Client Retention & Frequency</h1>
          <p className="text-muted-foreground">Track client visit frequency, retention rates, and lifetime value</p>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Retention Rate</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-primary">{retentionRate}%</p>
              <TrendingUp className="w-8 h-8 text-primary/20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">{activeClients} active clients</p>
          </CardContent>
        </Card>

        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">At Risk</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-orange-600">{atRiskClients}</p>
              <AlertCircle className="w-8 h-8 text-orange-600/20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Need follow-up</p>
          </CardContent>
        </Card>

        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Visits</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-primary">{avgVisitsPerClient}</p>
              <Calendar className="w-8 h-8 text-primary/20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per client</p>
          </CardContent>
        </Card>

        <Card className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm text-muted-foreground">Avg Lifetime Value</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between">
              <p className="text-2xl text-primary">{formatKSH(avgLifetimeValue)}</p>
              <DollarSign className="w-8 h-8 text-primary/20" />
            </div>
            <p className="text-xs text-muted-foreground mt-1">Per client</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        <Card className="luxury-shadow border-0">
          <CardHeader>
            <CardTitle>Client Frequency Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={frequencyDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, percent }) => `${name.split(' ')[0]}: ${(percent * 100).toFixed(0)}%`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {frequencyDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className="luxury-shadow border-0">
          <CardHeader>
            <CardTitle>Monthly Retention Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={monthlyTrend}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E8DCC4" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line type="monotone" dataKey="retained" stroke="#C9A55A" strokeWidth={2} name="Retained" />
                <Line type="monotone" dataKey="new" stroke="#10B981" strokeWidth={2} name="New" />
                <Line type="monotone" dataKey="lost" stroke="#EF4444" strokeWidth={2} name="Lost" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <Card className="luxury-shadow mb-6 border-0">
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search clients..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 border-0 bg-muted/50"
              />
            </div>
            <div>
              <Select value={filterFrequency} onValueChange={setFilterFrequency}>
                <SelectTrigger className="border-0 bg-muted/50">
                  <SelectValue placeholder="Filter by Frequency" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Frequencies</SelectItem>
                  <SelectItem value="very-frequent">Very Frequent (10+)</SelectItem>
                  <SelectItem value="frequent">Frequent (6-9)</SelectItem>
                  <SelectItem value="regular">Regular (3-5)</SelectItem>
                  <SelectItem value="occasional">Occasional (1-2)</SelectItem>
                  <SelectItem value="inactive">Inactive (0)</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="border-0 bg-muted/50">
                  <SelectValue placeholder="Filter by Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="at-risk">At Risk</SelectItem>
                  <SelectItem value="lost">Lost</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client List with Tabs */}
      <Tabs defaultValue="all" className="space-y-4">
        <TabsList className="grid w-full grid-cols-4 md:w-auto md:inline-grid">
          <TabsTrigger value="all">All Clients</TabsTrigger>
          <TabsTrigger value="top">Top Clients</TabsTrigger>
          <TabsTrigger value="at-risk">At Risk</TabsTrigger>
          <TabsTrigger value="lost">Lost</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-3">
          {filteredClients.length === 0 ? (
            <Card className="luxury-shadow border-0">
              <CardContent className="py-12 text-center">
                <Users className="w-16 h-16 mx-auto mb-4 text-muted-foreground/20" />
                <p className="text-muted-foreground">No clients found matching your filters</p>
              </CardContent>
            </Card>
          ) : (
            filteredClients.map((client) => (
              <Card key={client.id} className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0 hover:scale-[1.01]">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1 space-y-3">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">{client.email}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {getFrequencyBadge(client.frequencyCategory)}
                          {getStatusBadge(client.retentionStatus)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <p className="text-muted-foreground">Total Visits</p>
                          <p className="font-medium text-primary">{client.totalVisits}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Total Spent</p>
                          <p className="font-medium text-primary">{formatKSH(client.totalSpent)}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Avg Per Visit</p>
                          <p className="font-medium text-primary">{formatKSH(client.averageSpent.toFixed(0))}</p>
                        </div>
                        <div>
                          <p className="text-muted-foreground">Last Visit</p>
                          <p className="font-medium">{client.daysSinceLastVisit}d ago</p>
                        </div>
                      </div>
                    </div>

                    <div className="flex md:flex-col gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => sendReminder(client)}
                        className="flex-1 md:flex-none luxury-gradient text-white"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Reminder
                      </Button>
                      <Button size="sm" variant="outline" className="flex-1 md:flex-none">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          )}
        </TabsContent>

        <TabsContent value="top" className="space-y-3">
          {filteredClients
            .sort((a, b) => b.totalVisits - a.totalVisits)
            .slice(0, 10)
            .map((client, index) => (
              <Card key={client.id} className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0 hover:scale-[1.01]">
                <CardContent className="p-4 md:p-6">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 rounded-full luxury-gradient flex items-center justify-center text-white">
                        #{index + 1}
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                        <div>
                          <h3 className="font-medium">{client.name}</h3>
                          <p className="text-sm text-muted-foreground">{client.totalVisits} visits • {formatKSH(client.totalSpent)} lifetime value</p>
                        </div>
                        <Button 
                          size="sm" 
                          onClick={() => sendReminder(client)}
                          className="luxury-gradient text-white"
                        >
                          <Mail className="w-4 h-4 mr-2" />
                          Send Thank You
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
        </TabsContent>

        <TabsContent value="at-risk" className="space-y-3">
          {filteredClients
            .filter(c => c.retentionStatus === 'at-risk')
            .map((client) => (
              <Card key={client.id} className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0 hover:scale-[1.01] border-l-4 border-l-orange-500">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="w-5 h-5 text-orange-600" />
                        <h3 className="font-medium">{client.name}</h3>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">
                        Last visit: {client.daysSinceLastVisit} days ago • {client.totalVisits} total visits
                      </p>
                      <p className="text-sm text-orange-600">
                        ⚠️ Client hasn't visited in over 90 days - immediate follow-up recommended
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => sendReminder(client)}
                        className="luxury-gradient text-white"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Send Reminder
                      </Button>
                      <Button size="sm" variant="outline">
                        <Phone className="w-4 h-4 mr-2" />
                        Call
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredClients.filter(c => c.retentionStatus === 'at-risk').length === 0 && (
            <Card className="luxury-shadow border-0">
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600/20" />
                <p className="text-muted-foreground">No clients at risk! Great job maintaining relationships.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>

        <TabsContent value="lost" className="space-y-3">
          {filteredClients
            .filter(c => c.retentionStatus === 'lost')
            .map((client) => (
              <Card key={client.id} className="luxury-shadow hover:luxury-shadow-lg transition-all duration-300 border-0 hover:scale-[1.01] border-l-4 border-l-red-500">
                <CardContent className="p-4 md:p-6">
                  <div className="flex flex-col md:flex-row md:items-center gap-4">
                    <div className="flex-1">
                      <h3 className="font-medium mb-2">{client.name}</h3>
                      <p className="text-sm text-muted-foreground mb-2">
                        Last visit: {client.daysSinceLastVisit} days ago • {client.totalVisits} total visits
                      </p>
                      <p className="text-sm text-red-600">
                        🔴 Client hasn't visited in over 180 days - win-back campaign recommended
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        onClick={() => sendReminder(client)}
                        className="luxury-gradient text-white"
                      >
                        <Mail className="w-4 h-4 mr-2" />
                        Win-Back Offer
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          {filteredClients.filter(c => c.retentionStatus === 'lost').length === 0 && (
            <Card className="luxury-shadow border-0">
              <CardContent className="py-12 text-center">
                <CheckCircle className="w-16 h-16 mx-auto mb-4 text-green-600/20" />
                <p className="text-muted-foreground">No lost clients! Excellent retention.</p>
              </CardContent>
            </Card>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}