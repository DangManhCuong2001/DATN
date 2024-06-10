import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { imagePath } from "../../constants/imagePath";
import { Container } from "../../components/container/Container";
import BoxPickDate from "../../components/BoxPickDate/BoxPickDate";
import BoxMedicalInformation from "../../components/BoxMedicalInformation/BoxMedicalInformation";

export default function Doctor() {
  return (
    <Container>
      <Box sx={{ display: "flex", px: 2, py: 2 }}>
        <img
          src={imagePath.COT_SONG}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        />
        <Box sx={{ mt: 1 }}>
          <Typography
            sx={{
              fontWeight: 600,
              color: "rgb(69 195 210/ 1)",
              fontSize: "20px",
            }}
          >
            Tiến sĩ, Bác sĩ chuyên khoa 2, Lê Quốc Việt
          </Typography>
          <Typography sx={{ mt: 1 }}>
            Hơn 30 năm kinh nghiệm khám và điều trị các bệnh nội cơ xương khớp
            và 40 năm kinh nghiệm khám Nội tổng quát Nguyên Phó Giám đốc Bệnh
            viện E Bác sĩ nhận khám bệnh nhân từ 4 tuổi trở lên
          </Typography>
          <Box sx={{ display: "flex", mt: 1 }}>
            <LocationOnOutlinedIcon sx={{ fontSize: "20px" }} />
            <Typography>Hà Nội</Typography>
          </Box>
        </Box>
      </Box>
      <Grid container>
        <Grid item xs={12} md={6}>
          <BoxPickDate />
        </Grid>
        <Grid item xs={12} md={6}>
          <BoxMedicalInformation />
        </Grid>
      </Grid>
    </Container>
  );
}
