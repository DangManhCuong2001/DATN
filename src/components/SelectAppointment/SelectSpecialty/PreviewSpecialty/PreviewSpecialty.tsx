import { Box, Typography } from "@mui/material";
import React from "react";
import DividerCustom from "../../../DividerCustom/DividerCustom";
import { TDataSelectSpecialty } from "../SelectSpecialty";
import { useNavigate, useParams } from "react-router-dom";
import { useHospitalContext } from "../../../../context/hospital-context";

export default function PreviewSpecialty({
  data,
}: {
  data: TDataSelectSpecialty;
}) {
  const { idHospital } = useParams();
  const Navigate = useNavigate();
  const { setDataForm, dataForm } = useHospitalContext();
  return (
    <Box sx={{ px: 2 }}>
      <DividerCustom />
      <Typography
        onClick={() => {
          setDataForm({
            ...dataForm,
            nameSpecialtySelected: data.nameSpecialty,
          });
          Navigate(`/SelectAppointment/${idHospital}/${data.id}`);
        }}
        sx={{
          textTransform: "uppercase",
          fontWeight: 600,
          fontSize: "20px",
          cursor: "pointer",
          "&:hover": {
            color: "#00b5f1",
            opacity: 1,
          },
        }}
      >
        {data.nameSpecialty}
      </Typography>
    </Box>
  );
}
