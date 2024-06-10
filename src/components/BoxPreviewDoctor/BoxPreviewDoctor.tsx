import { Box, Button, Grid, Typography } from "@mui/material";
import React from "react";
import { imagePath } from "../../constants/imagePath";

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import BoxPickDate from "../BoxPickDate/BoxPickDate";
import { useNavigate } from "react-router-dom";
import BoxMedicalInformation from "../BoxMedicalInformation/BoxMedicalInformation";

export default function BoxPreviewDoctor() {
  const navigate = useNavigate();
  return (
    <Box
      sx={{
        display: "flex",
        mt: 5,
        // border: "1px solid",
        boxSizing: "border-box",
        backgroundColor: "white",
        borderRadius: "15px",
        boxShadow: "inset 0px 0px 6px #D5D9D985, 0px 3px 6px #00000014",
      }}
    >
      <Grid container>
        <Grid item xs={12} md={6}>
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
                Hơn 30 năm kinh nghiệm khám và điều trị các bệnh nội cơ xương
                khớp và 40 năm kinh nghiệm khám Nội tổng quát Nguyên Phó Giám
                đốc Bệnh viện E Bác sĩ nhận khám bệnh nhân từ 4 tuổi trở lên
              </Typography>
              <Box sx={{ display: "flex", mt: 1 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: "20px" }} />
                <Typography>Hà Nội</Typography>
              </Box>
              <Button
                variant="outlined"
                sx={{ mt: 1 }}
                onClick={() => navigate("/doctor/1")}
              >
                Xem thêm
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderLeft: "1px solid",
              borderColor: "rgba(238, 238, 238, 1.00)",
            }}
          >
            <BoxPickDate />
            <BoxMedicalInformation />
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
