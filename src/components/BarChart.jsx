import {
  BarChart as ReBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data from "../data/patients.json";

const BarChart = () => {
  // Aggregate patients by department
  const departmentCounts = {};
  data.forEach((p) => {
    departmentCounts[p.department] = (departmentCounts[p.department] || 0) + 1;
  });

  const chartData = Object.keys(departmentCounts).map((dept) => ({
    department: dept,
    patients: departmentCounts[dept],
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="mb-3 font-bold text-gray-700">Patients per Department</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ReBarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="department" />
          <YAxis />
          <Tooltip />
          <Bar dataKey="patients" fill="#3B82F6" /> {/* Tailwind blue-500 */}
        </ReBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;
