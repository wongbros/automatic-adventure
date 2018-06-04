import axios from 'axios';

const get = async ({ url }) => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    console.error(response);
  }
  console.log(response);
  return response.data;
};

const post = async ({ url, data }) => {
  const response = await axios.post(url, data);
  if (response.status !== 200) {
    console.error(response);
  }
  console.log(response);
  return response.data;
};

export const authenticated = async () => {
  const url = '/authenticated';
  const json = await get({ url });
  console.log(json);
  return json.authenticated;
};

export const getUserData = async () => {
  const url = '/user';
  const json = await get({ url });
  console.log(json);
  return json.user;
};

export const saveUserData = async ({
  email,
  eligiblePhoneNumbers,
  petName,
  room,
}) => {
  const url = '/save-user';
  const data = {
    email,
    eligiblePhoneNumbers,
    petName,
    room,
  };
  const json = await post({ url, data });
  console.log(json);
  return json.status;
};
