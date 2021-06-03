const getApiPath = () => {
  return process.env.SERVER_URL ? process.env.SERVER_URL : 'localhost:4000';
};

export default getApiPath;
