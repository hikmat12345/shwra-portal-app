import jwtDecode from 'jwt-decode';
import { verify, sign } from 'jsonwebtoken';
//
import axios from './axios';
import { authService } from '../services';


// ----------------------------------------------------------------------

const isValidToken = (accessToken: string) => {
  if (!accessToken) {
    return false;
  }
  const decoded = jwtDecode<{ exp: number }>(accessToken);
  const currentTime = Date.now() / 1000;

  return decoded.exp > currentTime;
};

const handleTokenExpired = (exp: number) => {
   let expiredTimer;

   window.clearTimeout(expiredTimer);
   const currentTime = Date.now();
   const timeLeft = exp * 1000 - currentTime;
   expiredTimer = window.setTimeout(() => {
     refreshToken()
   }, timeLeft);
   
 };

 const setSession = (accessToken: string | null, refreshToken: string | null) => {
  if (accessToken&&refreshToken) {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('_rt', refreshToken);

    axios.defaults.headers.common.Authorization = `Bearer ${accessToken}`;
    // This function below will handle when token is expired
    const { exp } = jwtDecode<{ exp: number }>(accessToken);
    handleTokenExpired(exp);
  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('_rt');
    delete axios.defaults.headers.common.Authorization;
  }
};

const getUserSession =  (accessToken: string ) => {

  const decoded = jwtDecode<{ exp: number, uid: string }>(accessToken);

  return decoded;
};

const refreshToken = async () => {

  const accessToken = window.localStorage.getItem('accessToken');
  const userRefreshToken = window.localStorage.getItem('_rt');

  if(accessToken&&userRefreshToken){
    const  getUser = getUserSession(accessToken)

    const newSession = await authService.refreshToken({
      userId: getUser.uid,
      refreshToken: userRefreshToken
    })

    const { token, refreshToken } = newSession;

    if(token&&refreshToken) {
      setSession(token, refreshToken);
    }

  } else {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('_rt');
    delete axios.defaults.headers.common.Authorization;
  }

}


export { isValidToken, setSession, verify, sign, getUserSession, refreshToken };
