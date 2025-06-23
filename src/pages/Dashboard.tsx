
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, Clock, Star, ChevronRight, BookmarkIcon } from "lucide-react";
import { Link } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockBooks, getUserPurchases, mockDailySequences, mockUsers } from "@/mocks";

const Dashboard = () => {
  const { user } = useAuth();
  
  // Buscar dados do usuário logado
  const userPurchases = getUserPurchases(user?.id || "");
  const userSequence = mockDailySequences.find(seq => seq.userId === user?.id);
  
  // Dados de progresso baseados nos mocks
  const progressData = {
    devotionalsCompleted: userPurchases.length,
    streakDays: userSequence?.recordSequence || 0,
    minutesRead: userPurchases.length * 15, // Estimativa de 15 min por livro
  };

  // Livros em progresso - pegar os livros comprados pelo usuário
  const inProgressDevotionals = userPurchases.slice(0, 2).map(purchase => {
    const book = mockBooks.find(b => b.id === purchase.bookId);
    const author = mockUsers.find(u => u.id === book?.userId);
    return {
      id: book?.id || "",
      title: book?.title || "",
      author: author?.name || "",
      progress: Math.floor(Math.random() * 80) + 20, // Progresso simulado
      coverImage: book?.coverImage || "",
    };
  }).filter(book => book.id);

  // Livros recomendados - pegar livros que o usuário não comprou
  const purchasedBookIds = userPurchases.map(p => p.bookId);
  const recommendedDevotionals = mockBooks
    .filter(book => !purchasedBookIds.includes(book.id) && book.mode === "PUBLISHED")
    .slice(0, 3)
    .map(book => {
      const author = mockUsers.find(u => u.id === book.userId);
      return {
        id: book.id,
        title: book.title,
        author: author?.name || book.authorName,
        category: book.category,
        coverImage: book.coverImage,
      };
    });

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Welcome Section */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold md:text-3xl">
            Olá, {user?.name?.split(" ")[0]}!
          </h1>
          <p className="mt-1 text-muted-foreground">
            {new Date().toLocaleDateString("pt-BR", { 
              weekday: "long", 
              day: "numeric", 
              month: "long" 
            })}
          </p>
        </div>
        <div className="mt-4 md:mt-0">
          <Button asChild>
            <Link to="/library">Explorar Devocionais</Link>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Devocionais Concluídos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BookOpen className="mr-2 h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">{progressData.devotionalsCompleted}</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Sequência de Dias</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Star className="mr-2 h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">{progressData.streakDays} dias</span>
            </div>
          </CardContent>
        </Card>
        
        <Card className="hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Tempo de Leitura</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="mr-2 h-6 w-6 text-primary" />
              <span className="text-2xl font-bold">{progressData.minutesRead} min</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Continue Reading Section */}
      {inProgressDevotionals.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Continue Lendo</h2>
            <Link to="/library" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {inProgressDevotionals.map((devotional) => (
              <Card key={devotional.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <Link to={`/devotional/${devotional.id}`}>
                  <div className="flex h-full">
                    <div className="h-auto w-24 bg-muted">
                      <img
                        src={devotional.coverImage}
                        alt={devotional.title}
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-4">
                      <h3 className="font-serif text-base font-semibold line-clamp-2">
                        {devotional.title}
                      </h3>
                      <p className="mt-1 text-sm text-muted-foreground">
                        {devotional.author}
                      </p>
                      <div className="mt-auto pt-2">
                        <div className="h-1.5 w-full rounded-full bg-muted">
                          <div
                            className="h-1.5 rounded-full bg-primary"
                            style={{ width: `${devotional.progress}%` }}
                          ></div>
                        </div>
                        <p className="mt-1 text-xs text-muted-foreground">
                          {devotional.progress}% concluído
                        </p>
                      </div>
                    </div>
                  </div>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Recommended Devotionals */}
      {recommendedDevotionals.length > 0 && (
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-bold">Recomendados para Você</h2>
            <Link to="/library" className="text-sm text-primary hover:underline">
              Ver todos
            </Link>
          </div>
          
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
            {recommendedDevotionals.map((devotional) => (
              <Card key={devotional.id} className="hover:shadow-md transition-shadow">
                <Link to={`/devotional/${devotional.id}`}>
                  <div className="relative h-40 w-full">
                    <img
                      src={devotional.coverImage}
                      alt={devotional.title}
                      className="h-full w-full rounded-t-lg object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <span className="inline-block rounded bg-primary/20 px-2 py-1 text-xs font-medium text-primary">
                        {devotional.category}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-serif text-base font-semibold line-clamp-2">
                      {devotional.title}
                    </h3>
                    <p className="mt-1 text-sm text-muted-foreground">
                      {devotional.author}
                    </p>
                    <div className="mt-2 flex items-center justify-between">
                      <Button variant="ghost" size="sm" className="p-0 text-primary hover:bg-transparent hover:text-primary hover:underline">
                        Ler agora
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      )}

      {/* Reading Plans Teaser */}
      <Card className="overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="bg-primary/10 p-6 md:w-1/3">
            <BookmarkIcon className="h-10 w-10 text-primary" />
            <h3 className="mt-4 text-xl font-bold">Planos de Leitura</h3>
            <p className="mt-2 text-muted-foreground">
              Mantenha-se consistente com nossos planos de leitura estruturados
            </p>
            <Button className="mt-4" asChild>
              <Link to="/reading-plans">Ver Planos</Link>
            </Button>
          </div>
          <div className="flex flex-1 flex-col justify-between p-6">
            <div>
              <h4 className="font-serif text-lg font-bold">
                Plano em Destaque: 21 Dias de Oração
              </h4>
              <p className="mt-2 text-muted-foreground">
                Transforme sua vida espiritual através da oração diária. Este plano guiará você
                em um processo de 21 dias para estabelecer uma rotina de oração eficaz.
              </p>
            </div>
            <div className="mt-4 flex items-center">
              <div className="flex -space-x-2">
                {[1, 2, 3].map((i) => (
                  <Avatar key={i} className="border-2 border-background">
                    <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${30 + i}.jpg`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="ml-3 text-sm text-muted-foreground">
                156 pessoas seguindo este plano
              </p>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;
