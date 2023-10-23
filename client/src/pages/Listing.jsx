import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper/modules';
import SwiperCore from 'swiper'
import 'swiper/css/bundle'

const Listing = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [listing, setListing] = useState([]);
  const params = useParams();
  SwiperCore.use([Navigation])
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
          setLoading(false)
          return;
        }
        setListing(data);
        setLoading(false)
      } catch (error) {
        setError(error);
        setLoading(false)
      }
    };

    listingInfo();
  }, [params.listingId]);
  return <main>
    {loading && <p className="text-center pt-7 font-semibold text-2xl"> Loading.. </p>}
    {error && <p className="text-center pt-7 font-semibold text-2xl"> Something is wrong! Try to contact your developer </p>}
    {listing && !loading && !error &&
    <>
        <Swiper navigation>
            {
                listing.imageUrl?.map((imageUrl) => {
                    return(
                        <SwiperSlide key={imageUrl}>
                            <div className="h-[600px]" style={{background: `url(${imageUrl}) center no-repeat`, backgroundSize:"cover" }}></div>
                        </SwiperSlide>
                    )
                })
            }
        </Swiper>
    </>
    }
  </main>;
};

export default Listing;
