import axios from "axios";

export const EditDetails = (editField) => {
  try {
    return axios.patch("http://localhost:4000/user/editDetails", editField);
  } catch (error) {
    console.log(error);
  }
};

export const getUsers = () => {
  try {
    return axios.get('http://localhost:4000/user/users'); 
  } catch (error) {
    console.log(error);
  }
};

export const deleteFormData = (userId) => {
  try {
    return axios.delete("http://localhost:4000/user/deleteDetails", {
      data: { userId },
    });
  } catch (error) {
    console.log(error);
  }
};
