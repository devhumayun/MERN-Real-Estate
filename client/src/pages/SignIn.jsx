import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInStart,
  signInSuccess,
  signInFailed,
} from "../redux//user/userSlice.js";
import Oath from "../component/Oath.jsx";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

export default function SignIn() {
  const { error, loading } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });
  const [showPass, setShowPass] = useState(false);

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
    try {
      dispatch(signInStart());
      const res = await fetch("/api/v1/auth/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(signInFailed(data.message));
        return;
      }
      dispatch(signInSuccess(data));
      navigate("/");
    } catch (error) {
      dispatch(signInFailed(error.message));
    }
  };

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
            <div className="relative">
              <input
                type={showPass ? "text" : "password"}
                value={input.password}
                onChange={(e) => handleInputChange(e)}
                name="password"
                placeholder="password"
                className="p-3 w-full rounded-lg bg-white focus:outline-none relative"
              />
            <span className="absolute top-4 right-4 cursor-pointer text-xl"  onClick={() => setShowPass(!showPass)}>
              {showPass ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}{" "}
            </span>
            </div>
            {error && <p className="text-red-500 py-3">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="bg-slate-900 text-white uppercase p-3 rounded-lg hover:bg-opacity-95 "
            >
              {loading ? "Loading.." : " Sign Up"}
            </button>
            <Oath />
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
