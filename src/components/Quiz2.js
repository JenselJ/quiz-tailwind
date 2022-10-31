import "./Quiz1.css";
import React, { useState, useEffect } from "react";
import { UserAuth } from "../App";
import { getDatabase, ref, set, push } from "firebase/database";
import { useNavigate } from "react-router-dom";

function Quiz2(props) {
  const { user } = UserAuth();
  const [arrayIndex, setArrayIndex] = useState(0);
  const [userResultsData, setUserResultsData] = useState([]);

  useEffect(() => {
    console.log("use effect");
    props.setUserInput([]);
  }, []);

  const navigate = useNavigate();

  function handleChange(answerId, questionIndex) {
    console.log(answerId, questionIndex);
    let userList = props.userInput;
    userList[questionIndex] = answerId;
    props.setUserInput([...userList]);
  }

  function addOneToIndex() {
    if (arrayIndex < props.array.length - 1) {
      setArrayIndex((prevArrayIndex) => prevArrayIndex + 1);
    }
  }

  function minusOneFromIndex() {
    if (arrayIndex > 0) {
      setArrayIndex((prevArrayIndex) => prevArrayIndex - 1);
    }
  }

  function nextBtnHandler() {
    addOneToIndex();
  }

  function totalMark() {
    const mark = props.userInput.reduce(
      (accum, curr, i) =>
        accum + (curr === props.array[i].correctAnswerIndex ? 1 : 0),
      0
    );
    console.log(`${mark} out of 3`);

    const db = getDatabase(props.firebaseapp);

    // Create a new post reference with an auto-generated id
    const postListRef = ref(db, "users/" + user.uid);
    const newPostRef = push(postListRef);
    set(newPostRef, {
      quizResults: mark,
      date: Date.now(),
      quizName: "Quiz 2",
      quizLength: props.array.length,
      quizUser: user.email,
    });
  }

  function submitBtnHandler() {
    totalMark();
    navigate("/resultstwo");
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
        <div className="flex flex-row justify-content w-screen mb-10 md:mb-24 mt-10 md:mt-20 font-bold">
          <div className="mx-auto text-3xl md:text-5xl w-1/2 text-center outline-black text-black">
            Quiz 1
          </div>
          <div className="mx-auto text-3xl md:text-5xl w-1/2 text-center text-black">
            Q{arrayIndex + 1} of {props.array.length}
          </div>
        </div>

        <div className="w-screen text-center mb-10 md:mb-28">
          {props.array[arrayIndex].question}
        </div>

        <div className="w-screen mx-auto">
          <ul className="grid gap-8 md:gap-14 w-full xl:w-2/3 mx-auto md:grid-cols-2 sm:items-center sm:justify-center mb-3 flex items-start">
            {props.array[arrayIndex].answers.map((answer) => (
              <li key={answer.id} className="mx-auto">
                <input
                  type="radio"
                  id={answer.id}
                  name="hosting"
                  // value="option-A"
                  className="hidden peer"
                  checked={props.userInput[arrayIndex] === answer.id}
                  onChange={(event) => {
                    handleChange(answer.id, arrayIndex);
                  }}
                />
                <label
                  for={answer.id}
                  className="inline-flex text-2xl justify-between items-center p-5 w-80 sm:w-96 text-white bg-gray-400 rounded-lg border border-gray-200 cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:bg-gray-700 hover:text-white hover:bg-gray-500 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700"
                >
                  <div className="block">
                    <div className="w-full text-lg font-semibold">
                      {() => {
                        answerOption(answer.id);
                      }}
                    </div>
                    <div className="w-full">{answer.text}</div>
                  </div>
                </label>
              </li>
            ))}

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

        <footer className="mobileHidden mx-auto p-6 flex flex-col sm:flex-row items-center justify-between fixed bottom-0 w-full w-screen">
          <button
            type="button"
            onClick={minusOneFromIndex}
            class="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-purple-800 font-medium rounded-lg px-4 py-2 lg:px-5 lg:py-2.5 text-center mr-2 mb-2"
          >
            Previous Question
          </button>
          <button
            type="button"
            onClick={submitBtnHandler}
            class="text-white text-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg px-4 py-2 lg:px-5 lg:py-2.5 text-center mr-2 mb-2"
          >
            Submit Quiz
          </button>
          <button
            type="button"
            onClick={nextBtnHandler}
            class="text-white text-xl bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-purple-800 font-medium rounded-lg px-4 py-2 lg:px-5 lg:py-2.5 text-center mr-2 mb-2"
          >
            Next Question
          </button>
        </footer>

        <footer className="mobileShow large-hidden mx-auto p-6 flex flex-row items-center justify-between bottom-0 w-full w-screen">
          <button
            type="button"
            class="flip-horizontally text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
          <button
            type="button"
            onClick={submitBtnHandler}
            class="text-white text-xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 font-medium rounded-lg text-sm px-4 py-2 sm:px-5 sm:py-2.5 text-center mr-2 mb-2"
          >
            Submit
          </button>
          <button
            type="button"
            class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm p-2.5 text-center inline-flex items-center mr-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              aria-hidden="true"
              class="w-5 h-5"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                clip-rule="evenodd"
              ></path>
            </svg>
            <span class="sr-only">Icon description</span>
          </button>
        </footer>
      </div>
    </>
  );
}

export default Quiz2;
