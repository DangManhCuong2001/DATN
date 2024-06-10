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
                p: 2,
              }}
            >
              <Box>
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
              <Box sx={{ display: "flex" }}>
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
              <Box sx={{ p: 2 }}>
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: "24px",
                    textAlign: "center",
                  }}
                >
                  Vui lòng chọn Bác sĩ
                </Typography>
                {listDoctorByHospital.map((item, index) => {
                  return (
                    <PreviewDoctor
                      key={"hospital" + item + index}
                      name={item.firstName + " " + item.lastName}
                      gender={item.gender}
                      price={item.price}
                      specialty={item.nameSpecialty}
                      doctorId={item.doctorId}
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
