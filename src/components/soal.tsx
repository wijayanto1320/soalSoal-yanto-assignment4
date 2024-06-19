import { SoalContext } from "@/app/page";
import React, { useContext, useState } from "react";

interface SoalProps {
  index: number;
  id: string;
  question: string;
  answer1: string;
  answer2: string;
  answer3: string;
  realAnswer: string;
}

export default function Soal({
  index,
  id,
  question,
  answer1,
  answer2,
  answer3,
  realAnswer,
}: SoalProps) {
  const { deleteQuestion } = useContext(SoalContext);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [seeAnswer, setSeeAnswer] = useState(false);
  const handleAnswerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedAnswer(event.target.value);
  };

  return (
    <div className="rounded-lg shadow-md p-6 bg-white w-4/5">
      <h2 className="text-lg font-semibold mb-4">Pertanyaan:</h2>
      <p className="text-gray-700 mb-6">{question}</p>

      <div className="space-y-4">
        <label className="flex items-center">
          <input
            type="radio"
            name="answer"
            value={answer1}
            className="form-radio h-5 w-5 text-blue-500"
            checked={selectedAnswer === answer1}
            onChange={handleAnswerChange}
          />
          <span className="ml-2 text-gray-700">{answer1}</span>
        </label>

        <label className="flex items-center">
          <input
            type="radio"
            name="answer"
            value={answer2}
            className="form-radio h-5 w-5 text-blue-500"
            checked={selectedAnswer === answer2}
            onChange={handleAnswerChange}
          />
          <span className="ml-2 text-gray-700">{answer2}</span>
        </label>

        <label className="flex items-center">
          <input
            id="answer3"
            type="radio"
            name="answer"
            value={answer3}
            className="form-radio h-5 w-5 text-blue-500"
            checked={selectedAnswer === answer3}
            onChange={handleAnswerChange}
          />
          <span className="ml-2 text-gray-700">{answer3}</span>
        </label>
        <div className="mt-20">
          {seeAnswer ? (
            <span>
              The Answer is <b>{realAnswer}</b>
              <button
                onClick={() => setSeeAnswer(false)}
                className="bg-purple-500 hover:bg-purple-700 text-white px-4 py-2 rounded-lg ml-5"
              >
                close Answer
              </button>
            </span>
          ) : (
            <button
              onClick={() => setSeeAnswer(true)}
              className="bg-blue-500 hover:bg-blue-700 text-white px-4 py-2 rounded-lg"
            >
              Open Answer
            </button>
          )}
          <button
            onClick={() => deleteQuestion(index, id)}
            className="bg-red-500 hover:bg-red-700 text-white px-4 py-2 rounded-lg ml-5"
          >
            Delete Question
          </button>
        </div>
      </div>
    </div>
  );
}
