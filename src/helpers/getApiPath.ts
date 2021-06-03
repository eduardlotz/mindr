const getApiPath = () => {
  if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    // dev api url
    return 'http://localhost:4000';
  } else {
    // production api url
    return 'https://mindr-server.herokuapp.com/';
  }
};

export default getApiPath;
