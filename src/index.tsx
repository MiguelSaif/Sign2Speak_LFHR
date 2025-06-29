import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ContactsPage } from "./screens/ContactsPage";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <ContactsPage />
  </StrictMode>,
);
