import React, { useState } from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Table } from './ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from './ui/dialog';
import { Label } from './ui/label';
import { Avatar, AvatarFallback } from './ui/avatar';
import { Plus, Phone, Mail, User, CheckCircle, Clock } from 'lucide-react';
import { technicians, maintenanceTasks } from '../data/mockData';

export function TechnicianManagement() {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);

  const getTechnicianStats = (technicianId: string) => {
    const assignedTasks = maintenanceTasks.filter(task => task.assignedTechnicianId === technicianId);
    const completedTasks = assignedTasks.filter(task => task.status === 'completed');
    const inProgressTasks = assignedTasks.filter(task => task.status === 'in-progress');
    
    return {
      total: assignedTasks.length,
      completed: completedTasks.length,
      inProgress: inProgressTasks.length
    };
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1>Gestion des Techniciens</h1>
          <p className="text-muted-foreground">
            Gérez votre équipe de maintenance
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="size-4 mr-2" />
              Ajouter un technicien
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-lg">
            <DialogHeader>
              <DialogTitle>Ajouter un nouveau technicien</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input id="name" placeholder="Ex: Jean Dupont" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" placeholder="jean.dupont@company.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input id="phone" placeholder="06 12 34 56 78" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="specialties">Spécialités</Label>
                <Input id="specialties" placeholder="Ex: Hydraulique, Mécanique" />
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

      {/* Statistiques générales */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <User className="size-8 text-blue-500" />
            <div>
              <p className="text-2xl font-bold">{technicians.length}</p>
              <p className="text-sm text-muted-foreground">Techniciens</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <CheckCircle className="size-8 text-green-500" />
            <div>
              <p className="text-2xl font-bold">
                {technicians.filter(t => t.available).length}
              </p>
              <p className="text-sm text-muted-foreground">Disponibles</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <Clock className="size-8 text-orange-500" />
            <div>
              <p className="text-2xl font-bold">
                {technicians.filter(t => !t.available).length}
              </p>
              <p className="text-sm text-muted-foreground">Occupés</p>
            </div>
          </div>
        </Card>
        <Card className="p-4">
          <div className="flex items-center gap-3">
            <div className="size-8 bg-purple-100 rounded-full flex items-center justify-center">
              <span className="text-purple-600 font-bold">%</span>
            </div>
            <div>
              <p className="text-2xl font-bold">
                {Math.round((technicians.filter(t => t.available).length / technicians.length) * 100)}%
              </p>
              <p className="text-sm text-muted-foreground">Disponibilité</p>
            </div>
          </div>
        </Card>
      </div>

      {/* Liste des techniciens */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {technicians.map(technician => {
          const stats = getTechnicianStats(technician.id);
          const initials = technician.name.split(' ').map(n => n[0]).join('').toUpperCase();
          
          return (
            <Card key={technician.id} className="p-6">
              <div className="flex items-start gap-4">
                <Avatar className="size-12">
                  <AvatarFallback>{initials}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="font-semibold">{technician.name}</h3>
                    <Badge variant={technician.available ? 'default' : 'secondary'}>
                      {technician.available ? 'Disponible' : 'Occupé'}
                    </Badge>
                  </div>
                  
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Mail className="size-4" />
                      {technician.email}
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Phone className="size-4" />
                      {technician.phone}
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-sm font-medium mb-2">Spécialités:</p>
                    <div className="flex flex-wrap gap-1">
                      {technician.specialties.map(specialty => (
                        <Badge key={specialty} variant="outline" className="text-xs">
                          {specialty}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="grid grid-cols-3 gap-3 pt-3 border-t">
                    <div className="text-center">
                      <p className="text-lg font-bold text-blue-600">{stats.total}</p>
                      <p className="text-xs text-muted-foreground">Total tâches</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-orange-600">{stats.inProgress}</p>
                      <p className="text-xs text-muted-foreground">En cours</p>
                    </div>
                    <div className="text-center">
                      <p className="text-lg font-bold text-green-600">{stats.completed}</p>
                      <p className="text-xs text-muted-foreground">Terminées</p>
                    </div>
                  </div>

                  <div className="flex gap-2 mt-4">
                    <Button variant="outline" size="sm" className="flex-1">
                      Voir planning
                    </Button>
                    <Button variant="outline" size="sm" className="flex-1">
                      Modifier
                    </Button>
                  </div>
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Répartition des tâches */}
      <Card className="p-6">
        <h3 className="mb-4">Répartition des tâches actives</h3>
        <Table>
          <thead>
            <tr>
              <th>Technicien</th>
              <th>Tâches assignées</th>
              <th>En cours</th>
              <th>Planifiées</th>
              <th>Charge de travail</th>
            </tr>
          </thead>
          <tbody>
            {technicians.map(technician => {
              const assignedTasks = maintenanceTasks.filter(task => task.assignedTechnicianId === technician.id);
              const inProgressTasks = assignedTasks.filter(task => task.status === 'in-progress');
              const plannedTasks = assignedTasks.filter(task => task.status === 'planned');
              const workload = assignedTasks.reduce((total, task) => total + task.estimatedDuration, 0);
              
              return (
                <tr key={technician.id}>
                  <td>
                    <div className="flex items-center gap-2">
                      <Avatar className="size-8">
                        <AvatarFallback className="text-xs">
                          {technician.name.split(' ').map(n => n[0]).join('')}
                        </AvatarFallback>
                      </Avatar>
                      {technician.name}
                    </div>
                  </td>
                  <td>{assignedTasks.length}</td>
                  <td>{inProgressTasks.length}</td>
                  <td>{plannedTasks.length}</td>
                  <td>{workload}h</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </Card>
    </div>
  );
}