import "./SignupModal.css";
import { UserAuth } from "../App";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

const SignupModal = ({
  setSignupShow,
  signupShow,
  setLoginShow,
  email,
  setEmail,
  setUsername,
  username,
}) => {
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordConfirmFail, setPasswordConfirmFail] = useState(false);
  const [usernameFail, setUsernameFail] = useState(false);
  const [error, setError] = useState("");
  const [signupBackground, setSignupBackground] = useState(false);
  const navigate = useNavigate();

  const { createUser } = UserAuth();

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(e);
    if (passwordConfirm !== password) {
      setPasswordConfirmFail(true);
    } else {
      setPasswordConfirmFail(false);
    }
    if (username === "" || username.length > 9) {
      setUsernameFail(true);
    } else {
      setUsernameFail(false);
    }
    if (passwordConfirm === password && username !== "") {
      // createNewUser(e);
      setSignupBackground(true);
      setError("");
      try {
        await createUser(email, password, username);
        setSignupShow(false);
        navigate("/profile");
        // navigate to the profile screen if successful
      } catch (error) {
        console.log("error logged in signup modal");
        setError(error.message);
        alert(error.message);
        setSignupBackground(false);
      }
    }
  }

  // const createNewUser = async (e) => {
  //   console.log("handle submit");
  //   setSignupBackground(true);
  //   e.preventDefault();
  //   setError("");
  //   if (username === "") {
  //     alert("please input a username");
  //   } else {
  //     try {
  //       await createUser(email, password, username);
  //       navigate("/profile");
  //       // navigate to the profile screen if successful
  //     } catch (error) {
  //       setError(error.message);
  //       console.error(error);
  //       alert(error.message);

  //       setSignupBackground(false);
  //     }
  //   }
  // };

  function loginHere() {
    setSignupShow(false);
    setLoginShow(true);
  }

  return (
    <>
      <div style={{ visibility: signupShow === true ? "" : "hidden" }}>
        <div
          id="authentication-modal"
          tabIndex="-1"
          aria-hidden="true"
          className="overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full md:inset-0 h-modal md:h-full justify-center items-center"
        >
          <div className="modal-center p-4 w-full max-w-md h-full h-auto mx-auto place-self-center">
            <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
              <button
                type="button"
                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                onClick={() => {
                  setSignupShow(false);
                }}
              >
                <svg
                  aria-hidden="true"
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
              <div className="py-6 px-6 lg:px-8">
                <h3 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">
                  Sign up to our platform
                </h3>
                <form className="space-y-6" action="#">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Your email
                    </label>
                    <input
                      type="email"
                      name="email"
                      id="email"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="name@company.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Your username
                    </label>
                    <input
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      placeholder="justin_25"
                      style={{
                        borderColor: usernameFail === true ? "red" : "",
                      }}
                      // pattern="^[A-Za-z0-9]{3,16}$"
                      onChange={(e) => setUsername(e.target.value)}
                    />
                    <label
                      className="block mt-2 text-red-500 text-xs font-medium text-gray-900 dark:text-gray-300"
                      style={{
                        display: usernameFail === true ? "" : "none",
                      }}
                    >
                      Please input a username between 1 and 9 characters long
                    </label>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Your password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                      Confirm password
                    </label>
                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                      style={{
                        borderColor: passwordConfirmFail === true ? "red" : "",
                      }}
                      onChange={(e) => setPasswordConfirm(e.target.value)}
                    />
                    <label
                      className="block mt-2 text-red-500 text-xs font-medium text-gray-900 dark:text-gray-300"
                      style={{
                        display: passwordConfirmFail === true ? "" : "none",
                      }}
                    >
                      Passwords do not match
                    </label>
                  </div>
                  <button
                    type="submit"
                    className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    onClick={handleSubmit}
                    style={{
                      backgroundColor: signupBackground === true ? "gray" : "",
                      cursor: signupBackground === true ? "wait" : "",
                    }}
                  >
                    Create your account
                  </button>
                  <div className="text-sm font-medium text-gray-500 dark:text-gray-300">
                    Already registered?{" "}
                    <a
                      href="#"
                      className="text-blue-700 hover:underline dark:text-blue-500"
                      onClick={() => {
                        loginHere();
                      }}
                    >
                      Login here
                    </a>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignupModal;
