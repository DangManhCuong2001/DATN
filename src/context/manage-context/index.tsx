import { createContext, useContext, useEffect, useState } from "react";
import { BaseContextProps } from "../../global.config";
import { getDoctors } from "../../services/DoctorService/DoctorService";
import { getSpecialty } from "../../services/SpecialtyService/SpecialtyService";
import { getHospital } from "../../services/HospitalService/HospitalService";
import { TDoctor, THospital, TSpecialty } from "../constants/typeData";

interface IManageContext {
  doctors: TDoctor[];
  specialtys: TSpecialty[];
  setSpecialtys: React.Dispatch<React.SetStateAction<TSpecialty[]>>;
  hospitals: THospital[];
  setHospitals: React.Dispatch<React.SetStateAction<THospital[]>>;
}

const ManageContext = createContext({} as IManageContext);
export function ManageProvider({ children }: BaseContextProps) {
  const [doctors, setDoctors] = useState<TDoctor[]>([]);
  const [specialtys, setSpecialtys] = useState<TSpecialty[]>([]);
  const [hospitals, setHospitals] = useState<THospital[]>([]);

  async function getDataDoctors() {
    try {
      const response = await getDoctors();
      console.log(response);
      setDoctors(response.data.doctors);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDataSpecialtys() {
    try {
      const response = await getSpecialty();
      console.log(response);
      setSpecialtys(response.data.specialtys);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDataHospitals() {
    try {
      const response = await getHospital();
      console.log(response);
      setHospitals(response.data.hospitals);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataDoctors();
    getDataSpecialtys();
    getDataHospitals();
  }, []);

  return (
    <ManageContext.Provider
      value={{ doctors, specialtys, setSpecialtys, hospitals, setHospitals }}
    >
      {children}
    </ManageContext.Provider>
  );
}

export const useManageContext = () => useContext(ManageContext);
