import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeComponent from "./pages/Homepage";
import { Signup } from "./pages/Auth/signup";
import { Login } from "./pages/Auth/login";
import { UserProvider } from './context/UserContext';
import ProtectedRoute from "./componnets/protected/protected-route";
import TasksPage from "./pages/Tasks";
import SettingsPage from "./pages/Settings";


function App() {

  return (
    <UserProvider>
      <div className="flex ">

        <BrowserRouter>
        <div className="w-screen">

          <Routes>
            <Route path="/" element={<HomeComponent />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard" element={<TasksPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Route>
          </Routes>
        </div>
        </BrowserRouter>
      </div>
    </UserProvider>
  );
}

export default App;
