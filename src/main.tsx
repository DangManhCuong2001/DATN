import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import RouterUrl from "./routes.tsx";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <BrowserRouter>
    <RouterUrl />
  </BrowserRouter>
);
