import React from "react";
import { Container } from "../../../components/container/Container";
import { IconLogoFooter } from "../../../assets/icon/icon";
import { Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Container sx={{ display: "flex", justifyContent: "space-between", mt: 5 }}>
      <Box>
        <IconLogoFooter />
        <Typography fontWeight={600}>
          Địa chỉ:{" "}
          <Typography component="span">
            236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM.
          </Typography>
        </Typography>
        <Typography fontWeight={600}>
          Website: <Typography component="span">localhost</Typography>
        </Typography>
        <Typography fontWeight={600}>
          Email: <Typography component="span">cuongdanga7@gmail.com</Typography>
        </Typography>
        <Typography fontWeight={600}>
          Điện thoại: <Typography component="span">0869669894</Typography>
        </Typography>
      </Box>
      <Box>
        <Typography fontWeight={600}>Dịch vụ Y tế</Typography>
        <Link
          to={"/benhVienCong"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Đặt khám tại cơ sở</Typography>
        </Link>
        {/* <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Đặt khám tại cơ sở</Typography>
        </Link>
        <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Đặt khám tại cơ sở</Typography>
        </Link> */}
        {/* <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Đặt khám tại cơ sở</Typography>
        </Link> */}
      </Box>
      <Box>
        <Typography fontWeight={600}>Hướng dẫn</Typography>
        <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Cài đặt ứng dụng</Typography>
        </Link>
        <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Đặt lịch khám</Typography>
        </Link>
        <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Liên hệ hợp tác</Typography>
        </Link>
      </Box>
      <Box>
        <Typography fontWeight={600}>Liên hệ hợp tác</Typography>
        <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Tham gia Medpro</Typography>
        </Link>
        <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Quảng cáo</Typography>
        </Link>
        <Link
          to={"http://localhost:5173/"}
          style={{ textDecoration: "none", color: "black" }}
        >
          <Typography>Tuyển Dụng</Typography>
        </Link>
      </Box>
    </Container>
  );
}
