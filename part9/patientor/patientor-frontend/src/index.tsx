import ReactDOM from "react-dom/client";

import App from "./App";
import { DiagnosesProvider } from "./context/diagnoses";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <DiagnosesProvider>
    <App />
  </DiagnosesProvider>
);
