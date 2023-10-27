import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import SwiperCore from "swiper";
import "swiper/css/bundle";
import ListingItem from "../component/ListingItem";

export default function Home() {
  const [offerListing, setOfferListing] = useState([]);
  const [rentListing, setRentListing] = useState([]);
  const [saleListing, setSaleListing] = useState([]);
  const [loading, setLoading] = useState(false)
  SwiperCore.use([Navigation]);
  useEffect(() => {
    const fetchOfferListingData = async () => {
      try {
        setLoading(true)
        const res = await fetch("/api/v1/listing/get?offer=true&limit=4");
        const data = await res.json();
        setOfferListing(data);
        fetchRentListingData();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchRentListingData = async () => {
      try {
        const res = await fetch("/api/v1/listing/get?type=rent&limit=4");
        const data = await res.json();
        setRentListing(data);
        fetchSaleListingData();
      } catch (error) {
        console.log(error);
      }
    };

    const fetchSaleListingData = async () => {
      try {
        const res = await fetch("/api/v1/listing/get?type=sale&limit=4");
        const data = await res.json();
        setSaleListing(data);
        setLoading(false)
      } catch (error) {
        console.log(error);
      }
    };

    fetchOfferListingData();
  }, []);

  return (
    <main className="">
      {/* hero content */}

      <div className="py-28 max-w-7xl mx-auto px-6">
        <h1 className="text-4xl lg:text-6xl font-bold text-slate-900">
          {" "}
          Find your next <span className="text-slate-600">perfect</span>
          <br /> place with ease{" "}
        </h1>
        <p className="text-sm text-slate-600 py-4">
          Sahand Estate will help you find your home fast, easy and comfortable.
          <br />
          Our expert support are always available.
        </p>
        <Link className="text-blue-900 font-semibold" to={"/search"}>
          {" "}
          Lets start now ..{" "}
        </Link>
      </div>
      {/* slider */}
      <Swiper navigation>
        {offerListing &&
          offerListing.length > 0 &&
          offerListing.map((listing) => (
            <SwiperSlide key={listing._id}>
              <div
                style={{
                  background: `url(${listing.imageUrl[0]}) center no-repeat`,
                  backgroundSize: "cover",
                }}
                className="h-[600px]"
                key={listing._id}
              ></div>
            </SwiperSlide>
          ))}
      </Swiper>
      {/* listing */}
      <div className="max-w-7xl mx-auto">
        {offerListing && offerListing.length > 0 && (
          <div>
            <div className="pt-8 pb-4 px-7">
              <h1 className="text-3xl font-semibold text-slate-900"> Recent offers </h1>
              <Link to={`/search?offer=true`}> See more offers </Link>
            </div>
            <div className="flex flex-wrap">
              {offerListing.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto">
        {rentListing && rentListing.length > 0 && (
          <div>
            <div className="pt-8 pb-4 px-7">
              <h1 className="text-3xl font-semibold text-slate-900"> Recent places for rent </h1>
              <Link to={`/search?type=rent`}> See more recent rent place </Link>
            </div>
            <div className="flex flex-wrap">
              {rentListing.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
      </div>
      <div className="max-w-7xl mx-auto">
        {saleListing && saleListing.length > 0 && (
          <div>
            <div className="pt-8 pb-4 px-7">
              <h1 className="text-3xl font-semibold text-slate-900"> Recent places for sale </h1>
              <Link to={`/search?type=sale`}> See more place for sale </Link>
            </div>
            <div className="flex flex-wrap">
              {saleListing.map((listing) => {
                return <ListingItem listing={listing} key={listing._id} />;
              })}
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
