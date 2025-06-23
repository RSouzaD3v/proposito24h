
import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import QuizSystem from "@/components/QuizSystem";
import { mockQuizzes, mockQuestions, mockOptions, mockBooks } from "@/mocks";

const DevotionalQuiz = () => {
  const { id } = useParams<{ id: string }>();
  const [quiz, setQuiz] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Simular carregamento de dados dos mocks
    const timer = setTimeout(() => {
      // Buscar quiz baseado no ID do livro/devocional
      const foundQuiz = mockQuizzes.find(q => q.bookId === id);
      const book = mockBooks.find(b => b.id === id);
      
      if (foundQuiz) {
        // Buscar perguntas relacionadas ao quiz
        const quizQuestions = mockQuestions.map(question => {
          const questionOptions = mockOptions
            .filter(opt => opt.questionId === question.id)
            .map(opt => ({
              id: opt.id,
              text: opt.option,
            }));
          
          const correctOption = mockOptions.find(opt => 
            opt.questionId === question.id && opt.isCorrect
          );
          
          return {
            id: question.id,
            question: question.question,
            options: questionOptions,
            correctOptionId: correctOption?.id || "",
            explanation: "Baseado nos ensinamentos do livro."
          };
        });

        setQuiz({
          id: foundQuiz.id,
          devotionalId: id || "",
          title: foundQuiz.title,
          description: foundQuiz.description,
          questions: quizQuestions
        });
      } else {
        // Quiz padrão se não encontrar um específico
        setQuiz({
          id: "default-quiz",
          devotionalId: id || "",
          title: `Quiz: ${book?.title || "Devocional"}`,
          description: "Teste seus conhecimentos sobre o devocional que você acabou de ler.",
          questions: [
            {
              id: "q1",
              question: "Qual foi o principal ensinamento deste devocional?",
              options: [
                { id: "a", text: "A importância da oração diária" },
                { id: "b", text: "A paz que vem de Deus" },
                { id: "c", text: "O amor ao próximo" },
                { id: "d", text: "A leitura da Bíblia" }
              ],
              correctOptionId: "b",
              explanation: "O devocional enfatiza a paz que Deus oferece em meio às dificuldades."
            }
          ]
        });
      }
      setIsLoading(false);
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [id]);

  const handleQuizComplete = (score: number, totalQuestions: number) => {
    console.log(`Quiz completed with score: ${score}/${totalQuestions}`);
    // Aqui normalmente salvaríamos o resultado no backend
  };

  if (isLoading) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="animate-pulse text-center">
          <div className="mx-auto h-16 w-16 rounded-full bg-primary/20"></div>
          <p className="mt-4 text-muted-foreground">Carregando quiz...</p>
        </div>
      </div>
    );
  }

  if (!quiz) {
    return (
      <div className="flex h-[80vh] items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground">Quiz não encontrado</p>
          <Button asChild className="mt-4">
            <Link to={`/devotional/${id}`}>
              <ArrowLeft className="mr-2 h-4 w-4" />
              Voltar ao Devocional
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-6 md:py-8 max-w-4xl animate-fade-in">
      <div className="mb-6 flex items-center">
        <Button 
          variant="ghost" 
          size="sm" 
          asChild
          className="mr-auto"
        >
          <Link to={`/devotional/${id}`}>
            <ArrowLeft className="mr-2 h-4 w-4" />
            Voltar ao Devocional
          </Link>
        </Button>
      </div>

      <QuizSystem 
        quizId={quiz.id}
        devotionalId={quiz.devotionalId}
        title={quiz.title}
        description={quiz.description}
        questions={quiz.questions}
        onComplete={handleQuizComplete}
      />
    </div>
  );
};

export default DevotionalQuiz;
