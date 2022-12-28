import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { countriesApi } from "../Api/CountriesApi";
import { registerApi } from "../Api/RegisterApi";
import "./Form.css";

const Form = () => {
  const navigate = useNavigate();
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [clear, setClear] = useState(false);

  const handleChange = (event) => {
    setSearchCountries(event.target.value);
    setClear(true);
  };

  useEffect(() => {
    countriesApi()
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(searchCountries.toLowerCase())
      )
    );
  }, [searchCountries, countries]);

  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      dob: "",
      address: "",
    },
    onSubmit: async (values, { resetForm }) => {
      if (
        values.address.trim() === "" ||
        values.name.trim() === "" ||
        values.email.trim() === "" ||
        values.dob.trim() === "" ||
        searchCountries.trim() === ""
      ) {
        toast.error("All fields are mandatory");
      } else if (
        !/^([a-z\d\.-]+)@([a-z\d-]+)\.([a-z]{2,12})(\.[a-z]{2,12})?$/i.test(
          values.email
        )
      ) {
        toast.error("Invalid email format");
      } else if (values.name.length < 3 || values.name.length > 25) {
        toast.error("Name need minimum 3 or maximum 25 charachters");
      } else {
        await registerApi({
          values,
          country: searchCountries,
        })
          .then((response) => {
            console.log(response, "after submit");
            if (response.data.message === "user already exists") {
              toast.error("Email already registerd");
            } else if (response.data.message === "Invalid email") {
              toast.error("Invalid email format");
            } else if (response.data.message === "missing credentials") {
              toast.error("missing credentials");
            } else if (response.data.message === "registerd user") {
              toast.success("Success completed the registration");
              resetForm({ values: "" }, setSearchCountries(""));
            } else {
              console.log("no more");
            }
          })
          .catch((error) => {
            console.log(error);
          });
      }
    },
  });

  return (
    <>
      <div className="container">
        <div className="wrapper">
          <div className="title">Registration form</div>
          <form action="" onSubmit={formik.handleSubmit}>
            <div className="form">
              <div className="input_field">
                <label htmlFor="">Name</label>
                <input
                  type="text"
                  className="input"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="input_field">
                <label htmlFor="">Email</label>
                <input
                  type="text"
                  className="input"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="input_field">
                <label htmlFor="">Date of brth</label>
                <input
                  type="date"
                  className="input"
                  name="dob"
                  min="1980-01-01"
                  max="2012-01-01"
                  value={formik.values.dob}
                  onChange={formik.handleChange}
                />
              </div>
              <div className="input_field">
                <label htmlFor="">Country</label>
                <div className="custom_select">
                  <select
                    value={searchCountries}
                    onChange={handleChange}
                    className="input"
                    name="country"
                  >
                    {clear ? (
                      <option value="">Select another</option>
                    ) : (
                      <option value="">Select Country</option>
                    )}
                    {filteredCountries?.map((country) => (
                      <option value={country.name} key={country.alpha2Code}>
                        {country.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
              <div className="input_field">
                <label htmlFor="">Address</label>
                <textarea
                  name="address"
                  id=""
                  cols="30"
                  rows="10"
                  className="textarea"
                  value={formik.values.address}
                  onChange={formik.handleChange}
                ></textarea>
              </div>
              <div className="input_field">
                <input type="submit" className="btn" />
              </div>
              <div className="input_field">
                <button
                  onClick={() => {
                    navigate("/userList");
                  }}
                  className="btn"
                >
                  Go to lists
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Form;
