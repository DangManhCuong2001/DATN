/**
 * @todo TUrl for check route is in Project or not
 * @example
 * value = 0 => route insite project
 * value = 1 => route outsite project
 */
export type TTargetLink = "_blank" | "_parent" | "_self" | "_top" | undefined;
export type TMenu = {
  //   icon: SvgComponent;
  title: string;
  url: string;
  target: TTargetLink;
  children: { title: string; url: string; target: TTargetLink }[];
}[];

export const menu: TMenu = [
  {
    // icon: DashboardOutlined,
    title: "Thống kê",
    url: "/manage/statistics",
    children: [],
    target: undefined,
  },
  {
    // icon: DashboardOutlined,
    title: "Quản lý tài khoản",
    url: "/manage/manageUsers",
    children: [],
    target: undefined,
  },
  {
    // icon: IconUser,
    title: "Quản lý Bác sĩ",
    url: "/manage/manageDoctors",
    children: [],
    target: undefined,
  },

  {
    // icon: IconAutoTrader,
    title: "Quản lý Lịch khám",
    url: "/manage/manageSchedule",
    children: [],
    target: undefined,
  },

  {
    // icon: IconDapps,
    title: "Quản lý Bệnh viện",
    url: "/manage/manageHospital",
    children: [],
    target: undefined,
  },
  {
    // icon: IconDapps,
    title: "Quản lý Chuyên khoa",
    url: "/manage/manageSpeciality",
    children: [],
    target: undefined,
  },
];

export const menuOfManageDoctor: TMenu = [
  {
    // icon: DashboardOutlined,
    title: "Thống kê",
    url: "/manage/statistics",
    children: [],
    target: undefined,
  },
  {
    // icon: IconAutoTrader,
    title: "Quản lý Lịch khám",
    url: "/manage/manageSchedule",
    children: [],
    target: undefined,
  },
  {
    // icon: IconUser,
    title: "Quản lý Lịch sử",
    url: "/manage/managePatient",
    children: [],
    target: undefined,
  },
];
