
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, Clock, BookOpen, Star, Users, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const readingPlansList = [
  {
    id: "1",
    title: "21 Dias de Oração",
    description: "Transforme sua vida espiritual com este plano de oração diária",
    category: "Oração",
    totalDays: 21,
    timePerDay: 15,
    users: 156,
    coverImage: "https://images.unsplash.com/photo-1529070538774-1843cb3265df",
    progress: 33,
    featured: true,
  },
  {
    id: "2",
    title: "Fundamentos da Fé",
    description: "Explore os princípios fundamentais da fé cristã",
    category: "Doutrina",
    totalDays: 30,
    timePerDay: 20,
    users: 98,
    coverImage: "https://images.unsplash.com/photo-1504052434569-70ad5836ab65",
    progress: 0,
    featured: false,
  },
  {
    id: "3",
    title: "Salmos para Momentos Difíceis",
    description: "Encontre consolo nos Salmos durante tempos desafiadores",
    category: "Consolo",
    totalDays: 14,
    timePerDay: 10,
    users: 245,
    coverImage: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88",
    progress: 0,
    featured: true,
  },
  {
    id: "4",
    title: "Vida em Comunidade",
    description: "Aprenda princípios bíblicos para relacionamentos saudáveis",
    category: "Relacionamentos",
    totalDays: 28,
    timePerDay: 15,
    users: 87,
    coverImage: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac",
    progress: 0,
    featured: false,
  },
  {
    id: "5",
    title: "Evangelhos em 90 Dias",
    description: "Leia e estude os quatro evangelhos em profundidade",
    category: "Estudo Bíblico",
    totalDays: 90,
    timePerDay: 25,
    users: 132,
    coverImage: "https://images.unsplash.com/photo-1535957998253-26ae1ef29506",
    progress: 10,
    featured: true,
  },
];

