import { useEffect, useState } from 'react';
import CONFIG from '../config';
import useQuery from '../api/useQuery';

/**
 * useAuth React hook
 *
 * @param force - if true, the user will be redirected to connect
 * @return isLogged - true if user is logged
 * @return user - the user profile
 * @return webId - the webId of the user
 * @return login - function to call if we want to force login
 */
const useAuth = ({ force } = { force: false }) => {
  const [token, setToken] = useState(null);

  // We use the cacheOnly option to avoid the query to be made several times
  // The initial query is made once on the UserProvider component
  const { data: user } = useQuery(`${CONFIG.MIDDLEWARE_URL}me`, { cacheOnly: true });

  const login = () => {
    window.location = `${CONFIG.MIDDLEWARE_URL}auth?redirectUrl=` + encodeURI(window.location.href);
  };

  useEffect(() => {
    const url = new URL(window.location);
    if (url.searchParams.has('token')) {
      setToken(url.searchParams.get('token'));
      localStorage.setItem('token', url.searchParams.get('token'));
      url.searchParams.delete('token');
      window.location = url.toString();
    } else {
      if (localStorage.getItem('token')) {
        setToken(localStorage.getItem('token'));
      } else if (force) {
        login();
      }
    }
  }, [force]);

  return { isLogged: !!token, user, webId: user ? user['@id'] : null, login };
};

export default useAuth;
