import { Box, Typography } from "@mui/material";
import React, { useEffect } from "react";
import PersonRoundedIcon from "@mui/icons-material/PersonRounded";
import WcIcon from "@mui/icons-material/Wc";
import { useHospitalContext } from "../../../context/hospital-context";
import { TSpecialty } from "../../../context/constants/typeData";
import { useNavigate, useParams } from "react-router-dom";

export default function PreviewDoctor({
  name,
  gender,
  specialty,
  price,
  doctorId,
}: {
  name: string;
  gender: string;
  specialty: string;
  price: string;
  doctorId: string;
}) {
  const { setDataForm } = useHospitalContext();
  const navigate = useNavigate();
  const { idHospital } = useParams();

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
    <Box
      onClick={() => navigate(`/SelectAppointment/${idHospital}/${doctorId}`)}
      sx={{
        p: 2,
        border: "1px solid",
        borderRadius: "12px",
        cursor: "pointer",
        mb: 3,
      }}
    >
      <Box sx={{ display: "flex", placeItems: "center" }}>
        <PersonRoundedIcon />
        <Typography>{name}</Typography>
      </Box>
      <Box sx={{ display: "flex", placeItems: "center" }}>
        <WcIcon />
        <Typography>Giới tính: {gender}</Typography>
      </Box>
      <Box sx={{ display: "flex", placeItems: "center" }}>
        <PersonRoundedIcon />
        <Typography>Chuyên khoa: {specialty}</Typography>
      </Box>
      <Box sx={{ display: "flex", placeItems: "center" }}>
        <PersonRoundedIcon />
        <Typography>Lịch khám: Thứ 2, 3, 4, 5, 6</Typography>
      </Box>
      <Box sx={{ display: "flex", placeItems: "center" }}>
        <PersonRoundedIcon />
        <Typography>Giá khám: {price}</Typography>
      </Box>
    </Box>
  );
}
