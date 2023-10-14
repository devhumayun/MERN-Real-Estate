import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { userSignIn, userSignUP } from "../features/auth/authApiSlice";
import { createToast } from "../utils/toast";
import { setMessageEmpty } from "../features/auth/authSlice";


export default function SignIn() {

  const { error, message, loader, } = useSelector((state) => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [input, setInput] = useState({
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

  // user sign in
  const handleUserSignIn = async (e) => {
    e.preventDefault();
    dispatch(userSignIn(input))
    setInput({
      email: "",
      password: "",
    })
    navigate("/")
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
          <form onSubmit={handleUserSignIn} className="flex flex-col gap-4">
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
            Not Have an account?
            <Link to="/sign-up" className="font-semibold text-blue-500">
              {" "}
              Sign UP{" "}
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}


