import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./reset.css";
import SignUpReactHook from "./components/SignUpReactHook";
import SignUpZod from "./components/SignUpZod";
import LoginPage from "./components/LoginPage";

const App = () => {
  return (
    <div className="App">
      Home
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/singupreacthook" element={<SignUpReactHook />}></Route>
          <Route path="/singupreacthook" element={<SignUpZod />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
