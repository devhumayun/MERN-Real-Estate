import React from "react";
import { Link } from "react-router-dom";

export default function SignUp() {
  return (
    <div className="w-full">
      <div className="">
        <div className="max-w-lg mx-auto py-7 px-4 mt-5">
          <h1 className="text-center text-3xl font-semibold mb-4"> Sign Up </h1>
          <form className="flex flex-col gap-4">
            <input
              type="text"
              name="username"
              placeholder="username"
              className="p-3 w-full rounded-lg bg-white focus:outline-none"
            />
            <input
              type="text"
              name="email"
              placeholder="email"
              className="p-3 w-full rounded-lg bg-white focus:outline-none"
            />
            <input
              type="text"
              name="password"
              placeholder="password"
              className="p-3 w-full rounded-lg bg-white focus:outline-none"
            />
            <button
              type="submit"
              className="bg-slate-900 text-white uppercase p-3 rounded-lg hover:bg-opacity-95 "
            >
              Sign Up
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
            <Link to="/sign-in" className="font-semibold text-blue-500"> Sign in </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
