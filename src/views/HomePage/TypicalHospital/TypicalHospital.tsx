import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SliderHospital from "./SliderHospital/SliderHospital";
import { useNavigate } from "react-router-dom";

export default function TypicalHospital() {
  const navigate = useNavigate();
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
        <Box sx={{ textAlign: "right" }}>
          <Button
            variant="contained"
            onClick={() => navigate(`/benhVienCong`)}
            sx={{
              background:
                "linear-gradient(84deg,#00b5f1 33.34%,#00e0ff 113.91%)",
              width: "160px",
              fontWeight: 600,
            }}
          >
            Xem thêm
          </Button>
        </Box>
      </Box>
      <SliderHospital />
    </Box>
  );
}
