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
    <Box
      sx={{
        textAlign: "center",
        backgroundColor: "#e8f2f7",
        py: 5,
        minHeight: "600px",
      }}
    >
      <IconLogo />
      <Box>
        <Box sx={{ mb: 2, mt: 5 }}>
          <TextField
            placeholder="Tài khoản"
            onChange={(e) => changeEmail(e.target.value)}
            sx={{ width: "300px" }}
          ></TextField>
        </Box>
        <Box sx={{ mb: 2 }}>
          <TextField
            placeholder="Mật khẩu"
            type="password"
            onChange={(e) => changePassword(e.target.value)}
            sx={{ width: "300px" }}
          ></TextField>
        </Box>
        <Button
          variant="contained"
          onClick={() => handleLogin(urlAfterLogin ? urlAfterLogin : undefined)}
          sx={{
            background:
              "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
          }}
        >
          Đăng nhập
        </Button>
      </Box>
      {/* <Box sx={{ mt: 5 }}>
        <Typography sx={{ mb: 1 }}>Hoặc đăng nhập bằng tài khoản</Typography>
        <Box>
          <Button
            href="/a"
            variant="contained"
            sx={{
              background:
                "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
              width: "300px",
              mb: 1,
            }}
          >
            ĐĂNG NHẬP VỚI GOOGLE
          </Button>
        </Box>
        <Box>
          <Button
            variant="contained"
            sx={{
              background:
                "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
              width: "300px",
            }}
          >
            ĐĂNG NHẬP VỚI FACEBOOK
          </Button>
        </Box>
      </Box> */}
      <Box sx={{ mt: 2 }}>
        <Typography>
          Nếu chưa có tải khoản. Vui lòng{" "}
          <a href="/register" target="_blank">
            Đăng ký
          </a>
        </Typography>
      </Box>
    </Box>
  );
}
