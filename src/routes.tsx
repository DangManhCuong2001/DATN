import React from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "./layout/layout";
// import Hospital from "./views/Hospital/Hospital";
import HomePage from "./views/HomePage/HomePage";
import Speciality from "./views/Speciality/Speciality";
import DetailSpeciality from "./views/Speciality/DetailSpeciality/DetailSpeciality";
import Doctor from "./views/Doctor/Doctor";
import Schedule from "./views/Schedule/Schedule";
import Manage from "./views/Manage/Manage";
import ManageUser from "./views/Manage/ManageUser/ManageUser";
import ManageDoctors from "./views/Manage/ManageDoctors/ManageDoctors";
import Login from "./views/Login/Login";
import ManageSpeciality from "./views/Manage/ManageSpecialty/ManageSpecialty";
import ManageHospital from "./views/Manage/ManageHospital/ManageHospital";
import DetailHospital from "./views/Hospital/DetailHospital/DetailHospital";
import Hospital from "./views/Hospital/Hospital";
import SelectAppointment from "./components/SelectAppointment/SelectAppointment";
import SelectDate from "./components/SelectAppointment/SelectDate/SelectDate";
import ManageSchedules from "./views/Manage/ManageSchedules/ManageSchedules";
import ManagePatient from "./views/Manage/ManagePatient/ManagePatient";
import VerifyBooking from "./views/VerifyBooking/VerifyBooking";
import Register from "./views/Login/Register/Register";
import ProfileUser from "./views/ProfileUser/ProfileUser";
import SelectDoctor from "./components/SelectAppointment/SelectDoctor/SelectDoctor";

export default function RouterUrl() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <HomePage /> },
        { path: "/:idTypeHospital", element: <Hospital /> },
        {
          path: "/:idTypeHospital/:idHospital",
          element: <DetailHospital />,
        },

        {
          path: "/SelectAppointment/:idHospital",
          element: <SelectAppointment />,
        },
        {
          path: "/SelectAppointment/:idHospital/:idSpecialty",
          element: <SelectDoctor />,
        },

        {
          path: "/SelectAppointment/:idHospital/:idSpecialty/:idDoctor",
          element: <SelectDate />,
        },

        { path: "/speciality", element: <Speciality /> },
        { path: "/speciality/:idSpeciality", element: <DetailSpeciality /> },
        { path: "/doctor/:idDoctor", element: <Doctor /> },
        { path: "/form-booking/", element: <Schedule /> },
        { path: "/login", element: <Login /> },
        { path: "/register", element: <Register /> },
        { path: "/profile", element: <ProfileUser /> },
        {
          path: "/verify-booking",
          element: <VerifyBooking />,
        },
      ],
    },
    {
      path: "/manage",
      element: <Manage />,
      children: [
        { path: "/manage/manageUsers", element: <ManageUser /> },
        { path: "/manage/manageDoctors", element: <ManageDoctors /> },
        { path: "/manage/manageSpeciality", element: <ManageSpeciality /> },
        { path: "/manage/manageHospital", element: <ManageHospital /> },
        { path: "/manage/manageSchedule", element: <ManageSchedules /> },

        { path: "/manage/managePatient", element: <ManagePatient /> },
        { path: "", element: <Navigate to={"/manage/manageSchedule"} /> },
      ],
    },
    // {
    //   path: "/login",
    //   element: <Login />,
    //   children: [],
    // },
  ]);
}
