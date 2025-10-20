import {
  PieChart as RePieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import data from "../data/patients.json";

const PieChart = () => {
  const patients = data;

  // Count recovered vs deceased
  const recovered = patients.filter((p) => p.outcome === "Recovered").length;
  const deceased = patients.filter((p) => p.outcome === "Deceased").length;

  const chartData = [
    { name: "Recovered", value: recovered },
    { name: "Deceased", value: deceased },
  ];

  const COLORS = ["#22C55E", "#EF4444"]; // Tailwind green-500 & red-500

  return (
    <div className="bg-white p-4 rounded-lg shadow-md">
      <h3 className="mb-3 font-bold text-gray-700">Patient Outcomes</h3>
      <ResponsiveContainer width="100%" height={250}>
        <RePieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            labelLine={false}
            outerRadius={80}
            dataKey="value"
            label={({ name, percent }) =>
              `${name}: ${(percent * 100).toFixed(0)}%`
            }
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend />
        </RePieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default PieChart;