const ReadingPlans = () => {
  const [activeTab, setActiveTab] = useState("all");
  const { toast } = useToast();

  const handleJoinPlan = (planId: string, planTitle: string) => {
    toast({
      title: "Plano adicionado!",
      description: `Você começou o plano "${planTitle}"`,
    });
  };

  const myPlans = readingPlansList.filter(plan => plan.progress > 0);
  const availablePlans = readingPlansList.filter(plan => plan.progress === 0);
  const featuredPlans = readingPlansList.filter(plan => plan.featured);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold md:text-3xl">Planos de Leitura</h1>
        <p className="text-muted-foreground mt-1">
          Mantenha-se consistente com nossos planos de leitura estruturados
        </p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3 mb-6">
          <TabsTrigger value="all">Todos os Planos</TabsTrigger>
          <TabsTrigger value="my-plans">Meus Planos</TabsTrigger>
          <TabsTrigger value="featured">Destaques</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {readingPlansList.map((plan) => (
              <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-36 w-full">
                  <img
                    src={plan.coverImage}
                    alt={plan.title}
                    className="h-full w-full object-cover"
                  />
                  {plan.featured && (
                    <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                      Destaque
                    </div>
                  )}
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                      {plan.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pt-4 pb-2">
                  <CardTitle className="font-serif text-xl">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{plan.totalDays} dias</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{plan.timePerDay} min/dia</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{plan.users}</span>
                    </div>
                  </div>

                  {plan.progress > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>
                  )}

                  <div className="mt-4">
                    {plan.progress > 0 ? (
                      <Button className="w-full" variant="outline">
                        Continuar Plano
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => handleJoinPlan(plan.id, plan.title)}
                      >
                        Começar Plano
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="my-plans" className="space-y-6">
          {myPlans.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {myPlans.map((plan) => (
                <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow">
                  <div className="relative h-36 w-full">
                    <img
                      src={plan.coverImage}
                      alt={plan.title}
                      className="h-full w-full object-cover"
                    />
                    <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                      <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                        {plan.category}
                      </Badge>
                    </div>
                  </div>

                  <CardHeader className="pt-4 pb-2">
                    <CardTitle className="font-serif text-xl">{plan.title}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                  </CardHeader>

                  <CardContent>
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center">
                        <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{plan.totalDays} dias</span>
                      </div>
                      <div className="flex items-center">
                        <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                        <span>{plan.timePerDay} min/dia</span>
                      </div>
                    </div>

                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>

                    <div className="mt-4">
                      <Button className="w-full" variant="outline">
                        Continuar Plano
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <BookOpen className="mx-auto h-12 w-12 text-muted-foreground" />
              <h3 className="mt-4 text-lg font-medium">Você ainda não iniciou nenhum plano</h3>
              <p className="mt-2 text-muted-foreground">
                Escolha um plano da nossa biblioteca para começar sua jornada
              </p>
              <Button
                className="mt-4"
                onClick={() => setActiveTab("all")}
              >
                Explorar Planos
              </Button>
            </div>
          )}
        </TabsContent>

        <TabsContent value="featured" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {featuredPlans.map((plan) => (
              <Card key={plan.id} className="overflow-hidden hover:shadow-md transition-shadow">
                <div className="relative h-36 w-full">
                  <img
                    src={plan.coverImage}
                    alt={plan.title}
                    className="h-full w-full object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-primary text-primary-foreground px-2 py-1 rounded text-xs font-medium">
                    Destaque
                  </div>
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-3">
                    <Badge variant="secondary" className="bg-primary/20 text-primary hover:bg-primary/30">
                      {plan.category}
                    </Badge>
                  </div>
                </div>

                <CardHeader className="pt-4 pb-2">
                  <CardTitle className="font-serif text-xl">{plan.title}</CardTitle>
                  <CardDescription>{plan.description}</CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="flex items-center gap-4 text-sm">
                    <div className="flex items-center">
                      <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{plan.totalDays} dias</span>
                    </div>
                    <div className="flex items-center">
                      <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{plan.timePerDay} min/dia</span>
                    </div>
                    <div className="flex items-center">
                      <Users className="mr-1 h-4 w-4 text-muted-foreground" />
                      <span>{plan.users}</span>
                    </div>
                  </div>

                  {plan.progress > 0 && (
                    <div className="mt-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span>Progresso</span>
                        <span>{plan.progress}%</span>
                      </div>
                      <Progress value={plan.progress} className="h-2" />
                    </div>
                  )}

                  <div className="mt-4">
                    {plan.progress > 0 ? (
                      <Button className="w-full" variant="outline">
                        Continuar Plano
                        <ChevronRight className="ml-1 h-4 w-4" />
                      </Button>
                    ) : (
                      <Button 
                        className="w-full"
                        onClick={() => handleJoinPlan(plan.id, plan.title)}
                      >
                        Começar Plano
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>

      {/* Featured Plan Banner */}
      <Card className="overflow-hidden bg-gradient-to-br from-primary/10 to-background">
        <div className="flex flex-col md:flex-row">
          <div className="p-6 md:w-1/2">
            <Badge variant="outline" className="mb-4">Plano em Destaque</Badge>
            <h3 className="text-2xl font-bold font-serif">Imersão nos Evangelhos</h3>
            <p className="mt-2 text-muted-foreground">
              Uma jornada de 90 dias pelos quatro evangelhos, com reflexões diárias e aplicações práticas para a vida contemporânea.
            </p>
            
            <div className="flex items-center gap-4 mt-4 text-sm">
              <div className="flex items-center">
                <CalendarIcon className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>90 dias</span>
              </div>
              <div className="flex items-center">
                <Clock className="mr-1 h-4 w-4 text-muted-foreground" />
                <span>20 min/dia</span>
              </div>
              <div className="flex items-center">
                <Star className="mr-1 h-4 w-4 text-amber-500" />
                <span>4.9</span>
              </div>
            </div>
            
            <div className="mt-6 flex items-center">
              <div className="flex -space-x-2 mr-3">
                {[1, 2, 3].map((i) => (
                  <Avatar key={i} className="border-2 border-background">
                    <AvatarImage src={`https://randomuser.me/api/portraits/${i % 2 ? 'women' : 'men'}/${30 + i}.jpg`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
              </div>
              <p className="text-sm text-muted-foreground">
                312 pessoas seguindo este plano
              </p>
            </div>
            
            <Button className="mt-6" onClick={() => handleJoinPlan("special", "Imersão nos Evangelhos")}>
              Participar deste Plano
            </Button>
          </div>
          <div className="md:w-1/2">
            <img 
              src="https://images.unsplash.com/photo-1504052434569-70ad5836ab65" 
              alt="Imersão nos Evangelhos"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ReadingPlans;
