
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useToast } from "@/hooks/use-toast";
import { Users, BookOpen, BookCheck, BarChart3, TrendingUp, TrendingDown, DollarSign } from "lucide-react";

// Componente de cartão de métricas
const MetricCard = ({ title, value, icon: Icon, change, isPositive, description }) => (
  <Card>
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-muted-foreground">{title}</CardTitle>
      <Icon className="h-4 w-4 text-muted-foreground" />
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold">{value}</div>
      {change && (
        <p className={`flex items-center text-xs ${isPositive ? 'text-green-600' : 'text-red-600'}`}>
          {isPositive ? <TrendingUp className="mr-1 h-3 w-3" /> : <TrendingDown className="mr-1 h-3 w-3" />}
          {change} desde o último mês
        </p>
      )}
      {description && <p className="text-xs text-muted-foreground mt-1">{description}</p>}
    </CardContent>
  </Card>
);

const AdminDashboard = () => {
  const { toast } = useToast();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground">
          Visão geral da plataforma e métricas principais.
        </p>
      </div>

      <Tabs defaultValue="overview" className="space-y-4">
        <TabsList>
          <TabsTrigger value="overview">Visão Geral</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="financial">Financeiro</TabsTrigger>
        </TabsList>
        
        <TabsContent value="overview" className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
            <MetricCard 
              title="Usuários Totais" 
              value="2,845" 
              icon={Users} 
              change="+12.5%" 
              isPositive={true}
              description="Crescimento sólido de usuários"
            />
            <MetricCard 
              title="Devocionais" 
              value="187" 
              icon={BookOpen} 
              change="+4.2%" 
              isPositive={true}
              description="Novos devocionais publicados"
            />
            <MetricCard 
              title="Planos de Leitura" 
              value="24" 
              icon={BookCheck} 
              change="+2" 
              isPositive={true}
              description="Novos planos no último mês"
            />
            <MetricCard 
              title="Assinantes Premium" 
              value="843" 
              icon={DollarSign} 
              change="-1.2%" 
              isPositive={false}
              description="Campanhas necessárias"
            />
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
            <Card className="col-span-4">
              <CardHeader>
                <CardTitle>Atividade dos Usuários</CardTitle>
                <CardDescription>
                  Visão de 30 dias das interações principais na plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-sm text-muted-foreground">Gráfico de Atividade dos Usuários</p>
                </div>
              </CardContent>
            </Card>
            <Card className="col-span-3">
              <CardHeader>
                <CardTitle>Métricas de Engajamento</CardTitle>
                <CardDescription>
                  Comparativo de uso dos recursos da plataforma.
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <div className="h-[300px] flex items-center justify-center bg-muted/20 rounded-md">
                  <p className="text-sm text-muted-foreground">Gráfico de Engajamento</p>
                </div>
              </CardContent>
            </Card>
          </div>
          
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            <Card className="col-span-2">
              <CardHeader>
                <CardTitle>Devocionais Mais Populares</CardTitle>
                <CardDescription>
                  Os devocionais mais lidos pelos usuários no último mês.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {[
                    { title: "Encontrando Paz nas Tempestades da Vida", author: "Pastor João Silva", views: 1423 },
                    { title: "O Poder da Gratidão Diária", author: "Maria Santos", views: 982 },
                    { title: "Superando o Medo com Fé", author: "Pedro Oliveira", views: 756 },
                    { title: "Caminhando com Propósito", author: "Ana Costa", views: 621 },
                    { title: "A Importância do Perdão", author: "Lucas Mendes", views: 543 }
                  ].map((devotional, index) => (
                    <div key={index} className="flex items-center justify-between pb-4 last:pb-0 last:border-0 border-b">
                      <div>
                        <p className="font-medium">{devotional.title}</p>
                        <p className="text-sm text-muted-foreground">por {devotional.author}</p>
                      </div>
                      <div className="flex items-center">
                        <p className="text-sm font-medium">{devotional.views.toLocaleString()}</p>
                        <p className="text-xs text-muted-foreground ml-1">leituras</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <p className="text-xs text-muted-foreground">
                  Dados atualizados em 18 de junho de 2024
                </p>
              </CardFooter>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Alertas do Sistema</CardTitle>
                <CardDescription>
                  Notificações importantes que requerem atenção.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="p-3 bg-yellow-50 border border-yellow-200 rounded-md">
                    <p className="text-sm font-medium text-yellow-700">Carga do servidor acima do normal</p>
                    <p className="text-xs text-yellow-600 mt-1">Picos de uso detectados entre 19h-21h</p>
                  </div>
                  <div className="p-3 bg-blue-50 border border-blue-200 rounded-md">
                    <p className="text-sm font-medium text-blue-700">Atualização programada</p>
                    <p className="text-xs text-blue-600 mt-1">Versão 2.4.1 será lançada em 24 de junho</p>
                  </div>
                  <div className="p-3 bg-green-50 border border-green-200 rounded-md">
                    <p className="text-sm font-medium text-green-700">Backup completo</p>
                    <p className="text-xs text-green-600 mt-1">Backup semanal concluído com sucesso</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Detalhado de Analytics</CardTitle>
              <CardDescription>
                Dados de uso e comportamento dos usuários na plataforma.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">Relatório de Analytics (em desenvolvimento)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="financial" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Relatório Financeiro</CardTitle>
              <CardDescription>
                Visão geral das receitas e transações financeiras.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[500px] flex items-center justify-center bg-muted/20 rounded-md">
                <p className="text-sm text-muted-foreground">Relatório Financeiro (em desenvolvimento)</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AdminDashboard;
