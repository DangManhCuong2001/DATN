import { Box, Button, Grid, MenuItem, Select, Typography } from "@mui/material";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useHospitalContext } from "../../../context/hospital-context";
import { Container } from "../../container/Container";
import moment from "moment";
import { getScheduleDoctors } from "../../../services/DoctorService/DoctorService";

type TObject = {
  label: string;
  value: number;
};
export default function SelectDate() {
  const navigate = useNavigate();
  const { idHospital, idDoctor } = useParams();
  const { infoHospital, setDataForm, listDoctorByHospital, dataForm } =
    useHospitalContext();
  const [allDays, setAllDays] = useState<TObject[]>([]);
  const [listSchedule, setListSchedule] = useState([]);

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

  useEffect(() => {
    getDataScheduleDoctor();
  }, [idDoctor, allDays, dataForm.daySelected]);

  useEffect(() => {
    getArrDays();

    setDataForm((prev) => {
      return {
        ...prev,
        hospitalSelected: idHospital as string,
        doctorSelected: idDoctor as string,
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
                  Vui lòng chọn thời gian khám
                </Typography>
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
                    justifyContent: "space-between",
                    display: "flex",
                  }}
                >
                  {listSchedule.map((item: any, index) => {
                    return (
                      <Button
                        onClick={() => handleSlectTime(item.timeType)}
                        variant={
                          item.timeType === dataForm.hourSelected
                            ? "contained"
                            : "outlined"
                        }
                        key={"day" + index}
                      >
                        {" "}
                        {item.Allcode.value}
                      </Button>
                    );
                  })}
                </Box>
                <Typography sx={{ mt: 3 }}>
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
