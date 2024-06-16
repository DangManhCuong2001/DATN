import axios from "axios";
import { TDataForm } from "../../context/hospital-context";
import { BACKEND_DOMAIN } from "../BackendDomain";
import { TDataVerify } from "../../views/VerifyBooking/VerifyBooking";

export const bookingAppointment = async (dataForm: TDataForm) => {
  return await axios.post(
    `${BACKEND_DOMAIN}/api/patient-book-appointment`,
    dataForm
  );
};

export const getListPatientForDoctor = async (
  idDoctor: string,
  date: number
) => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/get-list-patient-doctor?doctorId=${idDoctor}&date=${date}`
  );
};

export const postVerifyBookAppointment = async (dataVerify: TDataVerify) => {
  return await axios.post(
    `${BACKEND_DOMAIN}/api/verify-book-appointment`,
    dataVerify
  );
};

export const getAppoinmentsPatient = async (userId: string) => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/get-appointments-patient?userId=${userId}`
  );
};
