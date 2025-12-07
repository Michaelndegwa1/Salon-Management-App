import { useState } from 'react';
import { Card, CardContent } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { mockClients } from '../lib/mockData';
import { Search, Plus, Mail, Phone, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function ClientManagement() {
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('list');

  const filteredClients = mockClients.filter(client =>
    client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    client.phone.includes(searchQuery)
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Client Management</h1>
          <p className="text-gray-600">Manage your client database</p>
        </div>
        <Button>
          <Plus className="w-4 h-4 mr-2" />
          Add New Client
        </Button>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search by name, email, or phone..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="flex gap-2">
              <Button
                variant={viewMode === 'list' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('list')}
              >
                List
              </Button>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setViewMode('grid')}
              >
                Grid
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Client List View */}
      {viewMode === 'list' && (
        <Card>
          <CardContent className="pt-6">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b">
                    <th className="text-left pb-3 px-4">Client</th>
                    <th className="text-left pb-3 px-4">Contact</th>
                    <th className="text-left pb-3 px-4">Last Visit</th>
                    <th className="text-left pb-3 px-4">Total Visits</th>
                    <th className="text-left pb-3 px-4">Total Spent</th>
                    <th className="text-left pb-3 px-4">Loyalty Points</th>
                    <th className="text-left pb-3 px-4">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredClients.map((client) => (
                    <tr key={client.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-purple-100 flex items-center justify-center">
                            <span className="text-sm">
                              {client.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div>
                            <p>{client.name}</p>
                            {client.notes && (
                              <p className="text-xs text-gray-600">VIP</p>
                            )}
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <div className="space-y-1">
                          <p className="text-sm flex items-center gap-2">
                            <Phone className="w-3 h-3" />
                            {client.phone}
                          </p>
                          <p className="text-sm flex items-center gap-2 text-gray-600">
                            <Mail className="w-3 h-3" />
                            {client.email}
                          </p>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        {new Date(client.lastVisit).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        {client.totalVisits}
                      </td>
                      <td className="py-4 px-4">
                        ${client.totalSpent.toLocaleString()}
                      </td>
                      <td className="py-4 px-4">
                        <span className="flex items-center gap-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                          {client.loyaltyPoints}
                        </span>
                      </td>
                      <td className="py-4 px-4">
                        <Link to={`/clients/${client.id}`}>
                          <Button size="sm" variant="outline">
                            View Details
                          </Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Client Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredClients.map((client) => (
            <Card key={client.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="space-y-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center">
                        <span>{client.name.split(' ').map(n => n[0]).join('')}</span>
                      </div>
                      <div>
                        <p>{client.name}</p>
                        <p className="text-sm text-gray-600">{client.phone}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-1 text-sm">
                      <Star className="w-4 h-4 text-yellow-500 fill-yellow-500" />
                      {client.loyaltyPoints}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 gap-3 py-3 border-y">
                    <div>
                      <p className="text-xs text-gray-600">Total Visits</p>
                      <p className="text-lg">{client.totalVisits}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-600">Total Spent</p>
                      <p className="text-lg">${client.totalSpent}</p>
                    </div>
                  </div>

                  <div>
                    <p className="text-xs text-gray-600">Last Visit</p>
                    <p className="text-sm">{new Date(client.lastVisit).toLocaleDateString()}</p>
                  </div>

                  <Link to={`/clients/${client.id}`}>
                    <Button variant="outline" className="w-full">
                      View Profile
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
