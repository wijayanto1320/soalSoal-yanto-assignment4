import React, { useState, createContext } from "react";

interface Question {
  id: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  realAnswer: string;
}

interface QuestionContextType {
  initialRequest: () => void;
  questions: Question[];
  addquestions: (
    id: string,
    question: string,
    answer1: string,
    answer2: string,
    answer3: string,
    realAnswer: string
  ) => void;
  deleteQuestion: (index: number, id: string) => void;
}

export const SoalContext = createContext<QuestionContextType>(
  {} as QuestionContextType
);
