import { Box, Container, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { imagePath } from "../../../../constants/imagePath";
import { useHospitalContext } from "../../../../context/hospital-context";

export default function SliderHospital() {
  const { topHospitals } = useHospitalContext();
  var settings = {
    // dots: true,
    // infinite: true,
    speed: 500,
    slidesToShow: 4,
    // slidesToScroll: 1,
    // centerMode: true,
  };
  return (
    <Slider {...settings}>
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
                backgroundPosition: "center",
                width: "320px",
                height: "180px",
              }}
            ></Box>
            <Box
              sx={{
                background:
                  "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
                width: "320px",
                height: "50px",
                mt: 2,
                borderRadius: "10px",
                display: "flex",
                placeItems: "center",
                justifyContent: "center",
              }}
            >
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "white",
                  fontSize: "20px",
                }}
              >
                {item.name}
              </Typography>
            </Box>
          </Box>
        );
      })}
    </Slider>
  );
}
