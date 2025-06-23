import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { 
  BookOpen, 
  Home, 
  Menu, 
  Users, 
  Settings, 
  Bell, 
  Search, 
  X,
  LogOut,
  FileEdit,
  BarChart3,
  Shield,
  BookCheck
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { useMediaQuery } from "@/hooks/use-mobile";

interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  const { user, logout } = useAuth();
  const location = useLocation();
  const isMobile = useMediaQuery("(max-width: 768px)");
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const menuItems = [
    { icon: Home, label: "Dashboard", path: "/admin" },
    { icon: Users, label: "Gestão de Usuários", path: "/admin/users" },
    { icon: BarChart3, label: "Relatórios", path: "/admin/reports" },
    { icon: Settings, label: "Configurações", path: "/admin/settings" },
  ];

  const renderMenuItems = () => (
    <nav className="mt-6 space-y-1">
      {menuItems.map((item) => {
        const isActive = location.pathname === item.path;
        return (
          <Link
            key={item.path}
            to={item.path}
            className={`group flex items-center rounded-md px-3 py-2 text-sm font-medium transition-all hover:bg-primary/10 ${
              isActive
                ? "bg-primary/10 text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
          >
            <item.icon className={`mr-3 h-5 w-5 ${isActive ? "text-primary" : ""}`} />
            <span>{item.label}</span>
            {isActive && (
              <div className="ml-auto h-1.5 w-1.5 rounded-full bg-primary" />
            )}
          </Link>
        );
      })}
    </nav>
  );

  const renderLogo = () => (
    <Link to="/admin" className="flex items-center gap-2">
      <div className="h-8 w-8 rounded-md bg-primary flex items-center justify-center">
        <Shield className="h-5 w-5 text-primary-foreground" />
      </div>
      <span className="font-serif text-xl font-bold text-primary">Administração</span>
    </Link>
  );

  return (
    <div className="flex min-h-screen w-full flex-col bg-background">
      {/* Header for mobile and desktop */}
      <header className="sticky top-0 z-30 flex h-16 w-full items-center border-b bg-background/95 backdrop-blur">
        <div className="container mx-auto flex items-center justify-between px-4">
          <div className="flex items-center gap-4">
            {isMobile && (
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="w-[270px] p-0">
                  <div className="flex h-16 items-center border-b px-4">
                    {renderLogo()}
                  </div>
                  <div className="px-4 py-2">{renderMenuItems()}</div>
                  <div className="px-4 py-4 mt-auto border-t">
                    <Button 
                      variant="outline" 
                      className="w-full justify-start"
                      onClick={logout}
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Sair</span>
                    </Button>
                  </div>
                </SheetContent>
              </Sheet>
            )}
            {!isMobile && renderLogo()}
          </div>

          <div className="flex items-center gap-3">
            <Link to="/dashboard">
              <Button variant="outline" size="sm">
                <BookCheck className="mr-2 h-4 w-4" />
                Área do Leitor
              </Button>
            </Link>
            
            <div className="relative">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage src={user?.avatar} alt={user?.name || "Avatar"} />
                  <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                </Avatar>
                <div className="hidden text-sm md:block">
                  <p className="font-medium">{user?.name}</p>
                  <p className="text-xs text-muted-foreground">Administrador</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex flex-1">
        {/* Sidebar for desktop */}
        {!isMobile && (
          <aside className="hidden w-64 border-r md:block">
            <div className="flex h-full flex-col px-4 py-6">
              {renderMenuItems()}
              <div className="mt-auto pt-6 border-t">
                <Button 
                  variant="outline" 
                  className="w-full justify-start"
                  onClick={logout}
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Sair</span>
                </Button>
              </div>
            </div>
          </aside>
        )}

        {/* Main content */}
        <main className="flex-1 overflow-auto">
          <div className="container mx-auto p-4 md:py-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
