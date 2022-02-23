import { useLocation, useNavigate } from "react-router-dom";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { doc, setDoc, getDoc, serverTimestamp } from 'firebase/firestore';
import { db } from "../firebase.config";
import googleIcon from '../assets/svg/googleIcon.svg';
import { toast } from "react-toastify";

const OAuth = () =>  {

  const navigate = useNavigate();
  const location = useLocation();

  const onGoogleClick = async () => {

    try {
      const auth = getAuth();
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user

      // Check for user in firestore
      const docRef = doc(db, 'users', user.uid);
      const docSnap = await getDoc(docRef);

      // If user doesnt exist boleh masukkan dalam firestore
      if (docSnap.exists()) {
        await setDoc(doc(db, 'users', user.uid), {
          name: user.displayName,
          email: user.email,
          timestamp: serverTimestamp(),
        })
        navigate('/');
      }

    } catch (error) {
      toast.error('Could not authorize with google');
    }
  }


  return (
    <div className="socialLogin">
      <p>Sign {location.pathname === '/sign-up' ? 'up' : 'in'} with</p>
      <button className="socialIconDiv" onClick={onGoogleClick}>
        <img className='socialIconImg' src={googleIcon} alt="google" />
      </button>
    </div>
  )
}

export default OAuth;