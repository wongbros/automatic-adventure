import { authenticated } from './service';

const isAuthenticated = async () => {
  await authenticated();
};

export default isAuthenticated();
