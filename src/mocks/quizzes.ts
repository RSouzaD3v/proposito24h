
import { Quiz, Question, Option } from "./types";

export const mockQuizzes: Quiz[] = [
  {
    id: "quiz-1",
    title: "Conhecendo os Salmos de Davi",
    description: "Teste seus conhecimentos sobre as lições aprendidas no livro sobre paz nas tempestades.",
    bookId: "1"
  },
  {
    id: "quiz-2", 
    title: "Mulher Virtuosa - Reflexões",
    description: "Quiz sobre os ensinamentos do livro para mulheres cristãs.",
    bookId: "2"
  },
  {
    id: "quiz-3",
    title: "Fé Jovem em Ação",
    description: "Perguntas sobre como aplicar a fé cristã na juventude.",
    bookId: "3"
  }
];

export const mockQuestions: Question[] = [
  // Perguntas para Quiz 1
  {
    id: "q1-1",
    question: "Segundo o Salmo 23:4, o que nos consola no vale da sombra da morte?"
  },
  {
    id: "q1-2",
    question: "O que representa a 'vara' do pastor na metáfora bíblica?"
  },
  {
    id: "q1-3",
    question: "Para onde o Bom Pastor nos conduz para renovação espiritual?"
  },

  // Perguntas para Quiz 2
  {
    id: "q2-1",
    question: "Em Provérbios 31:10, a mulher virtuosa é comparada a que pedra preciosa?"
  },
  {
    id: "q2-2",
    question: "Segundo Provérbios 31:25, o que a mulher virtuosa 'veste' diariamente?"
  },

  // Perguntas para Quiz 3
  {
    id: "q3-1",
    question: "Em quantas áreas 1 Timóteo 4:12 diz que os jovens devem ser exemplo?"
  }
];

export const mockOptions: Option[] = [
  // Opções para q1-1
  {
    id: "opt1-1-1",
    option: "A vara e o cajado do Senhor",
    isCorrect: true,
    questionId: "q1-1"
  },
  {
    id: "opt1-1-2", 
    option: "A presença de outros pastores",
    isCorrect: false,
    questionId: "q1-1"
  },
  {
    id: "opt1-1-3",
    option: "Nossas próprias forças",
    isCorrect: false,
    questionId: "q1-1"
  },

  // Opções para q1-2
  {
    id: "opt1-2-1",
    option: "Disciplina e correção",
    isCorrect: false,
    questionId: "q1-2"
  },
  {
    id: "opt1-2-2",
    option: "Proteção contra predadores",
    isCorrect: true,
    questionId: "q1-2"
  },
  {
    id: "opt1-2-3",
    option: "Ferramenta de trabalho comum",
    isCorrect: false,
    questionId: "q1-2"
  },

  // Opções para q1-3
  {
    id: "opt1-3-1",
    option: "Águas tranquilas e verdes pastos",
    isCorrect: true,
    questionId: "q1-3"
  },
  {
    id: "opt1-3-2",
    option: "Montanhas altas",
    isCorrect: false,
    questionId: "q1-3"
  },
  {
    id: "opt1-3-3",
    option: "Desertos áridos",
    isCorrect: false,
    questionId: "q1-3"
  },

  // Opções para q2-1
  {
    id: "opt2-1-1",
    option: "Diamantes",
    isCorrect: false,
    questionId: "q2-1"
  },
  {
    id: "opt2-1-2",
    option: "Rubis",
    isCorrect: true,
    questionId: "q2-1"
  },
  {
    id: "opt2-1-3",
    option: "Pérolas",
    isCorrect: false,
    questionId: "q2-1"
  },

  // Opções para q2-2
  {
    id: "opt2-2-1",
    option: "Força e dignidade", 
    isCorrect: true,
    questionId: "q2-2"
  },
  {
    id: "opt2-2-2",
    option: "Humildade e paciência",
    isCorrect: false,
    questionId: "q2-2"
  },
  {
    id: "opt2-2-3",
    option: "Sabedoria e conhecimento",
    isCorrect: false,
    questionId: "q2-2"
  },

  // Opções para q3-1
  {
    id: "opt3-1-1",
    option: "Quatro áreas",
    isCorrect: false,
    questionId: "q3-1"
  },
  {
    id: "opt3-1-2",
    option: "Seis áreas",
    isCorrect: true,
    questionId: "q3-1"
  },
  {
    id: "opt3-1-3",
    option: "Oito áreas",
    isCorrect: false,
    questionId: "q3-1"
  }
];
