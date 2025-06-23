
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Link } from "react-router-dom";
import {
  Search,
  BookOpen,
  Clock,
  CheckCircle,
  Play,
  RotateCcw
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { getUserPurchases, mockBooks, mockUsers } from "@/mocks";

const MyLibrary = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, reading, completed

  // Buscar livros comprados pelo usuário usando os mocks
  const userPurchases = getUserPurchases(user?.id || "");
  const myPurchasedBooks = userPurchases.map(purchase => {
    const book = mockBooks.find(b => b.id === purchase.bookId);
    const author = mockUsers.find(u => u.id === book?.userId);
    
    if (!book) return null;
    
    // Simular progresso de leitura baseado em dados mock
    const progress = Math.floor(Math.random() * 100);
    const totalPages = book.readingTime; // Usando readingTime como proxy para total de páginas
    const currentPage = Math.floor((progress / 100) * totalPages);
    const completed = progress === 100;
    
    return {
      id: book.id,
      title: book.title,
      description: book.description,
      coverImage: book.coverImage,
      authorName: author?.name || book.authorName,
      category: book.category,
      readingTime: book.readingTime,
      progress: progress,
      currentPage: currentPage,
      totalPages: totalPages,
      lastRead: purchase.datePurchase,
      completed: completed,
      datePurchase: purchase.datePurchase
    };
  }).filter(Boolean);

  const filteredBooks = myPurchasedBooks.filter((book) => {
    if (!book) return false;
    
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.authorName.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filter === "all" || 
                         (filter === "reading" && !book.completed) ||
                         (filter === "completed" && book.completed);
    
    return matchesSearch && matchesFilter;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  const getStatusBadge = (book: any) => {
    if (book.completed) {
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Concluído
        </Badge>
      );
    } else if (book.progress > 0) {
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <Play className="w-3 h-3 mr-1" />
          Lendo
        </Badge>
      );
    } else {
      return (
        <Badge variant="outline">
          Não iniciado
        </Badge>
      );
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Minha Biblioteca</h1>
          <p className="text-muted-foreground mt-1">
            Seus livros comprados e progresso de leitura
          </p>
        </div>
        <Link to="/books">
          <Button>
            <BookOpen className="mr-2 h-4 w-4" />
            Explorar Mais Livros
          </Button>
        </Link>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Livros</p>
                <p className="text-2xl font-bold">{myPurchasedBooks.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Concluídos</p>
                <p className="text-2xl font-bold">
                  {myPurchasedBooks.filter(book => book?.completed).length}
                </p>
              </div>
              <CheckCircle className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Em Andamento</p>
                <p className="text-2xl font-bold">
                  {myPurchasedBooks.filter(book => book && !book.completed && book.progress > 0).length}
                </p>
              </div>
              <Play className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar em sua biblioteca..."
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="flex gap-2">
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => setFilter("all")}
          >
            Todos
          </Button>
          <Button
            variant={filter === "reading" ? "default" : "outline"}
            onClick={() => setFilter("reading")}
          >
            Lendo
          </Button>
          <Button
            variant={filter === "completed" ? "default" : "outline"}
            onClick={() => setFilter("completed")}
          >
            Concluídos
          </Button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="flex h-full">
              <div className="w-24 h-32 bg-muted flex-shrink-0">
                <img
                  src={book.coverImage}
                  alt={book.title}
                  className="h-full w-full object-cover"
                />
              </div>
              <div className="flex-1 p-4">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-serif text-base font-semibold line-clamp-2">
                    {book.title}
                  </h3>
                  {getStatusBadge(book)}
                </div>
                
                <p className="text-sm text-muted-foreground mb-2">
                  por {book.authorName}
                </p>
                
                <div className="space-y-2 mb-3">
                  <div className="flex justify-between text-xs text-muted-foreground">
                    <span>Progresso</span>
                    <span>{book.currentPage}/{book.totalPages} páginas</span>
                  </div>
                  <Progress value={book.progress} className="h-2" />
                  <p className="text-xs text-muted-foreground">
                    {book.progress}% concluído
                  </p>
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
                  <span>Última leitura: {formatDate(book.lastRead)}</span>
                </div>
                
                <div className="flex gap-2">
                  {book.completed ? (
                    <Button size="sm" variant="outline" className="flex-1" asChild>
                      <Link to={`/devotional/${book.id}`}>
                        <RotateCcw className="w-3 h-3 mr-1" />
                        Reler
                      </Link>
                    </Button>
                  ) : (
                    <Button size="sm" className="flex-1" asChild>
                      <Link to={`/devotional/${book.id}`}>
                        <Play className="w-3 h-3 mr-1" />
                        {book.progress > 0 ? "Continuar" : "Iniciar"}
                      </Link>
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhum livro encontrado</h3>
          <p className="mt-2 text-muted-foreground">
            {searchTerm ? "Tente ajustar sua busca" : "Você ainda não tem livros em sua biblioteca"}
          </p>
          {!searchTerm && (
            <Link to="/books">
              <Button className="mt-4">
                Explorar Livros
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default MyLibrary;
