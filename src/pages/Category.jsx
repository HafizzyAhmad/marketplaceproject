import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { collection, getDocs, query, where, orderBy, limit, startAfter } from "firebase/firestore";
import { db } from "../firebase.config";
import { toast } from "react-toastify";
import Spinner from "../components/Spinner";
import ListingItem from "../components/ListingItem";

const Category = () => {

  const [listing, setListing] = useState(null);
  const [loading, setLoading] = useState(true);

  const params = useParams();

  useEffect(() => {
    const fetchListing = async () => {
      try {
        //Get Reference
        const listingRef = collection(db, 'listings');

        // get query
        const q = query(
          listingRef,
          where('type', '==', params.categoryName),
          orderBy('timestamp', 'desc'),
          limit(10),
        );
        
        // Execute query pula
        const querySnap = await getDocs(q);

        const listings = [];
        querySnap.forEach((doc) => {
          console.log(doc.data())

          return listings.push({
            id: doc.id,
            data: doc.data()
          })
        })

        setListing(listings);
        setLoading(false);

      } catch (error) {
        toast.error('Could not fetch listing');
      }
    }
    fetchListing();
  }, [params.categoryName])

  // console.log('Check Data Listing', listing);

  return (
    <div className="category">
      <header>
        <p className="pageHeader">
          {params.categoryName === 'rent' 
            ? 'Places for rent'
            : 'Places for sale'}
        </p>
      </header>
      {loading ? (
        <Spinner />
      ) : listing && listing.length > 0 ? (
        <>
          <main>
            <ul className="categoryListings">
              {listing.map((d) => (
                <ListingItem
                  listing={d.data}
                  id={d.id}
                  key={d.id} 
                />
                // <h3 key={d.id}>{d.data.name}</h3>
              ))}
            </ul>
          </main>
        </>
      ) : (<p>{`No listings for ${params.categoryName}`}</p>)}
    </div>
  )
}

export default Category;