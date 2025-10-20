import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import KPIcard from "./components/KPIcard";
import LineChart from "./components/LineChart";
import BarChart from "./components/BarChart";
import PieChart from "./components/PieChart";
import BedOccupancyChart from "./components/BedOccupancyChart";
import PatientsPage from "./pages/PatientsPage";

export default function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <div className="flex-1">
          <Navbar />
          <main className="p-4">
            <Routes>
              {/* Dashboard Route */}
              <Route
                path="/"
                element={
                  <>
                    <KPIcard />
                    <div className="grid grid-cols-2 gap-6 w-full">
                      <LineChart />
                      <BarChart />
                      <PieChart />
                      <BedOccupancyChart />
                    </div>
                  </>
                }
              />

              {/* Patients Route (use lowercase, absolute path) */}
              <Route path="/patients" element={<PatientsPage />} />

              {/* other routes... */}
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}
