'use client';

import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  LayoutDashboard,
  Briefcase,
  Calendar,
  FileText,
  Bell,
  Settings,
  X,
  Users,
  Shield,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

const navigation = [
  {
    name: 'Dashboard',
    href: '/dashboard',
    icon: LayoutDashboard,
    adminOnly: false,
  },
  {
    name: 'Candidatures',
    href: '/applications',
    icon: Briefcase,
    adminOnly: false,
  },
  {
    name: 'Entretiens',
    href: '/interviews',
    icon: Calendar,
    adminOnly: false,
  },
  {
    name: 'Documents',
    href: '/documents',
    icon: FileText,
    adminOnly: false,
  },
  {
    name: 'Notifications',
    href: '/notifications',
    icon: Bell,
    adminOnly: false,
  },
  {
    name: 'Paramètres',
    href: '/settings',
    icon: Settings,
    adminOnly: false,
  },
];

const adminNavigation = [
  {
    name: 'Gestion Utilisateurs',
    href: '/admin/users',
    icon: Users,
    adminOnly: true,
  },
  {
    name: 'Administration',
    href: '/admin/dashboard',
    icon: Shield,
    adminOnly: true,
  },
];

export const Sidebar: React.FC<SidebarProps> = ({ isOpen, onClose }) => {
  const applicationName = process.env.NEXT_PUBLIC_APP_NAME || 'Candi Tracker';
  const applicationVersion = process.env.NEXT_PUBLIC_APP_VERSION || '1.0.0';
  const pathname = usePathname();
  const { user } = useAuth(); // Récupérer l'utilisateur connecté

  const isAdmin = user?.role === 'ADMIN';

  const renderNavigationItems = (items: typeof navigation) => {
    return items.map((item) => {
      const isActive = pathname.startsWith(item.href);
      return (
        <li key={item.name}>
          <Link
            href={item.href}
            onClick={onClose}
            className={cn(
              isActive
                ? 'bg-gray-50 text-indigo-600'
                : 'text-gray-700 hover:text-indigo-600 hover:bg-gray-50',
              'group flex gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold transition-colors'
            )}
          >
            <item.icon
              className={cn(
                isActive
                  ? 'text-indigo-600'
                  : 'text-gray-400 group-hover:text-indigo-600',
                'h-6 w-6 shrink-0'
              )}
              aria-hidden="true"
            />
            {item.name}
          </Link>
        </li>
      );
    });
  };

  return (
    <>
      {/* Desktop sidebar */}
      <div className="hidden lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-64 lg:flex-col">
        <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r border-gray-200 bg-white px-6 pb-4">
          <div className="flex h-16 shrink-0 items-center">
            <h1 className="text-2xl font-bold text-gray-900">
              {applicationName}
            </h1>
            <span className="mt-2.5 ml-1 text-sm text-gray-700">
              v{applicationVersion}
            </span>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {/* Navigation principale */}
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {renderNavigationItems(navigation)}
                </ul>
              </li>

              {/* Navigation admin */}
              {isAdmin && (
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide">
                    Administration
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {renderNavigationItems(adminNavigation)}
                  </ul>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Mobile sidebar */}
      <div
        className={cn(
          'fixed inset-y-0 z-50 flex w-64 flex-col transition-transform duration-300 ease-in-out lg:hidden',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-white px-6 pb-4 border-r border-gray-200">
          <div className="flex h-16 shrink-0 items-center justify-between">
            <h1 className="text-xl font-bold text-gray-900">
              {applicationName}
            </h1>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>
          <nav className="flex flex-1 flex-col">
            <ul role="list" className="flex flex-1 flex-col gap-y-7">
              {/* Navigation principale */}
              <li>
                <ul role="list" className="-mx-2 space-y-1">
                  {renderNavigationItems(navigation)}
                </ul>
              </li>

              {/* Navigation admin */}
              {isAdmin && (
                <li>
                  <div className="text-xs font-semibold leading-6 text-gray-400 uppercase tracking-wide">
                    Administration
                  </div>
                  <ul role="list" className="-mx-2 mt-2 space-y-1">
                    {renderNavigationItems(adminNavigation)}
                  </ul>
                </li>
              )}
            </ul>
          </nav>
        </div>
      </div>

      {/* Overlay pour mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
