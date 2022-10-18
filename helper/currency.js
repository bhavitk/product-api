import axios from "axios";

const convert = (value, to) => {
  return axios
    .get(
      `https://v6.exchangerate-api.com/v6/${process.env.EXCHANGE_API_KEY}/pair/USD/${to}/${value}`
    )
    .then(({ data }) => {
      return data;
    })
    .catch((err) => {
      return false;
    });
};

export default {
  convert,
};
