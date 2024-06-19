"use client";

import Soal from "@/components/soal";
import TambahSoal from "@/components/tambahSoal";
import { useContext, useEffect, useState } from "react";
import { SoalContext } from "./layout";

export default function Home() {
  const { questions } = useContext(SoalContext);
  const [tambahSoal, setTambahSoal] = useState(false);

  const handleTambahSoal = () => {
    setTambahSoal(!tambahSoal);
  };

  return (
    <div className="flex flex-col space-y-5 items-center  my-10">
      {questions.map((question, index) => (
        <Soal
          key={index}
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
  );
}
