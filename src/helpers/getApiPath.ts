const getApiPath = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev code
    return 'http://localhost:4000';
  } else {
    // production code
    return 'https://mindr-server.herokuapp.com/';
  }
};

export default getApiPath;
