import { Box, Grid, Typography } from "@mui/material";
import React from "react";
import { Container } from "../../components/container/Container";
import { imagePath } from "../../constants/imagePath";
import LinkCustom from "../../components/LinkCustom/LinkCustom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useSpecialityContext } from "../../context/speciality-context";

export default function Speciality() {
  const { dataSpeciality } = useSpecialityContext();
  console.log(dataSpeciality);

  return (
    <Container>
      <Box sx={{ display: "flex", mt: 2, mb: 3, placeItems: "center" }}>
        <LinkCustom url={"/"}>
          <Typography sx={{ cursor: "pointer" }}>Trang chủ</Typography>
        </LinkCustom>
        <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
        <Typography>Chuyên khoa</Typography>
      </Box>
      <Grid container gap={0}>
        {dataSpeciality.map((item) => {
          return (
            <Grid item xs={6} md={3} sx={{ mb: 3 }}>
              <LinkCustom url={item.url}>
                <img
                  src={item.imgSpeciality}
                  style={{ maxWidth: "280px", height: "140px" }}
                ></img>
                <Typography sx={{ textAlign: "center", mt: 1 }}>
                  {item.title}
                </Typography>
              </LinkCustom>
            </Grid>
          );
        })}

        {/* <Box>
          <img
            src={imagePath.BENH_VIEN_NHI}
            style={{ width: "280px", height: "140px" }}
          ></img>
          <Typography sx={{ textAlign: "center" }}>Cơ Xương Khớp</Typography>
        </Box> */}
      </Grid>
    </Container>
  );
}
