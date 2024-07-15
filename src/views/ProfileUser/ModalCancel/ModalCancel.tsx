import { Button, DialogContent, Typography } from "@mui/material";
import React from "react";
import { useModalContext } from "../../../context/modal-contex/modal-context";
import { cancelAppointment } from "../../../services/PatientService/PatientService";
import useNotifier from "../../../hooks/useNotifier";

export default function ModalCancel({
  appointmentId,
  getListAppointmentByUSer,
}: {
  appointmentId: string;
  getListAppointmentByUSer: () => Promise<void>;
}) {
  const { closeModal } = useModalContext();
  const { notifyError, notifySuccess } = useNotifier();

  async function cancel() {
    try {
      const response = await cancelAppointment(appointmentId);
      notifySuccess("Huỷ lịch hẹn thành công!");
      getListAppointmentByUSer();
      closeModal();
    } catch (err) {
      notifyError("Huỷ lịch hẹn thất bại!");
      console.log(err);
    }
  }
  return (
    <DialogContent sx={{ px: { xs: 2, xsm: 5 }, textAlign: "center" }}>
      <Button
        variant="contained"
        color="error"
        sx={{ width: "150px", mr: 5 }}
        onClick={cancel}
      >
        Huỷ
      </Button>
      <Button
        variant="contained"
        color="primary"
        sx={{ width: "150px" }}
        onClick={closeModal}
      >
        Không huỷ
      </Button>
    </DialogContent>
  );
}
