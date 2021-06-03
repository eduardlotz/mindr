import axios from 'axios';
import getApiPath from './getApiPath';
import { setLocalStorage } from './localstorage';

const handleAuth = async (data, successCallback, errCallback) => {
  try {
    const {
      data: { token },
    } = await axios.post(getApiPath() + 'api/auth', data);
    setLocalStorage('token', token);
    successCallback();
  } catch (err) {
    let errMessage;

    if (err.response.status) {
      errMessage = err.response.data.message;
    } else {
      errMessage = 'Something went wrong, please try again later';
    }

    errCallback(errMessage);
  }
};

export default handleAuth;
