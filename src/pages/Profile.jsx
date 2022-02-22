import { getAuth } from 'firebase/auth';
import React, { useEffect, useState } from 'react';

const Profile = () => {
  const auth = getAuth();
  const [user, setUser] = useState(null);

  useEffect(() => {
    setUser(auth.currentUser);
  }, [])

  return user ? 
      <h1>{user.displayName}</h1> : 
      <h1>Not logged in</h1>
}

export default Profile;
