import { useRef, useState, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useDispatch, useSelector } from "react-redux";
import {
  updateProfileFailed,
  updateProfileStart,
  updateProfileSuccess,
  userDeleteFailed,
  userDeleteStart,
  userDeleteSuccess,
} from "../redux/user/userSlice";

export default function Profile() {
  const [file, setFile] = useState(undefined);
  const [filePercent, setFilePercent] = useState(0);
  const [fileUploadError, setFileUploadError] = useState(false);
  const [input, setInput] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false)
  const dispatch = useDispatch();
  const { curentUser, loading, error } = useSelector((state) => state.user);

  const fileRef = useRef(null);

  useEffect(() => {
    if (file) {
      handleFileUpload(file);
    }
  }, [file]);
  const handleFileUpload = (file) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + file.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setFilePercent(Math.round(progress));
      },
      (error) => {
        setFileUploadError(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
          setInput({ ...input, avater: downloadUrl })
        );
      }
    );
  };

  const handleInputChange = (e) => {
    setInput((preState) => ({
      ...preState,
      [e.target.name]: e.target.value,
    }));
  };

  const handleUpdateFrom = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateProfileStart());
      const res = await fetch(`/api/v1/user/update/${curentUser._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(input),
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateProfileFailed(data.message));
        return;
      }
      dispatch(updateProfileSuccess(data));
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateProfileFailed(error));
    }
  };

  // delete user
  const handleDeleteUser = async () => {
    try {
      dispatch(userDeleteStart())
      const res = await fetch(`/api/v1/user/delete/${curentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(userDeleteFailed(data.message));
        return;
      }
      dispatch(userDeleteSuccess(data))
    } catch (error) {
      dispatch(userDeleteFailed(error.message))
    }
  }

  return (
    <div className="max-w-lg m-auto">
      <h1 className="text-3xl font-semibold text-center py-8"> Profile </h1>
      <form onSubmit={handleUpdateFrom} className="flex flex-col gap-4">
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
          {fileUploadError ? (
            <span className="text-red-600">
              Error Image Upload (image should be less than 2mb)
            </span>
          ) : filePercent > 0 && filePercent < 100 ? (
            <span>{`Uploading ${filePercent} %`}</span>
          ) : filePercent === 100 ? (
            <span className="text-green-800"> File uploaded successfull </span>
          ) : (
            ""
          )}
        </p>
        <input
          type="text"
          placeholder="username"
          onChange={handleInputChange}
          defaultValue={curentUser.username}
          name="username"
          className="p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          placeholder="email"
          onChange={handleInputChange}
          name="email"
          defaultValue={curentUser.email}
          className="p-3 rounded-lg focus:outline-none"
        />
        <input
          type="text"
          placeholder="password"
          onChange={handleInputChange}
          name="password"
          className="p-3 rounded-lg focus:outline-none"
        />
        {error && <p className="text-red-500 py-3">{error}</p>}
        {updateSuccess ? <p className="text-green-500 py-3"> Update Successfull </p> : ""}
        <button className="bg-slate-900 hover:bg-opacity-90 text-white uppercase p-3 rounded-lg font-semibold">
          {loading? "Updating Data" : "Update"}
        </button>
      </form>
      <div className="mt-7 flex justify-between">
        <button onClick={handleDeleteUser} className="bg-red-900 hover:bg-opacity-90 text-white p-2 uppercase rounded-lg">
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
