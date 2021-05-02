import axios from 'axios';
import getApiPath from './getApiPath';

const handleAuth = async (data, successCallback, errCallback) => {
  try {
    await axios.post(getApiPath() + '/api/auth', data, {
      withCredentials: true,
    });
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
