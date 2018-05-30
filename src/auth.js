import { authenticated } from './service';

const isAuthenticated = async () => {
  const result = await authenticated();
  return result;
};

export default isAuthenticated;
