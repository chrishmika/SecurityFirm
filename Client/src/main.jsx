import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { AuthContexProvider } from "./context/AuthContextProvider.jsx";
import { EmployeeProvider } from "./context/EmployeeContextProvider.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthContexProvider>
      <EmployeeProvider>
        <App />
      </EmployeeProvider>
    </AuthContexProvider>
  </StrictMode>
);
