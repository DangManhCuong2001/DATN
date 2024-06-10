import { Box, Button, Container, Typography } from "@mui/material";
import React from "react";
import { imagePath } from "../../../constants/imagePath";

export default function BannerQuickBook() {
  return (
    <Box
      sx={{
        backgroundImage: `url(${imagePath.BACKGROUND_QUICK_BOOK})`,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "50%",
        width: "100%",
        height: "608px",
      }}
    >
      <Container
        sx={{
          display: "flex",
          pt: 10,
          height: "100%",
        }}
      >
        <Box>
          <Typography
            sx={{ fontWeight: 600, fontSize: "50px", color: "#00b5f1" }}
          >
            Đặt Khám nhanh
          </Typography>
          <Typography
            sx={{ fontWeight: 500, fontSize: "20px", color: "#003553" }}
          >
            Bệnh nhân chủ động chọn thông tin đặt khám nhanh (ngày khám, giờ
            khám và cơ sở y tế). Bệnh nhân sẽ nhận lấy số thứ tự trực tuyến ngay
            trên phần mềm
          </Typography>
          <Button
            variant="contained"
            sx={{
              background:
                "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
              fontWeight: 600,
              color: "white",
              fontSize: "20px",
              borderRadius: "30px",
              mt: 5,
            }}
          >
            Đặt Lịch Ngay
          </Button>
        </Box>
        <img
          src={imagePath.BANNER_QUICK_BOOK}
          style={{ width: "600px", height: "auto" }}
        ></img>
      </Container>
    </Box>
  );
}
