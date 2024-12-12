import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ClipboardList, 
  LineChart, 
  Users, 
  Settings,
  Menu,
  Dumbbell
} from 'lucide-react';

const menuItems = [
  { icon: LayoutDashboard, label: 'Dashboard' },
  { icon: ClipboardList, label: 'Daily Input' },
  { icon: LineChart, label: 'Insights' },
  { icon: Users, label: 'Community' },
  { icon: Settings, label: 'Settings' },
];

interface SidebarProps {
  onNavigate?: (page: string) => void;
}

export default function Sidebar({ onNavigate }: SidebarProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <>
      {/* Mobile Menu Button */}
      <button 
        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-navy-800 text-green-400 hover:bg-navy-700"
      >
        <Menu size={24} />
      </button>

      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 h-full bg-navy-900 text-white
        transition-transform duration-300 ease-in-out z-40
        w-64 transform lg:translate-x-0
        ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Logo Section */}
        <div className="flex items-center gap-3 p-6 border-b border-navy-700">
          <Dumbbell className="h-8 w-8 text-green-400" />
          <span className="text-xl font-bold text-green-400">FittedTrack</span>
        </div>

        {/* Navigation Items */}
        <nav className="p-4">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <button 
                  onClick={() => {
                    onNavigate?.(item.label);
                    setIsMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-4 px-4 py-3 rounded-lg text-gray-300 hover:bg-navy-800 hover:text-green-400 transition-colors"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
}