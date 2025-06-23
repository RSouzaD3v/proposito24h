
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { HelpCircle, CheckCircle, XCircle, Award } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface QuizOption {
  id: string;
  text: string;
}

interface QuizQuestion {
  id: string;
  question: string;
  options: QuizOption[];
  correctOptionId: string;
  explanation: string;
}

interface QuizProps {
  quizId: string;
  devotionalId?: string;
  title: string;
  description: string;
  questions: QuizQuestion[];
  onComplete?: (score: number, totalQuestions: number) => void;
}

const QuizSystem: React.FC<QuizProps> = ({
  quizId,
  devotionalId,
  title,
  description,
  questions,
  onComplete
}) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOptionId, setSelectedOptionId] = useState<string | null>(null);
  const [isAnswerSubmitted, setIsAnswerSubmitted] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [score, setScore] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState<string[]>([]);
  const [quizCompleted, setQuizCompleted] = useState(false);
  const { toast } = useToast();

  const currentQuestion = questions[currentQuestionIndex];
  const progress = ((answeredQuestions.length) / questions.length) * 100;

  const handleOptionSelect = (optionId: string) => {
    if (!isAnswerSubmitted) {
      setSelectedOptionId(optionId);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOptionId) return;

    const isAnswerCorrect = selectedOptionId === currentQuestion.correctOptionId;
    setIsCorrect(isAnswerCorrect);
    setIsAnswerSubmitted(true);

    if (isAnswerCorrect) {
      setScore(prevScore => prevScore + 1);
    }

    setAnsweredQuestions(prev => [...prev, currentQuestion.id]);
  };

  const handleNextQuestion = () => {
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prevIndex => prevIndex + 1);
    } else {
      setQuizCompleted(true);
      if (onComplete) {
        onComplete(score, questions.length);
      }

      // Exibir toast ao completar o quiz
      toast({
        title: "Quiz completado!",
        description: `Sua pontuação: ${score}/${questions.length}`,
      });
    }
  };

  const restartQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOptionId(null);
    setIsAnswerSubmitted(false);
    setIsCorrect(false);
    setScore(0);
    setAnsweredQuestions([]);
    setQuizCompleted(false);
  };

  if (quizCompleted) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <Card className="w-full max-w-3xl mx-auto">
        <CardHeader>
          <CardTitle className="text-center">Resultados do Quiz</CardTitle>
          <CardDescription className="text-center">
            Você completou o quiz: {title}
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative h-32 w-32 mb-4">
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{percentage}%</span>
              </div>
              <svg className="h-32 w-32 transform -rotate-90" viewBox="0 0 100 100">
                <circle
                  className="text-muted-foreground/20"
                  strokeWidth="10"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
                <circle
                  className="text-primary"
                  strokeWidth="10"
                  strokeDasharray={2 * Math.PI * 40}
                  strokeDashoffset={2 * Math.PI * 40 * (1 - percentage / 100)}
                  strokeLinecap="round"
                  stroke="currentColor"
                  fill="transparent"
                  r="40"
                  cx="50"
                  cy="50"
                />
              </svg>
            </div>
            
            <h3 className="text-xl font-bold">
              {
                percentage >= 80 ? "Excelente!" :
                percentage >= 60 ? "Muito bom!" :
                percentage >= 40 ? "Bom trabalho!" :
                "Continue tentando!"
              }
            </h3>
            
            <p className="text-muted-foreground mt-2">
              Você acertou {score} de {questions.length} questões
            </p>
            
            {percentage >= 70 && (
              <div className="flex items-center mt-4 p-3 rounded-lg bg-primary/10">
                <Award className="h-5 w-5 text-primary mr-2" />
                <span>Você ganhou um emblema de conclusão!</span>
              </div>
            )}
          </div>
        </CardContent>
        <CardFooter className="flex justify-center gap-4">
          <Button onClick={restartQuiz}>Tentar Novamente</Button>
          {devotionalId && (
            <Button variant="outline" asChild>
              <a href={`/devotional/${devotionalId}`}>Voltar ao Devocional</a>
            </Button>
          )}
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>{title}</CardTitle>
            <CardDescription>{description}</CardDescription>
          </div>
          <div className="bg-primary/10 px-3 py-1 rounded-full text-sm font-medium">
            Questão {currentQuestionIndex + 1} de {questions.length}
          </div>
        </div>
        <Progress value={progress} className="h-2" />
      </CardHeader>
      
      <CardContent className="space-y-6">
        <div>
          <h3 className="text-xl font-medium mb-4 flex items-start">
            <HelpCircle className="h-5 w-5 mr-2 mt-1 text-primary flex-shrink-0" />
            <span>{currentQuestion.question}</span>
          </h3>
          
          <RadioGroup value={selectedOptionId || ""} className="space-y-3">
            {currentQuestion.options.map((option) => (
              <div key={option.id} className="flex items-start">
                <div className="flex items-center h-5">
                  <RadioGroupItem
                    value={option.id}
                    id={option.id}
                    disabled={isAnswerSubmitted}
                    onClick={() => handleOptionSelect(option.id)}
                    className="data-[state=checked]:border-primary data-[state=checked]:text-primary"
                  />
                </div>
                <div className="ml-3 text-sm">
                  <Label
                    htmlFor={option.id}
                    className={`font-medium ${
                      isAnswerSubmitted &&
                      option.id === currentQuestion.correctOptionId
                        ? "text-green-600"
                        : isAnswerSubmitted &&
                          option.id === selectedOptionId &&
                          !isCorrect
                        ? "text-red-500"
                        : ""
                    }`}
                  >
                    {option.text}
                    {isAnswerSubmitted && option.id === currentQuestion.correctOptionId && (
                      <CheckCircle className="inline ml-2 h-4 w-4 text-green-600" />
                    )}
                    {isAnswerSubmitted && option.id === selectedOptionId && !isCorrect && (
                      <XCircle className="inline ml-2 h-4 w-4 text-red-500" />
                    )}
                  </Label>
                </div>
              </div>
            ))}
          </RadioGroup>
        </div>
        
        {isAnswerSubmitted && (
          <div className={`p-4 rounded-lg ${isCorrect ? "bg-green-50" : "bg-red-50"}`}>
            <p className={`font-medium ${isCorrect ? "text-green-700" : "text-red-700"}`}>
              {isCorrect ? "Correto!" : "Incorreto!"}
            </p>
            <p className="mt-1 text-sm">{currentQuestion.explanation}</p>
          </div>
        )}
      </CardContent>
      
      <CardFooter className="flex justify-end gap-4">
        {!isAnswerSubmitted ? (
          <Button 
            onClick={handleSubmitAnswer} 
            disabled={!selectedOptionId}
          >
            Verificar Resposta
          </Button>
        ) : (
          <Button onClick={handleNextQuestion}>
            {currentQuestionIndex < questions.length - 1 ? "Próxima Questão" : "Ver Resultados"}
          </Button>
        )}
      </CardFooter>
    </Card>
  );
};

export default QuizSystem;
