import { Box, Button, TextField, Typography } from "@mui/material";
import { IconLogo } from "../../assets/icon/icon";
import { useLoginContext } from "../../context/login-context";
import { useNavigate } from "react-router-dom";

export default function Login({ urlAfterLogin }: { urlAfterLogin?: string }) {
  const { setAccountLogin, handleLogin } = useLoginContext();

  const changeEmail = (email: string) => {
    setAccountLogin((prev) => {
      return {
        ...prev,
        email: email,
      };
    });
  };
  const changePassword = (password: string) => {
    setAccountLogin((prev) => {
      return {
        ...prev,
        password: password,
      };
    });
  };
  //   useEffect(() => {
  //     handleLogin();
  //   }, []);
  return (
    <Box sx={{ textAlign: "center" }}>
      <IconLogo />
      <Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Tài khoản"
            onChange={(e) => changeEmail(e.target.value)}
          ></TextField>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Mật khẩu"
            onChange={(e) => changePassword(e.target.value)}
          ></TextField>
        </Box>
        <Button
          variant="contained"
          onClick={() => handleLogin(urlAfterLogin ? urlAfterLogin : "-1")}
        >
          Đăng nhập
        </Button>
      </Box>
      <Box>
        <Typography>Hoặc đăng nhập bằng tài khoản</Typography>
        <Button href="/a" variant="outlined">
          ĐĂNG NHẬP VỚI GOOGLE
        </Button>
        <Button variant="outlined">ĐĂNG NHẬP VỚI FACEBOOK</Button>
      </Box>
    </Box>
  );
}
