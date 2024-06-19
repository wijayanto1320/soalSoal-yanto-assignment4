"use client";

import Soal from "@/components/soal";
import TambahSoal from "@/components/tambahSoal";
import { use, useContext, useEffect, useState } from "react";
import { SoalContext } from "./appContext";

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

export default function Home() {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [tambahSoal, setTambahSoal] = useState(false);

  const handleTambahSoal = () => {
    setTambahSoal(!tambahSoal);
  };

  useEffect(() => {
    initialRequest();
  }, []);

  const initialRequest = async () => {
    console.log("initialRequest");
    try {
      const response = await fetch(
        "https://v1.appbackend.io/v1/rows/rEkGd7NGMOtQ",
        {
          cache: "no-cache",
        }
      );
      const { data } = await response.json();
      console.log(data);
      const transformedQuestions: Question[] = await data.map(
        (question: any) => ({
          id: question._id,
          question: question.soal,
          answer1: question.j1,
          answer2: question.j1_0,
          answer3: question.j3,
          realAnswer: question.jbenar,
        })
      );
      setQuestions(transformedQuestions);
      console.log("initialRequest done");
    } catch (error) {
      console.error(error);
    }
  };
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
    initialRequest,
    handleTambahSoal,
    questions,
    addquestions,
    deleteQuestion,
  };
  return (
    <SoalContext.Provider value={soalState}>
      <div className="flex flex-col space-y-5 items-center  my-10">
        {questions.map((question, index) => (
          <Soal
            key={question.id}
            index={index}
            id={question.id}
            question={question.question}
            answer1={question.answer1}
            answer2={question.answer2}
            answer3={question.answer3}
            realAnswer={question.realAnswer}
          />
        ))}
        {tambahSoal ? (
          <TambahSoal />
        ) : (
          <button
            onClick={handleTambahSoal}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
          >
            Tambah Soal
          </button>
        )}
      </div>
    </SoalContext.Provider>
  );
}
