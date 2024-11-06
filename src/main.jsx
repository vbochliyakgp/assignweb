import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { GlobalContextForAppProvider } from "./store/authentiation-store";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <GlobalContextForAppProvider>
      <App />
    </GlobalContextForAppProvider>
  </StrictMode>
);
