import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import DashboardPage from "./pages/DashboardPage";
import CalenderPage from "./pages/CalenderPage";
import Sidebar, { SidebarItem } from "./components/Sidebar";
import { Calendar, Flag, Home, Layers, LayoutDashboard, LifeBuoy, Settings, StickyNote } from "lucide-react";
function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar>
          <SidebarItem icon={<Home size={20} />} text="Home" to="/" />
          <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" to="/dashboard" />
          <SidebarItem icon={<Calendar size={20} />} text="Calendar" to="/calendar" />
          <SidebarItem icon={<StickyNote size={20} />} text="Projects" to="/projects" />
          <SidebarItem icon={<Layers size={20} />} text="Tasks" to="/tasks" />
          <SidebarItem icon={<Flag size={20} />} text="Reporting" to="/reporting" />
          {/* <hr className="my-3" />
          <SidebarItem icon={<Settings size={20} />} text="Settings" to="/settings" />
          <SidebarItem icon={<LifeBuoy size={20} />} text="Help" to="/help" /> */}
        </Sidebar>
        <div className="flex-grow p-4">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/calendar" element={<CalenderPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
