import { getAccessToken } from '../utils/cookes';
export const Home = () => {
  
  const token = getAccessToken();
  
  console.log('App rendered, token:', token, 'current path:', window.location.pathname);
  return <div>Home</div>;
}