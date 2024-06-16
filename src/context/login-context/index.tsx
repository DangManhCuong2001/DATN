import { ReactNode, createContext, useContext, useState } from "react";
import { BaseContextProps } from "../../global.config";
import { imagePath } from "../../constants/imagePath";
import { getDataLogin } from "../../services/UserService/UserService";
import { To, useNavigate } from "react-router-dom";
import { Isconnected, LocalStorageKey } from "../../constants";

interface ILoginContext {
  handleLogin: (urlAfterLogin: string | undefined) => Promise<void>;
  setAccountLogin: React.Dispatch<React.SetStateAction<TAccountLogin>>;
  dataLogin: TDataLogin;
  isLogin: boolean;
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

  console.log(dataLogin);
  async function handleLogin(urlAfterLogin?: string | undefined) {
    try {
      const response = await getDataLogin(accountLogin);
      console.log(response);
      if (response.data.message == "Ok") {
        setIsLogin(true);
        localStorage.setItem(
          LocalStorageKey.IsConnected,
          Isconnected.Connected
        );
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
        if (urlAfterLogin) {
          navigate(urlAfterLogin);
        } else {
          navigate(-1);
        }
      }
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <LoginContext.Provider
      value={{ handleLogin, setAccountLogin, isLogin, dataLogin }}
    >
      {children}
    </LoginContext.Provider>
  );
}

export const useLoginContext = () => useContext(LoginContext);
