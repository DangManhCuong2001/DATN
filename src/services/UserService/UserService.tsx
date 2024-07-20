import axios from "axios";
import { BACKEND_DOMAIN } from "../BackendDomain";
import { TAccountLogin } from "../../context/login-context";
import { TUser } from "../../views/Manage/ManageUser/ManageUser";
import { TNewSchedule } from "../../views/Manage/ManageSchedules/ManageSchedules";

export const getDataLogin = async (accountLogin: TAccountLogin) => {
  return await axios.post(`${BACKEND_DOMAIN}/api/login`, accountLogin);
};

export const getUsers = async (idUser: string) => {
  return await axios.get(`${BACKEND_DOMAIN}/api/get-users?id=${idUser}`);
};

export const AddUser = async (newUser: TUser) => {
  return await axios.post(`${BACKEND_DOMAIN}/api/create-new-user`, newUser);
};

export const EditUser = async (newUser: TUser) => {
  return await axios.put(`${BACKEND_DOMAIN}/api/edit-user`, newUser);
};

export const DeleteUser = async (userId: string) => {
  return await axios.delete(`${BACKEND_DOMAIN}/api/delete-user`, {
    data: {
      id: userId,
    },
  });
};

// export const getDataAllCode = async (inputType: string) => {
//   return await axios.get(`${BACKEND_DOMAIN}/api/allcode?type=${inputType}`);
// };

export const saveBulkSchedule = async (data: any) => {
  console.log(data);
  return await axios.post(`${BACKEND_DOMAIN}/api/bulk-create-schedule`, data);
};
