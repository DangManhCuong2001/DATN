import { Box, Button, Grid, Typography } from "@mui/material";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import { Container } from "../../components/container/Container";
import {
  TAllDataDoctor,
  getInfoDoctor,
} from "../../services/DoctorService/DoctorService";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { initDataInfoDoctor } from "../../context/hospital-context";
import RateComment from "./RateComment/RateComment";
import DividerCustom from "../../components/DividerCustom/DividerCustom";

export default function Doctor() {
  const { idDoctor } = useParams();
  const navigator = useNavigate();
  const [dataDoctor, setDataDoctor] =
    useState<TAllDataDoctor>(initDataInfoDoctor);

  async function getData() {
    try {
      if (idDoctor) {
        const response = await getInfoDoctor(idDoctor);
        console.log(response);
        setDataDoctor(response);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getData();
  }, []);
  return (
    <Container sx={{ mt: 3 }}>
      <Grid container>
        <Grid item xs={12} md={6}>
          <Box sx={{ display: "flex", px: 2, py: 2 }}>
            <img
              src={dataDoctor.image}
              style={{
                width: "160px",
                height: "160px",
                borderRadius: "50%",
                marginRight: "10px",
              }}
            />
            <Box sx={{ mt: 1 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  color: "rgb(69 195 210/ 1)",
                  fontSize: "20px",
                }}
              >
                Bác sĩ {dataDoctor.firstName + " " + dataDoctor.lastName}
              </Typography>
              <Typography sx={{ mt: 1 }}>{dataDoctor.description}</Typography>
              <Box sx={{ display: "flex", mt: 2 }}>
                <LocationOnOutlinedIcon sx={{ fontSize: "20px" }} />
                <Typography>Hà Nội</Typography>
              </Box>
              <Button
                variant="contained"
                sx={{
                  mt: 2,

                  background:
                    "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
                }}
                onClick={() =>
                  navigator(
                    `/SelectAppointment/${dataDoctor.hospitalId}/${dataDoctor.specialtyId}/${dataDoctor.doctorId}`
                  )
                }
              >
                Đặt lịch ngay
              </Button>
            </Box>
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              borderLeft: "1px solid",
              borderColor: "rgba(238, 238, 238, 1.00)",
              p: 2,
              height: "100%",
            }}
          >
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "rgba(238, 238, 238, 1.00)",

                mt: 1,
                py: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 600, color: "rgb(102 102 102/ 1)" }}
              >
                Giới tính:{" "}
                <Typography component={"span"}>{dataDoctor.gender}</Typography>
              </Typography>
              <Typography
                sx={{ fontWeight: 600, color: "rgb(102 102 102/ 1)" }}
              >
                Ngày sinh:{" "}
                <Typography component={"span"}>{dataDoctor.gender}</Typography>
              </Typography>
            </Box>
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "rgba(238, 238, 238, 1.00)",

                mt: 1,
                py: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 600, color: "rgb(102 102 102/ 1)" }}
              >
                ĐỊA CHỈ KHÁM
              </Typography>
              <Typography>{dataDoctor.nameHospital}</Typography>
              <Typography>{dataDoctor.addressHospital}</Typography>
            </Box>
            <Box
              sx={{
                borderTop: "1px solid",
                borderColor: "rgba(238, 238, 238, 1.00)",
                mt: 1,
                py: 1,
              }}
            >
              <Typography
                sx={{ fontWeight: 600, color: "rgb(102 102 102/ 1)" }}
              >
                GIÁ KHÁM:{" "}
                <Typography component={"span"}>{dataDoctor.price}đ</Typography>
              </Typography>
            </Box>
          </Box>
        </Grid>
      </Grid>
      <DividerCustom sx={{ mt: 5 }} />
      <Box dangerouslySetInnerHTML={{ __html: dataDoctor.markdownHTML }}></Box>
      <DividerCustom sx={{ mt: 5 }} />
      <RateComment idDoctor={idDoctor as string} />
    </Container>
  );
}
