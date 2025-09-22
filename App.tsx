import React, { useState } from 'react';
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarProvider, SidebarTrigger } from './components/ui/sidebar';
import { Dashboard } from './components/Dashboard';
import { EquipmentManagement } from './components/EquipmentManagement';
import { MaintenanceManagement } from './components/MaintenanceManagement';
import { TechnicianManagement } from './components/TechnicianManagement';
import { SiteManagement } from './components/SiteManagement';
import { BarChart3, Settings, Users, MapPin, Wrench, Calendar } from 'lucide-react';

const navigationItems = [
  {
    title: "Vue d'ensemble",
    items: [
      {
        title: "Tableau de bord",
        icon: BarChart3,
        id: "dashboard"
      }
    ]
  },
  {
    title: "Gestion",
    items: [
      {
        title: "Sites",
        icon: MapPin,
        id: "sites"
      },
      {
        title: "Équipements",
        icon: Settings,
        id: "equipment"
      },
      {
        title: "Maintenance",
        icon: Wrench,
        id: "maintenance"
      },
      {
        title: "Techniciens",
        icon: Users,
        id: "technicians"
      }
    ]
  }
];

export default function App() {
  const [activeView, setActiveView] = useState('dashboard');

  const renderActiveView = () => {
    switch (activeView) {
      case 'dashboard':
        return <Dashboard />;
      case 'sites':
        return <SiteManagement />;
      case 'equipment':
        return <EquipmentManagement />;
      case 'maintenance':
        return <MaintenanceManagement />;
      case 'technicians':
        return <TechnicianManagement />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <SidebarProvider>
      <div className="flex min-h-screen">
        <Sidebar>
          <SidebarContent>
            <div className="p-4">
              <h2 className="text-lg font-semibold">GMAO Industrielle</h2>
              <p className="text-sm text-muted-foreground">Système de maintenance</p>
            </div>
            {navigationItems.map((group) => (
              <SidebarGroup key={group.title}>
                <SidebarGroupLabel>{group.title}</SidebarGroupLabel>
                <SidebarGroupContent>
                  <SidebarMenu>
                    {group.items.map((item) => (
                      <SidebarMenuItem key={item.id}>
                        <SidebarMenuButton
                          onClick={() => setActiveView(item.id)}
                          isActive={activeView === item.id}
                        >
                          <item.icon className="size-4" />
                          <span>{item.title}</span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    ))}
                  </SidebarMenu>
                </SidebarGroupContent>
              </SidebarGroup>
            ))}
          </SidebarContent>
        </Sidebar>
        
        <main className="flex-1 p-6 overflow-auto">
          <div className="mb-4">
            <SidebarTrigger />
          </div>
          {renderActiveView()}
        </main>
      </div>
    </SidebarProvider>
  );
}