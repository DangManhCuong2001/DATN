import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  Rating,
  TextField,
  Typography,
} from "@mui/material";
import { useHospitalContext } from "../../context/hospital-context";
import { ClearRounded } from "@mui/icons-material";
import { TAllDataDoctor } from "../../services/DoctorService/DoctorService";
import { useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import { saveRatePoint } from "../../services/PatientService/PatientService";
import useNotifier from "../../hooks/useNotifier";
import { TDataInfoRate } from "../../views/ProfileUser/ProfileUser";
import { v4 as uuidv4 } from "uuid";

export const labelsRate: { [index: string]: string } = {
  1: "Rất tệ",
  2: "Tệ",
  3: "Ổn",
  4: "Tốt",
  5: "Rất tốt",
};

// export type TDataRate = {
//   appointmentId:string,
//   userId:string,
//   doctorId:string,
//   point:string,
//   rateContent:string
// }

export default function ModalRate({
  dataInfoRate,
  getListAppointmentByUSer,
}: {
  dataInfoRate: TDataInfoRate;
  getListAppointmentByUSer: () => Promise<void>;
}) {
  const { openModalInfoDoctor, setOpenModalInfoDoctor } = useHospitalContext();
  const { notifySuccess, notifyError } = useNotifier();
  const [value, setValue] = useState<number | null>(3);
  const [hover, setHover] = useState(-1);
  const [contentRate, setContentRate] = useState<string>("");
  console.log("dataInfoRate", dataInfoRate);
  // console.log(data);
  function getLabelText(value: number) {
    return `${value} Star${value !== 1 ? "s" : ""}, ${labelsRate[value]}`;
  }

  async function handleRate() {
    try {
      const id = uuidv4();
      const rateInfo = {
        ...dataInfoRate,
        id: id,
        point: value,
        contentRate: contentRate,
      };
      console.log(rateInfo);
      const response = await saveRatePoint(rateInfo);
      console.log(response);
      getListAppointmentByUSer();
      setOpenModalInfoDoctor(false);
      notifySuccess("Đánh giá thành công!");
    } catch (err) {
      console.log(err);
      notifyError("Đánh giá thất bại!");
    }
  }
  return (
    <Dialog
      open={openModalInfoDoctor}
      sx={{
        "& .MuiPaper-root": {
          maxWidth: "100%!important",
          margin: "0!important",
          width: "500px",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          py: 1.5,
          alignItems: "center",
          px: { xs: 2, xsm: 4.5 },
          background:
            "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
        }}
      >
        <Typography variant="subtitle1" color={"text.primary"}>
          Đánh giá bác sĩ {dataInfoRate.doctorNameSelected}
        </Typography>
        <ClearRounded
          onClick={() => setOpenModalInfoDoctor(false)}
          sx={{
            color: (theme) => {
              return theme.palette.mode == "dark" ? "#4CADD3" : "#595F5A";
            },
            fontSize: "30px",
            cursor: "pointer",
          }}
        />
      </DialogTitle>
      <Box sx={{ mt: 3, px: 3 }}>
        <Box sx={{ display: "flex", placeItems: "center", gap: 1 }}>
          <Typography sx={{ minWidth: "90px" }}>Độ hài lòng:</Typography>
          <Box
            sx={{
              width: 200,
              display: "flex",
              alignItems: "center",
            }}
          >
            <Rating
              name="hover-feedback"
              value={value}
              precision={1}
              getLabelText={getLabelText}
              onChange={(event, newValue) => {
                setValue(newValue);
              }}
              onChangeActive={(event, newHover) => {
                setHover(newHover);
              }}
              emptyIcon={
                <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
              }
            />
            {value !== null && (
              <Box sx={{ ml: 2 }}>
                {labelsRate[hover !== -1 ? hover : value]}
              </Box>
            )}
          </Box>
        </Box>
        <Box sx={{ display: "flex", placeItems: "center", gap: 1, mt: 2 }}>
          <Typography sx={{ minWidth: "90px" }}>Nội dung:</Typography>
          <TextField
            value={contentRate}
            onChange={(e) => setContentRate(e.target.value)}
            fullWidth
            multiline
          />
        </Box>
        <Box sx={{ textAlign: "center" }}>
          <Button
            variant="contained"
            sx={{
              background:
                "linear-gradient(83.63deg, #00b5f1 33.34%, #00e0ff 113.91%)",
              mt: 2,
              mb: 2,
            }}
            onClick={handleRate}
          >
            Đánh giá
          </Button>
        </Box>
      </Box>
    </Dialog>
  );
}
