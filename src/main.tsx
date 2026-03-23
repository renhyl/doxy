import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Shell } from "./shell";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Shell />
  </StrictMode>
);
