import { Box, Typography } from "@mui/material";
import React from "react";
import { Container } from "../../../components/container/Container";
import BoxPreviewDoctor from "../../../components/BoxPreviewDoctor/BoxPreviewDoctor";
import LinkCustom from "../../../components/LinkCustom/LinkCustom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export default function DetailSpeciality() {
  return (
    <Box sx={{ background: "#e8f2f7" }}>
      <Container>
        <Box sx={{ display: "flex", mb: 3, placeItems: "center" }}>
          <LinkCustom url={"/"}>
            <Typography sx={{ cursor: "pointer" }}>Trang chủ</Typography>
          </LinkCustom>
          <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
          <LinkCustom url={"/speciality"}>
            <Typography>Chuyên khoa</Typography>
          </LinkCustom>
          <ArrowForwardIosIcon sx={{ fontSize: "18px" }} />
          <Typography>Cơ Xương Khớp</Typography>
        </Box>
        <Box>
          <Typography>Cơ Xương Khớp</Typography>
          <Typography>Bác sĩ Cơ Xương Khớp giỏi</Typography>
          <Typography>
            Danh sách các bác sĩ uy tín đầu ngành Cơ Xương Khớp tại Việt Nam:
          </Typography>
        </Box>
        <BoxPreviewDoctor />
      </Container>
    </Box>
  );
}
