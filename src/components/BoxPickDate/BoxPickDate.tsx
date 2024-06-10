import { Box, Typography } from "@mui/material";
import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import PanToolAltOutlinedIcon from "@mui/icons-material/PanToolAltOutlined";
import BoxMedicalInformation from "../BoxMedicalInformation/BoxMedicalInformation";
import LinkCustom from "../LinkCustom/LinkCustom";

export default function BoxPickDate() {
  return (
    <Box
      sx={{
        px: 2,
        // py: 2,
      }}
    >
      <Typography>Hom nay</Typography>
      <Box sx={{ display: "flex", placeItems: "center" }}>
        <CalendarMonthIcon sx={{ fontSize: "16px", mr: 0.5 }} />
        <Typography>Lich kham</Typography>
      </Box>
      <Box sx={{ my: 2 }}>
        <LinkCustom url="/schedule/1">
          <Typography
            sx={{
              backgroundColor: "rgb(238 238 238/ 1)",
              width: "110px",
              // height: "40px",
              pl: 2,
              py: 2,
            }}
          >
            07:00 - 07:30
          </Typography>
        </LinkCustom>
      </Box>
      <Typography sx={{ display: "flex", placeItems: "center" }}>
        Chọn và đặt
        <PanToolAltOutlinedIcon sx={{ fontSize: "20px" }} /> (Phí đặt lịch 0đ)
      </Typography>
    </Box>
  );
}
