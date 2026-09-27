import {useState} from 'react';
import {useNavigate} from 'react-router';
import useForm from '../hooks/formHooks';
import {useFile, useMedia} from '../hooks/apiHooks';

const Upload = () => {
  const [file, setFile] = useState(null);
  const navigate = useNavigate();

  const {postFile} = useFile();
  const {postMedia} = useMedia();

  const initValues = {
    title: '',
    description: '',
  };

  const doUpload = async () => {
    try {
      const token = localStorage.getItem('token');

      if (!token || !file) {
        return;
      }

      const fileResult = await postFile(file, token);
      console.log('File result:', fileResult);

      const mediaResult = await postMedia(fileResult.data, inputs, token);

      console.log('Media result:', mediaResult);

      navigate('/');
    } catch (e) {
      console.log(e.message);
    }
  };

  const {inputs, handleInputChange, handleSubmit} = useForm(
    doUpload,
    initValues,
  );

  const handleFileChange = (evt) => {
    if (evt.target.files && evt.target.files[0]) {
      console.log(evt.target.files[0]);
      setFile(evt.target.files[0]);
    }
  };

  return (
    <>
      <h1>Upload</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title</label>
          <input
            name="title"
            type="text"
            id="title"
            value={inputs.title}
            onChange={handleInputChange}
          />
        </div>

        <div>
          <label htmlFor="description">Description</label>
          <textarea
            name="description"
            rows={5}
            id="description"
            value={inputs.description}
            onChange={handleInputChange}
          ></textarea>
        </div>

        <div>
          <label htmlFor="file">File</label>
          <input
            name="file"
            type="file"
            id="file"
            accept="image/*, video/*"
            onChange={handleFileChange}
          />
        </div>

        {file && file.type.startsWith('image/') && (
          <img src={URL.createObjectURL(file)} alt="preview" width="200" />
        )}

        <button type="submit" disabled={!file || inputs.title.length <= 3}>
          Upload
        </button>
      </form>
    </>
  );
};

export default Upload;
