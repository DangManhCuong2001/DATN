import { Box, Container, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { imagePath } from "../../../../constants/imagePath";

export default function BoxSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
  };
  return (
    <Container sx={{ mt: -8 }}>
      <Slider {...settings}>
        <Box
          sx={{
            backgroundColor: "white",
            width: "unset !important",
            px: 7,
            py: 5,
            borderRadius: "15px",
            // display: "flex !important",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <img
            src={imagePath.IMAGE_SLIDER1}
            style={{ height: "80px", width: "80px" }}
          ></img>
          <Typography>dfdsfsfd</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            width: "unset !important",
            px: 7,
            py: 5,
            borderRadius: "15px",
            // display: "flex !important",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <img
            src={imagePath.IMAGE_SLIDER2}
            style={{ height: "80px", width: "80px" }}
          ></img>
          <Typography>dfdsfsfd</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            width: "unset !important",
            px: 7,
            py: 5,
            borderRadius: "15px",
            // display: "flex !important",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <img
            src={imagePath.IMAGE_SLIDER3}
            style={{ height: "80px", width: "80px" }}
          ></img>
          <Typography>dfdsfsfd</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            width: "unset !important",
            px: 7,
            py: 5,
            borderRadius: "15px",
            // display: "flex !important",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <img
            src={imagePath.IMAGE_SLIDER1}
            style={{ height: "80px", width: "80px" }}
          ></img>
          <Typography>dfdsfsfd</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            width: "unset !important",
            px: 7,
            py: 5,
            borderRadius: "15px",
            // display: "flex !important",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <img
            src={imagePath.IMAGE_SLIDER1}
            style={{ height: "80px", width: "80px" }}
          ></img>
          <Typography>dfdsfsfd</Typography>
        </Box>
        <Box
          sx={{
            backgroundColor: "white",
            width: "unset !important",
            px: 7,
            py: 5,
            borderRadius: "15px",
            // display: "flex !important",
            // alignItems: "center",
            // justifyContent: "center",
          }}
        >
          <img
            src={imagePath.IMAGE_SLIDER1}
            style={{ height: "80px", width: "80px" }}
          ></img>
          <Typography>dfdsfsfd</Typography>
        </Box>
      </Slider>
    </Container>
  );
}
