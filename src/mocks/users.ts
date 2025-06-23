
import { User, Role, Status } from "./types";

export const mockUsers: User[] = [
  {
    id: "1",
    name: "Admin Master",
    email: "admin@devocional.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=400&h=400&fit=crop&crop=faces",
    bio: "Administrador principal do sistema de devocionais",
    password: "admin123",
    role: Role.ADMIN,
    status: Status.ACTIVE,
    lastAccess: "2024-01-15T10:30:00Z",
    interest: ["Gestão", "Supervisão", "Relatórios"],
    createdAt: "2024-01-01T00:00:00Z",
    updatedAt: "2024-01-15T10:30:00Z"
  },
  {
    id: "2",
    name: "Pastor João Silva",
    email: "joao.silva@escritor.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop&crop=faces",
    bio: "Pastor e escritor de devocionais cristãos há mais de 15 anos",
    password: "writer123",
    role: Role.WRITER,
    status: Status.ACTIVE,
    lastAccess: "2024-01-14T18:45:00Z",
    interest: ["Escritura", "Teologia", "Evangelização"],
    createdAt: "2024-01-02T00:00:00Z",
    updatedAt: "2024-01-14T18:45:00Z"
  },
  {
    id: "3",
    name: "Pastora Maria Santos",
    email: "maria.santos@escritor.com",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b789?w=400&h=400&fit=crop&crop=faces",
    bio: "Escritora cristã especializada em devocionais para mulheres",
    password: "writer456",
    role: Role.WRITER,
    status: Status.ACTIVE,
    lastAccess: "2024-01-15T08:20:00Z",
    interest: ["Mulheres", "Família", "Oração"],
    createdAt: "2024-01-03T00:00:00Z",
    updatedAt: "2024-01-15T08:20:00Z"
  },
  {
    id: "4",
    name: "Carlos Eduardo",
    email: "carlos@leitor.com",
    avatar: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?w=400&h=400&fit=crop&crop=faces",
    bio: "Jovem cristão buscando crescimento espiritual",
    password: "reader123",
    role: Role.READER,
    status: Status.ACTIVE,
    lastAccess: "2024-01-15T07:15:00Z",
    interest: ["Oração", "Estudos", "Juventude"],
    createdAt: "2024-01-05T00:00:00Z",
    updatedAt: "2024-01-15T07:15:00Z"
  },
  {
    id: "5",
    name: "Ana Beatriz",
    email: "ana@leitor.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop&crop=faces",
    bio: "Mãe cristã em busca de paz e direcionamento",
    password: "reader456",
    role: Role.READER,
    status: Status.ACTIVE,
    lastAccess: "2024-01-14T21:30:00Z",
    interest: ["Família", "Superação", "Paz Interior"],
    createdAt: "2024-01-06T00:00:00Z",
    updatedAt: "2024-01-14T21:30:00Z"
  },
  {
    id: "6",
    name: "Pedro Henrique",
    email: "pedro@leitor.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop&crop=faces",
    bio: "Empresário cristão buscando equilíbrio",
    password: "reader789",
    role: Role.READER,
    status: Status.ACTIVE,
    lastAccess: "2024-01-15T06:45:00Z",
    interest: ["Trabalho", "Liderança", "Propósito"],
    createdAt: "2024-01-07T00:00:00Z",
    updatedAt: "2024-01-15T06:45:00Z"
  }
];
