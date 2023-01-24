import axios from 'axios';
// ----------------------------------------------------------------------

let baseURL = 'https://shwraapidevops.azurewebsites.net/api/';

// if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//   baseURL = "https://shwra-proxy.menoufiaevent.com/api/";
// }

const axiosInstance = axios.create({
  // baseURL: 'https://shwraapidevops.azurewebsites.net/api/',
  baseURL,
  //baseURL: 'http://127.0.0.1:8787/api/',
  withCredentials: false
});

//axiosInstance.defaults.headers.common['Access-Control-Allow-Origin'] = '*';

//axios.defaults.headers.post['Content-Type'] ='application/x-www-form-urlencoded';
export const requestHandler = async (request: any) => {
  request.headers['Accept-Language'] = 'ar'
  return request;
};
axiosInstance.interceptors.request.use((request) => requestHandler(request));
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

export default axiosInstance;
