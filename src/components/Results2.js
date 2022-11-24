import "./Quiz1.css";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../App";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

function ResultsTwo(props) {
  const { user } = UserAuth();
  const [arrayIndex, setArrayIndex] = useState(0);
  const [userResultsData, setUserResultsData] = useState([]);

  const navigate = useNavigate();

  const [selectedQuestionIndex, setSelectedQuestionIndex] = useState(0);

  function resultColor(correctAnswerIndex, answerIndex, userInputIndex) {
    if (
      userInputIndex === answerIndex &&
      userInputIndex === correctAnswerIndex
    ) {
      return "#32CD32";
    } else if (
      userInputIndex === answerIndex &&
      userInputIndex !== correctAnswerIndex
    ) {
      return "#ff7f7f";
    }
  }

  let correctAnswer = "";
  if (props.questionsArray[selectedQuestionIndex].correctAnswerIndex === 0) {
    correctAnswer = "A";
  } else if (
    props.questionsArray[selectedQuestionIndex].correctAnswerIndex === 1
  ) {
    correctAnswer = "B";
  } else if (
    props.questionsArray[selectedQuestionIndex].correctAnswerIndex === 2
  ) {
    correctAnswer = "C";
  } else if (
    props.questionsArray[selectedQuestionIndex].correctAnswerIndex === 3
  ) {
    correctAnswer = "D";
  }

  function answerOption(answer) {
    if (answer === 0) {
      return <div className="w-full text-lg font-semibold">A</div>;
    } else if (answer === 1) {
      return <div className="w-full text-lg font-semibold">B</div>;
    } else if (answer === 2) {
      return <div className="w-full text-lg font-semibold">C</div>;
    } else if (answer === 3) {
      return <div className="w-full text-lg font-semibold">D</div>;
    }
  }

  return (
    <>
      <div className="min-h-screen flex flex-col text-black text-5xl bg-white">
        <div className="text-3xl md:text-4xl ml-3 mt-3 font-semibold text-black">
          Quiz 1
        </div>
        <div className="flex flex-row justify-content w-screen mb-10 md:mb-20 mt-10 md:mt-14 font-bold">
          <div className="mx-auto text-3xl md:text-5xl w-1/2 text-center outline-black text-black">
            Results:{" "}
            {props.userInput.reduce(
              (accum, curr, i) =>
                accum +
                (curr === props.questionsArray[i].correctAnswerIndex ? 1 : 0),
              0
            )}{" "}
            / {props.questionsArray.length}
          </div>
          <div className="mx-auto text-3xl md:text-5xl w-1/2 text-center text-black">
            Q{selectedQuestionIndex + 1} of {props.array.length}
          </div>
        </div>

        <div className="w-screen text-2xl md:text-4xl text-center px-6 sm:px-12 mb-10 md:mb-20">
          {props.questionsArray[selectedQuestionIndex].question}
        </div>

        <div className="w-screen mx-auto grid gap-14">
          <ul className="grid gap-8 md:gap-14 w-full md:grid-cols-2 flex sm:items-center sm:justify-center mb-3">
            {props.questionsArray[selectedQuestionIndex].answers.map(
              (answer, index) => (
                <li key={answer.id} className="mx-auto">
                  <input
                    // type="radio"
                    id={answer.id}
                    name="hosting"
                    // value="option-A"
                    className="hidden peer"
                    // checked={props.userInput[arrayIndex] === answer.id}
                  />
                  <label
                    for={answer.id}
                    className="inline-flex justify-between  text-xl md:text-2xl items-center p-5 w-80 sm:w-96 text-white bg-gray-400 rounded-lg border border-gray-200 dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-gray-700 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                    style={{
                      background: resultColor(
                        props.questionsArray[selectedQuestionIndex]
                          .correctAnswerIndex,
                        index,
                        props.userInput[selectedQuestionIndex]
                      ),
                    }}
                  >
                    <div className="block">
                      <div className="w-full text-lg font-semibold">
                        {answer.id === 0
                          ? "A"
                          : answer.id === 1
                          ? "B"
                          : answer.id === 2
                          ? "C"
                          : answer.id === 3
                          ? "D"
                          : ""}
                      </div>
                      <div className="w-full">{answer.text}</div>
                    </div>
                  </label>
                </li>
              )
            )}

            {/* <li key={answer.id}>
              <input
                type="radio"
                id="option-A"
                name="hosting"
                value="option-A"
                className="hidden peer"
              />
              <label
                for="option-A"
                className="inline-flex justify-between items-center p-5 w-full sm:w-96 text-white bg-gray-400 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-gray-700 hover:text-white hover:bg-gray-500 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">A</div>
                  <div className="w-full">Good for large websites</div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="option-B"
                name="hosting"
                value="option-B"
                className="hidden peer"
              />
              <label
                for="option-B"
                className="inline-flex justify-between items-center p-5 w-full text-white bg-gray-400 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-gray-700 hover:text-white hover:bg-gray-500 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">B</div>
                  <div className="w-full">Good for large websites</div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="option-C"
                name="hosting"
                value="option-C"
                className="hidden peer"
                required
              />
              <label
                for="option-C"
                className="inline-flex justify-between items-center p-5 w-full text-white bg-gray-400 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-gray-700 hover:text-white hover:bg-gray-500 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">C</div>
                  <div className="w-full">Good for small websites</div>
                </div>
              </label>
            </li>
            <li>
              <input
                type="radio"
                id="option-D"
                name="hosting"
                value="option-D"
                className="hidden peer"
              />
              <label
                for="option-D"
                className="inline-flex justify-between items-center p-5 w-full text-white bg-gray-400 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-gray-700 hover:text-white hover:bg-gray-500 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
              >
                <div className="block">
                  <div className="w-full text-lg font-semibold">D</div>
                  <div className="w-full">Good for large websites</div>
                </div>
              </label>
            </li> */}
          </ul>
        </div>
        <div className="text-2xl md:text-3xl ml-8 sm:ml-14 mt-8 font-semibold text-black">
          Correct Answer: {correctAnswer}
        </div>
        <div className="text-xl md:text-2xl mx-8 sm:mx-14 mt-8 font-medium text-black">
          {" "}
          Explanation: {props.questionsArray[selectedQuestionIndex].explanation}
        </div>

        <footer className="mx-auto p-6 flex flex-row items-center justify-between bottom-0 w-full w-screen">
          <div>
            {props.questionsArray.map((question, index) => (
              <button
                className="text-white text-lg md:text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-4 py-1.5 md:px-5 md:py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                onClick={() => setSelectedQuestionIndex(index)}
              >
                Q{index + 1}
              </button>
            ))}
          </div>
          <div>
            <button
              className="text-white text-lg md:text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
              onClick={() => {
                navigate("/profile");
              }}
            >
              Back to Profile
            </button>
          </div>
        </footer>
      </div>
    </>
  );
}

export default ResultsTwo;
