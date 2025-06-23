
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import AuthenticatedLayout from "./AuthenticatedLayout";
import WriterLayout from "./WriterLayout";
import AdminLayout from "./AdminLayout";

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: "ADMIN" | "WRITER" | "READER";
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requiredRole = "READER" 
}) => {
  const { isAuthenticated, isLoading, user } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="h-12 w-12 rounded-full bg-primary/20 mx-auto"></div>
          <p className="mt-4 text-sm text-muted-foreground">Carregando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Verificar se o usuário tem a permissão necessária
  if (requiredRole === "ADMIN" && user?.role !== "ADMIN") {
    return <Navigate to="/dashboard" replace />;
  }

  if (requiredRole === "WRITER" && !["ADMIN", "WRITER"].includes(user?.role || "")) {
    return <Navigate to="/dashboard" replace />;
  }

  // Verificar se o usuário está ativo
  if (user?.status !== "ACTIVE") {
    return (
      <div className="flex h-screen w-full items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-2">Conta Inativa</h2>
          <p className="text-muted-foreground mb-4">Sua conta foi desativada. Entre em contato com o suporte.</p>
        </div>
      </div>
    );
  }

  // Selecionar o layout apropriado com base no papel do usuário
  if (requiredRole === "ADMIN") {
    return <AdminLayout>{children}</AdminLayout>;
  }

  if (requiredRole === "WRITER") {
    return <WriterLayout>{children}</WriterLayout>;
  }

  return <AuthenticatedLayout>{children}</AuthenticatedLayout>;
};

export default ProtectedRoute;
