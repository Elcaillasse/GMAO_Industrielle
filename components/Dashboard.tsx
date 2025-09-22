import React from 'react';
import { Card } from './ui/card';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { AlertTriangle, Wrench, Calendar, TrendingUp } from 'lucide-react';
import { equipment, maintenanceTasks, sites } from '../data/mockData';

export function Dashboard() {
  const totalEquipment = equipment.length;
  const operationalEquipment = equipment.filter(e => e.status === 'operational').length;
  const maintenanceEquipment = equipment.filter(e => e.status === 'maintenance').length;
  const breakdownEquipment = equipment.filter(e => e.status === 'breakdown').length;
  
  const upcomingTasks = maintenanceTasks.filter(t => t.status === 'planned').length;
  const inProgressTasks = maintenanceTasks.filter(t => t.status === 'in-progress').length;
  const criticalTasks = maintenanceTasks.filter(t => t.priority === 'critical').length;
  
  const operationalRate = (operationalEquipment / totalEquipment) * 100;

  return (
    <div className="space-y-6">
      <div>
        <h1>Tableau de Bord GMAO</h1>
        <p className="text-muted-foreground">
          Vue d'ensemble de la maintenance industrielle
        </p>
      </div>

      {/* KPIs principaux */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Équipements</p>
              <p className="text-3xl font-bold">{totalEquipment}</p>
            </div>
            <Wrench className="size-8 text-blue-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-green-600">
                {operationalEquipment} opérationnels
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Taux Disponibilité</p>
              <p className="text-3xl font-bold">{operationalRate.toFixed(1)}%</p>
            </div>
            <TrendingUp className="size-8 text-green-500" />
          </div>
          <div className="mt-4">
            <Progress value={operationalRate} className="h-2" />
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Interventions Prévues</p>
              <p className="text-3xl font-bold">{upcomingTasks}</p>
            </div>
            <Calendar className="size-8 text-orange-500" />
          </div>
          <div className="mt-4">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-blue-600">
                {inProgressTasks} en cours
              </Badge>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-muted-foreground">Alertes Critiques</p>
              <p className="text-3xl font-bold text-red-600">{criticalTasks}</p>
            </div>
            <AlertTriangle className="size-8 text-red-500" />
          </div>
          <div className="mt-4">
            <Badge variant="destructive">
              Action requise
            </Badge>
          </div>
        </Card>
      </div>

      {/* État des équipements par site */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3>État des Équipements</h3>
          <div className="mt-4 space-y-4">
            <div className="flex items-center justify-between">
              <span>Opérationnels</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                <span>{operationalEquipment}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>En maintenance</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
                <span>{maintenanceEquipment}</span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span>En panne</span>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span>{breakdownEquipment}</span>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3>Répartition par Site</h3>
          <div className="mt-4 space-y-4">
            {sites.map(site => {
              const siteEquipment = equipment.filter(e => e.siteId === site.id);
              const siteOperational = siteEquipment.filter(e => e.status === 'operational').length;
              const siteRate = (siteOperational / siteEquipment.length) * 100;
              
              return (
                <div key={site.id} className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span>{site.name}</span>
                    <span>{siteOperational}/{siteEquipment.length}</span>
                  </div>
                  <Progress value={siteRate} className="h-2" />
                </div>
              );
            })}
          </div>
        </Card>
      </div>

      {/* Prochaines interventions */}
      <Card className="p-6">
        <h3>Prochaines Interventions</h3>
        <div className="mt-4 space-y-3">
          {maintenanceTasks
            .filter(task => task.status === 'planned' || task.status === 'in-progress')
            .slice(0, 5)
            .map(task => {
              const equipmentName = equipment.find(e => e.id === task.equipmentId)?.name || 'Équipement inconnu';
              const priorityColor = {
                low: 'text-green-600',
                medium: 'text-orange-600',
                high: 'text-red-600',
                critical: 'text-red-800'
              }[task.priority];
              
              return (
                <div key={task.id} className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex-1">
                    <p className="font-medium">{task.title}</p>
                    <p className="text-sm text-muted-foreground">{equipmentName}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={task.type === 'preventive' ? 'default' : 'secondary'}
                    >
                      {task.type === 'preventive' ? 'Préventif' : 'Correctif'}
                    </Badge>
                    <Badge 
                      variant="outline" 
                      className={priorityColor}
                    >
                      {task.priority}
                    </Badge>
                    <span className="text-sm text-muted-foreground">
                      {new Date(task.scheduledDate).toLocaleDateString('fr-FR')}
                    </span>
                  </div>
                </div>
              );
            })}
        </div>
      </Card>
    </div>
  );
}