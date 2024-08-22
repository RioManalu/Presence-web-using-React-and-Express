import Home from "./components/home/home"
import Register from "./components/register/register"
import Login from "./components/login/login"
import Dashboard from "./components/dashboard/dashboard";
import Edit from "./components/edit/edit"
import NotFound from "./components/notFound/notFound";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/login" element={<Login title="LOGIN" description="HALAMAN UNTUK LOGIN" />}/>
        <Route path="/register" element={<Register title="REGISTER" description="HALAMAN UNTUK REGISTER" />}/>
        <Route path="/dashboard" element={<Dashboard title="DASHBOARD"/>}/>
        <Route path="/edit" element={<Edit title="EDIT PASSWORD"/>}/>
        <Route path="*" element={<NotFound/>}/>
      </Routes>
    </Router>
  );
}

export default App;
