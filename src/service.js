import axios from 'axios';

const handleError = (error) => {
  console.error(error);
  alert('Oops! There seems to be a problem...');
  document.location.reload();
};

const get = async ({ url }) => {
  const response = await axios.get(url).catch(handleError);
  return response.data;
};

const post = async ({ url, data }) => {
  const response = await axios.post(url, data).catch(handleError);
  return response.data;
};

export const authenticated = async () => {
  const url = '/authenticated';
  const json = await get({ url });
  return json.authenticated;
};

export const getUserData = async () => {
  const url = '/user';
  const json = await get({ url });
  return json.user;
};

export const saveUserData = async (email, eligiblePhoneNumbers) => {
  const url = '/save-user';
  const data = {
    email,
    eligiblePhoneNumbers,
  };
  const json = await post({ url, data });
  return json.status;
};
