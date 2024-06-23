import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  AddUser,
  DeleteUser,
  EditUser,
  getUsers,
} from "../../../services/UserService/UserService";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import CommonUtils from "../../../utils/CommonUtils";

export type TUser = {
  id: string | null;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  positionId: string;
  roleId: string;
  address: string;
  image: string;
  previewImage: string;
};

export const initNewUser: TUser = {
  id: null,
  email: "",
  password: "",
  firstName: "",
  lastName: "",
  gender: "",
  phoneNumber: "",
  positionId: "",
  roleId: "",
  address: "",
  image: "",
  previewImage: "",
};

export default function ManageUser() {
  const [users, setUsers] = useState<TUser[]>([]);
  const [show, setShow] = useState<boolean>(false);
  const [newUser, setNewUser] = useState<TUser>(initNewUser);
  const [editing, setEdit] = useState<boolean>(false);
  // const [allUsers,setAllUsers] = useState()

  const handleClose = () => {
    setShow(false);
  };
  const handleShow = () => {
    setShow(true);
    // if (editing == false) {
    //   setNewUser(initCurrentUser);
    // }
  };

  const handleChangeImage = async (event: any) => {
    const data = event.target.files;
    const file = data[0];
    console.log(file);
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      setNewUser({
        ...newUser,
        image: base64 as string,
        previewImage: objectUrl,
      });
      // setPreviewImage(objectUrl);
    }
  };

  async function getDataUsers() {
    try {
      const response = await getUsers("ALL");
      console.log(response);
      setUsers(response.data.users);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleAddUser() {
    setShow(true);
    const id = uuidv4();
    const addUser = { ...newUser, id: id };
    console.log(addUser);

    try {
      const response = await AddUser(addUser);
      setUsers((prev) => [...prev, addUser]);
      setNewUser(initNewUser);

      setShow(false);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleUpdateUser() {
    setEdit(false);
    let id = newUser.id;
    try {
      const response = await EditUser(newUser);
      setUsers(users.map((i) => (i.id === id ? newUser : i)));
    } catch (err) {
      console.log(err);
    }

    setNewUser(initNewUser);

    setShow(false);
  }

  async function handleDeleteUser(currentUser: TUser) {
    try {
      const response = await DeleteUser(currentUser.id as string);
      setUsers(users.filter((i) => i.id !== currentUser.id));
    } catch (err) {
      console.log(err);
    }
  }

  // const onFormSubmit = (newUser: any) => {
  //   // const idFake = uuidv4()
  //   // console.log('idrandom:',idFake)
  //   const id = uuidv4();
  //   const addUser = { ...newUser, id };
  //   console.log("newUser", newUser);
  //   console.log("addUser", addUser);
  //   setUsers((prev) => {
  //     return [...prev, addUser];
  //   });
  // };

  const onEdit = (userEdit: any) => {
    setEdit(true);
    if (editing == true) {
      setNewUser({ ...userEdit, userEdit });
      handleShow();
      console.log("userEdit", userEdit);
    }
  };

  // const onSubmit = (newUser: any) => {
  //   if (editing === true) {
  //     handleUpdateUser();
  //   } else {
  //     onFormSubmit(newUser);
  //   }
  //   // console.log('newUser',newUser)
  // };

  useEffect(() => {
    getDataUsers();
  }, []);
  return (
    <Box>
      <Box>
        <Typography
          sx={{ textAlign: "center", fontWeight: 600, fontSize: "20px", mb: 3 }}
        >
          User Data
        </Typography>
        <Button variant="contained" onClick={handleShow} sx={{ mb: 3 }}>
          Add User
        </Button>
      </Box>
      <Box>
        <Grid container>
          <Grid item xs={0.4}>
            #
          </Grid>
          <Grid item xs={2.4}>
            Email
          </Grid>
          <Grid item xs={1.2}>
            First Name
          </Grid>
          <Grid item xs={1.2}>
            Last Name
          </Grid>
          <Grid item xs={1.2}>
            Phone Number
          </Grid>
          <Grid item xs={1.2}>
            Gender
          </Grid>
          <Grid item xs={1.2}>
            Address
          </Grid>
          <Grid item xs={1}>
            Position ID
          </Grid>
          <Grid item xs={1}>
            Role ID
          </Grid>
          <Grid item xs={1.2}>
            Actions
          </Grid>
        </Grid>
        <DividerCustom />
        <Box>
          {users.length > 0 ? (
            users.map((user, index) => (
              <>
                <Grid container key={user.id}>
                  <Grid item xs={0.4}>
                    {index + 1}
                  </Grid>
                  <Grid item xs={2.4}>
                    {user.email}
                  </Grid>
                  <Grid item xs={1.2}>
                    {user.firstName}
                  </Grid>
                  <Grid item xs={1.2}>
                    {user.lastName}
                  </Grid>
                  <Grid item xs={1.2}>
                    {user.phoneNumber}
                  </Grid>
                  <Grid item xs={1.2}>
                    {user.gender}
                  </Grid>
                  <Grid item xs={1.2}>
                    {user.address}
                  </Grid>
                  <Grid item xs={1}>
                    {user.positionId}
                  </Grid>
                  <Grid item xs={1}>
                    {user.roleId}
                  </Grid>
                  <Grid item xs={1.2}>
                    <Button variant="outlined" onClick={() => onEdit(user)}>
                      Edit
                    </Button>

                    <Button
                      variant="outlined"
                      title="Delete user"
                      onClick={() => handleDeleteUser(user)}
                    >
                      Delete
                    </Button>
                  </Grid>
                </Grid>
                <DividerCustom />
              </>
            ))
          ) : (
            <Box>
              <Typography>No users found.</Typography>
            </Box>
          )}
        </Box>
      </Box>
      <Dialog open={show} onClose={handleClose}>
        <Box
          // onSubmit={(e) => {
          //   e.preventDefault();
          //   onSubmit(newUser);
          // }}
          sx={{ px: 3 }}
        >
          <DialogTitle
            sx={{ bgcolor: "rgb(237, 237, 237)", padding: "12px 20px" }}
          >
            {editing == true ? (
              <Typography sx={{ textAlign: "center" }}>Edit User</Typography>
            ) : (
              <Typography sx={{ textAlign: "center" }}>Add User</Typography>
            )}
          </DialogTitle>
          <Grid container>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Email"
                type="email"
                value={newUser.email}
                required
                onChange={(e) =>
                  setNewUser({ ...newUser, email: e.target.value })
                }
                sx={{ my: "10px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Password"
                type="text"
                value={newUser.password}
                required
                onChange={(e) =>
                  setNewUser({ ...newUser, password: e.target.value })
                }
                sx={{ my: "10px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="First Name"
                type="text"
                value={newUser.firstName}
                required
                onChange={(e) =>
                  setNewUser({ ...newUser, firstName: e.target.value })
                }
                sx={{ my: "10px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Last Name"
                type="text"
                value={newUser.lastName}
                required
                onChange={(e) =>
                  setNewUser({ ...newUser, lastName: e.target.value })
                }
                sx={{ my: "10px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Phone Number"
                type="number"
                value={newUser.phoneNumber}
                required
                onChange={(e) =>
                  setNewUser({ ...newUser, phoneNumber: e.target.value })
                }
                sx={{ my: "10px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Gender</InputLabel>
                <Select
                  value={newUser.gender}
                  label="Gender"
                  onChange={(e) =>
                    setNewUser({ ...newUser, gender: e.target.value as string })
                  }
                >
                  <MenuItem value={"Nam"}>Nam</MenuItem>
                  <MenuItem value={"Nữ"}>Nữ</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <TextField
                variant="outlined"
                label="Address"
                type="text"
                value={newUser.address}
                onChange={(e) =>
                  setNewUser({ ...newUser, address: e.target.value })
                }
                sx={{ mb: "10px" }}
              />
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth sx={{ mb: 2 }}>
                <InputLabel>Position ID</InputLabel>
                <Select
                  value={newUser.positionId}
                  label="Position ID"
                  onChange={(e) =>
                    setNewUser({
                      ...newUser,
                      positionId: e.target.value as string,
                    })
                  }
                >
                  <MenuItem value={"PO"}>P0</MenuItem>
                  <MenuItem value={"P1"}>P1</MenuItem>
                  <MenuItem value={"P2"}>P2</MenuItem>
                  <MenuItem value={"P3"}>P3</MenuItem>
                  <MenuItem value={"P4"}>P4</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Grid item xs={6}>
              <FormControl fullWidth>
                <InputLabel>Role ID</InputLabel>
                <Select
                  value={newUser.roleId}
                  label="Role ID"
                  onChange={(e) =>
                    setNewUser({ ...newUser, roleId: e.target.value as string })
                  }
                >
                  <MenuItem value={"admin"}>Admin</MenuItem>
                  <MenuItem value={"doctor"}>Doctor</MenuItem>
                  <MenuItem value={"patient"}>Patient</MenuItem>
                </Select>
              </FormControl>
            </Grid>
            <Box>
              <Typography>Tải lên ảnh đại diện</Typography>
              <TextField
                type="file"
                onChange={(e) => {
                  handleChangeImage(e);
                }}
              ></TextField>
              <Box
                sx={{
                  backgroundImage: `url(${newUser.previewImage})`,
                  backgroundRepeat: "no-repeat",

                  width: "100%",
                  height: "200px",
                }}
              ></Box>
            </Box>
          </Grid>
          <DialogActions>
            <Button onClick={handleClose} variant="contained" color="warning">
              Close
            </Button>
            {editing === true ? (
              <Button
                color="success"
                onClick={() => handleUpdateUser()}
                variant="contained"
              >
                Update
              </Button>
            ) : (
              <Button
                color="success"
                onClick={handleAddUser}
                variant="contained"
              >
                Add
              </Button>
            )}
          </DialogActions>
        </Box>
      </Dialog>
    </Box>
  );
}
