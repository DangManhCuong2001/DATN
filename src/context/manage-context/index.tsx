import { createContext, useContext, useEffect, useState } from "react";
import { BaseContextProps } from "../../global.config";
import { getDoctors } from "../../services/DoctorService/DoctorService";
import { getSpecialty } from "../../services/SpecialtyService/SpecialtyService";
import { getHospital } from "../../services/HospitalService/HospitalService";
import { TDoctor, THospital, TSpecialty } from "../constants/typeData";

interface IManageContext {}

const ManageContext = createContext({} as IManageContext);
export function ManageProvider({ children }: BaseContextProps) {
  return <ManageContext.Provider value={{}}>{children}</ManageContext.Provider>;
}

export const useManageContext = () => useContext(ManageContext);
