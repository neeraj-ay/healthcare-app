import {
  LineChart as ReLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import data from "../data/patients.json";

const BedOccupancyChart = () => {
  const patients = data;

  // Pick a range of dates (example: last 30 days)
  const dates = [];
  const today = new Date();
  for (let i = 30; i >= 0; i--) {
    const d = new Date(today);
    d.setDate(today.getDate() - i);
    dates.push(d.toISOString().split("T")[0]); // YYYY-MM-DD
  }

  // Count bed usage per date
  const occupancyData = dates.map((date) => {
    const count = patients.filter((p) => {
      return (
        p.bed_used === "Yes" &&
        new Date(p.admission_date) <= new Date(date) &&
        new Date(p.discharge_date) >= new Date(date)
      );
    }).length;

    return { date, occupiedBeds: count };
  });

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="mb-3 font-bold text-gray-700">Bed Occupancy Over Time</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ReLineChart data={occupancyData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" tick={{ fontSize: 10 }} />
          <YAxis />
          <Tooltip />
          <Line
            type="monotone"
            dataKey="occupiedBeds"
            stroke="#F59E0B" // Tailwind yellow-500
            strokeWidth={2}
          />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BedOccupancyChart;
