import { Box, Grid, Typography } from "@mui/material";
import { Container } from "../../container/Container";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { useHospitalContext } from "../../../context/hospital-context";
import { getListSpecialtyByHospital } from "../../../services/SpecialtyService/SpecialtyService";
import { useEffect, useState } from "react";
import PreviewSpecialty from "./PreviewSpecialty/PreviewSpecialty";
import LinkCustom from "../../LinkCustom/LinkCustom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

export type TDataSelectSpecialty = {
  id: string;
  nameSpecialty: string;
};
export default function SelectSpecialty() {
  const { infoHospital, setDataForm, listDoctorByHospital } =
    useHospitalContext();
  const [listSpecialty, setListSpecialty] = useState<TDataSelectSpecialty[]>(
    []
  );
  console.log(listSpecialty);
  async function getListSpecialty() {
    try {
      const response = await getListSpecialtyByHospital(infoHospital.id);
      console.log(response);
      const data = response.data.data.map((item: any) => {
        return {
          id: item.id,
          nameSpecialty: item.name,
        };
      });

      setListSpecialty(data);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getListSpecialty();
  }, [infoHospital.id]);
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", pb: 5, pt: 3 }}>
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
          Chọn chuyên khoa
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
                  Vui lòng chọn chuyên khoa
                </Typography>
              </Box>

              <Box sx={{ p: 2 }}>
                {listSpecialty.map((item, index) => {
                  return (
                    <PreviewSpecialty
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
