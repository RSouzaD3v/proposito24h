
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileEdit, Eye, Trash2, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";

const WriterQuizzes = () => {
  const quizzes = [
    {
      id: "1",
      title: "Quiz: A Graça de Deus",
      description: "Teste seus conhecimentos sobre a graça divina",
      questions: 5,
      attempts: 45,
      status: "Ativo"
    },
    {
      id: "2",
      title: "Quiz: Fé e Esperança",
      description: "Perguntas sobre fé e esperança cristã",
      questions: 8,
      attempts: 12,
      status: "Rascunho"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Meus Quizzes</h1>
          <p className="text-muted-foreground">
            Crie quizzes interativos para seus devocionais
          </p>
        </div>
        <Button asChild>
          <Link to="/writer/quizzes/new">
            <Plus className="mr-2 h-4 w-4" />
            Novo Quiz
          </Link>
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((quiz) => (
          <Card key={quiz.id}>
            <CardHeader>
              <CardTitle className="line-clamp-1">{quiz.title}</CardTitle>
              <CardDescription className="line-clamp-2">
                {quiz.description}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                <div className="flex items-center gap-1">
                  <HelpCircle className="h-4 w-4" />
                  {quiz.questions} perguntas
                </div>
                <span>{quiz.attempts} tentativas</span>
              </div>
              <div className="flex items-center justify-between mb-4">
                <span className={`text-xs px-2 py-1 rounded ${
                  quiz.status === "Ativo" 
                    ? "bg-green-100 text-green-800" 
                    : "bg-yellow-100 text-yellow-800"
                }`}>
                  {quiz.status}
                </span>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/writer/quizzes/${quiz.id}/edit`}>
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

export default WriterQuizzes;
