
'use client';

import { useAuth } from '@/context/auth-context';
import {
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  Home,
  Package,
  BarChart3,
  Users,
  BrainCircuit,
  PlusCircle,
  Calendar,
} from 'lucide-react';
import { usePathname } from 'next/navigation';
import Link from 'next/link';

export function MainNav() {
  const { user } = useAuth();
  const pathname = usePathname();

  const menuItems = [
    {
      href: '/dashboard',
      label: 'Dashboard',
      icon: Home,
      roles: ['Admin', 'Supervisor', 'Cutter', 'Machine', 'Packing'],
    },
    {
      href: '/dashboard/orders',
      label: 'Orders',
      icon: Package,
      roles: ['Admin', 'Supervisor', 'Cutter', 'Machine', 'Packing'],
    },
    {
      href: '/dashboard/create-task',
      label: 'Create Task',
      icon: PlusCircle,
      roles: ['Cutter', 'Packing'],
    },
    {
      href: '/dashboard/production-calendar',
      label: 'Production Calendar',
      icon: Calendar,
      roles: ['Admin', 'Supervisor'],
    },
    {
      href: '/dashboard/reports',
      label: 'Reports',
      icon: BarChart3,
      roles: ['Admin', 'Supervisor'],
    },
    {
      href: '/dashboard/summary',
      label: 'AI Summary',
      icon: BrainCircuit,
      roles: ['Admin', 'Supervisor'],
    },
    {
      href: '/dashboard/admin',
      label: 'User Management',
      icon: Users,
      roles: ['Admin'],
    },
  ];

  if (!user) return null;

  return (
    <SidebarMenu>
      {menuItems.map(
        (item) =>
          item.roles.includes(user.role) && (
            <SidebarMenuItem key={item.href}>
              <Link href={item.href} className="w-full">
                <SidebarMenuButton
                  isActive={pathname === item.href}
                  tooltip={item.label}
                >
                  <item.icon />
                  <span>{item.label}</span>
                </SidebarMenuButton>
              </Link>
            </SidebarMenuItem>
          )
      )}
    </SidebarMenu>
  );
}
