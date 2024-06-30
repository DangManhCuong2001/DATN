import { Box, Container, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getStatistical } from "../../../services/PatientService/PatientService";
import { imagePath } from "../../../constants/imagePath";

type TDataStatistical = {
  totalAppointment: number;
  totalDoctor: number;
  totalHospital: number;
  totalSpecialty: number;
};
export default function Statistical() {
  const [data, setData] = useState<TDataStatistical>({
    totalAppointment: 0,
    totalDoctor: 0,
    totalHospital: 0,
    totalSpecialty: 0,
  });
  async function getData() {
    try {
      const response = await getStatistical();
      console.log(response);
      setData((prev) => {
        return {
          ...prev,
          totalAppointment: response.data.data.totalAppointment,
          totalDoctor: response.data.data.totalDoctor,
          totalHospital: response.data.data.totalHospital,
          totalSpecialty: response.data.data.totalSpecialty,
        };
      });
    } catch (err) {
      console.log(err);
    }
  }
  useEffect(() => {
    getData();
  }, []);
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", pb: 10 }}>
      <Container>
        <Box
          sx={{
            background:
              "linear-gradient(84.1deg, #00b5f1 33.44%, #00e0ff 132.9%)",
            height: "400px",
            borderRadius: "15px",
            // mt: 8,
            py: 3,
            px: 10,
          }}
        >
          <Typography
            sx={{
              color: "white",
              fontWeight: 600,
              fontSize: "50px",
              textAlign: "center",
              mb: 6,
            }}
          >
            Thống kê
          </Typography>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box sx={{ textAlign: "center" }}>
              {/* <Box
                sx={{
                  backgroundColor: "white",
                  borderRadius: "50%",
                  width: "120px",
                  height: "120px",
                  mb: 2,
                }}
              ></Box> */}
              <img
                src={imagePath.ICON_LUOTKHAM}
                style={{ width: "120px", height: "120px" }}
              ></img>

              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                {data.totalAppointment}
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Lượt khám
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={imagePath.ICON_BENHVIEN}
                style={{ width: "120px", height: "120px" }}
              ></img>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                {data.totalHospital}
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Cơ sở y tế
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={imagePath.ICON_CHUYENKHOA}
                style={{ width: "120px", height: "120px" }}
              ></img>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                {data.totalSpecialty}
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Chuyên khoa
              </Typography>
            </Box>
            <Box sx={{ textAlign: "center" }}>
              <img
                src={imagePath.ICON_BACSI}
                style={{ width: "120px", height: "120px" }}
              ></img>
              <Typography
                sx={{ color: "white", fontSize: "30px", fontWeight: 600 }}
              >
                {data.totalDoctor}
              </Typography>
              <Typography
                sx={{ color: "white", fontSize: "25px", fontWeight: 500 }}
              >
                Bác sĩ
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
