import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Label } from './ui/label';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from './ui/dialog';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { mockInventory } from '../lib/mockData';
import { Plus, Package, AlertTriangle, Search } from 'lucide-react';
import { Badge } from './ui/badge';

export default function Inventory() {
  const [showAddModal, setShowAddModal] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterCategory, setFilterCategory] = useState('all');

  const filteredInventory = mockInventory.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = filterCategory === 'all' || item.category === filterCategory;
    return matchesSearch && matchesCategory;
  });

  const lowStockItems = mockInventory.filter(item => item.stock <= item.minStock);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1>Inventory Management</h1>
          <p className="text-gray-600">Track products and supplies</p>
        </div>
        <Button onClick={() => setShowAddModal(true)}>
          <Plus className="w-4 h-4 mr-2" />
          Add Product
        </Button>
      </div>

      {/* Alerts */}
      {lowStockItems.length > 0 && (
        <Card className="border-yellow-200 bg-yellow-50">
          <CardContent className="pt-6">
            <div className="flex items-start gap-3">
              <AlertTriangle className="w-5 h-5 text-yellow-600 mt-0.5" />
              <div>
                <p className="text-yellow-900">
                  {lowStockItems.length} item(s) running low on stock
                </p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {lowStockItems.map(item => (
                    <Badge key={item.id} variant="outline" className="bg-white">
                      {item.name}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <Input
                placeholder="Search products..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Select value={filterCategory} onValueChange={setFilterCategory}>
              <SelectTrigger>
                <SelectValue placeholder="Filter by Category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Hair Care">Hair Care</SelectItem>
                <SelectItem value="Color">Color</SelectItem>
                <SelectItem value="Nails">Nails</SelectItem>
                <SelectItem value="Spa">Spa</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      {/* Inventory List */}
      <Card>
        <CardHeader>
          <CardTitle>Product Inventory</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b">
                  <th className="text-left pb-3 px-4">Product</th>
                  <th className="text-left pb-3 px-4">Category</th>
                  <th className="text-left pb-3 px-4">Stock</th>
                  <th className="text-left pb-3 px-4">Min Stock</th>
                  <th className="text-left pb-3 px-4">Unit</th>
                  <th className="text-left pb-3 px-4">Last Restocked</th>
                  <th className="text-left pb-3 px-4">Status</th>
                  <th className="text-left pb-3 px-4">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredInventory.map((item) => {
                  const isLowStock = item.stock <= item.minStock;
                  return (
                    <tr key={item.id} className="border-b hover:bg-gray-50">
                      <td className="py-4 px-4">
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center">
                            <Package className="w-5 h-5 text-purple-600" />
                          </div>
                          <div>
                            <p>{item.name}</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-4 px-4">
                        <Badge variant="outline">{item.category}</Badge>
                      </td>
                      <td className="py-4 px-4">
                        <span className={isLowStock ? 'text-red-600' : ''}>
                          {item.stock}
                        </span>
                      </td>
                      <td className="py-4 px-4">{item.minStock}</td>
                      <td className="py-4 px-4">{item.unit}</td>
                      <td className="py-4 px-4">
                        {new Date(item.lastRestocked).toLocaleDateString()}
                      </td>
                      <td className="py-4 px-4">
                        {isLowStock ? (
                          <Badge className="bg-red-100 text-red-700">Low Stock</Badge>
                        ) : (
                          <Badge className="bg-green-100 text-green-700">In Stock</Badge>
                        )}
                      </td>
                      <td className="py-4 px-4">
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline">
                            Restock
                          </Button>
                          <Button size="sm" variant="outline">
                            Edit
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Add Product Modal */}
      {showAddModal && (
        <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
          <DialogContent className="max-w-md">
            <DialogHeader>
              <DialogTitle>Add New Product</DialogTitle>
              <DialogDescription>
                Add a new product to your inventory.
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label>Product Name</Label>
                <Input placeholder="e.g., Shampoo - Moisturizing" />
              </div>
              <div>
                <Label>Category</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hair">Hair Care</SelectItem>
                    <SelectItem value="color">Color</SelectItem>
                    <SelectItem value="nails">Nails</SelectItem>
                    <SelectItem value="spa">Spa</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label>Current Stock</Label>
                  <Input type="number" placeholder="0" />
                </div>
                <div>
                  <Label>Minimum Stock</Label>
                  <Input type="number" placeholder="0" />
                </div>
              </div>
              <div>
                <Label>Unit</Label>
                <Input placeholder="e.g., bottles, tubes, units" />
              </div>
              <div className="flex gap-2 pt-4">
                <Button className="flex-1">Add Product</Button>
                <Button variant="outline" className="flex-1" onClick={() => setShowAddModal(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </div>
  );
}