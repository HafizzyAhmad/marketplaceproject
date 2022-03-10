import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import {
  collection,
  getDocs,
  query,
  where,
  orderBy,
  limit,
  startAfter,
} from 'firebase/firestore';
import { db } from '../firebase.config';
import { toast } from 'react-toastify';
import Spinner from '../components/Spinner';
import ListingItem from '../components/ListingItem';

const Offers = () => {
  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);
  const [lastFetchedListing, setLastFetchListing] = useState(null);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        //Get Reference
        const listingRef = collection(db, 'listings');

        // get query
        const q = query(
          listingRef,
          where('offer', '==', true),
          orderBy('timestamp', 'desc'),
          limit(10)
        );

        // Execute query pula
        const querySnap = await getDocs(q);

        const lastVisible = querySnap.docs[querySnap.docs.length - 1];
        setLastFetchListing(lastVisible);

        const listings = [];
        querySnap.forEach((doc) => {
          console.log(doc.data());

          return listings.push({
            id: doc.id,
            data: doc.data(),
          });
        });

        setListing(listings);
        setLoading(false);
      } catch (error) {
        toast.error('Could not fetch listing');
      }
    };
    fetchListing();
  }, []);

  // console.log('Check Data Listing', listing);

  // PAGINATION LOAD MORE LISTING

  const onFetchMoreListing = async () => {
    try {
      //Get Reference
      const listingRef = collection(db, 'listings');

      // get query
      const q = query(
        listingRef,
        where('offer', '==', true),
        orderBy('timestamp', 'desc'),
        startAfter(lastFetchedListing),
        limit(10)
      );

      // Execute query pula
      const querySnap = await getDocs(q);

      const lastVisible = querySnap.docs[querySnap.docs.length - 1];
      setLastFetchListing(lastVisible);

      const listings = [];
      querySnap.forEach((doc) => {
        console.log(doc.data());

        return listings.push({
          id: doc.id,
          data: doc.data(),
        });
      });

      setListing((prevState) => [...prevState, ...listings]);
      setLoading(false);
    } catch (error) {
      toast.error('Could not fetch listing');
    }
  };

  return (
    <div className='category'>
      <header>
        <p className='pageHeader'>Offers</p>
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className='categoryListings'>
              {listing.map((d) => (
                <ListingItem listing={d.data} id={d.id} key={d.id} />
                // <h3 key={d.id}>{d.data.name}</h3>
              ))}
            </ul>
          </main>
          <br />
          <br />
          {lastFetchedListing && (
            <p className='loadMore' onClick={onFetchMoreListing}>
              Load More
            </p>
          )}
        </>
      ) : (
        <p>{`There are no current offers`}</p>
      )}
    </div>
  );
};

export default Offers;
