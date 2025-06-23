
import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link } from "react-router-dom";
import {
  BookOpen,
  Search,
  Filter,
  X,
  GridIcon,
  ListIcon,
} from "lucide-react";

const devotionalsList = [
  {
    id: "1",
    title: "Encontrando Paz nas Tempestades da Vida",
    author: "Pastor João Silva",
    category: "Paz Interior",
    description: "Um devocional que ajuda a encontrar tranquilidade mesmo em momentos difíceis.",
    coverImage: "https://randomuser.me/api/portraits/men/42.jpg",
    featured: true,
  },
  {
    id: "2",
    title: "Renovando sua Fé Diariamente",
    author: "Dra. Maria Oliveira",
    category: "Fé e Esperança",
    description: "Exercícios práticos para fortalecer sua fé no dia a dia.",
    coverImage: "https://randomuser.me/api/portraits/women/32.jpg",
    featured: false,
  },
  {
    id: "3",
    title: "O Poder da Gratidão",
    author: "Pr. Roberto Mendes",
    category: "Crescimento Espiritual",
    description: "Como a gratidão pode transformar sua perspectiva e aproximá-lo de Deus.",
    coverImage: "https://randomuser.me/api/portraits/men/22.jpg",
    featured: true,
  },
  {
    id: "4",
    title: "Vencendo o Medo com a Fé",
    author: "Marcos Paulo",
    category: "Superação",
    description: "Estratégias bíblicas para superar o medo e a ansiedade.",
    coverImage: "https://randomuser.me/api/portraits/men/76.jpg",
    featured: false,
  },
  {
    id: "5",
    title: "Construindo Relacionamentos Saudáveis",
    author: "Dra. Cristina Rocha",
    category: "Relacionamentos",
    description: "Princípios bíblicos para cultivar relacionamentos saudáveis e duradouros.",
    coverImage: "https://randomuser.me/api/portraits/women/45.jpg",
    featured: true,
  },
  {
    id: "6",
    title: "Jornada pelos Salmos",
    author: "Pastor André Oliveira",
    category: "Estudo Bíblico",
    description: "Uma exploração profunda dos Salmos e suas aplicações para a vida moderna.",
    coverImage: "https://randomuser.me/api/portraits/men/54.jpg",
    featured: false,
  },
];

const categories = [
  "Todos",
  "Paz Interior",
  "Fé e Esperança",
  "Crescimento Espiritual",
  "Superação",
  "Relacionamentos",
  "Estudo Bíblico",
];

