import React, { createContext, useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";

export type UserRole = "ADMIN" | "WRITER" | "READER";
export type UserStatus = "ACTIVE" | "INACTIVE" | "BLOCKED";

interface User {
  id: string;
  name: string;
  email: string;
  bio?: string;
  avatar?: string;
  role: UserRole;
  status: UserStatus;
  lastAccess?: string;
  createdAt: string;
  updatedAt: string;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock users baseado no schema Prisma
const mockUsers: Array<User & { password: string }> = [
  {
    id: "1",
    name: "Admin Teste",
    email: "admin@exemplo.com",
    bio: "Administrador do sistema",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
    password: "admin123",
    role: "ADMIN",
    status: "ACTIVE",
    lastAccess: new Date().toISOString(),
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "2",
    name: "Escritor Teste",
    email: "writer@exemplo.com",
    bio: "Escritor de devocionais",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    password: "writer123",
    role: "WRITER",
    status: "ACTIVE",
    lastAccess: new Date().toISOString(),
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
  {
    id: "3",
    name: "Leitor Teste",
    email: "reader@exemplo.com",
    bio: "Leitor de devocionais",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=400&fit=crop&crop=faces",
    password: "reader123",
    role: "READER",
    status: "ACTIVE",
    lastAccess: new Date().toISOString(),
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: new Date().toISOString(),
  },
];

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const { toast } = useToast();

  // Verificação inicial de autenticação
  useEffect(() => {
    const checkAuth = async () => {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        try {
          const userData = JSON.parse(storedUser);
          setUser(userData);
        } catch (error) {
          localStorage.removeItem("user");
        }
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await fetch(`${import.meta.env.VITE_API_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Credenciais inválidas ou usuário não encontrado.");
      }
      const data = await response.json();

      console.log("Dados do usuário:", data);
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
        
      toast({
        title: "Login realizado com sucesso!",
        description: `Bem-vindo, ${data.user.name}!`,
      });
      
      // Redirecionar com base no papel do usuário
      if (data.user.role === "ADMIN") {
        navigate("/admin");
      } else if (data.user.role === "WRITER") {
        navigate("/writer");
      } else {
        navigate("/dashboard");
      }
    } catch (error) {
      toast({
        title: "Erro ao fazer login",
        description: error instanceof Error ? error.message : "Verifique suas credenciais e tente novamente.",
        variant: "destructive",
      });
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    toast({
      title: "Logout realizado",
      description: "Você foi desconectado com sucesso.",
    });
    navigate("/login");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        logout
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
