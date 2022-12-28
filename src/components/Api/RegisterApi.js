import axios from "axios";

export const registerApi = ({ values, country }) => {
  try {
    return axios.post("http://localhost:4000/user/register", {
      values,
      country,
    });
  } catch (error) {
    console.log(error);
  }
};
