
export * from "./types";
export * from "./users";
export * from "./libraries";
export * from "./books";
export * from "./pages";
export * from "./quizzes";
export * from "./purchases";

// Função helper para buscar dados relacionados
export const getMockData = () => {
  return {
    users: mockUsers,
    libraries: mockLibraries,
    books: mockBooks,
    pages: mockPages,
    quizzes: mockQuizzes,
    questions: mockQuestions,
    options: mockOptions,
    proofPurchases: mockProofPurchases,
    dailySequences: mockDailySequences,
    dailyReads: mockDailyReads
  };
};

// Funções utilitárias para buscar dados específicos
export const getBooksByAuthor = (authorId: string) => {
  return mockBooks.filter(book => book.userId === authorId);
};

export const getPagesByBook = (bookId: string) => {
  return mockPages.filter(page => page.bookId === bookId).sort((a, b) => a.pageOrder - b.pageOrder);
};

export const getQuizzesByBook = (bookId: string) => {
  return mockQuizzes.filter(quiz => quiz.bookId === bookId);
};

export const getUserPurchases = (userId: string) => {
  return mockProofPurchases.filter(purchase => purchase.userId === userId);
};

export const getBooksByUser = (userId: string) => {
  const userPurchases = getUserPurchases(userId);
  return userPurchases.map(purchase => 
    mockBooks.find(book => book.id === purchase.bookId)
  ).filter(Boolean);
};

import { mockUsers } from "./users";
import { mockLibraries } from "./libraries";
import { mockBooks } from "./books";
import { mockPages } from "./pages";
import { mockQuizzes, mockQuestions, mockOptions } from "./quizzes";
import { mockProofPurchases, mockDailySequences, mockDailyReads } from "./purchases";
