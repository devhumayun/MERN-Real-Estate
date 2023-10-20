const CreateListing = () => {
  return (
    <main className="p-4 max-w-4xl mx-auto">
      <h1 className="text-center py-6 text-3xl font-semibold">
        {" "}
        Create Listing{" "}
      </h1>
      <form className="flex flex-col sm:flex-row gap-7">
        <div className="flex flex-col flex-1 gap-6">
          <div className="flex flex-col gap-4">
            <input
              type="text"
              placeholder="Name"
              maxLength={60}
              minLength={10}
              id="name"
              className="p-3 rounded-lg focus:outline-none"
            />
            <textarea
              type="text"
              placeholder="Description"
              id="description"
              className="p-3 rounded-lg focus:outline-none"
            />
            <input
              type="text"
              placeholder="address"
              id="address"
              className="p-3 rounded-lg focus:outline-none"
            />
          </div>
          <div className=" flex gap-6 flex-wrap">
            <div className="flex gap-1">
              <input type="checkbox" id="sell" className="w-5 cursor-pointer" />
              <span className="text-sm font-semibold">Sell</span>
            </div>
            <div className="flex gap-1">
              <input type="checkbox" id="rent" className="w-5 cursor-pointer" />
              <span className="text-sm font-semibold">Rent</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="parking"
                className="w-5 cursor-pointer"
              />
              <span className="text-sm font-semibold">Parking</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="furnished"
                className="w-5 cursor-pointer"
              />
              <span className="text-sm font-semibold">Furnished</span>
            </div>
            <div className="flex gap-1">
              <input
                type="checkbox"
                id="offer"
                className="w-5 cursor-pointer"
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
              />
              <span className="text-md font-semibold"> Beds </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="bathrooms"
                min={1}
                max={10}
                required
                className="p-3 broder-gray-400 rounded-lg outline-none"
              />
              <span className="text-md font-semibold"> Baths </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="regularPrice"
                min={1}
                max={10}
                required
                className="p-3 broder-gray-400 rounded-lg outline-none"
              />
                <div className="">
                <p className="text-md font-semibold"> Regular Price </p>
              <p className="text-xs font-semibold text-center"> ($ / month) </p>
                </div>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                id="discountedPrice"
                min={1}
                max={10}
                required
                className="p-3 broder-gray-400 rounded-lg outline-none"
              />
              <div>
                <p className="text-md font-semibold">
                  Discounted Price
                </p>
                <p className="text-xs font-semibold text-center">
                  ($ / month)
                </p>
              </div>
            </div>
          </div>
        </div>
        <div className="flex felx-col flex-1">
          <div>
            <p className="text-xl font-semibold mb-5">
              Images: <span className="font-normal text-sm">The first image will be cover image (max 6)</span>
            </p>
            <div className="flex gap-2 mb-5" >
              <input className="bg-white p-3 rounded-lg cursor-pointer" type="file" id="upload" accept="image/*"/>
              <button className="p-3 border border-green-700 rounded-lg">Upload</button>
            </div>
            <button className="text-center bg-slate-900 w-full p-3 text-white uppercase rounded-lg font-semibold"> Create Listing </button>
          </div>
        </div>
      </form>
    </main>
  );
};

export default CreateListing;
