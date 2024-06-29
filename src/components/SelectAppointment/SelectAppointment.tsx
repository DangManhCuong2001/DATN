import { Box, Grid, Typography } from "@mui/material";
import { Container } from "../container/Container";
import ApartmentRoundedIcon from "@mui/icons-material/ApartmentRounded";
import PreviewDoctor from "./PreviewDoctor/PreviewDoctor";
import { useHospitalContext } from "../../context/hospital-context";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import SelectSpecialty from "./SelectSpecialty/SelectSpecialty";

export default function SelectAppointment() {
  const { idHospital } = useParams();
  const { infoHospital, setDataForm, listDoctorByHospital } =
    useHospitalContext();

  useEffect(() => {
    // setHospitalSelected(idHospital as string);
    setDataForm((prev) => {
      return {
        ...prev,
        hospitalSelected: idHospital as string,
      };
    });
  }, []);
  return <SelectSpecialty />;
}
