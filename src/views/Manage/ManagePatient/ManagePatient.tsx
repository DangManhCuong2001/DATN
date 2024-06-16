import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import { getListPatientForDoctor } from "../../../services/PatientService/PatientService";
import { useLoginContext } from "../../../context/login-context";
import moment from "moment";
import { doneAppointment } from "../../../services/DoctorService/DoctorService";

type TListPatient = {
  id: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  reason: string;
  dateOfBirth: string;
  timeType: string;
};

export default function ManagePatient() {
  const { dataLogin } = useLoginContext();
  const [date, setDate] = useState<string>("");
  const [listPatient, setListPatient] = useState<TListPatient[]>([]);
  async function getListPatient() {
    try {
      // const format2 = "YYYY-MM-DD";

      // const valueMoment = moment(date).format(format2);
      // const daySelected = new Date(valueMoment).getTime();
      const daySelected = moment(new Date(date)).startOf("day").valueOf();
      // console.log(xx);
      const response = await getListPatientForDoctor(
        dataLogin.idUser,
        daySelected
      );

      console.log(dataLogin.idUser, daySelected, response);
      setListPatient(response.data.listPatientBook);
    } catch (err) {
      console.log(err);
    }
  }

  async function handleClickDone(apppointmentId: string) {
    try {
      const response = await doneAppointment(apppointmentId);
      console.log(apppointmentId, response);
      getListPatient();
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getListPatient();
  }, [date]);
  return (
    <Box>
      <Typography
        sx={{ textAlign: "center", fontSize: "20px", fontWeight: 600, mb: 5 }}
      >
        Quản lý bệnh nhân
      </Typography>

      <Box>
        <Typography>Chọn ngày khám</Typography>
        <TextField
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </Box>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={1}>
          <Typography>STT</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Họ và tên</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Thời gian</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Số điện thoại</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Địa chỉ</Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography>Giới tính</Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography>Actions</Typography>
        </Grid>
      </Grid>
      {listPatient.map((item, index) => {
        return (
          <Box key={"Patient Book" + index}>
            <DividerCustom />
            <Grid container>
              <Grid item xs={1}>
                <Typography>{index + 1}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.fullName}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.timeType}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.phoneNumber}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography>{item.address}</Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography>{item.gender}</Typography>
              </Grid>
              <Grid item xs={2}>
                <Button
                  variant="contained"
                  color="success"
                  onClick={() => handleClickDone(item.id)}
                >
                  Hoàn thành
                </Button>
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}