const Library = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("Todos");
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredDevotionals = devotionalsList.filter((devotional) => {
    const matchesSearch = devotional.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase()) || 
      devotional.author
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "Todos" || 
      devotional.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">Biblioteca</h1>
          <p className="text-muted-foreground mt-1">
            Explore nossa coleção de devocionais
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Buscar por título ou autor..."
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
          <div className="flex border rounded-md">
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${
                viewMode === "grid" ? "bg-primary/10" : ""
              }`}
              onClick={() => setViewMode("grid")}
            >
              <GridIcon className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className={`rounded-none ${
                viewMode === "list" ? "bg-primary/10" : ""
              }`}
              onClick={() => setViewMode("list")}
            >
              <ListIcon className="h-4 w-4" />
            </Button>
          </div>
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
      )}

      <Tabs defaultValue="all">
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">Todos</TabsTrigger>
          <TabsTrigger value="featured">Destaques</TabsTrigger>
          <TabsTrigger value="recent">Recentes</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          {viewMode === "grid" ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {filteredDevotionals.map((devotional) => (
                <Card key={devotional.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <Link to={`/devotional/${devotional.id}`}>
                    <div className="relative h-44 w-full">
                      <img
                        src={devotional.coverImage}
                        alt={devotional.title}
                        className="h-full w-full object-cover"
                      />
                      {devotional.featured && (
                        <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                          Destaque
                        </div>
                      )}
                      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                        <span className="inline-block rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                          {devotional.category}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-4">
                      <h3 className="font-serif text-lg font-semibold line-clamp-2">
                        {devotional.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {devotional.author}
                      </p>
                      <p className="mt-2 text-sm line-clamp-2">
                        {devotional.description}
                      </p>
                      <Button className="mt-4 w-full">Ler Agora</Button>
                    </CardContent>
                  </Link>
                </Card>
              ))}
            </div>
          ) : (
            <div className="space-y-4">
              {filteredDevotionals.map((devotional) => (
                <Card
                  key={devotional.id}
                  className="overflow-hidden hover:shadow-md transition-shadow"
                >
                  <Link to={`/devotional/${devotional.id}`}>
                    <div className="flex h-full">
                      <div className="h-auto w-32 sm:w-48 bg-muted">
                        <img
                          src={devotional.coverImage}
                          alt={devotional.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-lg font-semibold">
                              {devotional.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {devotional.author}
                            </p>
                          </div>
                          {devotional.featured && (
                            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                              Destaque
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <span className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {devotional.category}
                          </span>
                        </div>
                        <p className="mt-3 text-sm flex-1">{devotional.description}</p>
                        <div className="mt-4 flex justify-end">
                          <Button>Ler Agora</Button>
                        </div>
                      </div>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          )}

          {filteredDevotionals.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Nenhum devocional encontrado</h3>
              <p className="mt-2 text-muted-foreground">
                Tente ajustar seus filtros ou termos de busca
              </p>
              <Button
                className="mt-4"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("Todos");
                }}
              >
                Limpar filtros
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured">
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
            {filteredDevotionals
              .filter((devotional) => devotional.featured)
              .map((devotional) => (
                <Card key={devotional.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  {/* Card content similar to above */}
                  <Link to={`/devotional/${devotional.id}`}>
                    {viewMode === "grid" ? (
                      <>
                        <div className="relative h-44 w-full">
                          <img
                            src={devotional.coverImage}
                            alt={devotional.title}
                            className="h-full w-full object-cover"
                          />
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                            Destaque
                          </div>
                          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                            <span className="inline-block rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                              {devotional.category}
                            </span>
                          </div>
                        </div>
                        <CardContent className="p-4">
                          <h3 className="font-serif text-lg font-semibold line-clamp-2">
                            {devotional.title}
                          </h3>
                          <p className="mt-1 text-sm text-muted-foreground">
                            {devotional.author}
                          </p>
                          <p className="mt-2 text-sm line-clamp-2">
                            {devotional.description}
                          </p>
                          <Button className="mt-4 w-full">Ler Agora</Button>
                        </CardContent>
                      </>
                    ) : (
                      <div className="flex h-full">
                        <div className="h-auto w-32 sm:w-48 bg-muted">
                          <img
                            src={devotional.coverImage}
                            alt={devotional.title}
                            className="h-full w-full object-cover"
                          />
                        </div>
                        <div className="flex flex-1 flex-col p-4">
                          <div className="flex justify-between items-start">
                            <div>
                              <h3 className="font-serif text-lg font-semibold">
                                {devotional.title}
                              </h3>
                              <p className="mt-1 text-sm text-muted-foreground">
                                {devotional.author}
                              </p>
                            </div>
                            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                              Destaque
                            </div>
                          </div>
                          <div className="mt-2">
                            <span className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                              {devotional.category}
                            </span>
                          </div>
                          <p className="mt-3 text-sm flex-1">{devotional.description}</p>
                          <div className="mt-4 flex justify-end">
                            <Button>Ler Agora</Button>
                          </div>
                        </div>
                      </div>
                    )}
                  </Link>
                </Card>
              ))}
          </div>
        </TabsContent>

        <TabsContent value="recent">
          <div className={viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4" : "space-y-4"}>
            {/* Usando os 3 primeiros como "recentes" para simular */}
            {filteredDevotionals.slice(0, 3).map((devotional) => (
              <Card key={devotional.id} className="overflow-hidden hover:shadow-md transition-shadow">
                {/* Conteúdo similar ao acima */}
                <Link to={`/devotional/${devotional.id}`}>
                  {viewMode === "grid" ? (
                    <>
                      <div className="relative h-44 w-full">
                        <img
                          src={devotional.coverImage}
                          alt={devotional.title}
                          className="h-full w-full object-cover"
                        />
                        {devotional.featured && (
                          <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                            Destaque
                          </div>
                        )}
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                          <span className="inline-block rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                            {devotional.category}
                          </span>
                        </div>
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-serif text-lg font-semibold line-clamp-2">
                          {devotional.title}
                        </h3>
                        <p className="mt-1 text-sm text-muted-foreground">
                          {devotional.author}
                        </p>
                        <p className="mt-2 text-sm line-clamp-2">
                          {devotional.description}
                        </p>
                        <Button className="mt-4 w-full">Ler Agora</Button>
                      </CardContent>
                    </>
                  ) : (
                    <div className="flex h-full">
                      <div className="h-auto w-32 sm:w-48 bg-muted">
                        <img
                          src={devotional.coverImage}
                          alt={devotional.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex flex-1 flex-col p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-serif text-lg font-semibold">
                              {devotional.title}
                            </h3>
                            <p className="mt-1 text-sm text-muted-foreground">
                              {devotional.author}
                            </p>
                          </div>
                          {devotional.featured && (
                            <div className="bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                              Destaque
                            </div>
                          )}
                        </div>
                        <div className="mt-2">
                          <span className="inline-block rounded bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                            {devotional.category}
                          </span>
                        </div>
                        <p className="mt-3 text-sm flex-1">{devotional.description}</p>
                        <div className="mt-4 flex justify-end">
                          <Button>Ler Agora</Button>
                        </div>
                      </div>
                    </div>
                  )}
                </Link>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Library;
