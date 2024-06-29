import React, { useEffect } from "react";
import { Container } from "../../../components/container/Container";
import { Box, Button, Grid, Typography } from "@mui/material";
import { imagePath } from "../../../constants/imagePath";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import LocationOnRoundedIcon from "@mui/icons-material/LocationOnRounded";
import AccessTimeRoundedIcon from "@mui/icons-material/AccessTimeRounded";
import LocalPhoneRoundedIcon from "@mui/icons-material/LocalPhoneRounded";
import LinkCustom from "../../../components/LinkCustom/LinkCustom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import SliderImage from "../SliderImage/SliderImage";
import { useNavigate, useParams } from "react-router-dom";
import { useHospitalContext } from "../../../context/hospital-context";

export default function DetailHospital() {
  const navigate = useNavigate();
  const { idHospital } = useParams();
  console.log(idHospital);
  const { infoHospital, setDataForm } = useHospitalContext();

  useEffect(() => {
    setDataForm((prev) => {
      return {
        ...prev,
        hospitalSelected: idHospital as string,
      };
    });
  }, []);
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", pb: 5 }}>
      <Container>
        <Box sx={{ display: "flex", placeItems: "center", mb: 4 }}>
          <LinkCustom url={"/"}>
            <Typography sx={{ cursor: "pointer", fontSize: "18px" }}>
              Trang chủ
            </Typography>
          </LinkCustom>
          <ArrowForwardIosIcon sx={{ fontSize: "14px", mx: 1 }} />
          <Typography
            sx={{ color: "#47bfff", fontSize: "18px", fontWeight: 600 }}
          >
            {infoHospital.name}
          </Typography>
        </Box>
        <Grid container spacing={4}>
          <Grid item xs={6} md={4.5}>
            <Box
              sx={{
                p: 4,
                background: "white",
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                {/* <Box
                  sx={{
                    backgroundImage: `url(${infoHospital.image})`,
                    backgroundRepeat: "no-repeat",
                    // backgroundSize: "auto",
                    // backgroundPosition: "center",
                    width: "160px",
                    height: "160px",
                    borderRadius: "12px",
                  }}
                ></Box> */}
                <img
                  src={infoHospital.image}
                  style={{ height: "160px", width: "160px" }}
                ></img>
              </Box>
              <Typography
                sx={{
                  mt: 2,
                  textAlign: "center",
                  color: "#00b5f1",
                  fontWeight: 600,
                  fontSize: "20px",
                }}
              >
                {infoHospital.name}
              </Typography>

              <DividerCustom />

              <Box sx={{ textAlign: "center" }}>
                <Box sx={{ display: "flex", mb: 2 }}>
                  <LocationOnRoundedIcon sx={{ fontSize: "24px", mr: 0.5 }} />
                  <Typography>{infoHospital.address}</Typography>
                </Box>
                <Box sx={{ display: "flex", placeItems: "center", mb: 2 }}>
                  <AccessTimeRoundedIcon sx={{ fontSize: "24px", mr: 0.5 }} />
                  <Typography>Thứ 2 - Thứ 6</Typography>
                </Box>
                <Box sx={{ display: "flex", placeItems: "center", mb: 2 }}>
                  <LocalPhoneRoundedIcon sx={{ fontSize: "24px", mr: 0.5 }} />
                  <Typography>Hỗ trợ đặt khám: 1900 2115</Typography>
                </Box>
                <Button
                  variant="contained"
                  onClick={() => navigate(`/SelectAppointment/${idHospital}`)}
                  sx={{
                    background:
                      "linear-gradient(84deg,#00b5f1 33.34%,#00e0ff 113.91%)",
                    width: "160px",
                  }}
                >
                  Đặt khám ngay
                </Button>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={7.5}>
            <SliderImage />
          </Grid>
        </Grid>
        <Box sx={{ mt: 4 }}>
          <Grid container spacing={4}>
            <Grid item xs={6} md={4.5}>
              <Box sx={{ p: 4, background: "white", borderRadius: "12px" }}>
                <Typography sx={{ fontWeight: 600, fontSize: "24px" }}>
                  Mô tả
                </Typography>
                <Typography>{infoHospital.description}</Typography>
              </Box>
            </Grid>
            <Grid item xs={6} md={7.5}>
              <Box
                sx={{
                  p: 4,
                  background: "white",
                  borderRadius: "12px",
                  maxHeight: "400px",
                  overflow: "auto",
                }}
              >
                <Box
                  dangerouslySetInnerHTML={{ __html: infoHospital.contentHTML }}
                ></Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Container>
    </Box>
  );
}
