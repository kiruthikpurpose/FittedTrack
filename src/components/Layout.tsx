import React from 'react';
import Sidebar from './Sidebar';

interface LayoutProps {
  children: React.ReactNode;
  onNavigate?: (page: string) => void;
}

export default function Layout({ children, onNavigate }: LayoutProps) {
  return (
    <div className="min-h-screen bg-navy-950">
      <Sidebar onNavigate={onNavigate} />
      <main className="lg:ml-64 min-h-screen p-4 lg:p-8">
        {children}
      </main>
    </div>
  );
}