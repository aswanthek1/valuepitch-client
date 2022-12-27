import React, { useEffect, useState } from "react";
import {
  Box,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material/";
import axios from "axios";
import ConfirmModal from "../Modal/ConfirmModal";
import toast, { Toaster } from "react-hot-toast";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { CSVLink } from "react-csv";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [refresh, setRefreshState] = useState(false);
  const [open, setOpen] = React.useState(false);
  const [editField, setEditField] = useState({});
  const [countries, setCountries] = useState([]);
  const [searchCountries, setSearchCountries] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [searchTable, setSearchTable] = useState("");
  const [searchData, setSearchData] = useState([]);

  const handleOpen = () => setOpen(true);

  const editDetails = (userId) => {
    setEditField({});
    console.log("editing details", editField);
    try {
      axios
        .patch("http://localhost:4000/user/editDetails", editField)
        .then((response) => {
          console.log("delete response", response);
          if (response.data.message === "updated") {
            setRefreshState(!refresh);
            toast.success("Details updated");
          }
        });
    } catch (error) {}
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/user/users")
      .then((response) => {
        console.log("response of users", response);
        setUsers(response.data);
      })
      .catch((error) => console.log("error found", error));
  }, [refresh]);

  useEffect(() => {
    setFilteredCountries(
      countries.filter((country) =>
        country.name.toLowerCase().includes(searchCountries.toLowerCase())
      )
    );
  }, [searchCountries, countries]);

  useEffect(() => {
    axios
      .get("https://restcountries.com/v2/all")
      .then((response) => {
        setCountries(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (searchTable.length > 0) {
      setSearchData(
        users?.filter((item) => {
          return (
            item.name.toLowerCase().includes(searchTable.toLowerCase()) ||
            item.email.toLowerCase().includes(searchTable.toLowerCase()) ||
            item.country.toLowerCase().includes(searchTable.toLowerCase())
          );
        })
      );
    } else if (searchTable.length === 0) {
      setSearchData(users);
    }
  }, [searchTable, users]);

  const headers = [
    { label: "Name", key: "name" },
    { label: "Email", key: "email" },
    { label: "Date Of Birth", key: "dob" },
    { label: "Country", key: "country" },
    { label: "Address", key: "address" },
  ];

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
      }}
    >
      <Typography
        variant="h5"
        sx={{ marginTop: "50px", fontWeight: 700, color: "brown" }}
      >
        Users List
      </Typography>
      <Box
        sx={{ width: "80%", display: "flex", justifyContent: "space-between" }}
      >
        <CSVLink
          data={users}
          headers={headers}
          style={{
            marginTop: "30px",
            border: "2px solid aquamarine",
            backgroundColor: "aquamarine",
            padding: "10px",
            borderRadius: "4px",
            color: "black",
            fontWeight: 600,
          }}
        >
          Export as CSV
        </CSVLink>
        <TextField
          placeholder="Search..."
          size="small"
          sx={{ marginTop: "30px" }}
          value={searchTable}
          onChange={(event) => setSearchTable(event.target.value)}
        />
      </Box>

      <TableContainer
        component={Paper}
        sx={{ marginTop: "80px", maxWidth: "80%" }}
      >
        <Table sx={{ minWidth: 500 }} aria-label="simple table">
          <TableHead sx={{ backgroundColor: "aquamarine", color: "white" }}>
            <TableRow>
              <TableCell align="center">
                <b>No</b>
              </TableCell>
              <TableCell align="center">
                <b>Name</b>
              </TableCell>
              <TableCell align="center">
                <b>Email</b>
              </TableCell>
              <TableCell align="center">
                <b>Date Of Birth</b>
              </TableCell>
              <TableCell align="center">
                <b>Country</b>
              </TableCell>
              <TableCell align="center">
                <b>Address</b>
              </TableCell>
              <TableCell align="center">
                <b>Edit</b>
              </TableCell>
              <TableCell align="center">
                <b>Delete</b>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {searchData.map((user, index) => (
              <>
                <TableRow
                  key={user._id}
                  sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                >
                  <TableCell align="center">{index + 1}</TableCell>
                  {editField._id === user._id ? (
                    <TableCell align="center">
                      <input
                        style={{ height: "40px", borderRadius: "6px" }}
                        type="text"
                        value={editField.name}
                        onChange={(event) => {
                          editField.name = event.target.value;
                          setEditField({ ...editField });
                        }}
                        name="name"
                      />
                    </TableCell>
                  ) : (
                    <TableCell align="center">{user.name}</TableCell>
                  )}

                  {editField._id === user._id ? (
                    <TableCell>
                      <input
                        style={{ height: "40px", borderRadius: "6px" }}
                        type="text"
                        value={editField.email}
                        onChange={(event) => {
                          editField.email = event.target.value;
                          setEditField({ ...editField });
                        }}
                        name="email"
                      />
                    </TableCell>
                  ) : (
                    <TableCell align="center">{user.email}</TableCell>
                  )}

                  {editField._id === user._id ? (
                    <TableCell>
                      <input
                        style={{ height: "40px", borderRadius: "6px" }}
                        type="date"
                        min="1980-01-01"
                        max="2012-01-01"
                        value={editField.dob}
                        onChange={(event) => {
                          editField.dob = event.target.value;
                          setEditField({ ...editField });
                        }}
                        name="dob"
                      />
                    </TableCell>
                  ) : (
                    <TableCell align="center">{user.dob}</TableCell>
                  )}

                  {editField._id === user._id ? (
                    <TableCell>
                      <select
                        style={{ height: "40px", borderRadius: "6px" }}
                        type="text"
                        value={editField.country}
                        onChange={(event) => {
                          editField.country = event.target.value;
                          setEditField({ ...editField });
                        }}
                        name="country"
                      >
                        {filteredCountries?.map((country) => (
                          <option value={country.name} key={country.alpha2Code}>
                            {country.name}
                          </option>
                        ))}
                      </select>
                    </TableCell>
                  ) : (
                    <TableCell align="center">{user.country}</TableCell>
                  )}

                  {editField._id === user._id ? (
                    <TableCell>
                      <input
                        style={{ height: "40px", borderRadius: "6px" }}
                        type="text"
                        value={editField.address}
                        onChange={(event) => {
                          editField.address = event.target.value;
                          setEditField({ ...editField });
                        }}
                        name="address"
                      />
                    </TableCell>
                  ) : (
                    <TableCell align="center">{user.address}</TableCell>
                  )}

                  {editField._id === user._id ? (
                    <TableCell
                      align="center"
                      onClick={() => {
                        editDetails(user._id);
                      }}
                    >
                      <span
                        style={{
                          padding: "10px",
                          backgroundColor: "green",
                          borderRadius: "6px",
                        }}
                      >
                        <b>SAVE</b>
                      </span>
                    </TableCell>
                  ) : (
                    <TableCell
                      sx={{ cursor: "pointer" }}
                      align="center"
                      onClick={
                        () => setEditField(user)
                        //  setEditingDetails(user)
                      }
                    >
                      <EditIcon />
                    </TableCell>
                  )}

                  <TableCell
                    sx={{ cursor: "pointer" }}
                    align="center"
                    onClick={() => {
                      handleOpen();
                    }}
                  >
                    <DeleteIcon />
                  </TableCell>

                  {open ? (
                    <ConfirmModal
                      open={open}
                      setOpen={setOpen}
                      userId={user._id}
                      refresh={refresh}
                      setRefreshState={setRefreshState}
                    />
                  ) : (
                    false
                  )}
                </TableRow>
              </>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Toaster />
    </Box>
  );
};

export default UserTable;
