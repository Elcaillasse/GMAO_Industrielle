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
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Plus, Calendar, AlertTriangle, Clock, CheckCircle } from 'lucide-react';
import { maintenanceTasks, equipment, technicians } from '../data/mockData';
import { MaintenanceTask } from '../types/gmao';

export function MaintenanceManagement() {
  const [selectedTab, setSelectedTab] = useState('all');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getPriorityColor = (priority: MaintenanceTask['priority']) => {
    switch (priority) {
      case 'low':
        return 'bg-green-100 text-green-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'high':
        return 'bg-orange-100 text-orange-800';
      case 'critical':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'planned':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-orange-100 text-orange-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: MaintenanceTask['status']) => {
    switch (status) {
      case 'planned':
        return 'Planifiée';
      case 'in-progress':
        return 'En cours';
      case 'completed':
        return 'Terminée';
      case 'cancelled':
        return 'Annulée';
      default:
        return status;
    }
  };

  const filterTasks = (type: string) => {
    switch (type) {
      case 'preventive':
        return maintenanceTasks.filter(task => task.type === 'preventive');
      case 'corrective':
        return maintenanceTasks.filter(task => task.type === 'corrective');
      case 'urgent':
        return maintenanceTasks.filter(task => task.priority === 'critical' || task.priority === 'high');
      default:
        return maintenanceTasks;
    }
  };

  const filteredTasks = filterTasks(selectedTab);

  const stats = {
    planned: maintenanceTasks.filter(t => t.status === 'planned').length,
    inProgress: maintenanceTasks.filter(t => t.status === 'in-progress').length,
    completed: maintenanceTasks.filter(t => t.status === 'completed').length,
    critical: maintenanceTasks.filter(t => t.priority === 'critical').length
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion de la Maintenance</h1>
          <p className="text-muted-foreground">
            Planifiez et suivez toutes vos interventions de maintenance
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Nouvelle intervention
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>Planifier une intervention</DialogTitle>
            </DialogHeader>
            <div className="grid grid-cols-2 gap-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="equipment">Équipement</Label>
                <Select>
                  {equipment.map(eq => (
                    <option key={eq.id} value={eq.id}>{eq.name}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="type">Type d'intervention</Label>
                <Select>
                  <option value="preventive">Maintenance préventive</option>
                  <option value="corrective">Maintenance corrective</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="priority">Priorité</Label>
                <Select>
                  <option value="low">Basse</option>
                  <option value="medium">Moyenne</option>
                  <option value="high">Haute</option>
                  <option value="critical">Critique</option>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="technician">Technicien assigné</Label>
                <Select>
                  {technicians.map(tech => (
                    <option key={tech.id} value={tech.id}>{tech.name}</option>
                  ))}
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="date">Date prévue</Label>
                <Input id="date" type="date" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="duration">Durée estimée (heures)</Label>
                <Input id="duration" type="number" placeholder="4" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="title">Titre de l'intervention</Label>
                <Input id="title" placeholder="Ex: Révision trimestrielle" />
              </div>
              <div className="col-span-2 space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea id="description" placeholder="Décrivez les tâches à effectuer..." />
              </div>
            </div>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setIsAddDialogOpen(false)}>
                Annuler
              </Button>
              <Button onClick={() => setIsAddDialogOpen(false)}>
                Planifier
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Statistiques */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Calendar className="size-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{stats.planned}</p>
              <p className="text-sm text-muted-foreground">Planifiées</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="size-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">{stats.inProgress}</p>
              <p className="text-sm text-muted-foreground">En cours</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="size-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">{stats.completed}</p>
              <p className="text-sm text-muted-foreground">Terminées</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <AlertTriangle className="size-8 text-red-500" />
            <div>
              <p className="text-2xl font-bold">{stats.critical}</p>
              <p className="text-sm text-muted-foreground">Critiques</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Onglets de filtrage */}
      <Tabs value={selectedTab} onValueChange={setSelectedTab}>
        <TabsList>
          <TabsTrigger value="all">Toutes</TabsTrigger>
          <TabsTrigger value="preventive">Préventives</TabsTrigger>
          <TabsTrigger value="corrective">Correctives</TabsTrigger>
          <TabsTrigger value="urgent">Urgentes</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-6">
          <Card>
            <Table>
              <thead>
                <tr>
                  <th>Intervention</th>
                  <th>Équipement</th>
                  <th>Type</th>
                  <th>Priorité</th>
                  <th>État</th>
                  <th>Technicien</th>
                  <th>Date prévue</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredTasks.map(task => {
                  const equipmentName = equipment.find(e => e.id === task.equipmentId)?.name || 'Équipement inconnu';
                  const technicianName = technicians.find(t => t.id === task.assignedTechnicianId)?.name || 'Non assigné';
                  
                  return (
                    <tr key={task.id}>
                      <td>
                        <div>
                          <p className="font-medium">{task.title}</p>
                          <p className="text-sm text-muted-foreground truncate max-w-xs">
                            {task.description}
                          </p>
                        </div>
                      </td>
                      <td>{equipmentName}</td>
                      <td>
                        <Badge variant={task.type === 'preventive' ? 'default' : 'secondary'}>
                          {task.type === 'preventive' ? 'Préventif' : 'Correctif'}
                        </Badge>
                      </td>
                      <td>
                        <Badge className={getPriorityColor(task.priority)}>
                          {task.priority}
                        </Badge>
                      </td>
                      <td>
                        <Badge className={getStatusColor(task.status)}>
                          {getStatusText(task.status)}
                        </Badge>
                      </td>
                      <td>{technicianName}</td>
                      <td>
                        {new Date(task.scheduledDate).toLocaleDateString('fr-FR')}
                      </td>
                      <td>
                        <div className="flex gap-2">
                          {task.status === 'planned' && (
                            <Button variant="outline" size="sm">
                              Démarrer
                            </Button>
                          )}
                          {task.status === 'in-progress' && (
                            <Button variant="outline" size="sm">
                              Terminer
                            </Button>
                          )}
                          <Button variant="outline" size="sm">
                            Modifier
                          </Button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </Table>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}