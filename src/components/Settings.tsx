import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Switch } from './ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Upload, Save } from 'lucide-react';

export default function Settings() {
  const [logo, setLogo] = useState<string | null>(null);

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1>Settings</h1>
        <p className="text-gray-600">Manage your salon preferences and configuration</p>
      </div>

      <Tabs defaultValue="business" className="space-y-4">
        <TabsList>
          <TabsTrigger value="business">Business Profile</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="payments">Payments</TabsTrigger>
          <TabsTrigger value="booking">Booking Rules</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
        </TabsList>

        {/* Business Profile */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Business Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Salon Logo</Label>
                <div className="mt-2 flex items-center gap-4">
                  {logo ? (
                    <img src={logo} alt="Logo" className="w-20 h-20 rounded-lg object-cover border" />
                  ) : (
                    <div className="w-20 h-20 rounded-lg bg-gray-100 flex items-center justify-center border">
                      <Upload className="w-6 h-6 text-gray-400" />
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoUpload}
                    className="hidden"
                    id="logo-upload"
                  />
                  <label htmlFor="logo-upload">
                    <Button variant="outline" as="span">
                      Upload Logo
                    </Button>
                  </label>
                </div>
              </div>

              <div>
                <Label>Business Name</Label>
                <Input defaultValue="Luxe Salon" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Phone Number</Label>
                  <Input defaultValue="+1 (555) 123-4567" />
                </div>
                <div>
                  <Label>Email</Label>
                  <Input type="email" defaultValue="contact@luxesalon.com" />
                </div>
              </div>

              <div>
                <Label>Address</Label>
                <Textarea defaultValue="123 Beauty Street, Fashion District, New York, NY 10001" />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label>Opening Hours</Label>
                  <Input defaultValue="9:00 AM" />
                </div>
                <div>
                  <Label>Closing Hours</Label>
                  <Input defaultValue="9:00 PM" />
                </div>
              </div>

              <div>
                <Label>Business Description</Label>
                <Textarea 
                  placeholder="Describe your salon..."
                  defaultValue="Premier salon offering luxury hair, nail, and spa services with expert stylists."
                />
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Notifications */}
        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle>Notification Preferences</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Email Notifications</p>
                    <p className="text-sm text-gray-600">Receive booking confirmations via email</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>SMS Notifications</p>
                    <p className="text-sm text-gray-600">Send SMS reminders to clients</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>New Booking Alerts</p>
                    <p className="text-sm text-gray-600">Get notified when new bookings are made</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Cancellation Alerts</p>
                    <p className="text-sm text-gray-600">Receive alerts for cancelled appointments</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Low Stock Alerts</p>
                    <p className="text-sm text-gray-600">Get notified when inventory is low</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Daily Summary</p>
                    <p className="text-sm text-gray-600">Receive daily business summary report</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Preferences
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Payments */}
        <TabsContent value="payments">
          <Card>
            <CardHeader>
              <CardTitle>Payment Configuration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Accept Cash Payments</p>
                    <p className="text-sm text-gray-600">Allow cash payment at checkout</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Accept Card Payments</p>
                    <p className="text-sm text-gray-600">Accept credit/debit cards</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Accept Digital Payments</p>
                    <p className="text-sm text-gray-600">Apple Pay, Google Pay, etc.</p>
                  </div>
                  <Switch defaultChecked />
                </div>

                <div className="flex items-center justify-between p-4 border rounded-lg">
                  <div>
                    <p>Require Deposit</p>
                    <p className="text-sm text-gray-600">Require deposit for bookings</p>
                  </div>
                  <Switch />
                </div>
              </div>

              <div>
                <Label>Sales Tax Rate (%)</Label>
                <Input type="number" defaultValue="8.5" />
              </div>

              <div>
                <Label>Currency</Label>
                <Input defaultValue="USD ($)" />
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Payment Settings
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Booking Rules */}
        <TabsContent value="booking">
          <Card>
            <CardHeader>
              <CardTitle>Booking Rules & Policies</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div>
                <Label>Advance Booking Window (days)</Label>
                <Input type="number" defaultValue="60" />
                <p className="text-sm text-gray-600 mt-1">How far in advance can clients book?</p>
              </div>

              <div>
                <Label>Minimum Booking Notice (hours)</Label>
                <Input type="number" defaultValue="2" />
                <p className="text-sm text-gray-600 mt-1">Minimum time before appointment can be booked</p>
              </div>

              <div>
                <Label>Cancellation Policy</Label>
                <Textarea 
                  defaultValue="Appointments must be cancelled at least 24 hours in advance. Late cancellations may incur a fee."
                  rows={4}
                />
              </div>

              <div>
                <Label>Buffer Time Between Appointments (minutes)</Label>
                <Input type="number" defaultValue="15" />
                <p className="text-sm text-gray-600 mt-1">Time between appointments for cleanup</p>
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p>Allow Online Booking</p>
                  <p className="text-sm text-gray-600">Let clients book appointments online</p>
                </div>
                <Switch defaultChecked />
              </div>

              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div>
                  <p>Auto-Confirm Bookings</p>
                  <p className="text-sm text-gray-600">Automatically confirm new bookings</p>
                </div>
                <Switch />
              </div>

              <Button>
                <Save className="w-4 h-4 mr-2" />
                Save Booking Rules
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users */}
        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>User Management</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                    AD
                  </div>
                  <div>
                    <p>Admin User</p>
                    <p className="text-sm text-gray-600">admin@luxesalon.com</p>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Edit</Button>
                  <Button variant="outline" size="sm">Remove</Button>
                </div>
              </div>

              <Button className="w-full">
                <Plus className="w-4 h-4 mr-2" />
                Add New User
              </Button>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
