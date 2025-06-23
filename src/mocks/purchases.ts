
import { ProofPurchase, DailySequence, DailyRead } from "./types";

export const mockProofPurchases: ProofPurchase[] = [
  {
    id: "purchase-1",
    bookId: "1", // Encontrando Paz nas Tempestades da Vida
    userId: "4", // Carlos Eduardo
    datePurchase: "2024-01-10T14:30:00Z",
    createdAt: "2024-01-10T14:30:00Z"
  },
  {
    id: "purchase-2",
    bookId: "2", // Mulher de Fé: 30 Dias de Reflexão
    userId: "5", // Ana Beatriz
    datePurchase: "2024-01-11T09:15:00Z",
    createdAt: "2024-01-11T09:15:00Z"
  },
  {
    id: "purchase-3",
    bookId: "3", // Jovem, Desperte Sua Fé!
    userId: "4", // Carlos Eduardo
    datePurchase: "2024-01-12T16:45:00Z",
    createdAt: "2024-01-12T16:45:00Z"
  },
  {
    id: "purchase-4",
    bookId: "4", // Liderança Cristã no Mundo Corporativo
    userId: "6", // Pedro Henrique
    datePurchase: "2024-01-13T11:20:00Z",
    createdAt: "2024-01-13T11:20:00Z"
  },
  {
    id: "purchase-5",
    bookId: "1", // Encontrando Paz nas Tempestades da Vida
    userId: "5", // Ana Beatriz
    datePurchase: "2024-01-14T13:10:00Z",
    createdAt: "2024-01-14T13:10:00Z"
  }
];

export const mockDailySequences: DailySequence[] = [
  {
    id: "seq-1",
    userId: "4", // Carlos Eduardo
    recordSequence: 15
  },
  {
    id: "seq-2",
    userId: "5", // Ana Beatriz
    recordSequence: 8
  },
  {
    id: "seq-3",
    userId: "6", // Pedro Henrique
    recordSequence: 22
  }
];

export const mockDailyReads: DailyRead[] = [
  // Leituras de Carlos Eduardo
  {
    id: "read-1-1",
    date: "2024-01-14T07:00:00Z",
    dailySequenceId: "seq-1",
    createdAt: "2024-01-14T07:00:00Z",
    updatedAt: "2024-01-14T07:00:00Z"
  },
  {
    id: "read-1-2",
    date: "2024-01-15T07:15:00Z",
    dailySequenceId: "seq-1",
    createdAt: "2024-01-15T07:15:00Z",
    updatedAt: "2024-01-15T07:15:00Z"
  },

  // Leituras de Ana Beatriz
  {
    id: "read-2-1",
    date: "2024-01-13T21:30:00Z",
    dailySequenceId: "seq-2",
    createdAt: "2024-01-13T21:30:00Z",
    updatedAt: "2024-01-13T21:30:00Z"
  },
  {
    id: "read-2-2",
    date: "2024-01-14T21:30:00Z",
    dailySequenceId: "seq-2",
    createdAt: "2024-01-14T21:30:00Z",
    updatedAt: "2024-01-14T21:30:00Z"
  },

  // Leituras de Pedro Henrique
  {
    id: "read-3-1",
    date: "2024-01-14T06:45:00Z",
    dailySequenceId: "seq-3",
    createdAt: "2024-01-14T06:45:00Z",
    updatedAt: "2024-01-14T06:45:00Z"
  },
  {
    id: "read-3-2",
    date: "2024-01-15T06:45:00Z",
    dailySequenceId: "seq-3",
    createdAt: "2024-01-15T06:45:00Z",
    updatedAt: "2024-01-15T06:45:00Z"
  }
];
