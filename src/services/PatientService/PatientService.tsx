import axios from "axios";
import { TDataForm } from "../../context/hospital-context";
import { BACKEND_DOMAIN } from "../BackendDomain";

export const bookingAppointment = async (dataForm: TDataForm) => {
  return await axios.post(
    `${BACKEND_DOMAIN}/api/patient-book-appointment`,
    dataForm
  );
};
