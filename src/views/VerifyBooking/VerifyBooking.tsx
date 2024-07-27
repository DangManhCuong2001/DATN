import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { postVerifyBookAppointment } from "../../services/PatientService/PatientService";
import { Box, Typography } from "@mui/material";

export type TDataVerify = {
  token: string;
  doctorId: string;
};
export default function VerifyBooking() {
  const URLParam = new URLSearchParams(location.search);
  const token = URLParam.get("token");
  const doctorId = URLParam.get("doctorId");
  console.log(doctorId, token);
  const [statusVerify, setStatusVerify] = useState<boolean>(false);

  async function postVerify() {
    try {
      const response = await postVerifyBookAppointment({
        token: token as string,
        doctorId: doctorId as string,
      });

      console.log(response);
      if (response && response.data.errCode == 0) {
        setStatusVerify(true);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    postVerify();
  }, []);
  return (
    <Box sx={{ mt: 5, textAlign: "center", minHeight: "550px" }}>
      {statusVerify ? (
        <Typography sx={{ fontWeight: 600, color: "green", fontSize: "20px" }}>
          Xác nhận lịch hẹn thành công!
        </Typography>
      ) : (
        <Typography sx={{ fontWeight: 600, color: "red", fontSize: "20px" }}>
          Lịch hẹn không tồn tại hoặc đã được xác nhận!
        </Typography>
      )}
    </Box>
  );
}
