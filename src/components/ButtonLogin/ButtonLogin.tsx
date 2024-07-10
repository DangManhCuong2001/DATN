import {
  Box,
  Button,
  ClickAwayListener,
  MenuItem,
  Typography,
} from "@mui/material";
import React from "react";
import PersonIcon from "@mui/icons-material/Person";
import { useLoginContext } from "../../context/login-context";
import { Isconnected, LocalStorageKey } from "../../constants";
import { useNavigate } from "react-router-dom";
import LinkCustom from "../LinkCustom/LinkCustom";
import { ExpandMoreRounded, LogoutRounded } from "@mui/icons-material";

export default function ButtonLogin() {
  const navigate = useNavigate();
  const { dataLogin, isLogin } = useLoginContext();
  const [open, setOpen] = React.useState(false);

  const handleClick = () => {
    setOpen((prev) => !prev);
  };
  const handleClickAway = () => {
    setOpen(false);
  };

  function disconnectWallet() {}
  return (
    <>
      {isLogin ? (
        <ClickAwayListener onClickAway={handleClickAway}>
          <Box sx={{ position: "relative", width: "fit-content" }}>
            <Button
              variant="outlined"
              onClick={handleClick}
              sx={{
                textTransform: "none",
                px: 1,
                borderRadius: "20px",
                minWidth: "140px",
              }}
            >
              <Typography sx={{ fontSize: "12px" }}>
                {dataLogin.firstName} {dataLogin.lastName}
              </Typography>
              <ExpandMoreRounded />
            </Button>
            {open ? (
              <Box
                sx={{
                  position: "absolute",
                  top: "40px",
                  right: 0,
                  width: "fit-content",
                  minWidth: "140px",
                  borderRadius: "16px",
                  boxShadow: 4,
                  py: 2,
                }}
              >
                <MenuItem onClick={() => navigate("/profile")}>
                  <Typography
                    variant="body2"
                    color={"text.secondary"}
                    fontWeight={500}
                  >
                    Xem hồ sơ
                  </Typography>
                </MenuItem>
                <MenuItem sx={{ mt: 1, gap: 1 }} onClick={disconnectWallet}>
                  <Typography
                    variant="body2"
                    color={"text.secondary"}
                    fontWeight={500}
                  >
                    Đăng xuất
                  </Typography>
                  <LogoutRounded sx={{ fontSize: "16px" }} />
                </MenuItem>
              </Box>
            ) : null}
          </Box>
        </ClickAwayListener>
      ) : (
        <Button
          variant="outlined"
          sx={{ borderRadius: "20px", placeItems: "center" }}
        >
          <PersonIcon sx={{ mr: 1, color: "#00b5f1" }} />
          <LinkCustom url="/Login">
            <Typography
              sx={{ fontSize: "16px", fontWeight: 600, color: "#00b5f1" }}
            >
              Tài khoản
            </Typography>
          </LinkCustom>
        </Button>
      )}
    </>
  );
}
