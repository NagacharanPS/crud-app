import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import WelcomeModal from "./pages/WelcomeModal";
import Home from "./pages/Home";
import AddEdit from "./pages/AddEdit";
import ViewUser from "./pages/ViewUser";
import "./css/mediaqueries.css";

function App() {
  return (
    <>
      <WelcomeModal />
      <ToastContainer position="top-center" />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/addUser" element={<AddEdit />} />
          <Route path="/update/:id" element={<AddEdit />} />
          <Route path="/view/:id" element={<ViewUser />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
