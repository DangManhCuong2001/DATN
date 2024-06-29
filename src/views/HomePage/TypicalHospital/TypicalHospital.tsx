import { Box, Typography } from "@mui/material";
import React from "react";
import SliderHospital from "./SliderHospital/SliderHospital";

export default function TypicalHospital() {
  return (
    <Box sx={{ backgroundColor: "white", mt: 5, pb: 10, px: 8 }}>
      <Box sx={{ textAlign: "center", py: 5 }}>
        <Typography
          sx={{ fontWeight: 600, fontSize: "50px", color: "#00b5f1" }}
        >
          Bệnh viện tiêu biểu
        </Typography>
        <Typography sx={{ color: "#858585", fontSize: "22px" }}>
          Đặt lịch khám với hơn 70 bệnh viện trên khắp cả nước
        </Typography>
      </Box>
      <SliderHospital />
    </Box>
  );
}
