import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { collection, getDocs, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../firebase.config';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
import 'swiper/css';
import 'swiper/css/bundle';
import Spinner from './Spinner';

const Slider = () => {
  const [loading, setLoading] = useState(true);
  const [listings, setListing] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchListing = async () => {
      const listingRef = collection(db, 'listings');
      const q = query(listingRef, orderBy('timestamp', 'desc'), limit(5));
      const querySnap = await getDocs(q);

      let listings = [];
      querySnap.forEach((doc) => {
        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });
      // console.log('Check Listing', listings);
      setListing(listings);
      setLoading(false);
    };
    fetchListing();
  }, []);

  if (loading) {
    return <Spinner />;
  }

  if (listings.length === 0) {
    return <></>;
  }

  return (
    listings && (
      <>
        <p className='exploreHeading'>Recommended</p>
        <Swiper
          slidesPerView={1}
          modules={[Navigation, Pagination, Scrollbar, A11y]}
          // navigation
          pagination={{ clickable: true }}
          // height={100}
        >
          {listings.map(({ data, id }) => (
            <SwiperSlide
              key={id}
              onClick={() => navigate(`category/${data.type}/${id}`)}
            >
              <div
                style={{
                  background: `url(${data.imageUrls[0]}) center no-repeat`, //index 0 sebab nak dapat item yang index 0 je dalam slider
                  backgroundSize: 'cover',
                  height: 300, //KENA EXPLORE KENAPA KENA HEIGH TAK BACA DALAM CLASS
                }}
                className='swiperSlideImg'
              >
                <p className='swiperSlideText'>{data.name}</p>
                <p className='swiperSlidePrice'>
                  {/* KALAU TAKDA DISCOUNTED PRICE KELUAR REGULAR PRICE */}
                  RM {data.discountedPrice ?? data.regularPrice}
                  {data.type === 'rent' && ' / month'}
                </p>
              </div>
              {/* <img
                src={data.imageUrls}
                alt=''
                className='swiperSlideImg'
                style={{ backgroundSize: 'cover' }}
              >
                <p className='swiperSlideText'>{data.name}</p>
              </img> */}
            </SwiperSlide>
          ))}
        </Swiper>
      </>
    )
  );
};

export default Slider;
