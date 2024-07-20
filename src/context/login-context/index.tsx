import { ReactNode, createContext, useContext, useState } from "react";
import { BaseContextProps } from "../../global.config";
import { imagePath } from "../../constants/imagePath";
import { getDataLogin } from "../../services/UserService/UserService";
import { To, useNavigate } from "react-router-dom";
import { Isconnected, LocalStorageKey } from "../../constants";
import useNotifier from "../../hooks/useNotifier";
import { AxiosResponse } from "axios";

interface ILoginContext {
  handleLogin: (urlAfterLogin: string | undefined) => Promise<void>;
  setAccountLogin: React.Dispatch<React.SetStateAction<TAccountLogin>>;
  dataLogin: TDataLogin;
  isLogin: boolean;
  getDataUser: () => Promise<AxiosResponse<any, any> | undefined>;
}

export type TAccountLogin = {
  email: string;
  password: string;
};

export type TDataLogin = {
  email: string;
  firstName: string;
  lastName: string;
  roleId: string;
  idUser: string;
  gender: string;
  phoneNumber: string;
  address: string;
  image: string;
};
const LoginContext = createContext({} as ILoginContext);
export function LoginProvider({ children }: BaseContextProps) {
  const navigate = useNavigate();
  const [accountLogin, setAccountLogin] = useState<TAccountLogin>({
    email: "",
    password: "",
  });
  const [dataLogin, setDataLogin] = useState<TDataLogin>({
    email: "",
    firstName: "",
    lastName: "",
    roleId: "",
    idUser: "",
    gender: "",
    phoneNumber: "",
    address: "",
    image: "",
  });
  const [isLogin, setIsLogin] = useState<boolean>(false);
  const { notifyError, notifySuccess } = useNotifier();

  console.log(dataLogin);

  async function getDataUser() {
    try {
      const response = await getDataLogin(accountLogin);
      console.log(response);
      setDataLogin((prev) => {
        return {
          ...prev,
          email: response.data.user.email,
          firstName: response.data.user.firstName,
          lastName: response.data.user.lastName,
          roleId: response.data.user.roleId,
          idUser: response.data.user.id,
          gender: response.data.user.gender,
          phoneNumber: response.data.user.phoneNumber,
          address: response.data.user.address,
          image: response.data.user.image,
        };
      });
      return response;
    } catch (err) {
      console.log(err);
    }
  }
  async function handleLogin(urlAfterLogin?: string | undefined) {
    try {
      const dataResponse = await getDataUser();
      if (dataResponse && dataResponse.data.message == "Ok") {
        setIsLogin(true);
        localStorage.setItem(
          LocalStorageKey.IsConnected,
          Isconnected.Connected
        );

        notifySuccess("Đăng nhập thành công!");
        if (urlAfterLogin) {
          navigate(urlAfterLogin);
        } else {
          navigate(-1);
        }
      } else {
        notifyError("Email hoặc mật khẩu không chính xác!");
      }
    } catch (err) {
      console.log(err);
      notifyError("Đăng nhập thất bại!");
    }
  }

  return (
    <LoginContext.Provider
      value={{ handleLogin, setAccountLogin, isLogin, dataLogin, getDataUser }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const useLoginContext = () => useContext(LoginContext);
