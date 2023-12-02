import ReactDOM from "react-dom/client";
// import FreezeProvider from "../src/Freeze";
import App from "./FreezeTest";
const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <App />
  // <FreezeProvider>
  // </FreezeProvider>
);
