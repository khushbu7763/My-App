import {useUserContext} from '../hooks/contextHooks';

const Profile = () => {
  const {user} = useUserContext();

  return (
    <>
      <h1>Profile</h1>

      {user && (
        <>
          <p>
            <strong>Username:</strong> {user.username}
          </p>

          <p>
            <strong>Email:</strong> {user.email}
          </p>
        </>
      )}
    </>
  );
};

export default Profile;
