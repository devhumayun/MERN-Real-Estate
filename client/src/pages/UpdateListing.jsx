import { useEffect, useState } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../firebase";
import { useSelector } from "react-redux";
import {useNavigate, useParams} from 'react-router-dom'

const UpdateListing = () => {
  const { curentUser } = useSelector((state) => state.user);
  const navigate = useNavigate()
  const params = useParams()
  const [files, setFile] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [filesUploadError, setFilesUploadError] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [fromData, setFromData] = useState({
    imageUrl: [],
    name: "",
    description: "",
    address: "",
    salePrice: 50,
    discountPrice:0,
    bedrooms: 1,
    bathrooms: 1,
    type: "rent",
    furnished: false,
    offer: false,
    parking: false,
  });
  const handleImageUpload = async () => {
    if (files.length > 0 && files.length + fromData.imageUrl.length < 7) {
      setUploading(true);
      setFilesUploadError(null);
      const promise = [];

      for (let i = 0; i < files.length; i++) {
        promise.push(filesStore(files[i]));
      }
      Promise.all(promise)
        .then((urls) => {
          setFromData({
            ...fromData,
            imageUrl: fromData.imageUrl.concat(urls),
          });
          setFilesUploadError(null);
          setUploading(false);
        })
        .catch((err) => {
          setFilesUploadError(err, "Max size per image < 2mb");
          setUploading(false);
        });
    } else {
      setFilesUploadError("Maximum upload limit is 6");
      setUploading(false);
    }
  };
  const filesStore = async (file) => {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime() + file.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(`Uploading ${progress}%`);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadUrl) =>
            resolve(downloadUrl)
          );
        }
      );
    });
  };
  // Remove uploaded image
  const handleImageRemove = (index) => {
    setFromData({
      ...fromData,
      imageUrl: fromData.imageUrl.filter((_, i) => i !== index),
    });
  };

  // handle Input value change
  const handleInputChange = (e) => {
    if (e.target.id === "sale" || e.target.id === "rent") {
      setFromData({
        ...fromData,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "furnished" ||
      e.target.id === "offer" ||
      e.target.id === "parking"
    ) {
      setFromData({
        ...fromData,
        [e.target.id]: e.target.checked,
      });
    }
    if (
      e.target.type === "number" ||
      e.target.type === "text" ||
      e.target.type === "textarea"
    ) {
      setFromData({
        ...fromData,
        [e.target.id]: e.target.value,
      });
    }
  };

  // create listing
  const handleListingCreateForm = async (e) => {
    e.preventDefault();
    try {
      if(+fromData.salePrice < +fromData.discountPrice)  return setError("Discounted price should be less than regular price")
      if(fromData.imageUrl < 1)  return setError("Upload at least 1 image")
      
      setLoading(true);
      setError(null);
      const res = await fetch(`/api/v1/listing/update/${params.listingId}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...fromData,
          userRef: curentUser._id,
        }),
      });
      const data = await res.json();
      if (data.success === false) {
        setError(error.message);
        return;
      }
      setLoading(false);
      navigate(`/listing/${data._id}`)
    } catch (error) {
      setError(error.message);
      setLoading(false);
    }
  };

  useEffect(() => {
    const fetchListingData = async () => {
        const listingId = params.listingId
        const res = await fetch(`/api/v1/listing/get/${listingId}`)
        const data = await res.json()
        if(data.success === false){
            console.log(data.message);
            return
        }
        setFromData(data)
    }
    fetchListingData()
  },[params.listingId])

  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-center py-6 text-3xl font-semibold">
        {" "}
        Update Listing{" "}
      </h1>
      <form
        onSubmit={handleListingCreateForm}
        className="flex flex-col sm:flex-row gap-7"
      >
        <div className="flex flex-col flex-1 gap-6">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              maxLength={60}
              minLength={10}
              id="name"
              onChange={handleInputChange}
              value={fromData.name}
              className="p-3 rounded-lg focus:outline-none"
              required
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              onChange={handleInputChange}
              value={fromData.description}
              className="p-3 rounded-lg focus:outline-none"
              required
            />
            <input
              type="text"
              placeholder="address"
              id="address"
              onChange={handleInputChange}
              value={fromData.address}
              className="p-3 rounded-lg focus:outline-none"
              required
            />
          </div>
          <div className=" flex gap-6 flex-wrap">
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="sale"
                className="w-5 cursor-pointer"
                onChange={handleInputChange}
                checked={fromData.type === "sale"}
              />
              <span className="text-sm font-semibold">Sale</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="rent"
                className="w-5 cursor-pointer"
                onChange={handleInputChange}
                checked={fromData.type === "rent"}
              />
              <span className="text-sm font-semibold">Rent</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-5 cursor-pointer"
                onChange={handleInputChange}
                checked={fromData.parking}
              />
              <span className="text-sm font-semibold">Parking</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 cursor-pointer"
                onChange={handleInputChange}
                checked={fromData.furnished}
              />
              <span className="text-sm font-semibold">Furnished</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-5 cursor-pointer"
                onChange={handleInputChange}
                checked={fromData.offer}
              />
              <span className="text-sm font-semibold">Offer</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-6">
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bedrooms"
                min={1}
                max={10}
                required
                className="p-3 broder-gray-400 rounded-lg outline-none"
                onChange={handleInputChange}
                value={fromData.bedrooms}
              />
              <span className="text-md font-semibold"> Beds </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                onChange={handleInputChange}
                value={fromData.bathrooms}
                required
                className="p-3 broder-gray-400 rounded-lg outline-none"
              />
              <span className="text-md font-semibold"> Baths </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="selePrice"
                min={50}
                max={10000}
                onChange={handleInputChange}
                value={fromData.salePrice}
                required
                className="p-3 broder-gray-400 rounded-lg outline-none"
              />
              <div className="">
                <p className="text-md font-semibold"> Regular Price </p>
                <p className="text-xs font-semibold text-center">
                  {" "}
                  ($ / month){" "}
                </p>
              </div>
            </div>
            {fromData.offer && (
              <div className="flex items-center gap-2">
                <input
                  type="number"
                  id="discountPrice"
                  min={0}
                  max={10000}
                  onChange={handleInputChange}
                  value={fromData.discountPrice}
                  required
                  className="p-3 broder-gray-400 rounded-lg outline-none"
                />
                <div>
                  <p className="text-md font-semibold">Discounted Price</p>
                  <p className="text-xs font-semibold text-center">
                    ($ / month)
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
        <div className="flex felx-col flex-1">
          <div>
            <p className="text-xl font-semibold mb-5">
              Images:{" "}
              <span className="font-normal text-sm">
                The first image will be cover image (max 6)
              </span>
            </p>
            <div className="flex gap-2 mb-5">
              <input
                onChange={(e) => setFile(e.target.files)}
                className="bg-white p-3 rounded-lg cursor-pointer"
                type="file"
                id="upload"
                accept="image/*"
                multiple
              />
              <button
                disabled={uploading}
                onClick={handleImageUpload}
                type="button"
                className="p-3 border border-green-700 rounded-lg"
              >
                {uploading ? "Uploading..." : "Upload"}
              </button>
            </div>
            {filesUploadError && (
              <p className="text-red-600 mb-3"> {filesUploadError} </p>
            )}
            {fromData.imageUrl &&
              fromData.imageUrl.map((url, i) => {
                return (
                  <div
                    key={url}
                    className="flex p-3 bg-white mb-2 justify-between shadow-sm rounded-lg"
                  >
                    <img
                      className="w-32 h-32 object-cover shadow-lg"
                      src={url}
                      alt="listing image"
                    />
                    <button onClick={() => handleImageRemove(i)} type="button">
                      {" "}
                      Delete{" "}
                    </button>
                  </div>
                );
              })}
            {error && <p className="text-red-600 mb-2">{error} </p>}
            <button disabled={loading || uploading} className="text-center bg-slate-900 w-full p-3 text-white uppercase rounded-lg font-semibold">
              {loading ? "Updateing..." : " Update Listing"}
            </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default UpdateListing;
