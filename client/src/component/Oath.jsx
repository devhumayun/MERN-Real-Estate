import {GoogleAuthProvider, getAuth, signInWithPopup} from "firebase/auth"
import { app } from "../firebase.js"


const Oath = () => {

const handleGoogleOath = async (e) => {
    e.preventDefault()
    try {
        const provider = new GoogleAuthProvider()
        const auth = getAuth(app)
        const result = await signInWithPopup(auth, provider)
        console.log(result);
    } catch (error) {
        console.log("Could not sign in Google",error);
    }
}

  return (
    <button onClick={handleGoogleOath} type="button" className="bg-blue-900 p-3 text-white  uppercase rounded-lg hover:bg-opacity-95">
      Oath
    </button>
  )
}

export default Oath
