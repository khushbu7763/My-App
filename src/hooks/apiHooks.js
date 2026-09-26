import {useEffect, useState} from 'react';
import {fetchData} from '../utils/fetchData';

const useMedia = () => {
  const [mediaArray, setMediaArray] = useState([]);

  useEffect(() => {
    const getMedia = async () => {
      try {
        const mediaUrl = import.meta.env.VITE_MEDIA_API;
        const authUrl = import.meta.env.VITE_AUTH_API;

        const media = await fetchData(`${mediaUrl}/media`);

        const newArray = await Promise.all(
          media.map(async (item) => {
            const user = await fetchData(`${authUrl}/users/${item.user_id}`);

            return {
              ...item,
              username: user.username,
            };
          }),
        );

        setMediaArray(newArray);
      } catch (error) {
        console.error('Error fetching media:', error);
      }
    };

    getMedia();
  }, []);

  return {mediaArray};
};

const useAuthentication = () => {
  const postLogin = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const loginResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/auth/login',
      fetchOptions,
    );

    return loginResult;
  };

  return {postLogin};
};

const useUser = () => {
  const postUser = async (inputs) => {
    const fetchOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(inputs),
    };

    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users',
      fetchOptions,
    );

    return userResult;
  };

  const getUserByToken = async (token) => {
    const fetchOptions = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    const userResult = await fetchData(
      import.meta.env.VITE_AUTH_API + '/users/token',
      fetchOptions,
    );

    return userResult;
  };

  return {postUser, getUserByToken};
};

export {useMedia, useAuthentication, useUser};
