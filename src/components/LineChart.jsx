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

function LineChart() {
  const admissionsPerMonth = {};
  data.forEach((p) => {
    const month = new Date(p.admission_date).toLocaleString("default", {
      month: "short",
    });
    admissionsPerMonth[month] = (admissionsPerMonth[month] || 0) + 1;
  });

  const chartData = Object.keys(admissionsPerMonth).map((month) => ({
    month,
    admissions: admissionsPerMonth[month],
  }));

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="mb-3 font-bold">Admissions Trend</h3>
      <ResponsiveContainer width="100%" height={250}>
        <ReLineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Line type="monotone" dataKey="admissions" stroke="#8884d8" />
        </ReLineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default LineChart;
