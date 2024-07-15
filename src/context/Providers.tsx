import { SnackbarProvider } from "notistack";
import { HospitalProvider } from "./hospital-context";
import { LoginProvider } from "./login-context";
import { ManageProvider } from "./manage-context";
import { SpecialityProvider } from "./speciality-context";
import { ModalProvider } from "./modal-contex/modal-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider>
      <ModalProvider>
        <ManageProvider>
          <LoginProvider>
            <SpecialityProvider>
              <HospitalProvider>{children}</HospitalProvider>
            </SpecialityProvider>
          </LoginProvider>
        </ManageProvider>
      </ModalProvider>
    </SnackbarProvider>
  );
}
