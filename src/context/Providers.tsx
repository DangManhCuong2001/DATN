import { SnackbarProvider } from "notistack";
import { HospitalProvider } from "./hospital-context";
import { LoginProvider } from "./login-context";
import { ManageProvider } from "./manage-context";
import { SpecialityProvider } from "./speciality-context";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SnackbarProvider>
      <ManageProvider>
        <LoginProvider>
          <SpecialityProvider>
            <HospitalProvider>{children}</HospitalProvider>
          </SpecialityProvider>
        </LoginProvider>
      </ManageProvider>
    </SnackbarProvider>
  );
}
