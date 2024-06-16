import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { TUser, initNewUser } from "../../Manage/ManageUser/ManageUser";
import { Container } from "../../../components/container/Container";
import { AddUser } from "../../../services/UserService/UserService";
import { v4 as uuidv4 } from "uuid";
import useNotifier from "../../../hooks/useNotifier";

export default function Register() {
  const [newUser, setNewUser] = useState<TUser>(initNewUser);
  const { notifyError, notifySuccess } = useNotifier();

  async function handleRegister() {
    try {
      const id = uuidv4();
      const addUser = { ...newUser, id: id };
      console.log(addUser);
      const response = await AddUser(addUser);
      notifySuccess("Tạo tài khoản thành công!");
    } catch (err) {
      console.log(err);
      notifyError("Tạo tài khoản thất bại!");
    }
  }
  return (
    <Box
      sx={{ maxWidth: "800px", margin: "0 auto", mt: 3, textAlign: "center" }}
    >
      <Typography
        sx={{ textAlign: "center", fontWeight: 600, fontSize: "20px" }}
      >
        Vui lòng điền đầy đủ thông tin để đăng ký
      </Typography>
      <Grid container>
        <Grid item xs={12}>
          <TextField
            variant="outlined"
            label="Email"
            type="email"
            value={newUser.email}
            required
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            sx={{ my: "10px" }}
            fullWidth
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
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
        <Grid item xs={12}>
          <TextField
            fullWidth
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
        <Grid item xs={12}>
          <TextField
            fullWidth
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
        <Grid item xs={12}>
          <TextField
            fullWidth
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
        <Grid item xs={12}>
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Gender</InputLabel>
            <Select
              value={newUser.gender}
              label="Gender"
              onChange={(e) =>
                setNewUser({ ...newUser, gender: e.target.value as string })
              }
            >
              <MenuItem value={"male"}>Nam</MenuItem>
              <MenuItem value={"female"}>Nữ</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={12}>
          <TextField
            fullWidth
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
      </Grid>
      <Button variant="contained" onClick={handleRegister}>
        Đăng ký
      </Button>
    </Box>
  );
}
