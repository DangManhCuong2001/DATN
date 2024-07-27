import { Box, Button, Grid, Typography } from "@mui/material";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import WcIcon from "@mui/icons-material/Wc";
import { useHospitalContext } from "../../../context/hospital-context";
import { useNavigate, useParams } from "react-router-dom";
import {
  TAllDataDoctor,
  TDataDoctorByHospital,
} from "../../../services/DoctorService/DoctorService";
import MedicalServicesRoundedIcon from "@mui/icons-material/MedicalServicesRounded";
import AttachMoneyRoundedIcon from "@mui/icons-material/AttachMoneyRounded";

export default function PreviewDoctor({
  data,
}: {
  data: TDataDoctorByHospital;
}) {
  const { setDataForm, dataForm } = useHospitalContext();
  const navigate = useNavigate();
  const { idHospital, idSpeciality } = useParams();
  console.log("dfdfd", data);
  // useEffect(() => {
  //   // setHospitalSelected(idHospital as string);
  //   setDataForm((prev) => {
  //     return {
  //       ...prev,
  //       doctorSelected: doctorId,
  //     };
  //   });
  // }, []);
  return (
    <>
      <Box
        sx={{
          p: 2,
          borderRadius: "12px",
          mb: 3,
          display: "flex",
          placeItems: "center",
          gap: 2,
          justifyContent: "space-between",
          border: "2px solid #00b5f1!important",
          boxShadow: "0 4px 15px rgba(116,157,206,.5)!important",
        }}
      >
        <Box sx={{ display: "flex" }}>
          <img
            src={data.image}
            style={{
              width: "120px",
              height: "120px",
              borderRadius: "12px",
              marginRight: "10px",
            }}
          />

          <Box>
            <Box sx={{ display: "flex", placeItems: "center", mb: 1, gap: 1 }}>
              <PersonRoundedIcon sx={{ color: " #00b5f1 " }} />
              <Typography>{data.firstName + " " + data.lastName}</Typography>
            </Box>
            <Box sx={{ display: "flex", placeItems: "center", mb: 1, gap: 1 }}>
              <WcIcon sx={{ color: " #00b5f1 " }} />
              <Typography>Giới tính: {data.gender}</Typography>
            </Box>
            <Box sx={{ display: "flex", placeItems: "center", mb: 1, gap: 1 }}>
              <MedicalServicesRoundedIcon sx={{ color: " #00b5f1 " }} />
              <Typography>Chuyên khoa: {data.nameSpecialty}</Typography>
            </Box>
            {/* <Box sx={{ display: "flex", placeItems: "center" }}>
              <PersonRoundedIcon />
              <Typography>Lịch khám: Thứ 2, 3, 4, 5, 6</Typography>
            </Box> */}
            <Box sx={{ display: "flex", placeItems: "center", gap: 1 }}>
              <AttachMoneyRoundedIcon sx={{ color: " #00b5f1 " }} />
              <Typography>Giá khám: {data.price}</Typography>
            </Box>
          </Box>
        </Box>

        <Box sx={{ ml: 0 }}>
          <Box sx={{ mb: 2 }}>
            <Button
              variant="contained"
              onClick={() => {
                navigate(`/doctor/${data.doctorId}`);
                // setOpenModalInfoDoctor(true);
              }}
              sx={{
                width: "160px",
                background:
                  "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
              }}
            >
              Xem chi tiết
            </Button>
          </Box>
          <Box>
            <Button
              variant="contained"
              onClick={() => {
                setDataForm({
                  ...dataForm,
                  fullNameDoctor: data.firstName + data.lastName,
                  doctorInfoId: data.doctorInfoId,
                });
                navigate(
                  `/SelectAppointment/${idHospital}/${idSpeciality}/${data.doctorId}`
                );
              }}
              sx={{
                width: "160px",
                background:
                  "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
              }}
            >
              Đặt lịch ngay
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
