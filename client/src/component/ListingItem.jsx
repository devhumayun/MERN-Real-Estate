import { Link } from "react-router-dom";
import { FaMapMarkerAlt } from "react-icons/fa";

const ListingItem = ({ listing }) => {
  return (
    <main className="p-7 flex">
      <div className="bg-white shadow-md hover:shadow-lg overflow-hidden rounded-lg w-full sm:w-[330px]">
        <Link to={`/listing/${listing._id}`}>
          <img
            src={listing.imageUrl[0]}
            alt="listing coverphoto"
            className="h-[300px] sm:h-[200px] w-full object-cover hover:scale-105 transition-scale duration-300"
          />
          <div className="p-4 flex flex-col gap-3">
            <p className="truncate text-slate-700 text-xl font-semibold">
              {listing.name}
            </p>
            <div className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-blue-900" />
              <p className="text-blue-600 font-medium truncate">
                {listing.address}
              </p>
            </div>
            <p className="text-slate-600 text-[16px] line-clamp-3">
              {" "}
              {listing.description}{" "}
            </p>
            <p>
              ${listing.offer ? listing.discountPrice : listing.salePrice}
              {listing.type === "rent" && " " + "/month"}
            </p>
            <div className="flex items-center gap-4">
              <div className="text-sm font-semibold">
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds`
                  : `${listing.bedrooms} bed`}
              </div>
              <div className="text-sm font-semibold">
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} Baths`
                  : `${listing.bathrooms} Bath`}
              </div>
            </div>
          </div>
        </Link>
      </div>
    </main>
  );
};

export default ListingItem;
