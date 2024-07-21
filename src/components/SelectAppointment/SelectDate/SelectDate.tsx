import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import {
  initDataInfoDoctor,
  useHospitalContext,
} from "../../../context/hospital-context";
import { Container } from "../../container/Container";
import moment from "moment";
import {
  TAllDataDoctor,
  getInfoDoctor,
  getScheduleDoctors,
} from "../../../services/DoctorService/DoctorService";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import MasksRoundedIcon from "@mui/icons-material/MasksRounded";
import LinkCustom from "../../LinkCustom/LinkCustom";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { initRangeTime } from "../../../views/Manage/ManageSchedules/ManageSchedules";

type TObject = {
  label: string;
  value: number;
};
export default function SelectDate() {
  const navigate = useNavigate();
  const { idHospital, idDoctor } = useParams();
  const { infoHospital, setDataForm, dataForm } = useHospitalContext();
  const [allDays, setAllDays] = useState<TObject[]>([]);
  const [listSchedule, setListSchedule] = useState([]);
  const [dataDoctor, setDataDoctor] =
    useState<TAllDataDoctor>(initDataInfoDoctor);

  console.log(dataForm);
  console.log(allDays);
  function capitalizeFirstLetter(value: string) {
    return value.charAt(0).toUpperCase() + value.slice(1);
  }

  const getArrDays = async () => {
    let alldays = [];
    for (let i = 0; i < 7; i++) {
      let object: TObject = { label: "", value: 0 };
      if (i === 0) {
        let ddMM = moment(new Date()).format("DD/MM");
        let today = `Hôm nay - ${ddMM}`;
        object.label = today;
      } else {
        let labelVi = moment(new Date()).add(i, "days").format("dddd - DD/MM");
        object.label = capitalizeFirstLetter(labelVi);
      }
      object.value = moment(new Date()).add(i, "days").startOf("day").valueOf();
      // console.log(object);
      alldays.push(object);
    }
    // console.log(allDays);
    setAllDays(alldays);
  };

  async function getDataScheduleDoctor() {
    console.log("xxxx", idDoctor, allDays, dataForm.daySelected);
    const format2 = "YYYY-MM-DD";

    const valueMoment = moment(dataForm.daySelected).format(format2);
    const daySelected = new Date(valueMoment).getTime();
    console.log(valueMoment, daySelected);

    try {
      const response = await getScheduleDoctors(
        idDoctor as string,
        daySelected
      );
      console.log(response);
      setListSchedule(response.data.data);
    } catch (err) {
      console.log(err);
    }
  }

  function handleSlectTime(time: string) {
    setDataForm({
      ...dataForm,
      hourSelected: time,
    });
    navigate("/form-booking");
  }

  async function getDataInfoDoctor() {
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
    getDataScheduleDoctor();
  }, [idDoctor, allDays, dataForm.daySelected]);

  useEffect(() => {
    getArrDays();
    getDataInfoDoctor();
    setDataForm((prev) => {
      return {
        ...prev,
        hospitalSelected: idHospital as string,
        doctorSelected: idDoctor as string,
      };
    });
  }, []);
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", py: 5, minHeight: "600px" }}>
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
          Chọn ngày khám
        </Typography>
      </Container>
      <Container>
        <Grid container spacing={4}>
          <Grid item xs={6} md={3.5}>
            <Box
              sx={{
                background: "white",
                borderRadius: "12px",
                // p: 2,
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
              <Box sx={{ p: 2 }}>
                <Box sx={{ display: "flex" }}>
                  <ApartmentRoundedIcon />
                  <Box sx={{ ml: 1 }}>
                    <Typography sx={{ fontSize: "20px" }}>
                      {infoHospital.name}
                    </Typography>
                    <Typography>{infoHospital.address}</Typography>
                  </Box>
                </Box>

                <Box sx={{ display: "flex", mt: 2 }}>
                  <MedicalServicesRoundedIcon />
                  <Typography sx={{ fontSize: "20px", ml: 1 }}>
                    Chuyên khoa: {dataDoctor.nameSpecialty}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", mt: 2 }}>
                  <MasksRoundedIcon />
                  <Typography sx={{ fontSize: "20px", ml: 1 }}>
                    Bác sĩ: {dataDoctor.firstName + " " + dataDoctor.lastName}
                  </Typography>
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
                  Vui lòng chọn thời gian khám
                </Typography>
              </Box>
              <Box sx={{ p: 2 }}>
                <Box>
                  <Select
                    value={dataForm.daySelected}
                    onChange={(e) =>
                      setDataForm({
                        ...dataForm,
                        daySelected: e.target.value,
                      })
                    }
                    sx={{ width: "200px" }}
                  >
                    {allDays &&
                      allDays.length > 0 &&
                      allDays.map((item, index) => {
                        return (
                          <MenuItem key={"day" + index} value={item.value}>
                            {item.label}
                          </MenuItem>
                        );
                      })}
                  </Select>
                </Box>
                <Box
                  sx={{
                    mt: 3,
                  }}
                >
                  {listSchedule.map((item: any, index) => {
                    const valueTime = initRangeTime.find(
                      (rangeT) => rangeT.key == item.timeType
                    );
                    console.log(valueTime);
                    return (
                      <Button
                        onClick={() => handleSlectTime(item.timeType)}
                        variant={
                          item.timeType === dataForm.hourSelected
                            ? "contained"
                            : "outlined"
                        }
                        key={"day" + index}
                        sx={{ mr: 4, mt: 2, width: "170px" }}
                      >
                        {" "}
                        {valueTime?.value}
                      </Button>
                    );
                  })}
                </Box>
                <Typography sx={{ mt: 3 }}>
                  Chọn và đặt (Phí đặt lịch 0đ)
                </Typography>
                <Typography sx={{ mt: 2 }}>
                  Tất cả thời gian theo múi giờ Việt Nam GMT +7
                </Typography>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
