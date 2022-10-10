import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Home from "./components/Home";
import RequireAuth from "./components/RequireAuth";
import Chats from "./components/Chats";
import SideBar from "./components/SideBar";
import './components/styles.scss'
import CustomerReq from "./components/admin/CustomerReq";
import ProcessingReq from "./components/admin/ProcessingReq";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <RequireAuth adminPass={false}>
            <SideBar />
          </RequireAuth>
        }
        />
        <Route path='chats' element={
          <RequireAuth adminPass={false}>
            <Chats />
          </RequireAuth>
        } />
        <Route path='login' element={<Login />} />
        <Route path='register' element={<Register />} />
        <Route path='admin/request' element={<RequireAuth adminPass={true}><CustomerReq /></RequireAuth>} />
        <Route path='admin/process' element={<RequireAuth adminPass={true}><ProcessingReq /></RequireAuth>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
