import { Button } from "flowbite-react";
import "./Profile.css";
import { UserAuth } from "../App";
import { useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import { getDatabase, ref, get, child } from "firebase/database";

function Profile(props) {
  const { user, logout } = UserAuth();
  const navigate = useNavigate();
  const [userResultsData, setUserResultsData] = useState({});
  const [quizOneDisplayScores, setQuizOneDisplayScores] = useState([]);
  const [quizTwoDisplayScores, setQuizTwoDisplayScores] = useState([]);
  const [topScoreDisplay, setTopScoreDisplay] = useState(1);
  const [quizNameDisplay, setQuizNameDisplay] = useState();
  const [quizOneFirstPlaceName, setQuizOneFirstPlaceName] = useState();
  const [quizOneFirstPlaceScore, setQuizOneFirstPlaceScore] = useState();
  const [quizOneFirstPlaceLength, setQuizOneFirstPlaceLength] = useState();
  const [quizOneFirstPlaceDate, setQuizOneFirstPlaceDate] = useState();

  useEffect(() => {
    console.log("use effect");
    const db = getDatabase(props.firebaseapp);
    // console.log(db)
    // console.log(user)
    const dbRef = ref(db);
    get(child(dbRef, `users/${user.uid}`))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          console.log(data);
          // console.log(data)

          let dataArray = Object.values(data).flatMap((score) => {
            return { ...score, id: score[0] };
          });

          console.log(JSON.parse(JSON.stringify(dataArray)));

          dataArray.sort(function (a, b) {
            return b.date - a.date;
          });

          console.log(JSON.parse(JSON.stringify(dataArray)));

          setUserResultsData(dataArray);

          console.log(userResultsData);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });

    console.log("second use effect");
    get(child(dbRef, "users"))
      .then((snapshot) => {
        if (snapshot.exists()) {
          const allScoresData = snapshot.val();
          console.log(allScoresData);
          console.log("data exists");

          let scoresArray = Object.entries(allScoresData).flatMap((score) => {
            return Object.values(score[1]).map((s) => {
              return { ...s, id: score[0] };
            });
          });

          console.log(scoresArray);

          let quizOneArray = [];

          let quizTwoArray = [];

          scoresArray.map((score) => {
            if (score.quizName === "Quiz 1") {
              return quizOneArray.push(score);
            } else if (score.quizName === "Quiz 2") {
              return quizTwoArray.push(score);
            }
          });

          console.log(quizOneArray);

          console.log(quizTwoArray);

          quizOneArray.sort(function (a, b) {
            if (b.quizResults === a.quizResults) {
              return b.date - a.date;
            } else {
              return b.quizResults - a.quizResults;
            }
          });

          quizTwoArray.sort(function (a, b) {
            if (b.quizResults === a.quizResults) {
              return b.date - a.date;
            } else {
              return b.quizResults - a.quizResults;
            }
          });

          console.log(JSON.parse(JSON.stringify(quizOneArray)));

          console.log(JSON.parse(JSON.stringify(quizTwoArray)));

          console.log(scoresArray);

          setQuizOneFirstPlaceName(quizOneArray[0].quizUser);

          setQuizOneFirstPlaceScore(quizOneArray[0].quizResults);

          setQuizOneFirstPlaceLength(quizOneArray[0].quizLength);

          setQuizOneFirstPlaceDate(quizOneArray[0].date);

          setQuizOneDisplayScores(quizOneArray);

          setQuizTwoDisplayScores(quizTwoArray);
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
      console.log("You are logged out");
    } catch (error) {
      console.log(error.message);
    }
  };

  const formatDate = (timestamp) => {
    const d = new Date(timestamp);

    const day1 = d.getDate();
    const month1 = d.getMonth();
    const year1 = d.getFullYear();

    return `${day1}/${month1}/${year1}`;
  };

  const markPercentage = (one, two) => {
    let A = (one / two) * 100;
    return `${A}%`;
  };

  // function showQuizResults() {
  //   return quizOneDisplayScores[1].quizName;
  // }

  function displayName() {
    if (user.displayName == !null) {
      return <div>{user.displayName}</div>;
    } else {
      return <div>{props.username}</div>;
    }
  }

  return (
    <>
      <div className="h-screen flex-column">
        <div className="h-12 items-center flex justify-between bg-slate-700 sticky text-white">
          <div className="sm:ml-20 ml-4 font-semibold uppercase text-sm sm:text-md lg:text-lg">
            The Quiz Club
          </div>
          <div className="sm:mr-10 mr-4 flex">
            <div className="sm:mr-10 mr-2 text-sm sm:text-md">
              {console.log(user)}
              {displayName()}
            </div>
            <button
              className="text-sm text-gray-400 cursor-pointer hover:opacity-75 duration-150 text-sm sm:text-md"
              onClick={() => {
                handleLogout();
              }}
            >
              Log out
            </button>
          </div>
        </div>
        <div className="bg-gray-200 sm:py-6 sm:px-12 py-3 px-6 flex-grow">
          <div className="sm:mb-4 mb-3 font-semibold">Profile</div>
          <div className="content-div bg-white rounded grid lg:grid-cols-2 grid-cols-1">
            <div className="grid grid-cols-1 pt-8 lg:pl-8 pb-4 pr-4 pl-4">
              <div className="bg-gray-200 rounded grid grid-cols-1 pt-4 previous-score-gray">
                <div>
                  <div className="w-full ml-8 font-semibold">
                    Your previous scores
                  </div>
                  <div className="bg-white rounded previous-score-white my-4 mx-8 pt-1 overflow-y-auto">
                    {Object.values(userResultsData)
                      .slice(0, 6)
                      .map((value) => (
                        <div className="flex justify-between mt-4 mb-3">
                          <div className="sm:w-9/12 w-8/12 ml-4">
                            <div className="flex justify-between mb-1">
                              <span className="text-base font-medium text-blue-700 dark:text-white">
                                {value.quizName}
                              </span>
                              <span className="text-sm font-medium text-blue-700 dark:text-white">
                                {value.quizResults}/{value.quizLength}
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{
                                  width: markPercentage(
                                    value.quizResults,
                                    value.quizLength
                                  ),
                                }}
                              ></div>
                            </div>
                          </div>
                          <div className="lg:mr-6 mr-3 ml-2 mt-2 sm:text-md text-sm">
                            {formatDate(value.date)}
                          </div>
                        </div>
                      ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 pt-8 lg:pr-8 pb-4 pl-4 pr-4">
              <div className="bg-gray-200 rounded grid grid-cols-1 pt-4">
                <div className="flex flex-col">
                  <div className="w-full ml-8 font-semibold">
                    Top scores across all players
                  </div>
                  <div className="bg-white rounded flex-grow my-4 mx-8 relative previous-score-white">
                    <div className="h-1/6 flex flex-row justify-between w-1/2 mx-auto">
                      <button
                        onClick={() => {
                          setTopScoreDisplay(1);
                        }}
                        className="text-blue-700 underline cursor-pointer"
                        style={{
                          fontWeight: topScoreDisplay === 1 ? "bold" : "",
                        }}
                      >
                        Quiz 1
                      </button>
                      <button
                        onClick={() => {
                          setTopScoreDisplay(2);
                        }}
                        className="text-blue-700 underline cursor-pointer"
                        style={{
                          fontWeight: topScoreDisplay === 2 ? "bold" : "",
                        }}
                      >
                        Quiz 2
                      </button>
                    </div>
                    <div
                      className="w-10/12 sm:w-7/12 h-5/6 mx-auto bottom-0 podem-wrapper grid grid-cols-3"
                      style={{
                        display: topScoreDisplay === 1 ? "" : "none",
                      }}
                    >
                      <div className="flex flex-col justify-end">
                        <div className="h-3/6 bottom-0 bg-gray-300 rounded shadow shadow-gray-400">
                          <div className="relative names font-semibold text-center">
                            {/* {setTimeout(() => {
                              showQuizResults();
                            }, "2000")} */}
                            {/* {quizOneDisplayScores[1].quizName} */}
                            {quizNameDisplay}
                          </div>
                          <div className="text-center top-score-details">
                            {/* {Object.values(quizOneDisplayScores)[1].quizResults}
                            /{Object.values(quizOneDisplayScores)[1].quizLength} */}
                          </div>
                          <div className="text-center mt-2 text-sm top-score-details">
                            {/* {formatDate(
                              Object.values(quizOneDisplayScores)[1].date
                            )} */}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end">
                        <div className="h-4/6 bottom-0 first-place bg-gray-300 rounded shadow-md shadow-gray-400">
                          <div className="relative names font-semibold text-center">
                            {quizOneFirstPlaceName}
                          </div>
                          <div className="text-center top-score-details">
                            {" "}
                            {quizOneFirstPlaceScore}/{quizOneFirstPlaceLength}
                          </div>
                          <div className="text-center mt-2 text-sm top-score-details">
                            {formatDate(quizOneFirstPlaceDate)}
                          </div>{" "}
                        </div>
                      </div>
                      <div className="flex flex-col justify-end">
                        <div className="h-2/6 bottom-0 third-place bg-gray-300 rounded shadow-sm shadow-gray-400">
                          <div className="relative names font-semibold text-center">
                            name
                          </div>
                          <div className="text-center top-score-details">
                            6/8
                          </div>
                          <div className="text-center mt-2 text-sm top-score-details">
                            18/09/22
                          </div>{" "}
                        </div>
                      </div>
                    </div>

                    <div
                      className="w-10/12 sm:w-7/12 h-5/6 mx-auto bottom-0 podem-wrapper grid grid-cols-3"
                      style={{
                        display: topScoreDisplay === 2 ? "" : "none",
                      }}
                    >
                      <div className="flex flex-col justify-end">
                        <div className="h-3/6 bottom-0 bg-gray-300 rounded shadow shadow-gray-400">
                          <div className="relative names font-semibold text-center">
                            {/* {Object.values(quizOneDisplayScores)[1].quizName} */}
                          </div>
                          <div className="text-center top-score-details">
                            {/* {Object.values(quizOneDisplayScores)[1].quizResults} */}
                            {/* /{Object.values(quizOneDisplayScores)[1].quizLength} */}
                          </div>
                          <div className="text-center mt-2 text-sm top-score-details">
                            {/* {formatDate(
                              Object.values(quizOneDisplayScores)[1].date
                            )} */}
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col justify-end">
                        <div className="h-4/6 bottom-0 first-place bg-gray-300 rounded shadow-md shadow-gray-400">
                          <div className="relative names font-semibold text-center">
                            name
                          </div>
                          <div className="text-center top-score-details">
                            {" "}
                            7/8
                          </div>
                          <div className="text-center mt-2 text-sm top-score-details">
                            18/09/22
                          </div>{" "}
                        </div>
                      </div>
                      <div className="flex flex-col justify-end">
                        <div className="h-2/6 bottom-0 third-place bg-gray-300 rounded shadow-sm shadow-gray-400">
                          <div className="relative names font-semibold text-center">
                            name
                          </div>
                          <div className="text-center top-score-details">
                            6/8
                          </div>
                          <div className="text-center mt-2 text-sm top-score-details">
                            18/09/22
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 pt-4 lg:pl-8 pb-8 pr-4 pl-4">
              <div className="bg-gray-200 rounded grid grid-cols-1 pt-4 flex flex-grow best-scores-gray">
                <div className="flex flex-col">
                  <div className="w-full ml-8 font-semibold">
                    Your best scores
                  </div>
                  <div className="bg-white rounded flex-grow my-4 mx-8 pb-8 grid grid-cols-2">
                    <div className="col-span-2 sm:col-span-1 h-full">
                      <div className="h-1/6 text-center mt-4 font-semibold text-lg">
                        Quiz 1
                      </div>
                      <div className="h-5/6">
                        <div className="m-4 bg-gray-200 h-5/6 rounded-md grid grid-cols-1">
                          <div className="w-full text-center mt-4">
                            19/09/22
                          </div>
                          <div className="w-10/12 mx-auto">
                            <div className="flex justify-between mb-1">
                              <span className="text-base font-medium text-blue-700 dark:text-white">
                                Quiz 1
                              </span>
                              <span className="text-sm font-medium text-blue-700 dark:text-white">
                                5/8
                              </span>
                            </div>
                            <div className="w-full bg-white rounded-full h-2.5 dark:bg-gray-700">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: "60%" }}
                              ></div>
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>
                    <div className="col-span-2 sm:col-span-1 h-full">
                      <div className="h-1/6 text-center mt-4 font-semibold text-lg">
                        Quiz 2
                      </div>
                      <div className="h-5/6">
                        <div className="m-4 bg-gray-200 h-5/6 rounded-md grid grid-cols-1">
                          <div className="w-full text-center mt-4">
                            19/09/22
                          </div>
                          <div className="w-10/12 mx-auto">
                            <div className="flex justify-between mb-1">
                              <span className="text-base font-medium text-blue-700 dark:text-white">
                                Quiz 2
                              </span>
                              <span className="text-sm font-medium text-blue-700 dark:text-white">
                                6/8
                              </span>
                            </div>
                            <div className="w-full bg-white rounded-full h-2.5 dark:bg-gray-700">
                              <div
                                className="bg-blue-600 h-2.5 rounded-full"
                                style={{ width: "75%" }}
                              ></div>
                            </div>
                          </div>{" "}
                        </div>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-1 pt-4 pl-4 pb-8 lg:pr-8 pr-4">
              <div className="bg-gray-200 rounded grid grid-cols-1 pt-4">
                <div className="flex flex-col">
                  <div className="w-full ml-8 font-semibold">Start a quiz</div>
                  <div className="bg-white rounded flex-grow my-4 mx-8 grid grid-cols-2 h-48">
                    <div className="w-full flex items-center justify-center">
                      <div className="mx-auto">
                        <button
                          type="button"
                          className="text-white xl:text-5xl sm:text-4xl text-2xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg 2xl:px-16 2xl:py-12 sm:px-6 sm:py-8 px-3 py-6 text-center mr-2 mb-2"
                          onClick={() => {
                            navigate("/quiz");
                          }}
                        >
                          Quiz 1
                        </button>
                      </div>
                    </div>
                    <div className="w-full flex items-center justify-center">
                      <div className="mx-auto">
                        <button
                          type="button"
                          className="text-white xl:text-5xl sm:text-4xl text-2xl bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 shadow-lg shadow-red-500/50 dark:shadow-lg dark:shadow-red-800/80 font-medium rounded-lg 2xl:px-16 2xl:py-12 sm:px-6 sm:py-8 px-3 py-6 text-center mr-2 mb-2"
                          onClick={() => {
                            navigate("/quiztwo");
                          }}
                        >
                          Quiz 2
                        </button>
                      </div>
                    </div>{" "}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
