import { Box, Grid, Typography } from "@mui/material";
import { Container } from "../container/Container";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PreviewDoctor from "./PreviewDoctor/PreviewDoctor";
import { useHospitalContext } from "../../context/hospital-context";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

export default function SelectAppointment() {
  const { idHospital } = useParams();
  const { infoHospital, setDataForm, listDoctorByHospital } =
    useHospitalContext();

  useEffect(() => {
    // setHospitalSelected(idHospital as string);
    setDataForm((prev) => {
      return {
        ...prev,
        hospitalSelected: idHospital as string,
      };
    });
  }, []);
  return (
    <Box sx={{ backgroundColor: "#e8f2f7" }}>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={6} md={3.5}>
            <Box
              sx={{
                background: "white",
                borderRadius: "12px",
              }}
            >
              <Box
                sx={{
                  background:
                    "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
                  borderTopRightRadius: "12px",
                  borderTopLeftRadius: "12px",
                  color: "white",
                  py: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "24px",
                    textAlign: "center",
                  }}
                >
                  Thông tin cơ sở y tế
                </Typography>
              </Box>

              <Box sx={{ display: "flex", p: 2 }}>
                <ApartmentRoundedIcon />
                <Box sx={{ ml: 1 }}>
                  <Typography sx={{ fontSize: "20px" }}>
                    {infoHospital.name}
                  </Typography>
                  <Typography>{infoHospital.address}</Typography>
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item xs={6} md={8.5}>
            <Box sx={{ borderRadius: "12px", background: "white" }}>
              <Box
                sx={{
                  background:
                    "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
                  borderTopRightRadius: "12px",
                  borderTopLeftRadius: "12px",
                  py: 1,
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "24px",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Vui lòng chọn Bác sĩ
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                {listDoctorByHospital.map((item, index) => {
                  return (
                    <PreviewDoctor
                      key={"hospital" + item + index}
                      data={item}
                    />
                  );
                })}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
