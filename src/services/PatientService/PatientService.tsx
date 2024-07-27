import axios from "axios";
import { TDataForm } from "../../context/hospital-context";
import { BACKEND_DOMAIN } from "../BackendDomain";
import { TDataVerify } from "../../views/VerifyBooking/VerifyBooking";
import { TDataInfoRate } from "../../views/ProfileUser/ProfileUser";
import { TEditProfile } from "../../views/ProfileUser/ModalEditProfile/ModalEditProfile";
import { TNewPassword } from "../../views/ProfileUser/ModalEditPassword/ModalEditPassword";
import { TTypeHospital } from "../../context/constants/typeData";
import { TReturnAllDataHospital } from "../HospitalService/HospitalService";

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

export const saveRatePoint = async (dataRate: TDataInfoRate) => {
  return await axios.post(`${BACKEND_DOMAIN}/api/save-rate-point`, dataRate);
};

export const getDataSearch = async (keyword: string) => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/search-data?keyword=${keyword}`
  );
};

export const getStatistical = async () => {
  return await axios.get(`${BACKEND_DOMAIN}/api/get-statistical`);
};

export const getStatisticalAppByHospitalChart = async () => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/get-statistical-hospital-chart`
  );
};

export const getStatisticalAppByStatusChart = async () => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/get-statistical-appointment-chart`
  );
};

export const getAppIn7Day = async () => {
  return await axios.get(`${BACKEND_DOMAIN}/api/get-appointment-in-7-day`);
};

export const cancelAppointment = async (appointmentId: string) => {
  return await axios.delete(`${BACKEND_DOMAIN}/api/cancel-appoinment`, {
    data: {
      appointmentId: appointmentId,
    },
  });
};

export const EditProfile = async (newProfile: TEditProfile) => {
  return await axios.put(`${BACKEND_DOMAIN}/api/edit-profile`, newProfile);
};

export const EditPassword = async (newPassword: TNewPassword) => {
  return await axios.put(`${BACKEND_DOMAIN}/api/edit-password`, newPassword);
};

export const getDataSearchHospital = async (
  keyword: string,
  typeHospital: TTypeHospital
): Promise<TReturnAllDataHospital> => {
  const response = await axios.get(
    `${BACKEND_DOMAIN}/api/search-hospital?keyword=${keyword}&typeHospital=${typeHospital}`
  );
  console.log(response, keyword, typeHospital);
  const data = response.data.listHospital;
  return data.map((item: any) => {
    return {
      id: item.id,
      address: item.address,
      image: item.image,
      name: item.name,
      type: item.type,
    };
  });
};
