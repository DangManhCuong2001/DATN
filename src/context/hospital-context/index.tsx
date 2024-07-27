import { createContext, useContext, useEffect, useState } from "react";
import { BaseContextProps } from "../../global.config";
import {
  TAllDataHospital,
  getInfoHospitalById,
  getTopHospitalHome,
  getTopHospitalWithType,
} from "../../services/HospitalService/HospitalService";
import { THospital, TTypeHospital } from "../constants/typeData";
import {
  TAllDataDoctor,
  TDataDoctorByHospital,
  TReturnAllDataDoctor,
  getInfoDoctor,
  getListDoctorByHopital,
} from "../../services/DoctorService/DoctorService";
import moment from "moment";

interface IHospitalContext {
  typeHospital: TTypeHospital;
  dataHospital: TdataHospital;
  topHospitals: THospital[];
  hospitalsWithType: TAllDataHospital[];
  setTypeHospital: React.Dispatch<React.SetStateAction<TTypeHospital>>;
  dataForm: TDataForm;
  setDataForm: React.Dispatch<React.SetStateAction<TDataForm>>;
  infoHospital: TAllDataHospital;
  listDoctorByHospital: TDataDoctorByHospital[];
  infoDoctor: TAllDataDoctor;
  openModalInfoDoctor: boolean;
  setOpenModalInfoDoctor: React.Dispatch<React.SetStateAction<boolean>>;
}

export type TdataHospital = {
  [key in TTypeHospital]: {
    id: string;
    title: string;
  };
};
const dataHospital: TdataHospital = {
  benhVienCong: { id: "1", title: "Bệnh viện công" },
  benhVienTu: { id: "2", title: "Bệnh viện tư" },
  phongKham: { id: "3", title: "Phòng khám" },
};

export type TDataForm = {
  hospitalSelected: string;
  doctorSelected: string;
  daySelected: number | string;
  hourSelected: string;
  patientId: string;
  email: string;
  fullName: string;
  gender: string;
  phoneNumber: string;
  address: string;
  reason: string;
  dateOfBirth: string;
  timeString: string;
  fullNameDoctor: string;
  specialtySelected: string;
  doctorInfoId: string;
  nameSpecialtySelected: string;
};

export const initDataInfoDoctor: TAllDataDoctor = {
  firstName: "",
  lastName: "",
  image: "",
  doctorId: "",
  gender: "",
  nameSpecialty: "",
  price: "",
  province: "",
  hospitalId: "",
  specialtyId: "",
  nameHospital: "",
  addressHospital: "",
  description: "",
  markdownHTML: "",
};

const HospitalContext = createContext({} as IHospitalContext);
export function HospitalProvider({ children }: BaseContextProps) {
  const [topHospitals, setTopHospitals] = useState<THospital[]>([]);
  const [hospitalsWithType, setHospitalsWithType] = useState<
    TAllDataHospital[]
  >([]);
  const [typeHospital, setTypeHospital] =
    useState<TTypeHospital>("benhVienCong");
  const [infoHospital, setInfoHospital] = useState<TAllDataHospital>({
    address: "",
    id: "",
    image: "",
    name: "",
    type: "benhVienCong",
    contentHTML: "",
    contentMarkdown: "",
    description: "",
  });
  const [listDoctorByHospital, setListDoctorByHospital] = useState<
    TDataDoctorByHospital[]
  >([]);
  const [dataForm, setDataForm] = useState<TDataForm>({
    doctorSelected: "",
    hospitalSelected: "",
    specialtySelected: "",
    nameSpecialtySelected: "",
    daySelected: moment(new Date()).startOf("day").valueOf(),
    hourSelected: "",
    patientId: "",
    email: "",
    fullName: "",
    gender: "",
    phoneNumber: "",
    address: "",
    reason: "",
    dateOfBirth: "",
    timeString: "",
    fullNameDoctor: "",
    doctorInfoId: "",
  });
  // const [HospitalSelected,setHospitalSelected] = useState<TInfoDoctor>({firstName:'',image:'',lastName:''})
  const [infoDoctor, setInfoDoctor] =
    useState<TAllDataDoctor>(initDataInfoDoctor);
  const [openModalInfoDoctor, setOpenModalInfoDoctor] =
    useState<boolean>(false);

  console.log(dataForm, infoDoctor);

  async function getDataListDoctorByHospital() {
    try {
      const response = await getListDoctorByHopital(
        dataForm.hospitalSelected,
        dataForm.specialtySelected
      );
      console.log("data", response);
      setListDoctorByHospital(response);
    } catch (err) {
      console.log(err);
    }
  }
  console.log(hospitalsWithType);

  async function getDataInfoHospitalById() {
    try {
      const response = await getInfoHospitalById(dataForm.hospitalSelected);
      console.log(response);
      setInfoHospital(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function getInfoDoctorSelected() {
    try {
      const response = await getInfoDoctor(dataForm.doctorSelected);
      console.log(response);
      setInfoDoctor(response);
    } catch (err) {
      console.log(err);
    }
  }

  async function getDataTopHospitals() {
    try {
      const response = await getTopHospitalHome();
      console.log(response);
      setTopHospitals(response.data.topHospital);
    } catch (err) {
      console.log(err);
    }
  }

  async function getListHospitalsWithType() {
    try {
      const response = await getTopHospitalWithType(typeHospital);
      console.log(response);
      setHospitalsWithType(response);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getDataTopHospitals();
  }, []);

  useEffect(() => {
    getDataInfoHospitalById();
    getDataListDoctorByHospital();
  }, [dataForm.hospitalSelected, dataForm.specialtySelected]);

  useEffect(() => {
    getInfoDoctorSelected();
  }, [dataForm.doctorSelected, dataForm.hourSelected]);

  useEffect(() => {
    getListHospitalsWithType();
  }, [typeHospital]);

  return (
    <HospitalContext.Provider
      value={{
        typeHospital,
        dataHospital,
        topHospitals,
        hospitalsWithType,
        setTypeHospital,
        dataForm,
        setDataForm,
        infoDoctor,
        infoHospital,
        listDoctorByHospital,
        setOpenModalInfoDoctor,
        openModalInfoDoctor,
      }}
    >
      {children}
    </HospitalContext.Provider>
  );
}

export const useHospitalContext = () => useContext(HospitalContext);
