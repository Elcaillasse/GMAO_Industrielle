import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Progress } from './ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Plus, MapPin, Settings, TrendingUp, AlertTriangle } from 'lucide-react';
import { sites, equipment, maintenanceTasks } from '../data/mockData';

export function SiteManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getSiteStats = (siteId: string) => {
    const siteEquipment = equipment.filter(e => e.siteId === siteId);
    const operationalCount = siteEquipment.filter(e => e.status === 'operational').length;
    const maintenanceCount = siteEquipment.filter(e => e.status === 'maintenance').length;
    const breakdownCount = siteEquipment.filter(e => e.status === 'breakdown').length;
    const operationalRate = siteEquipment.length > 0 ? (operationalCount / siteEquipment.length) * 100 : 0;

    const siteTasks = maintenanceTasks.filter(task => {
      const taskEquipment = equipment.find(e => e.id === task.equipmentId);
      return taskEquipment?.siteId === siteId;
    });
    const urgentTasks = siteTasks.filter(task => task.priority === 'critical' || task.priority === 'high').length;

    return {
      total: siteEquipment.length,
      operational: operationalCount,
      maintenance: maintenanceCount,
      breakdown: breakdownCount,
      operationalRate: Math.round(operationalRate),
      urgentTasks
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des Sites</h1>
          <p className="text-muted-foreground">
            Vue d'ensemble de vos sites de production
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Ajouter un site
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau site</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="siteName">Nom du site</Label>
                <Input id="siteName" placeholder="Ex: Site de Production Est" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Adresse</Label>
                <Textarea id="address" placeholder="Adresse complète du site" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="manager">Responsable de site</Label>
                <Input id="manager" placeholder="Nom du responsable" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="Numéro de téléphone" />
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

      {/* Vue d'ensemble */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <MapPin className="size-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{sites.length}</p>
              <p className="text-sm text-muted-foreground">Sites actifs</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Settings className="size-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{equipment.length}</p>
              <p className="text-sm text-muted-foreground">Total équipements</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <TrendingUp className="size-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">
                {Math.round((equipment.filter(e => e.status === 'operational').length / equipment.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Disponibilité globale</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Cartes des sites */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {sites.map(site => {
          const stats = getSiteStats(site.id);
          
          return (
            <Card key={site.id} className="p-6">
              <div className="flex items-start justify-between mb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-blue-100 rounded-lg">
                    <MapPin className="size-6 text-blue-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold">{site.name}</h3>
                    <p className="text-sm text-muted-foreground">{site.address}</p>
                  </div>
                </div>
                <Button variant="outline" size="sm">
                  <Settings className="size-4" />
                </Button>
              </div>

              {/* Indicateurs de performance */}
              <div className="space-y-4">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-sm font-medium">Disponibilité des équipements</span>
                    <span className="text-sm font-bold">{stats.operationalRate}%</span>
                  </div>
                  <Progress value={stats.operationalRate} className="h-2" />
                </div>

                <div className="grid grid-cols-4 gap-3">
                  <div className="text-center">
                    <p className="text-lg font-bold">{stats.total}</p>
                    <p className="text-xs text-muted-foreground">Total</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-green-600">{stats.operational}</p>
                    <p className="text-xs text-muted-foreground">OK</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-orange-600">{stats.maintenance}</p>
                    <p className="text-xs text-muted-foreground">Maintenance</p>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold text-red-600">{stats.breakdown}</p>
                    <p className="text-xs text-muted-foreground">Panne</p>
                  </div>
                </div>

                {stats.urgentTasks > 0 && (
                  <div className="flex items-center gap-2 p-3 bg-red-50 rounded-lg">
                    <AlertTriangle className="size-5 text-red-500" />
                    <div>
                      <p className="text-sm font-medium text-red-800">
                        {stats.urgentTasks} intervention(s) urgente(s)
                      </p>
                      <p className="text-xs text-red-600">
                        Action requise immédiatement
                      </p>
                    </div>
                  </div>
                )}

                <div className="flex gap-2 pt-2">
                  <Button variant="outline" size="sm" className="flex-1">
                    Voir équipements
                  </Button>
                  <Button variant="outline" size="sm" className="flex-1">
                    Planning
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Comparaison des sites */}
      <Card className="p-6">
        <h3 className="mb-4">Comparaison des performances</h3>
        <div className="space-y-4">
          {sites.map(site => {
            const stats = getSiteStats(site.id);
            
            return (
              <div key={site.id} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="font-medium">{site.name}</span>
                  <div className="flex items-center gap-4">
                    <Badge variant="outline">
                      {stats.total} équipements
                    </Badge>
                    <span className="text-sm font-bold">{stats.operationalRate}%</span>
                  </div>
                </div>
                <Progress value={stats.operationalRate} className="h-3" />
              </div>
            );
          })}
        </div>
      </Card>

      {/* Équipements par site */}
      <Card className="p-6">
        <h3 className="mb-4">Répartition des équipements</h3>
        <div className="space-y-4">
          {sites.map(site => {
            const siteEquipment = equipment.filter(e => e.siteId === site.id);
            const equipmentByType = {
              machine: siteEquipment.filter(e => e.type === 'machine').length,
              equipment: siteEquipment.filter(e => e.type === 'equipment').length
            };
            
            return (
              <div key={site.id} className="p-4 border rounded-lg">
                <div className="flex items-center justify-between mb-3">
                  <h4 className="font-medium">{site.name}</h4>
                  <Badge variant="outline">{siteEquipment.length} total</Badge>
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Machines</span>
                    <Badge variant="secondary">{equipmentByType.machine}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Équipements</span>
                    <Badge variant="secondary">{equipmentByType.equipment}</Badge>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </Card>
    </div>
  );
}