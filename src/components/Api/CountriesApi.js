import axios from "axios";

export const countriesApi = () => {
  try {
    return axios.get("https://restcountries.com/v2/all");
  } catch (error) {
    console.log(error);
  }
};
