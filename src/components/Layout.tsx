
import React from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { Home, FileText, Search, User, Bell } from 'lucide-react';
import { cn } from "@/lib/utils";
import { useToast } from "@/components/ui/use-toast";

const Layout = () => {
  const location = useLocation();
  const { toast } = useToast();
  
  const navItems = [
    { icon: Home, label: 'Home', path: '/' },
    { icon: FileText, label: 'My Docs', path: '/documents' },
    { icon: Search, label: 'Find', path: '/find' },
    { icon: Bell, label: 'Alerts', path: '/alerts' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  // This simulates a notification - would be triggered by actual events in production
  React.useEffect(() => {
    const timer = setTimeout(() => {
      toast({
        title: "Document expiring soon",
        description: "Your Passport expires in 30 days",
        variant: "default",
      });
    }, 3000);
    
    return () => clearTimeout(timer);
  }, [toast]);

  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Main Content */}
      <main className="flex-1 pb-16 pt-4">
        <Outlet />
      </main>
      
      {/* Bottom Navigation Bar - Mobile Friendly */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-10">
        {navItems.map((item) => {
          const isActive = location.pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "flex flex-col items-center p-2 rounded-md",
                isActive ? "text-brand-blue" : "text-gray-500 hover:text-brand-darkBlue"
              )}
            >
              <Icon size={20} />
              <span className="text-xs mt-1">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </div>
  );
};

export default Layout;
