
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  Users, 
  Search, 
  Filter,
  UserPlus,
  MoreVertical,
  Edit,
  Trash2,
  Shield,
  Ban,
  CheckCircle
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { UserRole, UserStatus } from "@/contexts/AuthContext";
import { ModalCreateWriter } from "./_components/ModalCreateWriter";

// Mock users data - removendo admin
const mockUsers = [
  {
    id: "2",
    name: "Maria Santos",
    email: "maria.santos@exemplo.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    role: "WRITER" as UserRole,
    status: "ACTIVE" as UserStatus,
    lastAccess: new Date().toISOString(),
    createdAt: "2024-01-01T00:00:00Z",
    books: 5,
  },
  {
    id: "3",
    name: "João Silva",
    email: "joao.silva@exemplo.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=400&fit=crop&crop=faces",
    role: "READER" as UserRole,
    status: "ACTIVE" as UserStatus,
    lastAccess: new Date().toISOString(),
    createdAt: "2024-01-01T00:00:00Z",
    purchasedBooks: 12
  },
  {
    id: "4",
    name: "Carlos Oliveira",
    email: "carlos.oliveira@exemplo.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
    role: "WRITER" as UserRole,
    status: "ACTIVE" as UserStatus,
    lastAccess: new Date().toISOString(),
    createdAt: "2024-01-15T00:00:00Z",
    books: 3,
  },
  {
    id: "5",
    name: "Ana Ferreira",
    email: "ana.ferreira@exemplo.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
    role: "READER" as UserRole,
    status: "ACTIVE" as UserStatus,
    lastAccess: new Date().toISOString(),
    createdAt: "2024-02-01T00:00:00Z",
    purchasedBooks: 8
  },
  {
    id: "6",
    name: "Pedro Costa",
    email: "pedro.costa@exemplo.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    role: "READER" as UserRole,
    status: "INACTIVE" as UserStatus,
    lastAccess: "2024-05-15T00:00:00Z",
    createdAt: "2024-03-01T00:00:00Z",
    purchasedBooks: 3
  },
];

const UsersManagement = () => {
  const [writers, setWriters] = useState(mockUsers);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterRole, setFilterRole] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  useEffect(() => {
    const fetchWriters = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/admin/writers`, {
          headers: { Authorization: `Bearer ${localStorage.getItem('token')}` }
        });

        const data = await res.json();
        
        if(!res.ok) {
          setWriters(mockUsers);
        }
        
        setWriters(data.writers || mockUsers);

        console.log(res);
      } catch (e) {
        console.log(e);
      }
    }

    fetchWriters();
  }, []);

  const filteredUsers = writers?.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filterRole === "all" || user.role === filterRole;
    const matchesStatus = filterStatus === "all" || user.status === filterStatus;
    
    return matchesSearch && matchesRole && matchesStatus;
  });

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case "WRITER": return "bg-blue-100 text-blue-800";
      case "READER": return "bg-green-100 text-green-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE": return "bg-green-100 text-green-800";
      case "INACTIVE": return "bg-yellow-100 text-yellow-800";
      case "BLOCKED": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getRoleLabel = (role: UserRole) => {
    switch (role) {
      case "WRITER": return "Escritor";
      case "READER": return "Leitor";
      default: return role;
    }
  };

  const getStatusLabel = (status: UserStatus) => {
    switch (status) {
      case "ACTIVE": return "Ativo";
      case "INACTIVE": return "Inativo";
      case "BLOCKED": return "Bloqueado";
      default: return status;
    }
  };

  const onClose = () => {
    setIsOpenModal(false);
  }

  return (
    <div className="space-y-6">
      {isOpenModal && <ModalCreateWriter onClose={onClose} />}

      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Gestão de Usuários Escritores</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie escritores da plataforma
          </p>
        </div>
        <Button onClick={() => setIsOpenModal(true)}>
          <UserPlus className="mr-2 h-4 w-4" />
          Adicionar Usuário
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Filtros</CardTitle>
          <CardDescription>
            Use os filtros abaixo para encontrar usuários específicos
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar por nome ou email..."
                className="pl-8"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Select value={filterRole} onValueChange={setFilterRole}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por papel" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os papéis</SelectItem>
                <SelectItem value="WRITER">Escritor</SelectItem>
                <SelectItem value="READER">Leitor</SelectItem>
              </SelectContent>
            </Select>
            <Select value={filterStatus} onValueChange={setFilterStatus}>
              <SelectTrigger className="w-full md:w-[180px]">
                <SelectValue placeholder="Filtrar por status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todos os status</SelectItem>
                <SelectItem value="ACTIVE">Ativo</SelectItem>
                <SelectItem value="INACTIVE">Inativo</SelectItem>
                <SelectItem value="BLOCKED">Bloqueado</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Usuários ({filteredUsers.length})</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {filteredUsers.map((user, index) => (
              <div key={user.id}>
                <div className="flex items-center justify-between py-4">
                  <div className="flex items-center space-x-4">
                    <Avatar>
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-sm text-muted-foreground">{user.email}</p>
                      {user.role === "WRITER" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {user.books} livros •  seguidores
                        </p>
                      )}
                      {user.role === "READER" && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {user.purchasedBooks} livros comprados
                        </p>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Badge className={getRoleColor(user.role)}>
                      {getRoleLabel(user.role)}
                    </Badge>
                    <Badge className={getStatusColor(user.status)}>
                      {getStatusLabel(user.status)}
                    </Badge>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                          <span className="sr-only">Abrir menu</span>
                          <MoreVertical className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuLabel>Ações</DropdownMenuLabel>
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Shield className="mr-2 h-4 w-4" />
                          Alterar Papel
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Ban className="mr-2 h-4 w-4" />
                          Bloquear
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Excluir
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
                {index < filteredUsers.length - 1 && <Separator />}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default UsersManagement;
