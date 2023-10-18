import { useRef, useState, useEffect } from "react";
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import {useSelector} from 'react-redux'


export default function Profile() {
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [input, setInput] = useState({})
  const {curentUser} = useSelector(state => state.user)

  const fileRef = useRef(null);

  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
  },[file])
  const handleFileUpload = (file) => {
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage, fileName)
    const uploadTask = uploadBytesResumable(storageRef, file)

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100
        setFilePercent(Math.round(progress))
      },
      (error) => {
        setFileUploadError(error)
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) => 
          setInput({...input, avater: downloadUrl})
        )
        
      }
    ) 
  }
  return (
    <div className="max-w-lg m-auto">
      <h1 className="text-3xl font-semibold text-center py-8"> Profile </h1>
      <form className="flex flex-col gap-4">
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type="file"
          ref={fileRef}
          accept="image/*"
          hidden
        />
        <img
          onClick={() => fileRef.current.click()}
          className="w-24 h-24 rounded-full object-cover cursor-pointer self-center mb-7"
          src={input.avater || curentUser.avater}
          alt="profile"
        />
        <p className="text-center text-sm">
          {
            fileUploadError ? (
              <span className="text-red-600">Error Image Upload (image should be less than 2mb)</span>
            ) : filePercent > 0 && filePercent <100 ? (
              <span>{`Uploading ${filePercent} %`}</span>
            ) : filePercent === 100 ? (
              <span className="text-green-800"> File uploaded successfull </span>
            ) : ""
          }
        </p>
        <input
          type="text"
          placeholder="username"
          name="username"
          className="p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          placeholder="email"
          name="email"
          className="p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          placeholder="password"
          name="password"
          className="p-3 rounded-lg focus:outline-none"
        />
        <button className="bg-slate-900 hover:bg-opacity-90 text-white uppercase p-3 rounded-lg font-semibold">
          {" "}
          Update{" "}
        </button>
      </form>
      <div className="mt-7 flex justify-between">
        <button className="bg-red-900 hover:bg-opacity-90 text-white p-2 uppercase rounded-lg">
          {" "}
          Delete Account{" "}
        </button>
        <button className="bg-red-900 hover:bg-opacity-90 text-white p-2 uppercase rounded-lg">
          {" "}
          Sign Out{" "}
        </button>
      </div>
    </div>
  );
}
