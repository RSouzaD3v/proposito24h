
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart3, TrendingUp, Users, BookOpen } from "lucide-react";

const WriterAnalytics = () => {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Analytics</h1>
        <p className="text-muted-foreground">
          Acompanhe o desempenho do seu conteúdo
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total de Visualizações
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">2,573</div>
            <p className="text-xs text-muted-foreground">
              +15% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Leitores Únicos
            </CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">189</div>
            <p className="text-xs text-muted-foreground">
              +8% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Taxa de Engajamento
            </CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">67%</div>
            <p className="text-xs text-muted-foreground">
              +3% em relação ao mês passado
            </p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Devocionais Publicados
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground">
              +2 este mês
            </p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Devocionais Mais Visualizados</CardTitle>
            <CardDescription>
              Seus conteúdos com melhor performance
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">A Graça de Deus</p>
                  <p className="text-sm text-muted-foreground">234 visualizações</p>
                </div>
                <div className="text-sm font-medium text-green-600">+12%</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">Fé em Tempos Difíceis</p>
                  <p className="text-sm text-muted-foreground">189 visualizações</p>
                </div>
                <div className="text-sm font-medium text-green-600">+8%</div>
              </div>
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">O Amor de Cristo</p>
                  <p className="text-sm text-muted-foreground">156 visualizações</p>
                </div>
                <div className="text-sm font-medium text-green-600">+5%</div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Estatísticas de Engajamento</CardTitle>
            <CardDescription>
              Como os leitores interagem com seu conteúdo
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-sm">Tempo médio de leitura</span>
                <span className="font-medium">4m 32s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Taxa de conclusão</span>
                <span className="font-medium">78%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Quizzes completados</span>
                <span className="font-medium">45</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm">Comentários</span>
                <span className="font-medium">23</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WriterAnalytics;
