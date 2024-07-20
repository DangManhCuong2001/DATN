import { Box, Button, DialogContent, TextField } from "@mui/material";
import React, { useState } from "react";
import { useModalContext } from "../../../context/modal-contex/modal-context";
import useNotifier from "../../../hooks/useNotifier";
import { EditPassword } from "../../../services/PatientService/PatientService";
import { useLoginContext } from "../../../context/login-context";

export type TNewPassword = {
  oldPassword: string;
  newPassword: string;
  reNewPassword: string;
};
export default function ModalEditPassword() {
  const { closeModal } = useModalContext();
  const [editedPassword, setEditedPassword] = useState<TNewPassword>({
    newPassword: "",
    oldPassword: "",
    reNewPassword: "",
  });
  const { notifyError, notifySuccess } = useNotifier();
  const { dataLogin } = useLoginContext();

  async function handleEditPassword() {
    try {
      const password2 = { ...editedPassword, id: dataLogin.idUser };
      const response = await EditPassword(password2);
      console.log(response);
      if (response.data.errMessage == "Missing parameter") {
        notifyError("Vui lòng điền đầy đủ thông tin!");
      }
      if (response.data.errMessage == "incorrect password") {
        notifyError("Mật khẩu cũ không chính xác!");
      }

      if (response.data.errMessage == "incorrect reNewPassword") {
        notifyError("Nhập lại mật khẩu mới không chính xác!");
      }
      if (response.data.message == "Update success") {
        closeModal();
        notifySuccess("Thay đổi mật khẩu thành công!");
      }
    } catch (err) {
      console.log(err);
      notifyError("Thay đổi mật khẩu thất bại!");
    }
  }
  return (
    <DialogContent sx={{ px: { xs: 2, xsm: 5 }, textAlign: "center" }}>
      <Box>
        <TextField
          variant="outlined"
          label="Mật khẩu cũ"
          type="password"
          value={editedPassword.oldPassword}
          required
          onChange={(e) =>
            setEditedPassword({
              ...editedPassword,
              oldPassword: e.target.value,
            })
          }
          sx={{ my: "10px" }}
        />
        <TextField
          variant="outlined"
          label="Mật khẩu mới"
          type="password"
          value={editedPassword.newPassword}
          required
          onChange={(e) =>
            setEditedPassword({
              ...editedPassword,
              newPassword: e.target.value,
            })
          }
          sx={{ my: "10px" }}
        />
        <TextField
          variant="outlined"
          label="Nhập lại mật khẩu mới"
          type="password"
          value={editedPassword.reNewPassword}
          required
          onChange={(e) =>
            setEditedPassword({
              ...editedPassword,
              reNewPassword: e.target.value,
            })
          }
          sx={{ my: "10px" }}
        />
      </Box>
      <Box sx={{ mt: 3 }}>
        <Button
          variant="contained"
          color="success"
          sx={{ width: "150px", mr: 5 }}
          onClick={handleEditPassword}
        >
          Xác nhận
        </Button>
        <Button
          variant="contained"
          color="warning"
          sx={{ width: "150px" }}
          onClick={closeModal}
        >
          Không huỷ
        </Button>
      </Box>
    </DialogContent>
  );
}
