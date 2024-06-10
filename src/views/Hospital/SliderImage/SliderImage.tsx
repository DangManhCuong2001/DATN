import React from "react";
import Slider from "react-slick";
import { useHospitalContext } from "../../../context/hospital-context";
import { Box } from "@mui/material";
import { WidthFull } from "@mui/icons-material";

export default function SliderImage() {
  const { topHospitals } = useHospitalContext();
  var settings = {
    // dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    // slidesToScroll: 1,
    // centerMode: true,
  };
  return (
    <Slider {...settings} adaptiveHeight={true}>
      {topHospitals.map((item, index) => {
        return (
          <Box
            key={"hospital" + index}
            sx={{
              cursor: "pointer",
            }}
          >
            <Box
              sx={{
                backgroundImage: `url(${item.image})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "auto",
                // backgroundPosition: "center",
                width: "100%",
                height: "480px",
                borderRadius: "12px",
              }}
            ></Box>
          </Box>
        );
      })}
    </Slider>
  );
}
