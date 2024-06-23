import { Box, Typography } from "@mui/material";
import MyselfForm from "./MyselfForm/MyselfForm";
import { useHospitalContext } from "../../context/hospital-context";
import moment from "moment";

export default function Schedule() {
  const { dataForm, infoDoctor } = useHospitalContext();
  console.log(dataForm, infoDoctor);

  return (
    <Box sx={{ px: 40 }}>
      <Box sx={{ textAlign: "center" }}>
        <Typography sx={{ fontWeight: 600, my: 3, fontSize: "28px" }}>
          ĐẶT LỊCH KHÁM
        </Typography>
      </Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 2, gap: 3 }}>
        <Box
          sx={{
            backgroundImage: `url(${infoDoctor.image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "160px",
            height: "160px",
            borderRadius: "10px",
            mr: 3,
          }}
        ></Box>
        <Box>
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Bác sĩ: {infoDoctor.firstName} {infoDoctor.lastName}
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Thời gian: {dataForm.hourSelected} -{" "}
            {moment(new Date(dataForm.daySelected)).format("dddd - DD/MM/YYYY")}
          </Typography>
          <Typography sx={{ fontSize: "20px", fontWeight: 600 }}>
            Giá khám :{infoDoctor.price} đ
          </Typography>
        </Box>
      </Box>
      <MyselfForm />
    </Box>
  );
}
