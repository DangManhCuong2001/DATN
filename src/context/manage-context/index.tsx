import { createContext, useContext, useEffect, useState } from "react";
import { BaseContextProps } from "../../global.config";
import { getDoctors } from "../../services/DoctorService/DoctorService";
import { getSpecialty } from "../../services/SpecialtyService/SpecialtyService";
import { getHospital } from "../../services/HospitalService/HospitalService";
import { TDoctor, THospital, TSpecialty } from "../constants/typeData";

interface IManageContext {
  specialtys: TSpecialty[];
  setSpecialtys: React.Dispatch<React.SetStateAction<TSpecialty[]>>;
  hospitals: THospital[];
  setHospitals: React.Dispatch<React.SetStateAction<THospital[]>>;
}

const ManageContext = createContext({} as IManageContext);
export function ManageProvider({ children }: BaseContextProps) {
  const [specialtys, setSpecialtys] = useState<TSpecialty[]>([]);
  const [hospitals, setHospitals] = useState<THospital[]>([]);

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
    getDataSpecialtys();
    getDataHospitals();
  }, []);

  return (
    <ManageContext.Provider
      value={{ specialtys, setSpecialtys, hospitals, setHospitals }}
    >
      {children}
    </ManageContext.Provider>
  );
}

export const useManageContext = () => useContext(ManageContext);
