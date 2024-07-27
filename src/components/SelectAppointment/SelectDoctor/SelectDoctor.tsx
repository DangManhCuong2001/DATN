import { Box, Grid, Typography } from "@mui/material";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useHospitalContext } from "../../../context/hospital-context";
import { Container } from "../../container/Container";
import PreviewDoctor from "../PreviewDoctor/PreviewDoctor";
import LinkCustom from "../../LinkCustom/LinkCustom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";

export default function SelectDoctor() {
  const { idHospital, idSpecialty } = useParams();
  const { infoHospital, setDataForm, listDoctorByHospital } =
    useHospitalContext();
  const { dataForm } = useHospitalContext();
  useEffect(() => {
    // setHospitalSelected(idHospital as string);
    setDataForm((prev) => {
      return {
        ...prev,
        hospitalSelected: idHospital as string,
        specialtySelected: idSpecialty as string,
      };
    });
  }, []);
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", pb: 5, pt: 5 }}>
      <Container sx={{ display: "flex", placeItems: "center", mb: 4 }}>
        <LinkCustom url={"/"}>
          <Typography
            sx={{ cursor: "pointer", color: "#003553", fontWeight: 600 }}
          >
            Trang chủ
          </Typography>
        </LinkCustom>
        <ArrowForwardIosIcon sx={{ fontSize: "16px", mx: 1 }} />
        <LinkCustom url={`/${infoHospital.type}/${infoHospital.id}`}>
          <Typography
            sx={{ cursor: "pointer", color: "#003553", fontWeight: 600 }}
          >
            {infoHospital.name}
          </Typography>
        </LinkCustom>
        <ArrowForwardIosIcon sx={{ fontSize: "16px", mx: 1 }} />
        <Typography sx={{ color: "#00b5f1", fontWeight: 600 }}>
          Chọn bác sĩ
        </Typography>
      </Container>
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
              <Box sx={{ display: "flex", p: 2 }}>
                <MedicalServicesRoundedIcon />
                <Typography sx={{ fontSize: "20px", ml: 1 }}>
                  Chuyên khoa: {dataForm.nameSpecialtySelected}
                </Typography>
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
