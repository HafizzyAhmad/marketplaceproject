import React, {useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { setDoc, doc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase.config';
import {ReactComponent as ArrowRightIcon} from '../assets/svg/keyboardArrowRightIcon.svg';
import visibilityIcon from '../assets/svg/visibilityIcon.svg';

const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
  })

  //destructure the data into one name
  const {name, email, password} = formData;
  const navigate = useNavigate();

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      //to get the value from all value that we define on the formData
      [e.target.id]: e.target.value
    }))
  }

  const onSubmit = async (e) => {
    console.log('Check button');
    e.preventDefault()

    try {
      const auth = getAuth();
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      updateProfile(auth.currentUser, {displayName: name});
      // nak copy data dari formData untuk guna kat db
      const formDataCopy = { ...formData };
      // delete password sebab tak guna pun
      delete formDataCopy.password;
      // tambah timestamp user masuk db
      formDataCopy.timestamp = serverTimestamp();
      // masukkan data dalam db table users and define user uid then data dia is formDataCopy
      await setDoc(doc(db, 'users', user.uid), formDataCopy);
      navigate('/');

    } catch (error) {
      console.log('Apa error user', error);
    }
  }

  return (
    <>
      <div className='pageContainer'>
        <header>
          <p className='pageHeader'>Welcome Back!</p>
        </header>
        <main>
          <form onSubmit={onSubmit}>
            <input type="text" className='nameInput' placeholder='Name' id='name' value={name} onChange={onChange}/>
            <input type="email" className='emailInput' placeholder='Email' id='email' value={email} onChange={onChange}/>
            <div className="passwordInputDiv">
              <input type={showPassword ? 'text' : 'password'}  className='passwordInput' placeholder='Password' id='password' value={password} onChange={onChange}/>
              <img src={visibilityIcon} alt="showPassword" className="showPassword" onClick={() => setShowPassword((prevState) => !prevState)}/>
            </div>
            <Link to='/forgotpassword' className='forgotPasswordLink'>Forgot Password</Link>
            <div className="signUpBar">
              <p className='signUpText'>Sign Up</p>
              <button className='signUpButton'><ArrowRightIcon fill='white' width='34px'/></button>
            </div>
          </form>
          {/* Google OAuth Component */}
          <Link to='/sign-in' className='registerLink'>
            Sign In Instead
          </Link>
        </main>
      </div>
    </>
  );
}

export default SignUp;
