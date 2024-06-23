import { Box, TextField } from "@mui/material";
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
          color: "#f5f5f5",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          // zIndex: -1,
        }}
      >
        <SearchBox />
      </Box>
      {/* <BoxSlider /> */}
    </Box>
  );
}
