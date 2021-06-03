const getApiPath = () => {
  return process.env.API_URL ? process.env.API_URL : 'localhost:4000';
};

export default getApiPath;
