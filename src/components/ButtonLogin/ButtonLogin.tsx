import { Button, Typography } from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useLoginContext } from "../../context/login-context";
import { Isconnected, LocalStorageKey } from "../../constants";
import { useNavigate } from "react-router-dom";
import LinkCustom from "../LinkCustom/LinkCustom";

export default function ButtonLogin() {
  const navigate = useNavigate();
  const { dataLogin, isLogin } = useLoginContext();
  // const isConnected = localStorage.getItem(LocalStorageKey.IsConnected);
  // console.log(isConnected);

  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: "20px", placeItems: "center" }}
    >
      <PersonIcon sx={{ mr: 1 }} />
      {isLogin ? (
        <Typography sx={{ fontSize: "12px" }}>
          {dataLogin.firstName} {dataLogin.lastName}
        </Typography>
      ) : (
        <LinkCustom url="/Login">
          <Typography>Tài khoản</Typography>
        </LinkCustom>
      )}
    </Button>
  );
}
