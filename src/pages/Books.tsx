import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import {
  Search,
  Filter,
  X,
  BookOpen,
  Clock,
  DollarSign,
  Star
} from "lucide-react";

// Mock books data baseado no schema
const mockBooks = [
  {
    id: "1",
    title: "Encontrando Paz nas Tempestades da Vida",
    description: "Um livro devocional que ajuda a encontrar tranquilidade mesmo em momentos difíceis.",
    verseGuide: "Salmos 23:4",
    coverImage: "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=400&h=600&fit=crop",
    authorName: "Pastor João Silva",
    bookPrice: 29.90,
    category: "Paz Interior",
    tags: ["paz", "superação", "fé"],
    readingTime: 21,
    difficultyLevel: "EASY",
    mode: "PUBLISHED"
  },
  {
    id: "2",
    title: "Renovando sua Fé Diariamente",
    description: "Exercícios práticos para fortalecer sua fé no dia a dia através de devocionais poderosos.",
    verseGuide: "Romanos 10:17",
    coverImage: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=400&h=600&fit=crop",
    authorName: "Dra. Maria Oliveira",
    bookPrice: 34.50,
    category: "Fé e Esperança",
    tags: ["fé", "esperança", "crescimento"],
    readingTime: 30,
    difficultyLevel: "MEDIUM",
    mode: "PUBLISHED"
  },
  {
    id: "3",
    title: "O Poder da Gratidão",
    description: "Como a gratidão pode transformar sua perspectiva e aproximá-lo de Deus.",
    verseGuide: "1 Tessalonicenses 5:18",
    coverImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
    authorName: "Pr. Roberto Mendes",
    bookPrice: 27.90,
    category: "Crescimento Espiritual",
    tags: ["gratidão", "transformação", "espiritualidade"],
    readingTime: 14,
    difficultyLevel: "EASY",
    mode: "PUBLISHED"
  },
  {
    id: "4",
    title: "Vencendo o Medo com a Fé",
    description: "Estratégias bíblicas para superar o medo e a ansiedade usando princípios da Palavra.",
    verseGuide: "Josué 1:9",
    coverImage: "https://images.unsplash.com/photo-1526243741027-444d633d7365?w=400&h=600&fit=crop",
    authorName: "Marcos Paulo",
    bookPrice: 39.90,
    category: "Superação",
    tags: ["medo", "ansiedade", "coragem", "fé"],
    readingTime: 28,
    difficultyLevel: "MEDIUM",
    mode: "PUBLISHED"
  }
];

const categories = [
  "Todos",
  "Paz Interior",
  "Fé e Esperança", 
  "Crescimento Espiritual",
  "Superação",
  "Relacionamentos",
  "Estudo Bíblico"
];

const Books = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [priceRange, setPriceRange] = useState("all");

  const filteredBooks = mockBooks.filter((book) => {
    const matchesSearch = book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.authorName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const matchesCategory = selectedCategory === "Todos" || book.category === selectedCategory;
    
    const matchesPrice = priceRange === "all" || 
                        (priceRange === "low" && book.bookPrice <= 30) ||
                        (priceRange === "medium" && book.bookPrice > 30 && book.bookPrice <= 50) ||
                        (priceRange === "high" && book.bookPrice > 50);
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  const getDifficultyColor = (level: string) => {
    switch (level) {
      case "EASY": return "bg-green-100 text-green-800";
      case "MEDIUM": return "bg-yellow-100 text-yellow-800";
      case "HARD": return "bg-red-100 text-red-800";
      default: return "bg-gray-100 text-gray-800";
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

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Livros</h1>
          <p className="text-muted-foreground mt-1">
            Descubra livros que transformarão sua vida espiritual
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por título, autor ou tags..."
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={isFilterOpen ? "bg-primary/10" : ""}
          >
            <Filter className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {isFilterOpen && (
        <div className="bg-muted/50 rounded-lg p-4">
          <div className="flex justify-between items-center mb-3">
            <h3 className="font-medium">Filtros</h3>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsFilterOpen(false)}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-medium mb-2">Categoria</h4>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedCategory(category)}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>
            <div>
              <h4 className="text-sm font-medium mb-2">Faixa de Preço</h4>
              <div className="flex flex-wrap gap-2">
                <Button
                  variant={priceRange === "all" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriceRange("all")}
                >
                  Todos
                </Button>
                <Button
                  variant={priceRange === "low" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriceRange("low")}
                >
                  Até R$ 30
                </Button>
                <Button
                  variant={priceRange === "medium" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriceRange("medium")}
                >
                  R$ 30 - R$ 50
                </Button>
                <Button
                  variant={priceRange === "high" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setPriceRange("high")}
                >
                  Acima de R$ 50
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.map((book) => (
          <Card key={book.id} className="overflow-hidden hover:shadow-lg transition-shadow group">
            <div className="relative">
              <img
                src={book.coverImage}
                alt={book.title}
                className="h-64 w-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute top-2 right-2">
                <Badge className={getDifficultyColor(book.difficultyLevel)}>
                  {getDifficultyText(book.difficultyLevel)}
                </Badge>
              </div>
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                <Badge variant="secondary" className="bg-white/20 text-white">
                  {book.category}
                </Badge>
              </div>
            </div>
            
            <CardContent className="p-4">
              <h3 className="font-serif text-lg font-semibold line-clamp-2 mb-2">
                {book.title}
              </h3>
              <p className="text-sm text-muted-foreground mb-2">
                por {book.authorName}
              </p>
              <p className="text-sm line-clamp-3 mb-3">
                {book.description}
              </p>
              
              <div className="flex items-center gap-2 mb-3 text-xs text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Clock className="h-3 w-3" />
                  {book.readingTime} dias
                </div>
                <div className="flex items-center gap-1">
                  <BookOpen className="h-3 w-3" />
                  Livro
                </div>
              </div>

              {book.verseGuide && (
                <p className="text-xs italic text-primary mb-3">
                  "{book.verseGuide}"
                </p>
              )}

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4 text-green-600" />
                  <span className="text-lg font-bold text-green-600">
                    R$ {book.bookPrice.toFixed(2)}
                  </span>
                </div>
                <Button size="sm">
                  Comprar
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredBooks.length === 0 && (
        <div className="text-center py-12">
          <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
          <h3 className="mt-4 text-lg font-medium">Nenhum livro encontrado</h3>
          <p className="mt-2 text-muted-foreground">
            Tente ajustar seus filtros ou termos de busca
          </p>
          <Button
            className="mt-4"
            onClick={() => {
              setSearchTerm("");
              setSelectedCategory("Todos");
              setPriceRange("all");
            }}
          >
            Limpar filtros
          </Button>
        </div>
      )}
    </div>
  );
};

export default Books;
