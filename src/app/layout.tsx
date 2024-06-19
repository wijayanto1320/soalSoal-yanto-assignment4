"use client";

import "./globals.css";
import Navbar from "@/components/navbar";
import { createContext, useEffect, useState } from "react";

interface Question {
  id: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  realAnswer: string;
}

interface QuestionContextType {
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://v1.appbackend.io/v1/rows/rEkGd7NGMOtQ",
          {
            cache: "no-cache",
          }
        );
        const { data } = await response.json();
        const transformedQuestions: Question[] = data.map((question: any) => ({
          id: question._id,
          question: question.soal,
          answer1: question.j1,
          answer2: question.j1_0,
          answer3: question.j3,
          realAnswer: question.jbenar,
        }));
        setQuestions(transformedQuestions);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const addquestions = (
    id: string,
    question: string,
    answer1: string,
    answer2: string,
    answer3: string,
    realAnswer: string
  ) => {
    const newQuestion: Question = {
      id,
      question,
      answer1,
      answer2,
      answer3,
      realAnswer,
    };
    setQuestions([...questions, newQuestion]);
  };

  const deleteQuestion = async (index: number, id: string) => {
    try {
      const response = await fetch(
        "https://v1.appbackend.io/v1/rows/rEkGd7NGMOtQ",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([id]),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete question");
      }
      const data = await response.json();
      const newQuestions = [...questions];
      newQuestions.splice(index, 1);
      setQuestions(newQuestions);
    } catch (error) {}
  };

  const soalState = {
    questions,
    addquestions,
    deleteQuestion,
  };

  return (
    <html lang="en">
      <body>
        <Navbar />
        <SoalContext.Provider value={soalState}>
          {children}
        </SoalContext.Provider>
      </body>
    </html>
  );
}
