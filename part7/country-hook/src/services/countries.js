import axios from "axios";

const urlPrefix = "https://restcountries.com/v3.1/name";
const urlSuffix = "?fullText=true";

const get = async (name) => {
  const response = await axios.get(`${urlPrefix}/${name}${urlSuffix}`);
  return response.data;
};

export default { get };
