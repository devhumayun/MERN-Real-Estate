import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../component/ListingItem";

const Search = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [listing, setListing] = useState([]); 
  const [showMore, setShowMore] = useState(false);

  const [searchListing, setSearchListing] = useState({
    searchTerm: "",
    offer: false,
    furnished: false,
    parking: false,
    order: "desc",
    sort: "created_at",
    type: "all",
  });
  const handleInputChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "sale" ||
      e.target.id === "rent"
    ) {
      setSearchListing({
        ...searchListing,
        type: e.target.id,
      });
    }
    if (
      e.target.id === "offer" ||
      e.target.id === "parking" ||
      e.target.id === "furnished"
    ) {
      setSearchListing({
        ...searchListing,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }
    if (e.target.id === "searchTerm") {
      setSearchListing({
        ...searchListing,
        searchTerm: e.target.value,
      });
    }
    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSearchListing({ ...searchListing, sort, order });
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlParams.get("searchTerm");
    const searchTypeFromUrl = urlParams.get("type");
    const searchOfferFromUrl = urlParams.get("offer");
    const searchParkingFromUrl = urlParams.get("parking");
    const searchFurnishedFromUrl = urlParams.get("furnished");
    const searchSortFromUrl = urlParams.get("sort");
    const searchOrderFromUrl = urlParams.get("order");
    if (
      searchTermFromUrl ||
      searchTypeFromUrl ||
      searchOfferFromUrl ||
      searchParkingFromUrl ||
      searchFurnishedFromUrl ||
      searchSortFromUrl ||
      searchOrderFromUrl
    ) {
      setSearchListing({
        searchTerm: searchTermFromUrl || "",
        type: searchTypeFromUrl || "all",
        offer: searchOfferFromUrl === "true" ? true : false,
        furnished: searchFurnishedFromUrl === "true" ? true : false,
        parking: searchParkingFromUrl === "true" ? true : false,
        sort: searchSortFromUrl || "create_at",
        order: searchOrderFromUrl || "desc",
      });
    }

    const fetchListingData = async () => {
      setLoading(true);
      setShowMore(false)
      const searchQuery = urlParams.toString();
      const res = await fetch(`/api/v1/listing/get?${searchQuery}`);
      const data = await res.json();
      if (data.length > 8) {
        setShowMore(true);
      } else {
        setShowMore(false);
      }
      setListing(data);
      setLoading(false);
    };

    fetchListingData();
  }, [location.search]);

  const handleShowMoreListing = async () => {
    const numberOfListing = listing.length;
    const startIndex = numberOfListing;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set("startIndex", startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/v1/listing/get?${searchQuery}`);
    const data = await res.json();
    if (data.length > 9) {
      setShowMore(false);
    }

    setListing([...listing, ...data]);
  };

  const handleSearchForm = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams();
    urlParams.set("searchTerm", searchListing.searchTerm);
    urlParams.set("offer", searchListing.offer);
    urlParams.set("parking", searchListing.parking);
    urlParams.set("purnished", searchListing.furnished);
    urlParams.set("order", searchListing.order);
    urlParams.set("sort", searchListing.sort);
    urlParams.set("type", searchListing.type);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  return (
    <main className="flex max-w-full mx-auto">
      <div className="p-7 border-b-2 md:border-r-2 min-h-screen">
        <form onSubmit={handleSearchForm} className="flex flex-col gap-8 bg-gray-200 p-3 rounded-lg shadow-sm">
          <div className="flex items-center gap-2">
            <label className="whitespace-nowrap font-semibold"> Search Term: </label>
            <input
              value={searchListing.searchTerm}
              onChange={handleInputChange}
              type="text"
              placeholder="search.."
              id="searchTerm"
              className="w-full p-3 rounded-lg outline-none"
            />
          </div>
          <div className="flex gap-3 flex-wrap">
            <label className="font-semibold"> Type: </label>
            <div className="flex items-center">
              <input
                value={searchListing.type === "all"}
                onChange={handleInputChange}
                type="checkbox"
                id="all"
                className="w-8"
              />
              <span> Rent and Sale </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                value={searchListing.type === "rent"}
                onChange={handleInputChange}
                type="checkbox"
                id="rent"
                className="w-8"
              />
              <span> Rent </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                value={searchListing.type === "sale"}
                onChange={handleInputChange}
                type="checkbox"
                id="sale"
                className="w-8"
              />
              <span> Sale </span>
            </div>
            <div className="flex items-center gap-1">
              <input
                value={searchListing.offer}
                onChange={handleInputChange}
                type="checkbox"
                id="offer"
                className="w-8"
              />
              <span> Offer </span>
            </div>
          </div>
          <div className="flex gap-2">
            <label className="font-semibold"> Amenities: </label>
            <div className="flex items-center gap-2">
              <input
                value={searchListing.parking}
                onChange={handleInputChange}
                type="checkbox"
                id="parking"
                className=""
              />
              <span> Parking </span>
            </div>
            <div className="flex items-center gap-2">
              <input
                value={searchListing.furnished}
                onChange={handleInputChange}
                type="checkbox"
                id="furnished"
                className="w-8"
              />
              <span> Furnished </span>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <label className="font-semibold">Sort: </label>
            <select
              defaultValue={"created_at_desc"}
              onChange={handleInputChange}
              id="sort_order"
              className="p-3 rounded-lg outline-none"
            >
              <option value="regularPrice_desc"> Price hight to low </option>
              <option value="regularPrice_asc"> Price low to high </option>
              <option value="createAt_desc"> Latest </option>
              <option value="createdAt_asc"> Oldest </option>
            </select>
          </div>
          <button className="bg-slate-900 text-white uppercase p-3 rounded-lg">
            {" "}
            Search{" "}
          </button>
        </form>
      </div>
      <div>
        <div className="">
          <h1 className="p-8 text-3xl font-bold text-slate-900">
            Listing results:
          </h1>
        </div>
        {loading && listing.length === 0 && <p>Loading</p>}
        <div className="flex gap-3 flex-wrap">
          {!loading &&
            listing &&
            listing.map((listing) => (
              <ListingItem key={listing._id} listing={listing} />
            ))}
        </div>
        {showMore && (
          <button className="text-blue-800 text-center w-full text-xl py-6" onClick={handleShowMoreListing}> Show More </button>
        )}
      </div>
    </main>
  );
};

export default Search;
