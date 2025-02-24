import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router";
import HomeComponent from "./pages/Homepage";
import { Signup } from "./pages/Auth/signup";
import { Login } from "./pages/Auth/login";
import { UserProvider } from './context/UserContext';
import ProtectedRoute from "./componnets/protected/protected-route";
import TasksPage from "./pages/Tasks";
import SettingsPage from "./pages/Settings";
import { NewProject } from "./pages/NewProject";
import TeamsPage from "./pages/Teams";
import ProjectPage from "./pages/Project";
import { ThemeProvider } from './context/ThemeContext';
import ThemeToggle from './componnets/themeToggle';

function App() {
  return (
    <UserProvider>
      <ThemeProvider>
        <div className="flex">
          <BrowserRouter>
            <div className="w-screen">
              <Routes>
                <Route path="/" element={<HomeComponent />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route element={<ProtectedRoute />}>
                  <Route path="/new-project" element={<NewProject />} />
                  <Route path="/dashboard" element={<TasksPage />} />
                  <Route path="/teams" element={<TeamsPage />} />
                  <Route path="/settings" element={<SettingsPage />} />
                  <Route path="/projects/:projectId" element={<ProjectPage />} />
                  <Route path="/tasks/:taskId" element={<TasksPage />} />
                </Route>
              </Routes>
            </div>
          </BrowserRouter>
          <ThemeToggle />
        </div>
      </ThemeProvider>
    </UserProvider>
  );
}

export default App;
