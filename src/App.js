import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Explore from './pages/Explore';
import ForgotPassword from './pages/ForgotPassword';
import Offers from './pages/Offers';
// import Profile from './pages/Profile';
import SignIn from './pages/SignIn';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';

const App = () => {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Explore/>} />
          <Route path='/forgotpassword' element={<ForgotPassword/>} />
          <Route path='/offers' element={<Offers/>} />
          <Route path='/profile' element={<SignIn/>} />
          <Route path='/sign-in' element={<SignIn/>} />
          <Route path='/sign-up' element={<SignUp/>} />
        </Routes>
        <Navbar/>
      </Router>
      {/* <h1>Test APp</h1> */}
    </>
  );
}

export default App;
