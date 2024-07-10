import { Box, TextField, Typography } from "@mui/material";
import React from "react";
import { imagePath } from "../../../constants/imagePath";
import { IconSearch } from "../../../assets/icon/icon";
import BoxSlider from "./BoxSlider/BoxSlider";
import SearchBox from "./SearchBox/SearchBox";

export default function Banner() {
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", pb: 10 }}>
      <Box
        sx={{
          backgroundImage: `url(${imagePath.BANNER_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "bottom",
          backgroundRepeat: "no-repeat",
          width: "100%",
          height: "500px",
          alignItems: "center",
          position: "relative",
          // color: "#f5f5f5",
          // display: "flex",
          // alignItems: "center",
          // justifyContent: "center",
          // zIndex: -1,
        }}
      >
        <Box
          sx={{
            textAlign: "center",
            position: "absolute",
            top: " 50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        >
          <Typography sx={{ color: "#1da1f2", fontSize: "25px", mb: 1.5 }}>
            Nền tảng công nghệ
          </Typography>
          <Typography
            sx={{ color: "#003553", mb: 2, fontSize: "36px", fontWeight: 700 }}
          >
            Kết nối người dân với Cơ sở - Dịch vụ Y tế
          </Typography>
          <SearchBox />
        </Box>
      </Box>
      {/* <BoxSlider /> */}
    </Box>
  );
}
