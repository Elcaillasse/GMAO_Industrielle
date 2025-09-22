export interface Site {
  id: string;
  name: string;
  address: string;
  equipmentCount: number;
}

export interface Equipment {
  id: string;
  name: string;
  type: 'machine' | 'equipment';
  model: string;
  manufacturer: string;
  serialNumber: string;
  installationDate: string;
  siteId: string;
  status: 'operational' | 'maintenance' | 'breakdown' | 'inactive';
  lastMaintenance?: string;
  nextMaintenance?: string;
}

export interface Technician {
  id: string;
  name: string;
  email: string;
  phone: string;
  specialties: string[];
  available: boolean;
}

export interface MaintenanceTask {
  id: string;
  equipmentId: string;
  type: 'corrective' | 'preventive';
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  status: 'planned' | 'in-progress' | 'completed' | 'cancelled';
  assignedTechnicianId?: string;
  scheduledDate: string;
  completedDate?: string;
  estimatedDuration: number; // in hours
  actualDuration?: number; // in hours
  notes?: string;
  cost?: number;
}

export interface MaintenanceHistory {
  id: string;
  equipmentId: string;
  taskId: string;
  date: string;
  type: 'corrective' | 'preventive';
  description: string;
  technicianId: string;
  duration: number;
  cost: number;
  notes?: string;
}