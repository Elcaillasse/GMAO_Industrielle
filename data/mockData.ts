import { Site, Equipment, Technician, MaintenanceTask, MaintenanceHistory } from '../types/gmao';

export const sites: Site[] = [
  {
    id: '1',
    name: 'Site de Production Nord',
    address: '123 Rue de l\'Industrie, 59000 Lille',
    equipmentCount: 15
  },
  {
    id: '2',
    name: 'Site de Production Sud',
    address: '456 Avenue des Machines, 13000 Marseille',
    equipmentCount: 12
  }
];

export const equipment: Equipment[] = [
  {
    id: '1',
    name: 'Presse hydraulique A1',
    type: 'machine',
    model: 'PH-2000X',
    manufacturer: 'HydroTech',
    serialNumber: 'HT-PH-001',
    installationDate: '2022-03-15',
    siteId: '1',
    status: 'operational',
    lastMaintenance: '2024-08-15',
    nextMaintenance: '2024-11-15'
  },
  {
    id: '2',
    name: 'Convoyeur principal',
    type: 'equipment',
    model: 'CV-500',
    manufacturer: 'ConveyTech',
    serialNumber: 'CT-CV-002',
    installationDate: '2021-11-20',
    siteId: '1',
    status: 'maintenance',
    lastMaintenance: '2024-09-10',
    nextMaintenance: '2024-12-10'
  },
  {
    id: '3',
    name: 'Robot de soudage R1',
    type: 'machine',
    model: 'RB-W300',
    manufacturer: 'RoboWeld',
    serialNumber: 'RW-RB-003',
    installationDate: '2023-01-10',
    siteId: '1',
    status: 'breakdown',
    lastMaintenance: '2024-07-20',
    nextMaintenance: '2024-10-20'
  },
  {
    id: '4',
    name: 'Compresseur d\'air C1',
    type: 'equipment',
    model: 'AC-150',
    manufacturer: 'AirComp',
    serialNumber: 'AC-C1-004',
    installationDate: '2022-05-30',
    siteId: '2',
    status: 'operational',
    lastMaintenance: '2024-09-05',
    nextMaintenance: '2024-12-05'
  },
  {
    id: '5',
    name: 'Tour CNC T1',
    type: 'machine',
    model: 'CNC-T500',
    manufacturer: 'PrecisionTech',
    serialNumber: 'PT-T1-005',
    installationDate: '2023-06-12',
    siteId: '2',
    status: 'operational',
    lastMaintenance: '2024-08-30',
    nextMaintenance: '2024-11-30'
  }
];

export const technicians: Technician[] = [
  {
    id: '1',
    name: 'Jean Dupont',
    email: 'jean.dupont@company.com',
    phone: '06 12 34 56 78',
    specialties: ['Hydraulique', 'Mécanique'],
    available: true
  },
  {
    id: '2',
    name: 'Marie Martin',
    email: 'marie.martin@company.com',
    phone: '06 98 76 54 32',
    specialties: ['Électricité', 'Automatisme'],
    available: false
  },
  {
    id: '3',
    name: 'Pierre Durand',
    email: 'pierre.durand@company.com',
    phone: '06 55 44 33 22',
    specialties: ['Soudage', 'Robotique'],
    available: true
  },
  {
    id: '4',
    name: 'Sophie Leroy',
    email: 'sophie.leroy@company.com',
    phone: '06 11 22 33 44',
    specialties: ['Pneumatique', 'CNC'],
    available: true
  }
];

export const maintenanceTasks: MaintenanceTask[] = [
  {
    id: '1',
    equipmentId: '1',
    type: 'preventive',
    title: 'Révision trimestrielle presse hydraulique',
    description: 'Vérification des joints, changement d\'huile, contrôle pression',
    priority: 'medium',
    status: 'planned',
    assignedTechnicianId: '1',
    scheduledDate: '2024-11-15',
    estimatedDuration: 4
  },
  {
    id: '2',
    equipmentId: '2',
    type: 'corrective',
    title: 'Réparation convoyeur - courroie cassée',
    description: 'Remplacement de la courroie principale du convoyeur',
    priority: 'high',
    status: 'in-progress',
    assignedTechnicianId: '2',
    scheduledDate: '2024-09-22',
    estimatedDuration: 3
  },
  {
    id: '3',
    equipmentId: '3',
    type: 'corrective',
    title: 'Panne robot de soudage - bras bloqué',
    description: 'Diagnostic et réparation du système de rotation du bras',
    priority: 'critical',
    status: 'planned',
    assignedTechnicianId: '3',
    scheduledDate: '2024-09-23',
    estimatedDuration: 6
  },
  {
    id: '4',
    equipmentId: '4',
    type: 'preventive',
    title: 'Maintenance préventive compresseur',
    description: 'Changement des filtres, vérification des niveaux',
    priority: 'low',
    status: 'completed',
    assignedTechnicianId: '4',
    scheduledDate: '2024-09-05',
    completedDate: '2024-09-05',
    estimatedDuration: 2,
    actualDuration: 1.5,
    cost: 150
  }
];

export const maintenanceHistory: MaintenanceHistory[] = [
  {
    id: '1',
    equipmentId: '1',
    taskId: '4',
    date: '2024-09-05',
    type: 'preventive',
    description: 'Maintenance préventive compresseur - Changement des filtres',
    technicianId: '4',
    duration: 1.5,
    cost: 150,
    notes: 'Maintenance effectuée sans problème'
  },
  {
    id: '2',
    equipmentId: '2',
    taskId: '1',
    date: '2024-08-15',
    type: 'preventive',
    description: 'Révision mensuelle convoyeur',
    technicianId: '1',
    duration: 2,
    cost: 100
  },
  {
    id: '3',
    equipmentId: '3',
    taskId: '2',
    date: '2024-08-10',
    type: 'corrective',
    description: 'Réparation capteur de position',
    technicianId: '3',
    duration: 3,
    cost: 250,
    notes: 'Remplacement du capteur défectueux'
  }
];