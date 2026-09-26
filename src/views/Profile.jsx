import {useEffect, useState} from 'react';
import {useUser} from '../hooks/apiHooks';

const Profile = () => {
  const [user, setUser] = useState(null);
  const {getUserByToken} = useUser();

  useEffect(() => {
    const getUser = async () => {
      try {
        const token = localStorage.getItem('token');

        if (!token) {
          return;
        }

        const userResult = await getUserByToken(token);
        console.log('User:', userResult);

        setUser(userResult.user);
      } catch (error) {
        console.error('Error getting user:', error);
      }
    };

    getUser();
  }, []);

  if (!user) {
    return (
      <>
        <h1>Profile</h1>
        <p>Please login to view your profile.</p>
      </>
    );
  }

  return (
    <>
      <h1>Profile</h1>

      <p>
        <strong>Username:</strong> {user.username}
      </p>

      <p>
        <strong>Email:</strong> {user.email}
      </p>
    </>
  );
};

export default Profile;
