import axios from 'axios';

const get = async ({ url }) => {
  const response = await axios.get(url);
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

export const other = () => {
  console.log('hi');
};
