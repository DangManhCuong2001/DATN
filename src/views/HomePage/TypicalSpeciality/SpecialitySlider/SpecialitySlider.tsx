import { Box, Container, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { imagePath } from "../../../../constants/imagePath";

export default function SpecialitySlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    centerMode: true,
  };
  return (
    <Slider {...settings}>
      <Box sx={{ cursor: "pointer" }}>
        <img
          src={imagePath.BENH_VIEN_CHO_RAY}
          alt="benh_vien_cho_ray"
          style={{ width: "280px", height: "180px", borderRadius: "10px" }}
        ></img>
        <Box
          sx={{
            background:
              "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
            width: "280px",
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
            Benh vien Cho Ray
          </Typography>
        </Box>
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <img
          src={imagePath.BENH_VIEN_DAI_HOC_Y_DUOC_2}
          alt="benh_vien_cho_ray"
          style={{ width: "280px", height: "180px", borderRadius: "10px" }}
        ></img>
        <Box
          sx={{
            background:
              "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
            width: "280px",
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
            Benh vien Cho Ray
          </Typography>
        </Box>
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <img
          src={imagePath.BENH_VIEN_NHI}
          alt="benh_vien_cho_ray"
          style={{ width: "280px", height: "180px", borderRadius: "10px" }}
        ></img>
        <Box
          sx={{
            background:
              "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
            width: "280px",
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
            Benh vien Cho Ray
          </Typography>
        </Box>
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <img
          src={imagePath.BENH_VIEN_TRUNG_VUONG}
          alt="benh_vien_cho_ray"
          style={{ width: "280px", height: "180px", borderRadius: "10px" }}
        ></img>
        <Box
          sx={{
            background:
              "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
            width: "280px",
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
            Benh vien Cho Ray
          </Typography>
        </Box>
      </Box>
      <Box sx={{ cursor: "pointer" }}>
        <img
          src={imagePath.BENH_VIEN_CHO_RAY}
          alt="benh_vien_cho_ray"
          style={{ width: "280px", height: "180px", borderRadius: "10px" }}
        ></img>
        <Box
          sx={{
            background:
              "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
            width: "280px",
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
            Benh vien Cho Ray
          </Typography>
        </Box>
      </Box>
    </Slider>
  );
}
