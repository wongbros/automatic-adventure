import axios from 'axios';

const get = async ({ url }) => {
  const response = await axios.get(url);
  if (response.status !== 200) {
    console.error(response);
  }
  return response.data;
};

export const authenticated = async () => {
  const url = `${process.env.REACT_APP_SERVER_BASE}/authenticated`;
  const json = await get({ url });
  return json.authenticated;
};

export const other = () => {
  console.log('hi');
};
