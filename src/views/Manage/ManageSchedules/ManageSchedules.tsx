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
import { saveBulkSchedule } from "../../../services/UserService/UserService";
import { useLoginContext } from "../../../context/login-context";
import useNotifier from "../../../hooks/useNotifier";
import { getDoctors } from "../../../services/DoctorService/DoctorService";
import { TDoctor } from "../../../context/constants/typeData";

type TRangeTime = {
  id: number;
  key: string;
  value: string;
  isSelected: boolean;
};

export type TNewSchedule = {
  dayPicked: string;
  rangeTimes: TRangeTime[];
  doctorSelected: string;
};

export const initRangeTime: TRangeTime[] = [
  { id: 1, key: "T1", value: "8:00 - 9:00", isSelected: false },
  {
    id: 2,
    key: "T2",
    value: "9:00 - 10:00",
    isSelected: false,
  },
  {
    id: 3,
    key: "T3",
    value: "20:00 - 11:00",
    isSelected: false,
  },
  {
    id: 4,
    key: "T4",
    value: "11:00 - 12:00",
    isSelected: false,
  },
  {
    id: 5,
    key: "T5",
    value: "13:00 - 14:00",
    isSelected: false,
  },
  {
    id: 6,
    key: "T6",
    value: "14:00 - 15:00",
    isSelected: false,
  },
  {
    id: 7,
    key: "T7",
    value: "15:00 - 16:00",
    isSelected: false,
  },
  {
    id: 8,
    key: "T8",
    value: "16:00 - 17:00",
    isSelected: false,
  },
];
export default function ManageSchedules() {
  // const { doctors } = useManageContext();
  const { dataLogin } = useLoginContext();
  const [newSchedule, setNewSchedule] = useState<TNewSchedule>({
    dayPicked: "",
    rangeTimes: [],
    doctorSelected: "",
  });
  const [rangeTime, setRangeTime] = useState<TRangeTime[]>(initRangeTime);
  // const [isSelected,setIsSelected] = useState<boolean>(false)
  const { notifyError, notifySuccess } = useNotifier();
  const [doctors, setDoctors] = useState<TDoctor[]>([]);
  console.log(newSchedule);

  async function getListDoctors() {
    try {
      const response = await getDoctors();
      console.log(response);
      setDoctors(response.data.doctors);
    } catch (err) {
      console.log(err);
    }
  }

  // async function getRangeTime() {
  //   try {
  //     const response = await getDataAllCode("TIME");
  //     console.log(response);
  //     setRangeTime(response.data);
  //   } catch (err) {
  //     console.log(err);
  //   }
  // }

  const handleClickTime = (time: TRangeTime) => {
    if (rangeTime && rangeTime.length > 0) {
      const newRangeTime = rangeTime.map((item) => {
        if (item.id === time.id) item.isSelected = !item.isSelected;
        return item;
      });
      setRangeTime(newRangeTime);
    }
  };

  async function handleSaveTime() {
    try {
      let result: any[] = [];
      // if (!dayPicked) {
      //     toast.error("Vui long chon ngay");
      //     return;
      // }
      // if (selectedOption && _.isEmpty(selectedOption)) {
      //     toast.error('Vui long chon bac si');
      //     return;
      // }
      let formatedDate = new Date(newSchedule.dayPicked).getTime();
      console.log(formatedDate);

      if (rangeTime && rangeTime.length > 0) {
        let selectedTime = rangeTime.filter((item) => item.isSelected === true);
        if (selectedTime && selectedTime.length > 0) {
          selectedTime.map((schedule) => {
            let object: any = {};
            object.doctorId =
              dataLogin.roleId == "doctor"
                ? dataLogin.idUser
                : newSchedule.doctorSelected;
            object.date = formatedDate;
            object.timeType = schedule.key;
            result.push(object);
          });
        } else {
          // toast.error("Vui long chon gio")
          return;
        }
      }
      console.log("result", result);

      // let res = await saveBulkSchedule(result);

      let res = await saveBulkSchedule({
        arrSchedule: result,
        doctorId:
          dataLogin.roleId == "doctor"
            ? dataLogin.idUser
            : newSchedule.doctorSelected,
        formatedDate: formatedDate,
      });
      notifySuccess("Thêm lịch khám thành công!");
      // if (res && res.errCode === 0) {
      //   toast.success("Luu thanh cong")
      // } else {
      //   toast.error("Luu that bai")
      //   console.log("res", res);
      // }
    } catch (err) {
      console.log(err);
      notifyError("Thêm lịch khám thất bại!");
    }
  }

  useEffect(() => {
    getListDoctors();
  }, []);

  return (
    <Box sx={{ backgroundColor: "#1B2626", borderRadius: "20px", my: 8, p: 3 }}>
      <Grid container spacing={4}>
        <Grid item xs={6} md={4}>
          <Box>
            {dataLogin.roleId == "doctor" ? (
              <Box>
                <Typography sx={{ color: "#95A7AC", mb: 1 }}>
                  Chọn bác sĩ
                </Typography>
                <Typography>
                  {dataLogin.firstName} {dataLogin.lastName}
                </Typography>
              </Box>
            ) : (
              <Box sx={{ mb: 2 }}>
                <Typography sx={{ color: "#95A7AC", mb: 1 }}>
                  Chọn bác sĩ
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={newSchedule.doctorSelected}
                    onChange={(e) =>
                      setNewSchedule({
                        ...newSchedule,
                        doctorSelected: e.target.value,
                      })
                    }
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
                    // onChange={(e) => setNewSchedule(e.target.value)}
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
            )}
          </Box>
        </Grid>
        <Grid item xs={6} md={8}>
          <Box>
            <Typography sx={{ color: "#95A7AC", mb: 1 }}>Chọn ngày</Typography>
            {/* <DatePicker
            className="form-control"
            value={this.state.dayPicked}
            minDate={yesterday}
            onChange={this.handleChangeDatePicker}
          /> */}
            <Input
              type="date"
              value={newSchedule.dayPicked}
              onChange={(e) => {
                console.log(e.target.value);
                setNewSchedule({ ...newSchedule, dayPicked: e.target.value });
              }}
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
            ></Input>
          </Box>
        </Grid>
      </Grid>
      <Box>
        {rangeTime &&
          rangeTime.length > 0 &&
          rangeTime.map((item, index) => {
            return (
              <Button
                onClick={() => handleClickTime(item)}
                variant={item.isSelected === true ? "contained" : "outlined"}
                key={index}
                sx={{ mr: 2, mb: 1 }}
              >
                {" "}
                {item.value}
              </Button>
            );
          })}
      </Box>
      <Box>
        <Button variant="contained" onClick={() => handleSaveTime()}>
          Lưu
        </Button>
      </Box>
    </Box>
  );
}
