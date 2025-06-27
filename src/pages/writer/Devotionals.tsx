
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Plus,
  Search,
  Edit,
  Eye,
  Trash2,
  MoreVertical,
  DollarSign,
  Users,
  TrendingUp
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

  type DifficultyLevel = "EASY" | "MEDIUM" | "HARD";
  type Mode = "PUBLISHED" | "SKETCH";

  interface BookTypes {
    id: string;
    title: string;
    description: string;
    verseGuide?: string | null;
    coverImage: string | null | "none";
    userId: string;
    authorName: string;
    bookPrice: number | 0;
    category: string;
    tags: string[];
    readingTime: number;
    difficultyLevel: DifficultyLevel;
    mode: Mode;
    createdAt: string | Date;
    updatedAt: string | Date;
  }

// Mock dos livros criados pelo writer baseado no schema
// const writerBooks: BookTypes[] = [
//   {
//     id: "1",
//     title: "Encontrando Paz nas Tempestades da Vida",
//     description: "Um livro devocional que ajuda a encontrar tranquilidade mesmo em momentos difíceis.",
//     verseGuide: "Salmos 23:4",
//     coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
//     userId: "user1",
//     authorName: "Autor Exemplo",
//     bookPrice: 29.90,
//     category: "Paz Interior",
//     tags: ["paz", "superação", "fé"],
//     readingTime: 21,
//     difficultyLevel: "EASY",
//     mode: "PUBLISHED", // PUBLISHED ou SKETCH
//     pages: [],
//     createdAt: "2024-01-01T00:00:00Z",
//     updatedAt: "2024-01-15T10:30:00Z"
//   },
// ];

const WriterDevotionals = () => {
  const { user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, published, draft
  const [books, setBooks] = useState<BookTypes[] | null>(null);
  const [loading, setLoading] = useState(true);

  // const filteredBooks = writerBooks.filter((book) => {
  //   const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
  //                        book.category.toLowerCase().includes(searchTerm.toLowerCase());
    
  //   const matchesFilter = filter === "all" || 
  //                        (filter === "published" && book.mode === "PUBLISHED") ||
  //                        (filter === "draft" && book.mode === "SKETCH");
    
  //   return matchesSearch && matchesFilter;
  // });

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);

      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/devocional/books`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar livros");
        }
        const data = await response.json();

        console.log("Livros recebidos:", data);
        setBooks(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const getStatusBadge = (mode: string) => {
    if (mode === "PUBLISHED") {
      return <Badge className="bg-green-100 text-green-800">Publicado</Badge>;
    } else {
      return <Badge variant="outline">Rascunho</Badge>;
    }
  };

  const getDifficultyText = (level: string) => {
    switch (level) {
      case "EASY": return "Fácil";
      case "MEDIUM": return "Intermediário";
      case "HARD": return "Avançado";
      default: return level;
    }
  };

  const handleDeleteBook = async (bookId: string) => {
    if (!window.confirm("Tem certeza que deseja excluir este livro?")) return;

    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/devocional/delete/${bookId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });

      if (!response.ok) {
        throw new Error("Erro ao excluir livro");
      }

      // Atualizar a lista de livros após exclusão
      setBooks((prevBooks) => prevBooks?.filter((book) => book.id !== bookId) || []);
    } catch (error) {
      console.error("Erro ao excluir livro:", error);
    }
  }

  // const totalRevenue = writerBooks.reduce((sum, book) => sum + book.revenue, 0);
  // const totalSales = writerBooks.reduce((sum, book) => sum + book.sales, 0);
  // const publishedBooks = writerBooks.filter(book => book.mode === "PUBLISHED").length;

  if(loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Meus Livros</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie seus livros e acompanhe seu desempenho
          </p>
        </div>
        <Link to="/writer/devotionals/new">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Novo Livro
          </Button>
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Livros</p>
                <p className="text-2xl font-bold">{books?.length}</p>
              </div>
              <BookOpen className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Publicados</p>
                <p className="text-2xl font-bold">{books.filter((v) => v.mode === 'PUBLISHED').length}</p>
              </div>
              <Eye className="h-8 w-8 text-green-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total de Vendas</p>
                {/* <p className="text-2xl font-bold">{totalSales}</p> */}
              </div>
              <Users className="h-8 w-8 text-blue-500" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Receita Total</p>
                {/* <p className="text-2xl font-bold">R$ {totalRevenue.toFixed(2)}</p> */}
              </div>
              <TrendingUp className="h-8 w-8 text-orange-500" />
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
            placeholder="Buscar seus livros..."
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
            variant={filter === "published" ? "default" : "outline"}
            onClick={() => setFilter("published")}
          >
            Publicados
          </Button>
          <Button
            variant={filter === "draft" ? "default" : "outline"}
            onClick={() => setFilter("draft")}
          >
            Rascunhos
          </Button>
        </div>
      </div>

      {/* Books Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {books.map((book) => (
          <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="relative">
              <img
                src={book.coverImage === "none" ? "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop" : book.coverImage}
                alt={book.title}
                className="h-48 w-full object-cover"
              />
              <div className="absolute top-2 right-2">
                {getStatusBadge(book.mode)}
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {book.category}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <div className="flex justify-between items-start mb-2">
                <h3 className="font-serif text-lg font-semibold line-clamp-2">
                  {book.title}
                </h3>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreVertical className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Ações</DropdownMenuLabel>
                    <DropdownMenuItem asChild>
                      <Link to={`/writer/devotionals/${book.id}/edit`}>
                        <Edit className="mr-2 h-4 w-4" />
                        Editar
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      Visualizar
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDeleteBook(book.id)} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Excluir
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                {book.description}
              </p>
              
              <div className="space-y-2 mb-3">
                <div className="flex justify-between text-sm">
                  {/* <span>Páginas: {book.pages}/{book.readingTime}</span> */}
                  <span>{getDifficultyText(book.difficultyLevel)}</span>
                </div>
                
                <div className="flex justify-between text-sm">
                  <span className="flex items-center gap-1">
                    <DollarSign className="h-3 w-3" />
                    R$ {book.bookPrice.toFixed(2)}
                  </span>
                  {/* <span>{book.sales} vendas</span> */}
                </div>
                
                {/* {book.mode === "PUBLISHED" && (
                  <div className="text-sm font-medium text-green-600">
                    Receita: R$ {book.revenue.toFixed(2)}
                  </div>
                )} */}
              </div>

              {book.verseGuide && (
                <p className="text-xs italic text-primary mb-3">
                  "{book.verseGuide}"
                </p>
              )}

              <div className="flex gap-2">
                <Link to={`/writer/devotionals/${book.id}/edit`} className="flex-1">
                  <Button size="sm" className="w-full">
                    <Edit className="w-3 h-3 mr-1" />
                    Editar
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {books.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhum livro encontrado</h3>
          <p className="mt-2 text-muted-foreground">
            {searchTerm ? "Tente ajustar sua busca" : "Você ainda não criou nenhum livro"}
          </p>
          {!searchTerm && (
            <Link to="/writer/devotionals/new">
              <Button className="mt-4">
                <Plus className="mr-2 h-4 w-4" />
                Criar Primeiro Livro
              </Button>
            </Link>
          )}
        </div>
      )}
    </div>
  );
};

export default WriterDevotionals;
