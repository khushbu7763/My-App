import {useLocation, useNavigate} from 'react-router';

const Single = () => {
  const {state} = useLocation();
  const navigate = useNavigate();
  const item = state?.item;

  if (!item) {
    return (
      <>
        <h2>No media selected</h2>
        <button onClick={() => navigate(-1)}>Go back</button>
      </>
    );
  }

  return (
    <div>
      <h2>{item.title}</h2>

      <p>{item.description}</p>
      <p>
        <strong>Owner:</strong> {item.username}
      </p>

      {item.media_type.includes('image') ? (
        <img src={item.filename} alt={item.title} />
      ) : (
        <video src={item.filename} controls>
          Your browser does not support the video tag.
        </video>
      )}

      <br />

      <button onClick={() => navigate(-1)}>Go back</button>
    </div>
  );
};

export default Single;
