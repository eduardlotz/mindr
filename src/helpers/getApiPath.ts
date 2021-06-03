const getApiPath = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    return 'http://localhost:4000';
  } else {
    // production code
    return process.env.SERVER_URL;
  }
};

export default getApiPath;
