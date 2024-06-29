import axios from "axios";
import { BACKEND_DOMAIN } from "../BackendDomain";
import { TSpecialty } from "../../context/constants/typeData";

export const getSpecialty = async () => {
  return await axios.get(`${BACKEND_DOMAIN}/api/get-all-specialty`);
};

export const addNewSpecialty = async (newSpecialty: TSpecialty) => {
  return await axios.post(
    `${BACKEND_DOMAIN}/api/create-new-specialty`,
    newSpecialty
  );
};

export const getListSpecialtyByHospital = async (hospitalId: string) => {
  return await axios.get(
    `${BACKEND_DOMAIN}/api/get-list-specialty-by-hospital?hospitalId=${hospitalId}`
  );
};
