
export enum Role {
  ADMIN = "ADMIN",
  WRITER = "WRITER",
  READER = "READER"
}

export enum Status {
  ACTIVE = "ACTIVE",
  INACTIVE = "INACTIVE",
  BLOCKED = "BLOCKED"
}

export enum DifficultyLevel {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD"
}

export enum Mode {
  PUBLISHED = "PUBLISHED",
  SKETCH = "SKETCH"
}

export interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  bio?: string;
  password: string;
  role: Role;
  status: Status;
  lastAccess?: string;
  interest: string[];
  createdAt: string;
  updatedAt: string;
}

export interface DailySequence {
  id: string;
  userId: string;
  recordSequence: number;
}

export interface DailyRead {
  id: string;
  date: string;
  dailySequenceId: string;
  createdAt: string;
  updatedAt: string;
}

export interface MyLibrary {
  id: string;
  userId: string;
}

export interface Book {
  id: string;
  title: string;
  description: string;
  verseGuide?: string;
  coverImage: string;
  userId: string;
  authorName: string;
  bookPrice: number;
  category: string;
  tags: string[];
  readingTime: number;
  difficultyLevel: DifficultyLevel;
  mode: Mode;
  libraryId: string;
  createdAt: string;
  updatedAt: string;
}

export interface Page {
  id: string;
  title: string;
  introText?: string;
  mainVerse?: string;
  textVerse?: string;
  verseGuide?: string;
  referenceDay: number;
  contentMain: string;
  practicalApplication: string;
  prayer: string;
  pageOrder: number;
  bookId: string;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  bookId: string;
}

export interface Question {
  id: string;
  question: string;
}

export interface Option {
  id: string;
  option: string;
  isCorrect: boolean;
  questionId: string;
}

export interface ProofPurchase {
  id: string;
  bookId: string;
  userId: string;
  datePurchase: string;
  createdAt: string;
}
