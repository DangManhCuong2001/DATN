// import { createContext, useContext, useEffect, useState } from "react";
// import { BaseContextProps } from "../../global.config";

// import {
//   TAllDataDoctor,
//   TReturnAllDataDoctor,
//   getInfoDoctor,
//   getListDoctorByHopital,
// } from "../../services/DoctorService/DoctorService";
// import moment from "moment";

// interface IDoctorContext {
//   infoDoctor: TAllDataDoctor;
// }

// const DoctorContext = createContext({} as IDoctorContext);
// export function DoctorProvider({ children }: BaseContextProps) {
//   const [infoDoctor, setInfoDoctor] = useState<TAllDataDoctor>({
//     firstName: "",
//     lastName: "",
//     image: "",
//     doctorId: "",
//     gender: "",
//     nameSpecialty: "",
//     price: "",
//     province: "",
//   });

//   async function getInfoDoctorSelected() {
//     const response = await getInfoDoctor(dataForm.doctorSelected);
//     console.log(response);
//     setInfoDoctor((prev) => {
//       return {
//         ...prev,
//         firstName: response.data.doctorInfo.firstName,
//         lastName: response.data.doctorInfo.lastName,
//         image: response.data.doctorInfo.image,
//       };
//     });
//   }

//   useEffect(() => {
//     getInfoDoctorSelected();
//   }, [dataForm.doctorSelected]);

//   return (
//     <DoctorContext.Provider
//       value={{
//         infoDoctor,
//       }}
//     >
//       {children}
//     </DoctorContext.Provider>
//   );
// }

// export const useDoctorContext = () => useContext(DoctorContext);
