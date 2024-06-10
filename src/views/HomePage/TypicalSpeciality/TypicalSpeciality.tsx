import { Box, Button, Typography } from "@mui/material";
import React from "react";
import SpecialitySlider from "./SpecialitySlider/SpecialitySlider";
import { Container } from "../../../components/container/Container";
import { useNavigate } from "react-router-dom";

export default function TypicalSpeciality() {
  const navigator = useNavigate();
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", pb: 10 }}>
      <Container>
        <Box sx={{ py: 5, display: "flex", justifyContent: "space-between" }}>
          <Typography
            sx={{ fontWeight: 600, fontSize: "30px", color: "#00b5f1" }}
          >
            Chuyên khoa
          </Typography>
          <Button
            variant="contained"
            sx={{ fontWeight: 600 }}
            onClick={() => {
              navigator("/speciality");
            }}
          >
            Xem thêm
          </Button>
          {/* <Typography sx={{ color: "#858585", fontSize: "22px" }}>
          Đặt lịch khám với hơn 70 bệnh viện trên khắp cả nước
        </Typography> */}
        </Box>
        <SpecialitySlider />
      </Container>
    </Box>
  );
}
