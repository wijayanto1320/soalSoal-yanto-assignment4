import { SoalContext } from "@/app/appContext";
import React, { useState } from "react";
import { useContext } from "react";

export default function TambahSoal() {
  const { addquestions } = useContext(SoalContext);
  const [question, setQuestion] = useState("");
  const [answer1, setAnswer1] = useState("");
  const [answer2, setAnswer2] = useState("");
  const [answer3, setAnswer3] = useState("");
  const [realAnswer, setRealAnswer] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://v1.appbackend.io/v1/rows/rEkGd7NGMOtQ",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify([
            {
              soal: question,
              j1: answer1,
              j1_0: answer2,
              j3: answer3,
              jbenar: realAnswer,
            },
          ]),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add question");
      }
      const data = await response.json().then((data) => {
        addquestions(
          data[0]._id,
          question,
          answer1,
          answer2,
          answer3,
          realAnswer
        );
        return data;
      });
      console.log(data[0]._id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="rounded-lg shadow-md p-6 bg-white w-4/5">
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="question" className="text-lg font-semibold mb-4">
            Question:
          </label>
          <textarea
            id="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          ></textarea>
        </div>
        <div>
          <label htmlFor="answer1">Answer 1:</label>
          <input
            type="text"
            id="answer1"
            value={answer1}
            className="ml-5 border border-gray-300 rounded-md"
            onChange={(e) => setAnswer1(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="answer2">Answer 2:</label>
          <input
            type="text"
            id="answer2"
            value={answer2}
            className="ml-5 border border-gray-300 rounded-md"
            onChange={(e) => setAnswer2(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="answer3">Answer 3:</label>
          <input
            type="text"
            id="answer3"
            value={answer3}
            className="ml-5 border border-gray-300 rounded-md"
            onChange={(e) => setAnswer3(e.target.value)}
          />
        </div>
        <div>
          <label htmlFor="realAnswer">Real Answer:</label>
          <input
            type="text"
            id="realAnswer"
            className="ml-5 border border-gray-300 rounded-md"
            value={realAnswer}
            onChange={(e) => setRealAnswer(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
}
