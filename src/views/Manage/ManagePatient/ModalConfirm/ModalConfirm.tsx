import { Button, DialogContent } from "@mui/material";
import { useModalContext } from "../../../../context/modal-contex/modal-context";
import useNotifier from "../../../../hooks/useNotifier";
import { doneAppointment } from "../../../../services/DoctorService/DoctorService";

export default function ModalConfirm({
  apppointmentId,
  getListPatient,
}: {
  apppointmentId: string;
  getListPatient: () => Promise<void>;
}) {
  const { closeModal } = useModalContext();
  const { notifyError, notifySuccess } = useNotifier();
  console.log("dfdsfd");

  async function confirm() {
    try {
      const response = await doneAppointment(apppointmentId);
      console.log(apppointmentId, response);
      getListPatient();
      notifySuccess("Cập nhật thành công!");
    } catch (err) {
      console.log(err);
      notifyError("Cập nhật thất bại!");
    }
  }
  return (
    <DialogContent sx={{ px: { xs: 2, xsm: 5 }, textAlign: "center" }}>
      <Button
        variant="contained"
        color="success"
        sx={{ width: "150px", mr: 5 }}
        onClick={confirm}
      >
        Xác nhận
      </Button>
      <Button
        variant="contained"
        color="warning"
        sx={{ width: "150px" }}
        onClick={closeModal}
      >
        Huỷ
      </Button>
    </DialogContent>
  );
}
