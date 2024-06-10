import { ReactNode, createContext, useContext } from "react";
import { BaseContextProps } from "../../global.config";
import { imagePath } from "../../constants/imagePath";

interface ISpecialityContext {
  dataSpeciality: TdataSpeciality;
}
export type TSpeciality = "coXuongKhop" | "thanKinh" | "tieuHoa" | "timMach";
type TdataSpeciality = {
  id: string;
  imgSpeciality: string;
  title: string;
  url: string;
}[];

const SpecialityContext = createContext({} as ISpecialityContext);
export function SpecialityProvider({ children }: BaseContextProps) {
  const dataSpeciality: TdataSpeciality = [
    {
      id: "coXuongKhop",
      imgSpeciality: imagePath.CO_XUONG_KHOP,
      title: "Cơ xương khớp",
      url: "/speciality/coXuongKhop",
    },
    {
      id: "thanKinh",
      imgSpeciality: imagePath.THAN_KINH,
      title: "Thần kinh",
      url: "/speciality/thanKinh",
    },
    {
      id: "daLieu",
      imgSpeciality: imagePath.DA_LIEU,
      title: "Da Liễu",
      url: "/speciality/daLieu",
    },
    {
      id: "timMach",
      imgSpeciality: imagePath.TIM_MACH,
      title: "Tim Mạch",
      url: "/speciality/coXuongKhop",
    },
    {
      id: "taiMuiHong",
      imgSpeciality: imagePath.TAI_MUI_HONG,
      title: "Tai Mũi Họng",
      url: "/speciality/coXuongKhop",
    },
    {
      id: "nhiKhoa",
      imgSpeciality: imagePath.NHI_KHOA,
      title: "Khoa Nhi",
      url: "/speciality/coXuongKhop",
    },
    {
      id: "nhaKhoa",
      imgSpeciality: imagePath.NHA_KHOA,
      title: "Nha Khoa",
      url: "/speciality/coXuongKhop",
    },
    {
      id: "tieuHoa",
      imgSpeciality: imagePath.TIEU_HOA,
      title: "Tiêu Hoá",
      url: "/speciality/coXuongKhop",
    },
  ];

  return (
    <SpecialityContext.Provider value={{ dataSpeciality }}>
      {children}
    </SpecialityContext.Provider>
  );
}

export const useSpecialityContext = () => useContext(SpecialityContext);
