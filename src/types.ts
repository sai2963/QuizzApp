export interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: string;
}

export interface QuizState {
  currentQuestion: number;
  answers: Record<number, string>;
  score: number;
  isComplete: boolean;
}