import {
  Box,
  Button,
  DialogContent,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import { useModalContext } from "../../../context/modal-contex/modal-context";
import CommonUtils from "../../../utils/CommonUtils";
import useNotifier from "../../../hooks/useNotifier";
import { EditUser } from "../../../services/UserService/UserService";
import { TUser } from "../../Manage/ManageUser/ManageUser";
import { useLoginContext } from "../../../context/login-context";
import { EditProfile } from "../../../services/PatientService/PatientService";

export type TEditProfile = {
  id: string | null;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  image: string;
  previewImage: string;
};

const initEditUser: TEditProfile = {
  address: "",
  firstName: "",
  gender: "",
  id: "",
  image: "",
  lastName: "",
  phoneNumber: "",
  previewImage: "",
};

export default function ModalEditProfile() {
  const { closeModal } = useModalContext();
  const [editedUser, setEditedUser] = useState<TEditProfile>(initEditUser);
  const { notifyError, notifySuccess } = useNotifier();
  const { dataLogin, getDataUser } = useLoginContext();

  const handleChangeImage = async (event: any) => {
    const data = event.target.files;
    const file = data[0];
    console.log(file);
    if (file) {
      const base64 = await CommonUtils.getBase64(file);
      const objectUrl = URL.createObjectURL(file);
      setEditedUser({
        ...editedUser,
        image: base64 as string,
        previewImage: objectUrl,
      });
      // setPreviewImage(objectUrl);
    }
  };

  async function handleUpdateProfile() {
    // let id = editedUser.id;
    const editProfile = { ...editedUser, id: dataLogin.idUser };
    try {
      console.log(editedUser);
      const response = await EditProfile(editProfile);
      console.log(response);
      if (response.data.errMessage == "Missing parameter") {
        notifyError("Vui lòng điền đầy đủ thông tin!");
      } else {
        getDataUser();
        closeModal();
        notifySuccess("Cập nhật thông tin thành công!");
      }
    } catch (err) {
      notifyError("Cập nhật thông tin thất bại!");
      console.log(err);
    }
  }

  return (
    <DialogContent sx={{ px: { xs: 2, xsm: 5 }, textAlign: "center" }}>
      <Box>
        <Grid container>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Họ"
              type="text"
              value={editedUser.firstName}
              required
              onChange={(e) =>
                setEditedUser({ ...editedUser, firstName: e.target.value })
              }
              sx={{ my: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Tên"
              type="text"
              value={editedUser.lastName}
              required
              onChange={(e) =>
                setEditedUser({ ...editedUser, lastName: e.target.value })
              }
              sx={{ my: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              variant="outlined"
              label="Số điện thoại"
              type="number"
              value={editedUser.phoneNumber}
              required
              onChange={(e) =>
                setEditedUser({ ...editedUser, phoneNumber: e.target.value })
              }
              sx={{ my: "10px" }}
            />
          </Grid>
          <Grid item xs={6}>
            <FormControl sx={{ mb: 2, width: "230px" }}>
              <InputLabel>Giới tính</InputLabel>
              <Select
                value={editedUser.gender}
                label="Gender"
                onChange={(e) =>
                  setEditedUser({
                    ...editedUser,
                    gender: e.target.value as string,
                  })
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
              label="Địa chỉ"
              type="text"
              value={editedUser.address}
              onChange={(e) =>
                setEditedUser({ ...editedUser, address: e.target.value })
              }
              sx={{ mb: "10px" }}
            />
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
                backgroundImage: `url(${editedUser.previewImage})`,
                backgroundRepeat: "no-repeat",

                width: "100%",
                height: "200px",
              }}
            ></Box>
          </Box>
        </Grid>
      </Box>
      <Box sx={{ mt: 2 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ width: "150px", mr: 5 }}
          onClick={handleUpdateProfile}
        >
          Xác nhận
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ width: "150px" }}
          onClick={closeModal}
        >
          Huỷ
        </Button>
      </Box>
    </DialogContent>
  );
}
