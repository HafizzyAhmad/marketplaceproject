import React, { useState, useEffect, useRef } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useNavigate } from 'react-router-dom';
import Spinner from '../components/Spinner';

const CreateListing = () => {
  const [loading, setLoading] = useState(false);

  const [geolocationEnabled, setGeolocationEnabled] = useState(true);

  const [formData, setFormData] = useState({
    type: 'rent',
    name: '',
    bedroom: 1,
    bathroom: 1,
    parking: false,
    furnished: false,
    address: '',
    offer: false,
    regularPrice: 0,
    discountedPrice: 0,
    images: {},
    latitude: 0,
    longitude: 0,
  });

  const {
    type,
    name,
    bedroom,
    bathroom,
    parking,
    furnished,
    address,
    offer,
    regularPrice,
    discountedPrice,
    images,
    latitude,
    longitude,
  } = formData;

  const auth = getAuth();
  const navigate = useNavigate();
  const isMounted = useRef(true);

  useEffect(() => {
    if (isMounted) {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          setFormData({
            ...formData,
            userRef: user.uid,
          });
        } else {
          navigate('/sign-in');
        }
      });
    }

    return () => {
      isMounted.current = false;
    };
  }, [isMounted]);

  if (loading) {
    return <Spinner />;
  }

  const onSubmit = (e) => {
    e.preventDefault();
    console.log('Check Submit Data', formData);
  };

  const onMutate = (e) => {
    let boolean = null;

    if (e.target.value === 'true') {
      boolean = true;
    }

    if (e.target.value === 'false') {
      boolean = false;
    }

    // Check file upload
    if (e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        images: e.target.files,
      }));
    }

    // Check Text/bool/number
    if (!e.target.files) {
      setFormData((prevState) => ({
        ...prevState,
        [e.target.id]: boolean ?? e.target.value,
      }));
    }
  };

  return (
    <div className='profile'>
      <header>
        <p className='pageHeader'>Create Listing</p>
      </header>
      <main>
        <form onSubmit={onSubmit}>
          <label htmlFor='' className='formLabel'>
            Sell / Rent
          </label>
          <div className='formButtons'>
            <button
              type='button'
              className={type === 'sale' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='sale'
              onClick={onMutate}
            >
              Sell
            </button>
            <button
              type='button'
              className={type === 'rent' ? 'formButtonActive' : 'formButton'}
              id='type'
              value='rent'
              onClick={onMutate}
            >
              Rent
            </button>
          </div>
          <label htmlFor='' className='formLabel'>
            Name
          </label>
          <input
            type='text'
            className='formInputName'
            id='name'
            value={name}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />
          <div className='formRooms flex'>
            <div>
              <label className='formLabel'>Bedrooms</label>
              <input
                type='number'
                className='formInputSmall'
                id='bedroom'
                value={bedroom}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
            <div>
              <label className='formLabel'>Bathrooms</label>
              <input
                type='number'
                className='formInputSmall'
                id='bathroom'
                value={bathroom}
                onChange={onMutate}
                min='1'
                max='50'
                required
              />
            </div>
          </div>
          <label htmlFor='' className='formLabel'>
            Parking
          </label>
          <div className='formButtons'>
            <button
              type='button'
              className={parking ? 'formButtonActive' : 'formButton'}
              id='parking'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              type='button'
              className={
                !parking && parking !== null ? 'formButtonActive' : 'formButton'
              }
              id='parking'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label htmlFor='' className='formLabel'>
            Furnished
          </label>
          <div className='formButtons'>
            <button
              type='button'
              className={furnished ? 'formButtonActive' : 'formButton'}
              id='furnished'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              type='button'
              className={
                !furnished && furnished !== null
                  ? 'formButtonActive'
                  : 'formButton'
              }
              id='furnished'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label htmlFor='' className='formLabel'>
            Address
          </label>
          <input
            type='text'
            className='formInputName'
            id='address'
            value={address}
            onChange={onMutate}
            maxLength='32'
            minLength='10'
            required
          />
          {!geolocationEnabled && (
            <div className='formLatLng flex'>
              <div>
                <label className='formLabel'>Latitude</label>
                <input
                  type='number'
                  className='formInputSmall'
                  id='latitude'
                  value={latitude}
                  onChange={onMutate}
                  required
                />
              </div>
              <div>
                <label className='formLabel'>Longitude</label>
                <input
                  type='number'
                  className='formInputSmall'
                  id='longitude'
                  value={longitude}
                  onChange={onMutate}
                  required
                />
              </div>
            </div>
          )}
          <label htmlFor='' className='formLabel'>
            Offer
          </label>
          <div className='formButtons'>
            <button
              type='button'
              className={offer ? 'formButtonActive' : 'formButton'}
              id='offer'
              value={true}
              onClick={onMutate}
            >
              Yes
            </button>
            <button
              type='button'
              className={
                !offer && offer !== null ? 'formButtonActive' : 'formButton'
              }
              id='offer'
              value={false}
              onClick={onMutate}
            >
              No
            </button>
          </div>
          <label htmlFor='' className='formLabel'>
            Regular Price
          </label>
          <div className='formPriceDiv'>
            <input
              type='number'
              className='formInputSmall'
              id='regularPrice'
              value={regularPrice}
              onChange={onMutate}
              min='50'
              max='999999999'
              required
            />
            {type === 'rent' && <p className='formPriceText'> / Month</p>}
          </div>
          {offer && (
            <>
              <label htmlFor='' className='formLabel'>
                Discounted Price
              </label>
              <div className='formPriceDiv'>
                <input
                  type='number'
                  className='formInputSmall'
                  id='discountedPrice'
                  value={discountedPrice}
                  onChange={onMutate}
                  min='50'
                  max='999999999'
                  required={offer}
                />
              </div>
            </>
          )}
          <label htmlFor='' className='formLabel'>
            Images
          </label>
          <p className='imagesInfo'>
            The first image will be the cover (max 6).
          </p>
          <input
            type='file'
            className='formInputFile'
            id='images'
            onChange={onMutate}
            max='6'
            accept='.jpg,.png,.jpeg'
            multiple
            required
          />
          <button className='primaryButton createListingButton'>
            Create Listing
          </button>
        </form>
      </main>
    </div>
  );
};

export default CreateListing;
