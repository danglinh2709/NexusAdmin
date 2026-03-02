import "./App.css";
import { AllRoutes } from "./routes/AllRoutes";
import { AuthProvider } from "./stores/AuthContext";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AllRoutes />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
