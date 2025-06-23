
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileEdit, Eye, Trash2, Calendar } from "lucide-react";
import { Link } from "react-router-dom";

const WriterReadingPlans = () => {
  const readingPlans = [
    {
      id: "1",
      title: "30 Dias de Oração",
      description: "Um plano de 30 dias para fortalecer sua vida de oração",
      duration: "30 dias",
      devotionals: 30,
      status: "Publicado"
    },
    {
      id: "2",
      title: "Conhecendo Jesus",
      description: "Uma jornada de 14 dias para conhecer melhor a Jesus",
      duration: "14 dias", 
      devotionals: 14,
      status: "Rascunho"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Planos de Leitura</h1>
          <p className="text-muted-foreground">
            Crie e gerencie planos de leitura estruturados
          </p>
        </div>
        <Button asChild>
          <Link to="/writer/reading-plans/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Plano
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {readingPlans.map((plan) => (
          <Card key={plan.id}>
            <CardHeader>
              <CardTitle className="line-clamp-1">{plan.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {plan.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {plan.duration}
                </div>
                <span>{plan.devotionals} devocionais</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  plan.status === "Publicado" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {plan.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/writer/reading-plans/${plan.id}/edit`}>
                    <FileEdit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm">
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm">
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default WriterReadingPlans;
