import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PrivateRoute from './components/PrivateRoute';
import Explore from './pages/Explore';
import Category from './pages/Category';
import Contact from './pages/Contact';
import EditListing from './pages/EditListing';
import ForgotPassword from './pages/ForgotPassword';
import Listing from './pages/Listing';
import Offers from './pages/Offers';
import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import CreateListing from './pages/CreateListing';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore />} />
          <Route path='/forgotpassword' element={<ForgotPassword />} />
          <Route path='/offers' element={<Offers />} />
          <Route path='/category/:categoryName' element={<Category />} />
          <Route
            path='/category/:categoryName/:listingId'
            element={<Listing />}
          />
          <Route path='/contact/:landlordId' element={<Contact />} />
          <Route path='/profile' element={<PrivateRoute />}>
            <Route path='/profile' element={<Profile />} />
          </Route>
          <Route path='/sign-in' element={<SignIn />} />
          <Route path='/sign-up' element={<SignUp />} />
          <Route path='/create-listing' element={<CreateListing />} />
          <Route path='/edit-listing/:listingId' element={<EditListing />} />
        </Routes>
        <Navbar />
      </Router>
      <ToastContainer />
      {/* <h1>Test APp</h1> */}
    </>
  );
};

export default App;
