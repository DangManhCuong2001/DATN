import axios from "axios";
import { BACKEND_DOMAIN } from "../BackendDomain";
import { TInfoDoctor } from "../../views/Manage/ManageDoctors/ManageDoctors";

export type TAllDataDoctor = {
  price: string;
  firstName: string;
  lastName: string;
  gender: string;
  province: string;
  nameSpecialty: string;
  doctorId: string;
  image: string;
};

export type TReturnAllDataDoctor = TAllDataDoctor[];

export const getDoctors = async () => {
  return await axios.get(`${BACKEND_DOMAIN}/api/get-all-doctors`);
};

export const saveInfoDoctor = async (infoDoctor: TInfoDoctor) => {
  return await axios.post(`${BACKEND_DOMAIN}/api/save-info-doctor`, infoDoctor);
};

export const getInfoDoctor = async (
  userId: string
): Promise<TAllDataDoctor> => {
  // return await axios.get(`${BACKEND_DOMAIN}/api/get-info-doctor?id=${userId}`);
  const response = await axios.get(
    `${BACKEND_DOMAIN}/api/get-info-doctor?id=${userId}`
  );
  console.log(response);
  const data = response.data.doctorInfo;
  return {
    price: data.Doctor_Info.priceId,
    nameSpecialty: "",
    firstName: data.firstName,
    lastName: data.lastName,
    gender: data.gender,
    province: data.provinceId,
    doctorId: "",
    image: data.image,
  };
};

export const getListDoctorByHopital = async (hospitalId: string) => {
  console.log(hospitalId);
  const response = await axios.get(
    `${BACKEND_DOMAIN}/api/get-list-doctor-by-hospital?hospitalId=${hospitalId}`
  );
  console.log(response);
  const data = response.data.data;
  return data.map((item: any) => {
    return {
      price: item.priceId,
      nameSpecialty: item.Specialty.name,
      firstName: item.User.firstName,
      lastName: item.User.lastName,
      gender: item.User.gender,
      province: item.provinceId,
      doctorId: item.doctorId,
    };
  });
};

export const getScheduleDoctors = async (
  doctorId: string,
  date: number | string
) => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/get-schedule-doctors?doctorId=${doctorId}&date=${date}`
  );
};

export const doneAppointment = async (apppointmentId: string) => {
  return await axios.post(`${BACKEND_DOMAIN}/api/done-appointment`, {
    apppointmentId: apppointmentId,
  });
};
