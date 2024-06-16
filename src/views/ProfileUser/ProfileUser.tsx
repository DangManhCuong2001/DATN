import React, { useEffect, useState } from "react";
import { Container } from "../../components/container/Container";
import { Box, Grid, Typography } from "@mui/material";
import { imagePath } from "../../constants/imagePath";
import { getAppoinmentsPatient } from "../../services/PatientService/PatientService";
import { useLoginContext } from "../../context/login-context";
import DividerCustom from "../../components/DividerCustom/DividerCustom";

type TDataAppoinment = {
  fullName: string;
  gender: string;
  address: string;
  date: string;
  dateOfBirth: string;
  phoneNumber: string;
  reason: string;
  statusID: string;
  timeType: string;
};
export default function ProfileUser() {
  const { dataLogin, isLogin } = useLoginContext();
  const [listAppointment, setListAppointment] = useState<TDataAppoinment[]>([]);

  async function getDataUser() {}
  async function getListAppointmentByUSer() {
    try {
      const response = await getAppoinmentsPatient(dataLogin.idUser);
      console.log(response);
      setListAppointment(
        response.data.data.map((item: any) => {
          return {
            fullName: item.fullName,
            gender: item.gender,
            address: item.address,
            date: item.date,
            dateOfBirth: item.dateOfBirth,
            phoneNumber: item.phoneNumber,
            reason: item.reason,
            statusID: item.statusID,
            timeType: item.timeType,
          };
        })
      );
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getListAppointmentByUSer();
  }, []);
  return (
    <>
      {isLogin ? (
        <Container sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid
              item
              xs={4}
              sx={{
                justifyContent: "center",
              }}
            >
              <Box
                sx={{
                  backgroundImage: `url(${dataLogin.image})`,
                  backgroundRepeat: "no-repeat",
                  backgroundSize: "auto",
                  // backgroundPosition: "center",
                  width: "200px",
                  height: "200px",
                  borderRadius: "12px",
                }}
              ></Box>
            </Grid>
            <Grid item xs={8}>
              <Box>
                <Typography sx={{ fontWeight: 600, fontSize: "20px", mb: 3 }}>
                  {dataLogin.firstName} {dataLogin.lastName}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Ngày sinh: {dataLogin.address}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Giới tính: {dataLogin.gender}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Địa chỉ: {dataLogin.address}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Số điện thoại: {dataLogin.phoneNumber}
                </Typography>
                <Typography sx={{ mb: 1 }}>
                  Vai trò: {dataLogin.roleId}
                </Typography>
              </Box>
            </Grid>
          </Grid>
          <Typography sx={{ fontWeight: 600, fontSize: "20px", mt: 5 }}>
            Lịch sử đặt lich khám bệnh của bệnh nhân
          </Typography>
          <Box sx={{ overflow: "auto" }}>
            <Box sx={{ mt: 2, minWidth: "1000px", mb: 3 }}>
              <Grid container>
                <Grid item xs={1}>
                  <Typography>STT</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Họ và tên</Typography>
                </Grid>
                <Grid item xs={1}>
                  <Typography>Giới tính</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Số điện thoại</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Địa chỉ</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Ngày sinh</Typography>
                </Grid>
                <Grid item xs={2}>
                  <Typography>Lý do khám</Typography>
                </Grid>
              </Grid>
              <Box>
                {listAppointment.length > 0 ? (
                  <Box>
                    {listAppointment.map((item, index) => {
                      return (
                        <Box key={"history" + index}>
                          <DividerCustom />
                          <Grid container>
                            <Grid item xs={1}>
                              <Typography>{index + 1}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography>{item.fullName}</Typography>
                            </Grid>
                            <Grid item xs={1}>
                              <Typography>{item.gender}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography>{item.phoneNumber}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography>{item.address}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography>{item.dateOfBirth}</Typography>
                            </Grid>
                            <Grid item xs={2}>
                              <Typography>{item.reason}</Typography>
                            </Grid>
                          </Grid>
                        </Box>
                      );
                    })}
                  </Box>
                ) : (
                  <Typography>No data</Typography>
                )}
              </Box>
            </Box>
          </Box>
        </Container>
      ) : (
        <Box sx={{ textAlign: "center" }}>
          <Typography
            sx={{ fontWeight: 600, color: "red", fontSize: "20px", mt: 3 }}
          >
            Vui lòng đăng nhập trước!{" "}
          </Typography>
        </Box>
      )}
    </>
  );
}
