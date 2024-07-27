import { Box, Typography } from "@mui/material";
import MyselfForm from "./MyselfForm/MyselfForm";
import { useHospitalContext } from "../../context/hospital-context";
import moment from "moment";
import { initRangeTime } from "../Manage/ManageSchedules/ManageSchedules";

export default function Schedule() {
  const { dataForm, infoDoctor } = useHospitalContext();
  console.log(dataForm, infoDoctor);
  const valueTime = initRangeTime.find(
    (rangeT) => rangeT.key == dataForm.hourSelected
  );
  return (
    <Box sx={{ backgroundColor: "#e8f2f7", px: 40, py: 5 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography
          sx={{ fontWeight: 600, mb: 3, fontSize: "28px", color: "#00b5f1" }}
        >
          ĐẶT LỊCH KHÁM
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          py: 2,
          gap: 3,
          placeItems: "center",
        }}
      >
        {/* <Box
          sx={{
            backgroundImage: `url(${infoDoctor.image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "160px",
            height: "160px",
            borderRadius: "10px",
            mr: 3,
          }}
        ></Box> */}
        <img
          src={infoDoctor.image}
          style={{
            width: "160px",
            height: "160px",
            borderRadius: "10px",
            marginRight: 3,
          }}
        ></img>
        <Box>
          <Typography
            sx={{ fontSize: "20px", fontWeight: 600, color: "#00b5f1" }}
          >
            Bác sĩ: {infoDoctor.firstName} {infoDoctor.lastName}
          </Typography>
          <Typography
            sx={{ fontSize: "20px", fontWeight: 600, color: "#00b5f1" }}
          >
            Thời gian: {valueTime?.value} ({" "}
            {moment(new Date(dataForm.daySelected)).format("dddd - DD/MM/YYYY")}
            )
          </Typography>
          <Typography
            sx={{ fontSize: "20px", fontWeight: 600, color: "#00b5f1" }}
          >
            Giá khám :{infoDoctor.price} đ
          </Typography>
        </Box>
      </Box>
      <MyselfForm />
    </Box>
  );
}
