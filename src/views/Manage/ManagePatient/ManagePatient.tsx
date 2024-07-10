import { Box, Button, Grid, Input, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import { getListPatientForDoctor } from "../../../services/PatientService/PatientService";
import { useLoginContext } from "../../../context/login-context";
import moment from "moment";
import { doneAppointment } from "../../../services/DoctorService/DoctorService";
import useNotifier from "../../../hooks/useNotifier";

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
  const { notifyError, notifySuccess } = useNotifier();

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
      notifySuccess("Cập nhật thành công!");
    } catch (err) {
      console.log(err);
      notifyError("Cập nhật thất bại!");
    }
  }

  useEffect(() => {
    getListPatient();
  }, [date]);
  return (
    <Box>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "20px",
          fontWeight: 600,
          mb: 5,
          color: "#95A7AC",
          pt: 5,
        }}
      >
        Quản lý lịch sử khám
      </Typography>

      <Box>
        <Typography sx={{ color: "#95A7AC", mb: 1 }}>Chọn ngày khám</Typography>
        <Input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          sx={{
            color: "#95A7AC",
            // backgroundColor: "white",
            ".MuiOutlinedInput-notchedOutline": {
              borderColor: "#95A7AC",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#95A7AC",
            },
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#95A7AC",
            },
            ".MuiSvgIcon-root ": {
              fill: "#95A7AC !important",
            },
          }}
        />
      </Box>
      <Grid container sx={{ mt: 5 }}>
        <Grid item xs={1}>
          <Typography
            sx={{
              color: "#95A7AC",
            }}
          >
            STT
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{
              color: "#95A7AC",
            }}
          >
            Họ và tên
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{
              color: "#95A7AC",
            }}
          >
            Thời gian
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{
              color: "#95A7AC",
            }}
          >
            Số điện thoại
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{
              color: "#95A7AC",
            }}
          >
            Địa chỉ
          </Typography>
        </Grid>
        <Grid item xs={1}>
          <Typography
            sx={{
              color: "#95A7AC",
            }}
          >
            Giới tính
          </Typography>
        </Grid>
        <Grid item xs={2}>
          <Typography
            sx={{
              color: "#95A7AC",
            }}
          >
            Actions
          </Typography>
        </Grid>
      </Grid>
      {listPatient.map((item, index) => {
        return (
          <Box key={"Patient Book" + index}>
            <DividerCustom />
            <Grid container>
              <Grid item xs={1}>
                <Typography
                  sx={{
                    color: "#95A7AC",
                  }}
                >
                  {index + 1}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    color: "#95A7AC",
                  }}
                >
                  {item.fullName}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    color: "#95A7AC",
                  }}
                >
                  {item.timeType}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    color: "#95A7AC",
                  }}
                >
                  {item.phoneNumber}
                </Typography>
              </Grid>
              <Grid item xs={2}>
                <Typography
                  sx={{
                    color: "#95A7AC",
                  }}
                >
                  {item.address}
                </Typography>
              </Grid>
              <Grid item xs={1}>
                <Typography
                  sx={{
                    color: "#95A7AC",
                  }}
                >
                  {item.gender}
                </Typography>
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
