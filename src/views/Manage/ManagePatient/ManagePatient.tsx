import {
  Box,
  Button,
  FormControl,
  Grid,
  Input,
  MenuItem,
  Select,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import DividerCustom from "../../../components/DividerCustom/DividerCustom";
import { getListPatientForDoctor } from "../../../services/PatientService/PatientService";
import moment from "moment";
import {
  doneAppointment,
  getDoctors,
} from "../../../services/DoctorService/DoctorService";
import { TDoctor } from "../../../context/constants/typeData";
import ModalConfirm from "./ModalConfirm/ModalConfirm";
import { useModalContext } from "../../../context/modal-contex/modal-context";
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
  statusId: string;
};

export default function ManagePatient() {
  const [date, setDate] = useState<string>(
    moment(new Date()).format("YYYY-MM-DD")
  );
  const [listPatient, setListPatient] = useState<TListPatient[]>([]);
  const [doctors, setDoctors] = useState<TDoctor[]>([]);
  const [doctorSelected, setDoctorSelected] = useState<string>("");
  // console.log(doctors);
  const { openModal } = useModalContext();
  const { notifyError, notifySuccess } = useNotifier();

  async function getListPatient() {
    try {
      // const format2 = "YYYY-MM-DD";
      // const todayDate = moment(new Date()).format("YYYY-MM-DD");
      // const valueMoment = moment(date).format(format2);
      // const daySelected = new Date(valueMoment).getTime();
      const daySelected = moment(new Date(date)).startOf("day").valueOf();
      // console.log(date, daySelected, todayDate);
      const response = await getListPatientForDoctor(
        doctorSelected,
        daySelected
      );

      console.log(doctorSelected, daySelected, response);
      if (response.data.errCode == 0) {
        setListPatient(response.data.listPatientBook);
      }
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
    // openModal(
    //   "Xác nhận đã hoàn thành lịch hẹn",
    //   <ModalConfirm
    //     apppointmentId={apppointmentId}
    //     getListPatient={getListPatient}
    //   />,
    //   "600px"
    // );
  }

  async function getDataDoctors() {
    try {
      const response = await getDoctors();
      console.log(response);
      setDoctors(response.data.doctors);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataDoctors();
  }, []);

  useEffect(() => {
    getListPatient();
  }, [date, doctorSelected]);
  return (
    <Box sx={{ minHeight: "900px" }}>
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
        <Grid container spacing={3}>
          <Grid item xs={4}>
            <Box>
              <Typography sx={{ color: "#95A7AC", mb: 1 }}>
                Chọn bác sĩ
              </Typography>
              <FormControl fullWidth>
                <Select
                  value={doctorSelected}
                  onChange={(e) => setDoctorSelected(e.target.value)}
                  sx={{
                    color: "#95A7AC",

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
                  // onChange={(e) => handleSelectDoctor(e.target.value)}
                >
                  {doctors.map((doctor, index) => {
                    return (
                      <MenuItem
                        key={"doctor selected" + index}
                        value={doctor.id}
                      >
                        {doctor.firstName} {doctor.lastName}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Box>
          </Grid>
          <Grid item xs={4}>
            <Box>
              <Typography sx={{ color: "#95A7AC", mb: 1 }}>
                Chọn ngày khám
              </Typography>
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
          </Grid>
        </Grid>
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
          <Box sx={{ textAlign: "right" }}>
            <Typography
              sx={{
                color: "#95A7AC",
              }}
            >
              Actions
            </Typography>
          </Box>
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
                {item.statusId == "S2" ? (
                  <Button
                    variant="contained"
                    color="success"
                    onClick={() => handleClickDone(item.id)}
                  >
                    Hoàn thành
                  </Button>
                ) : (
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      sx={{
                        color: "#95A7AC",
                      }}
                    >
                      Đã khám
                    </Typography>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
}
