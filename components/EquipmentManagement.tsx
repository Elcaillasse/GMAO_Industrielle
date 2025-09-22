import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Select } from './ui/select';
import { Table } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Textarea } from './ui/textarea';
import { Plus, Search, Settings, AlertTriangle } from 'lucide-react';
import { equipment, sites } from '../data/mockData';
import { Equipment } from '../types/gmao';

export function EquipmentManagement() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedSite, setSelectedSite] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const filteredEquipment = equipment.filter(item => {
    const matchesSearch = item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.manufacturer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesSite = selectedSite === 'all' || item.siteId === selectedSite;
    const matchesStatus = selectedStatus === 'all' || item.status === selectedStatus;
    
    return matchesSearch && matchesSite && matchesStatus;
  });

  const getStatusColor = (status: Equipment['status']) => {
    switch (status) {
      case 'operational':
        return 'bg-green-100 text-green-800';
      case 'maintenance':
        return 'bg-orange-100 text-orange-800';
      case 'breakdown':
        return 'bg-red-100 text-red-800';
      case 'inactive':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: Equipment['status']) => {
    switch (status) {
      case 'operational':
        return 'Opérationnel';
      case 'maintenance':
        return 'En maintenance';
      case 'breakdown':
        return 'En panne';
      case 'inactive':
        return 'Inactif';
      default:
        return status;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des Équipements</h1>
          <p className="text-muted-foreground">
            Gérez tous vos équipements et machines industrielles
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Ajouter un équipement
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Ajouter un nouvel équipement</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom de l'équipement</Label>
                <Input id="name" placeholder="Ex: Presse hydraulique A1" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type</Label>
                <Select>
                  <option value="machine">Machine</option>
                  <option value="equipment">Équipement</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="manufacturer">Fabricant</Label>
                <Input id="manufacturer" placeholder="Ex: HydroTech" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="model">Modèle</Label>
                <Input id="model" placeholder="Ex: PH-2000X" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serial">Numéro de série</Label>
                <Input id="serial" placeholder="Ex: HT-PH-001" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="site">Site</Label>
                <Select>
                  {sites.map(site => (
                    <option key={site.id} value={site.id}>{site.name}</option>
                  ))}
                </Select>
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Description de l'équipement..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Ajouter
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Filtres */}
      <Card className="p-4">
        <div className="flex gap-4 items-center">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground size-4" />
            <Input
              placeholder="Rechercher un équipement..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
          <Select value={selectedSite} onChange={(e) => setSelectedSite(e.target.value)}>
            <option value="all">Tous les sites</option>
            {sites.map(site => (
              <option key={site.id} value={site.id}>{site.name}</option>
            ))}
          </Select>
          <Select value={selectedStatus} onChange={(e) => setSelectedStatus(e.target.value)}>
            <option value="all">Tous les états</option>
            <option value="operational">Opérationnel</option>
            <option value="maintenance">En maintenance</option>
            <option value="breakdown">En panne</option>
            <option value="inactive">Inactif</option>
          </Select>
        </div>
      </Card>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-green-600">
              {equipment.filter(e => e.status === 'operational').length}
            </p>
            <p className="text-sm text-muted-foreground">Opérationnels</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-orange-600">
              {equipment.filter(e => e.status === 'maintenance').length}
            </p>
            <p className="text-sm text-muted-foreground">En maintenance</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold text-red-600">
              {equipment.filter(e => e.status === 'breakdown').length}
            </p>
            <p className="text-sm text-muted-foreground">En panne</p>
          </div>
        </Card>
        <Card className="p-4">
          <div className="text-center">
            <p className="text-2xl font-bold">
              {equipment.length}
            </p>
            <p className="text-sm text-muted-foreground">Total</p>
          </div>
        </Card>
      </div>

      {/* Liste des équipements */}
      <Card>
        <Table>
          <thead>
            <tr>
              <th>Équipement</th>
              <th>Type</th>
              <th>Site</th>
              <th>État</th>
              <th>Dernière maintenance</th>
              <th>Prochaine maintenance</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredEquipment.map(item => {
              const site = sites.find(s => s.id === item.siteId);
              const isMaintenanceDue = item.nextMaintenance && 
                new Date(item.nextMaintenance) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
              
              return (
                <tr key={item.id}>
                  <td>
                    <div>
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {item.manufacturer} - {item.model}
                      </p>
                    </div>
                  </td>
                  <td>
                    <Badge variant="outline">
                      {item.type === 'machine' ? 'Machine' : 'Équipement'}
                    </Badge>
                  </td>
                  <td>{site?.name}</td>
                  <td>
                    <Badge className={getStatusColor(item.status)}>
                      {getStatusText(item.status)}
                    </Badge>
                  </td>
                  <td>
                    {item.lastMaintenance ? 
                      new Date(item.lastMaintenance).toLocaleDateString('fr-FR') : 
                      'Aucune'
                    }
                  </td>
                  <td>
                    <div className="flex items-center gap-2">
                      {item.nextMaintenance ? 
                        new Date(item.nextMaintenance).toLocaleDateString('fr-FR') : 
                        'Non planifiée'
                      }
                      {isMaintenanceDue && (
                        <AlertTriangle className="size-4 text-orange-500" />
                      )}
                    </div>
                  </td>
                  <td>
                    <div className="flex gap-2">
                      <Button variant="outline" size="sm">
                        <Settings className="size-4" />
                      </Button>
                      <Button variant="outline" size="sm">
                        Voir détails
                      </Button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}