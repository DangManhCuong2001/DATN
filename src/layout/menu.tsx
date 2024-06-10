/**
 * @todo TUrl for check route is in Project or not
 * @example
 * value = 0 => route insite project
 * value = 1 => route outsite project
 */
export type TUrl = 1 | 0;
export type TTargetLink = "_blank" | "_parent" | "_self" | "_top" | undefined;
export type TMenu = {
  //   icon: SvgComponent;
  title: string;
  url: string;
  target: TTargetLink;
  children: { title: string; url: string; type: TUrl; target: TTargetLink }[];
  type: TUrl;
}[];

export const menu: TMenu = [
  {
    // icon: DashboardOutlined,
    title: "Manage Users",
    url: "/manage/manageUsers",
    children: [],
    type: 1,
    target: undefined,
  },
  {
    // icon: IconUser,
    title: "Manage Doctors",
    url: "/manage/manageDoctors",
    children: [],
    type: 0,
    target: undefined,
  },

  {
    // icon: IconAutoTrader,
    title: "Manage Schedules",
    url: "/manage/manageSchedule",
    children: [],
    type: 0,
    target: undefined,
  },

  {
    // icon: IconDapps,
    title: "Manage Hospital",
    url: "/manage/manageHospital",
    children: [],
    type: 1,
    target: undefined,
  },
  {
    // icon: IconDapps,
    title: "Manage Speciality",
    url: "/manage/manageSpeciality",
    children: [],
    type: 1,
    target: undefined,
  },
];

export const menuOfManageDoctor: TMenu = [
  {
    // icon: IconAutoTrader,
    title: "Manage Schedules",
    url: "/manage/manageSchedule",
    children: [],
    type: 0,
    target: undefined,
  },
  {
    // icon: IconUser,
    title: "Manage Patients",
    url: "/manage/managePatient",
    children: [],
    type: 0,
    target: undefined,
  },
];
