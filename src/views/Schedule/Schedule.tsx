import { Box, Typography } from "@mui/material";
import MyselfForm from "./MyselfForm/MyselfForm";
import { useHospitalContext } from "../../context/hospital-context";
import moment from "moment";

export default function Schedule() {
  const { dataForm, infoDoctor } = useHospitalContext();
  console.log(dataForm, infoDoctor);

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "center", py: 2 }}>
        {/* <img
          src={imagePath.COT_SONG}
          style={{
            width: "120px",
            height: "120px",
            borderRadius: "50%",
            marginRight: "10px",
          }}
        /> */}
        <Box
          sx={{
            backgroundImage: `url(${infoDoctor.image})`,
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center",
            width: "120px",
            height: "120px",
            borderRadius: "10px",
            mr: 3,
          }}
        ></Box>
        <Box>
          <Typography>ĐẶT LỊCH KHÁM</Typography>
          <Typography>
            Bác sĩ {infoDoctor.firstName} {infoDoctor.lastName}
          </Typography>
          <Typography>
            {dataForm.hourSelected} -{" "}
            {moment(new Date(dataForm.daySelected)).format("dddd - DD/MM/YYYY")}
          </Typography>
          <Typography>Giá khám :{infoDoctor.price} đ</Typography>
        </Box>
      </Box>
      <MyselfForm />
    </Box>
  );
}
