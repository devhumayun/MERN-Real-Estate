import { Link } from "react-router-dom";
import {BsSearchHeart} from 'react-icons/bs'
export default function Header() {
  return (
    <>
      <div className='w-full shadow-lg bg-gray-300 bg-opacity-90'>
        <div className="max-w-[80%] flex justify-between mx-auto items-center py-3">
            <div className="flex font-semibold text-xl">
                <span className="text-slate-600"> Humayun </span>
                <span className="text-slate-700">Estate </span>
            </div>
            <form className="flex bg-slate-100 justify-between items-center p-3 rounded-lg ">
                <input type="text"  placeholder="Search..." className="bg-transparent outline-none w-32 sm:w-64"/>
                <BsSearchHeart className="cursor-pointer"/>
            </form>
            <div>
                <ul className="flex gap-5 text-slate-700 font-semibold">
                    <li className="hidden sm:inline hover:underline hover:cursor-pointer "><Link to="/"> Home </Link></li>
                    <li className="hidden sm:inline hover:underline hover:cursor-pointer "><Link to="/about"> About </Link></li>
                    <li><Link to="/sign-in"> Sign In </Link></li>
                </ul>
            </div>
        </div>
      </div>
    </>
  )
}
