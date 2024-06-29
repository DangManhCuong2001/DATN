import { Box, Container, Typography } from "@mui/material";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { imagePath } from "../../../../constants/imagePath";
import { useHospitalContext } from "../../../../context/hospital-context";
import { useNavigate } from "react-router-dom";

function SampleNextArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{
        ...style,
        display: "block",
        background: "#00b5f1",
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props: any) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block", background: "#00b5f1" }}
      onClick={onClick}
    />
  );
}

export default function SliderHospital() {
  const { topHospitals } = useHospitalContext();
  const navigate = useNavigate();
  var settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    centerMode: true,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
            onClick={() => navigate(`/${item.type}/${item.id}`)}
          >
            <img
              src={item.image}
              style={{ height: "180px", width: "290px" }}
            ></img>
            <Box
              sx={{
                background:
                  "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
                width: "290px",
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
