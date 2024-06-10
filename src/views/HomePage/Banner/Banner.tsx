import { Box, TextField } from "@mui/material";
import React from "react";
import { imagePath } from "../../../constants/imagePath";
import { IconSearch } from "../../../assets/icon/icon";
import BoxSlider from "./BoxSlider/BoxSlider";

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
        <Box
          sx={{
            width: "500px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            boxShadow: " 0px 3px 6px 0px rgba(0, 0, 0, 0.08);",
            borderRadius: "25px",
            px: 2,
            py: 1,
            columnGap: 1,
            "& .inputStyle": {
              color: "text.primary",
              fontFamily: "'Open Sans',sans-serif",
            },
          }}
        >
          <IconSearch sx={{ color: "red" }} />
          <input
            className="inputStyle"
            style={{
              border: "none",
              background: "none",
              outline: "none",
              width: "calc(100% - 25px)",
              fontSize: "14px",
            }}
            placeholder="Search...."
          ></input>
        </Box>
      </Box>
      <BoxSlider />
    </Box>
  );
}
