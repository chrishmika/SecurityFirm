import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContexProvider } from "./Context/AuthContextProvider.jsx";
import { EmployeeProvider } from "./Context/EmployeeContextProvider.jsx";
import { CompanyProvider } from "./Context/CompanyContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContexProvider>
      <EmployeeProvider>
        <CompanyProvider>
          <App />
        </CompanyProvider>
      </EmployeeProvider>
    </AuthContexProvider>
  </StrictMode>
);
