import React, { useEffect, useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, FileEdit, Eye, Trash2, HelpCircle } from "lucide-react";
import { Link } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

const WriterQuizzes = () => {
  const { user } = useAuth();

  const [quizzes, setQuizzes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchQuizzes = async () => {
      if (!user?.id) return;

      setLoading(true);
      setError(null);

      try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/quiz/user/${user.id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });

        if (!res.ok) {
          throw new Error("Erro ao buscar quizzes");
        }

        const data = await res.json();
        setQuizzes(data);
      } catch (err: any) {
        console.error(err);
        setError(err.message || "Erro desconhecido");
      } finally {
        setLoading(false);
      }
    };

    fetchQuizzes();
  }, [user]);

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

      {loading && (
        <div className="text-muted-foreground text-sm">Carregando quizzes...</div>
      )}
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      {!loading && quizzes.length === 0 && !error && (
        <div className="text-muted-foreground text-sm">Nenhum quiz encontrado.</div>
      )}

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
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <HelpCircle className="h-4 w-4" />
                {quiz.questions?.length || 0} perguntas
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm" asChild>
                  <Link to={`/writer/quizzes/${quiz.id}/edit`}>
                    <FileEdit className="h-4 w-4" />
                  </Link>
                </Button>
                <Button variant="outline" size="sm" disabled>
                  <Eye className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="sm" disabled>
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
