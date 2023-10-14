import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignUP } from "../features/auth/authApiSlice";
import { createToast } from "../utils/toast";
import { setMessageEmpty } from "../features/auth/authSlice";


export default function SignUp() {
  // const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const { error, message, loader, tag } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  // handle input value change
  const handleInputChange = (e) => {
    setInput((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  // user sign up
  const handleUserSignUp = async (e) => {
    e.preventDefault();
    dispatch(userSignUP(input))
   
    // try {
    //   setLoading(true);
    //   const res = await fetch("/api/v1/auth/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(input),
    //   });
    //   const data = await res.json();
    //   setLoading(false);
    //   navigate('/sign-in')
    //   if (data.success === false) {
    //     setError(error.message);
    //     setLoading(false);
    //     return;
    //   }
    // } catch (error) {
    //   setLoading(false);
    //   setError(error.message);
    // }
  };

    // for message manage
    useEffect(() => {
      if (error) {
        createToast(error);
        dispatch(setMessageEmpty());
      }
      if (message) {
        createToast(message, "success");
        dispatch(setMessageEmpty());
      }
    }, [error, message, dispatch]);

  return (
    <div className="w-full">
      <div className="">
        <div className="max-w-lg mx-auto py-7 px-4 mt-5">
          <h1 className="text-center text-3xl font-semibold mb-4"> Sign Up </h1>
          <form onSubmit={handleUserSignUp} className="flex flex-col gap-4">
            <input
              type="text"
              value={input.username}
              onChange={(e) => handleInputChange(e)}
              name="username"
              placeholder="username"
              className="p-3 w-full rounded-lg bg-white focus:outline-none"
            />
            <input
              type="email"
              value={input.email}
              onChange={(e) => handleInputChange(e)}
              name="email"
              placeholder="email"
              className="p-3 w-full rounded-lg bg-white focus:outline-none"
            />
            <input
              type="text"
              value={input.password}
              onChange={(e) => handleInputChange(e)}
              name="password"
              placeholder="password"
              className="p-3 w-full rounded-lg bg-white focus:outline-none"
            />
            <button
              type="submit"
              disabled={loader}
              className="bg-slate-900 text-white uppercase p-3 rounded-lg hover:bg-opacity-95 "
            >
              {loader ? "Loading.." : " Sign Up"}
            </button>
            <button
              type="submit"
              className="bg-blue-700 text-white uppercase p-3 rounded-lg hover:bg-opacity-95 "
            >
              Continue With Google
            </button>
          </form>
          <p className="mt-5 ">
            Have an account?
            <Link to="/sign-in" className="font-semibold text-blue-500">
              {" "}
              Sign in{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
