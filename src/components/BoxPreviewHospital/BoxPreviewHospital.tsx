import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { imagePath } from "../../constants/imagePath";
import { useNavigate } from "react-router-dom";
import { useHospitalContext } from "../../context/hospital-context";

export default function BoxPreviewHospital({
  image,
  name,
  address,
  idTypeHospital,
  idHospital,
}: {
  image: any;
  name: string;
  address: string;
  idTypeHospital: string | undefined;
  idHospital: string;
}) {
  const navigate = useNavigate();
  function handleSelectHospital() {
    navigate(`/${idTypeHospital}/${idHospital}`);
  }
  return (
    <Box
      sx={{
        backgroundColor: "white",
        borderRadius: "15px",
        px: 3,
        py: 3,
        mb: 4,
        border: "2px solid #00b5f1!important",
        boxShadow: "0 4px 15px rgba(116,157,206,.5)!important",
        width: "800px",
      }}
    >
      <Box sx={{ display: "flex" }}>
        {/* <img
          src={imagePath.LOGO_BVDHYDTPHCM}
          style={{ width: "120px", height: "120px", marginRight: "10px" }}
        /> */}
        <Box
          sx={{
            backgroundImage: `url(${image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "120px",
            height: "120px",
            borderRadius: "10px",
            mr: 2,
          }}
        ></Box>
        <Box>
          <Typography>{name}</Typography>
          <Typography>{address}</Typography>

          <Box sx={{ mt: 3 }}>
            <Button
              variant="contained"
              sx={{
                mr: 2,
                width: "160px",
                borderRadius: "20px",
                fontWeight: 600,
                background:
                  "linear-gradient(83.63deg,#00b5f1 33.34%,#00e0ff 113.91%)",
              }}
              onClick={() => navigate(`/SelectAppointment/${idHospital}`)}
            >
              Đặt khám ngay
            </Button>
            <Button
              variant="outlined"
              sx={{
                width: "160px",
                borderRadius: "20px",
                fontWeight: 600,
                color: "#00b5f1",
              }}
              // onClick={}
              // href={`/hospital/${idTypeHospital}/${idHospital}`}
              onClick={handleSelectHospital}
            >
              Xem chi tiết
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
