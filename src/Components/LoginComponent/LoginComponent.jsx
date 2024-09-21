import { useState } from "react";
import { auth } from "../../firebase/config.js"; // Import Firebase auth instance
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
} from "firebase/auth";
import { useDispatch } from "react-redux"; // Redux hook for dispatching actions
import { setUser } from "../../Redux/Authentication/usersSlice.js"; // Redux action for setting the user

function LoginComponent({ togglePopup }) {
  // State to track loading status, login/signup type, user credentials, and error messages
  const [isLoading, setIsLoading] = useState(true);
  const [loginType, setLoginType] = useState("login"); // Switch between login and signup modes
  const [userCredentials, setUserCredentials] = useState({}); // Store user input for email and password
  const [error, setError] = useState(""); // Store any error messages

  const dispatch = useDispatch(); // Redux dispatch function

  // Firebase auth state change listener
  onAuthStateChanged(auth, (user) => {
    if (user) {
      // User is signed in, see docs for a list of available properties
      // https://firebase.google.com/docs/reference/js/auth.user
      // ...
    } else {
      dispatch(setUser(null));

      // User is signed out
      // ...
    }
    // Once the auth state is determined, stop showing the loading spinner
    if (isLoading) {
      setIsLoading(false);
    }
  });

  function handleCredentials(e) {
    setUserCredentials({ ...userCredentials, [e.target.name]: e.target.value });
    console.log(userCredentials);
  }

  // Function to handle user signup
  function handleSignup(e) {
    e.preventDefault();
    console.log("signup");
    setError("");
    // Firebase function to create a user with email and password
    createUserWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        dispatch(
          setUser({
            id: userCredential.user.uid,
            email: userCredential.user.email,
          })
        );
      })
      .catch((error) => {
        //const errorCode = error.code;
        //const errorMessage = error.message;
        alert(error.message);
        setError(error.message);
        // console.log(error.message);
        // console.log(errorMessage);
        // ..
      });
    togglePopup(); // Close the login/signup popup after signup
  }

  // Function to handle user login
  function handleLogin(e) {
    e.preventDefault();
    //console.log("login");
    setError("");

    // Firebase function to sign in with email and password
    signInWithEmailAndPassword(
      auth,
      userCredentials.email,
      userCredentials.password
    )
      .then((userCredential) => {
        dispatch(
          setUser({
            id: userCredential.user.uid,
            email: userCredential.user.email,
          })
        );
      })
      .catch((error) => {
        alert(error.message);
        setError(error.message);
      });
    togglePopup(); // Close the popup after login
  }

  // Function to handle password reset
  function handlePasswordReset() {
    const email = prompt("Please enter your email");
    sendPasswordResetEmail(auth, email);
    if (email) {
      alert("Email sent! Check your inbox for password reset instructions");
    }
  }

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white  rounded shadow-lg">
        <div className="flex items-center justify-center  ">
          {/* Show loading spinner until authentication state is resolved */}
          {isLoading ? (
            <div>Loading...</div>
          ) : (
            <div className="container login-page w-full max-w-md p-8 space-y-8 bg-white  rounded-lg">
              <section>
                <div className="flex  justify-end">
                  {/* Button to close the login/signup popup */}
                  <button
                    className="px-4 py-2 bg-blue-500 text-white rounded flex items-end "
                    onClick={
                      // Handle sign in or join actions
                      togglePopup
                    }
                  >
                    X
                  </button>
                </div>

                <h1 className="text-3xl font-bold text-center">
                  Welcome to AliExpress
                </h1>
                <p className="text-center">
                  Login or create an account to continue
                </p>
                <div className="login-type flex justify-center space-x-4 mb-4">
                  {/* Button to toggle between login and signup modes */}
                  <button
                    className={`btn px-4 py-2 font-bold  rounded ${
                      loginType == "login" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setLoginType("login")}
                  >
                    Login
                  </button>
                  <button
                    className={`btn btn px-4 py-2 font-bold  rounded ${
                      loginType == "signup" ? "bg-blue-500" : "bg-gray-300"
                    }`}
                    onClick={() => setLoginType("signup")}
                  >
                    Signup
                  </button>
                </div>
                <form className="add-form login space-y-4">
                  {/* Email input field */}
                  <div className="form-control ">
                    <label className="block text-sm font-medium">Email *</label>
                    <input
                      onChange={(e) => {
                        handleCredentials(e);
                      }}
                      type="text"
                      name="email"
                      placeholder="Enter your email"
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  </div>
                  {/* Password input field */}
                  <div className="form-control">
                    <label className="block text-sm font-medium">
                      Password *
                    </label>
                    <input
                      onChange={(e) => {
                        handleCredentials(e);
                      }}
                      type="password"
                      name="password"
                      placeholder="Enter your password"
                      className="w-full px-3 py-2 mt-1 border rounded-lg focus:outline-none focus:ring focus:ring-blue-200"
                    />
                  </div>

                  {/* Conditional rendering of login or signup button based on the selected mode */}
                  {loginType == "login" ? (
                    <button
                      onClick={(e) => {
                        handleLogin(e);
                      }}
                      className="active btn btn-block  w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    >
                      Login
                    </button>
                  ) : (
                    <button
                      onClick={(e) => {
                        handleSignup(e);
                      }}
                      className="active btn btn-block w-full px-4 py-2 font-bold text-white bg-blue-500 rounded hover:bg-blue-700"
                    >
                      Sign Up
                    </button>
                  )}

                  {/* Display error message if one exists */}
                  {error && (
                    <div className="error text-red-500 text-sm">{error}</div>
                  )}
                </form>
              </section>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginComponent;
