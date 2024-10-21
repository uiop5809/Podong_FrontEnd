import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import Router from "./Router.jsx";
import { RecoilRoot } from "recoil";
import GlobalStyle from "./styles/GlobalStyles.js";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RecoilRoot>
      <GlobalStyle />
      <Router />
    </RecoilRoot>
  </StrictMode>
);
