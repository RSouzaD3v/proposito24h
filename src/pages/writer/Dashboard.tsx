
import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { BookOpen, FileEdit, Calendar, BarChart3, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const WriterDashboard = () => {
  const [devotionals, setDevotionals] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDevotionals = async () => {
      setLoading(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/devocional/get-devocional-by-writer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${localStorage.getItem("token")}`
          }
        });
        if (!response.ok) {
          throw new Error("Erro ao buscar devocionais");
        }
        const data = await response.json();
        setDevotionals(data);
        console.log("Devocionais:", data);
        setLoading(false);
      } catch (err) {
        console.error("Erro ao buscar devocionais:", err);
        setLoading(false);
      }
    }

    fetchDevotionals();
  }, [])

  if (loading) {
    return <div>Carregando...</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard do Escritor</h1>
        <p className="text-muted-foreground">
          Gerencie seus devocionais, planos de leitura e conteúdo
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Devocionais
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{devotionals?.length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +2 este mês
            </p> */}
          </CardContent>
        </Card>
        
        {/* <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Planos de Leitura
            </CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">3</div>
            <p className="text-xs text-muted-foreground">
              +1 este mês
            </p>
          </CardContent>
        </Card> */}
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Devocionais Publicados
            </CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{devotionals.filter((v) => v.mode === "PUBLISHED").length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +201 esta semana
            </p> */}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Devocionais em Rascunho
            </CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">{devotionals.filter((v) => v.mode === "SKETCH").length}</div>
            {/* <p className="text-xs text-muted-foreground">
              +12 esta semana
            </p> */}
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Ações Rápidas</CardTitle>
            <CardDescription>
              Crie novo conteúdo rapidamente
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button asChild className="w-full justify-start">
              <Link to="/writer/devotionals/new">
                <Plus className="mr-2 h-4 w-4" />
                Novo Devocional
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/writer/reading-plans/new">
                <Plus className="mr-2 h-4 w-4" />
                Novo Plano de Leitura
              </Link>
            </Button>
            <Button asChild variant="outline" className="w-full justify-start">
              <Link to="/writer/quizzes/new">
                <Plus className="mr-2 h-4 w-4" />
                Novo Quiz
              </Link>
            </Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Conteúdo Recente</CardTitle>
            <CardDescription>
              Seus últimos trabalhos
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {devotionals.map((devotional) => (
                <div key={devotional.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{devotional.title}</p>
                    <p className="text-sm text-muted-foreground">Valor: R${devotional.bookPrice.toFixed(2)}</p>
                  </div>
                  <Button variant="ghost" size="sm">
                    <FileEdit className="h-4 w-4" />
                  </Button>
                </div>
              ))}
              {/* <div className="flex items-center justify-between">
                <div>
                  <p className="font-medium">30 Dias de Oração</p>
                  <p className="text-sm text-muted-foreground">Plano de Leitura</p>
                </div>
                <Button variant="ghost" size="sm">
                  <FileEdit className="h-4 w-4" />
                </Button>
              </div> */}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default WriterDashboard;
