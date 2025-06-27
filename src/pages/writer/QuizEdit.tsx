import React, { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Save, Eye, ArrowLeft, Plus, Trash2 } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

const WriterQuizEdit = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();

  // Form states
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedBookId, setSelectedBookId] = useState("");
  const [questions, setQuestions] = useState([
    { id: 1, question: "", options: ["", "", "", ""], correctAnswer: 0 }
  ]);

  // Books
  const [books, setBooks] = useState<any[]>([]);
  const [loadingBooks, setLoadingBooks] = useState(false);

  // General loading/error states
  const [loading, setLoading] = useState(false);
  const [loadingQuiz, setLoadingQuiz] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  // Fetch books on mount
  useEffect(() => {
    const fetchBooks = async () => {
      setLoadingBooks(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/devocional/books`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Erro ao buscar livros");
        const data = await response.json();
        setBooks(data);
      } catch (error) {
        console.error("Erro ao buscar livros:", error);
      } finally {
        setLoadingBooks(false);
      }
    };
    fetchBooks();
  }, []);

  // Fetch quiz data to edit
  useEffect(() => {
    const fetchQuiz = async () => {
      if (!id) return;
      setLoadingQuiz(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/quiz/${id}`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) throw new Error("Erro ao carregar quiz");
        const data = await response.json();

        // Fill form with loaded data
        setTitle(data.title);
        setDescription(data.description || "");
        setSelectedBookId(data.bookId);

        const loadedQuestions = data.questions.map((q: any) => {
          const correctIndex = q.option.findIndex((opt: any) => opt.isCorrect);
          return {
            id: q.id,
            question: q.question,
            options: q.option.map((opt: any) => opt.option),
            correctAnswer: correctIndex >= 0 ? correctIndex : 0
          };
        });
        setQuestions(loadedQuestions.length ? loadedQuestions : [
          { id: 1, question: "", options: ["", "", "", ""], correctAnswer: 0 }
        ]);
      } catch (error) {
        console.error("Erro ao carregar quiz:", error);
        setError("Erro ao carregar quiz para edição.");
      } finally {
        setLoadingQuiz(false);
      }
    };
    fetchQuiz();
  }, [id]);

  const addQuestion = () => {
    const newQuestion = {
      id: Date.now(),
      question: "",
      options: ["", "", "", ""],
      correctAnswer: 0
    };
    setQuestions([...questions, newQuestion]);
  };

  const removeQuestion = (qid: any) => {
    setQuestions(questions.filter(q => q.id !== qid));
  };

  const updateQuestion = (qid: any, field: string, value: any) => {
    setQuestions(questions.map(q =>
      q.id === qid ? { ...q, [field]: value } : q
    ));
  };

  const updateOption = (questionId: any, optionIndex: number, value: string) => {
    setQuestions(questions.map(q =>
      q.id === questionId
        ? { ...q, options: q.options.map((opt, idx) => idx === optionIndex ? value : opt) }
        : q
    ));
  };

  const handleSave = async () => {
    setLoading(true);
    setError(null);
    setSuccess(null);

    if (!selectedBookId) {
      setError("Selecione um livro para vincular o quiz.");
      setLoading(false);
      return;
    }

    if (!title.trim()) {
      setError("O título do quiz não pode estar vazio.");
      setLoading(false);
      return;
    }

    const payload = {
      title,
      description,
      bookId: selectedBookId,
      questions: questions.map(q => ({
        question: q.question,
        options: q.options.map((opt, idx) => ({
          option: opt,
          isCorrect: q.correctAnswer === idx
        }))
      }))
    };

    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/quiz/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`
        },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erro ao atualizar quiz");
      }

      setSuccess("Quiz atualizado com sucesso!");
      navigate("/writer/quizzes");
    } catch (err: any) {
      setError(err.message || "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Button variant="ghost" size="sm" asChild>
            <Link to="/writer/quizzes">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Editor de Quiz</h1>
            <p className="text-muted-foreground">
              Edite seu quiz
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" disabled>
            <Eye className="mr-2 h-4 w-4" />
            Visualizar
          </Button>
          <Button onClick={handleSave} disabled={loading}>
            <Save className="mr-2 h-4 w-4" />
            {loading ? "Salvando..." : "Salvar"}
          </Button>
        </div>
      </div>

      {loadingQuiz && (
        <div className="text-muted-foreground text-sm">Carregando dados do quiz...</div>
      )}
      {error && (
        <div className="text-red-500 text-sm">{error}</div>
      )}
      {success && (
        <div className="text-green-500 text-sm">{success}</div>
      )}

      {!loadingQuiz && (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Informações do Quiz</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="book">Livro</Label>
                <Select value={selectedBookId} onValueChange={setSelectedBookId}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione o livro para vincular o quiz" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingBooks ? (
                      <div className="p-2 text-sm text-muted-foreground">Carregando livros...</div>
                    ) : books.length === 0 ? (
                      <div className="p-2 text-sm text-muted-foreground">Nenhum livro encontrado</div>
                    ) : (
                      books.map((book) => (
                        <SelectItem key={book.id} value={book.id}>
                          {book.title}
                        </SelectItem>
                      ))
                    )}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Título</Label>
                <Input
                  id="title"
                  placeholder="Digite o título do quiz"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  placeholder="Descreva o objetivo do quiz"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </CardContent>
          </Card>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Perguntas</h2>
              <Button onClick={addQuestion}>
                <Plus className="mr-2 h-4 w-4" />
                Adicionar Pergunta
              </Button>
            </div>

            {questions.map((question, index) => (
              <Card key={question.id}>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Pergunta {index + 1}</CardTitle>
                    {questions.length > 1 && (
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => removeQuestion(question.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label>Pergunta</Label>
                    <Textarea
                      placeholder="Digite sua pergunta aqui"
                      value={question.question}
                      onChange={(e) => updateQuestion(question.id, 'question', e.target.value)}
                    />
                  </div>

                  <div className="space-y-3">
                    <Label>Opções de Resposta</Label>
                    {question.options.map((option, optionIndex) => (
                      <div key={optionIndex} className="flex items-center gap-2">
                        <input
                          type="radio"
                          name={`correct-${question.id}`}
                          checked={question.correctAnswer === optionIndex}
                          onChange={() => updateQuestion(question.id, 'correctAnswer', optionIndex)}
                          className="mt-1"
                        />
                        <Input
                          placeholder={`Opção ${optionIndex + 1}`}
                          value={option}
                          onChange={(e) => updateOption(question.id, optionIndex, e.target.value)}
                          className="flex-1"
                        />
                      </div>
                    ))}
                    <p className="text-xs text-muted-foreground">
                      Selecione o botão de rádio para marcar a resposta correta
                    </p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default WriterQuizEdit;
