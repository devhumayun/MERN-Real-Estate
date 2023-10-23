import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import { FaBed, FaChair, FaMapMarkerAlt, FaParking } from "react-icons/fa";
import {useSelector} from 'react-redux'
import ContactComponent from "../component/ContactComponent";

const Listing = () => {
  const [loading, setLoading] = useState(false);

  const [error, setError] = useState(false);
  const [listing, setListing] = useState([]);
  const [contact, setContact] = useState(false);
  const params = useParams();
  const {curentUser} = useSelector(state => state.user)
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const listingInfo = async () => {
      try {
        setLoading(true);
        setError(false);
        const listingId = params.listingId;
        const res = await fetch(`/api/v1/listing/get/${listingId}`);
        const data = await res.json();
        if (data.success === false) {
          setError(data.message);
          setLoading(false);
          return;
        }
        setListing(data);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    listingInfo();
  }, [params.listingId]);
  return (
    <main>
      {loading && (
        <p className="text-center pt-7 font-semibold text-2xl"> Loading.. </p>
      )}
      {error && (
        <p className="text-center pt-7 font-semibold text-2xl">
          {" "}
          Something is wrong! Try to contact your developer{" "}
        </p>
      )}
      {listing && !loading && !error && (
        <>
          <Swiper navigation>
            {listing.imageUrl?.map((imageUrl) => {
              return (
                <SwiperSlide key={imageUrl}>
                  <div
                    className="h-[600px]"
                    style={{
                      background: `url(${imageUrl}) center no-repeat`,
                      backgroundSize: "cover",
                    }}
                  ></div>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </>
      )}
      <div className="flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4">
        <p className="text-2xl font-semibold">
          {listing.name} -{" "}
          {listing.offer ? listing.discountPrice : listing.selePrice}
          {listing.type === "rent" && "/ month"}
        </p>
        <p className="flex items-center gap-2">
          <FaMapMarkerAlt className="text-blue-700" />
          {listing.address}
        </p>
        <div className="flex gap-3">
          <p className="bg-blue-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
            {listing.type === "rent" ? "For Rent" : "For Sale"}
          </p>
          {listing.offer && (
            <p className="bg-blue-900 w-full max-w-[200px] text-white text-center p-1 rounded-md">
              ${+listing.salePrice - +listing.discountPrice} OFF
            </p>
          )}
        </div>
        {listing.description && (
          <p>
            {" "}
            <strong>Description:</strong> listing.description{" "}
          </p>
        )}
        <ul className="text-blue-900 flex gap-4 flex-wrap">
          <li className="flex items-center gap-2 font-semibold">
            <FaBed className="text-[25px]" />
            {listing.bedrooms > 1 ? "Beds" : "Bed"}
          </li>
          <li className="flex items-center gap-2 font-semibold">
            <FaBed className="text-[25px]" />
            {listing.bathrooms > 1 ? "Baths" : "Bath"}
          </li>
          <li className="flex items-center gap-2 font-semibold">
            <FaParking className="text-[25px]" />
            {listing.parking ? "Parking" : "No Parking"}
          </li>
          <li className="flex items-center gap-2 font-semibold">
            <FaChair className="text-[25px]" />
            {listing.furnished ? "Furnished" : "Unfurnished"}
          </li>
        </ul>
        { curentUser && listing.userRef !== curentUser._id && !contact &&
         <button onClick={() => setContact(true)} className="bg-slate-900 text-white p-3 rounded-lg uppercase font-semibold my-5"> Contact landlord </button>
        }
        {contact && <ContactComponent listing={listing} />}
      </div>
    </main>
  );
};

export default Listing;
