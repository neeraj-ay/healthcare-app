import data from "../data/patients.json";

const KPIcard = () => {
  const patients = data;

  // Calculate KPIs
  const totalPatients = patients.length;

  const recovered = patients.filter((p) => p.outcome === "Recovered").length;
  const deceased = patients.filter((p) => p.outcome === "Deceased").length;

  const recoveryRate = ((recovered / totalPatients) * 100).toFixed(1) + "%";
  const mortalityRate = ((deceased / totalPatients) * 100).toFixed(1) + "%";

  const bedUsed = patients.filter((p) => p.bed_used === "Yes").length;
  const bedOccupancy = ((bedUsed / totalPatients) * 100).toFixed(1) + "%";

  // Reusable mini-card component
  const SmallCard = ({ title, value, color }) => (
    <div className={`${color} text-white p-6 rounded-lg shadow-md`}>
      <h3 className="text-lg">{title}</h3>
      <p className="text-2xl font-bold">{value}</p>
    </div>
  );

  return (
    <div className="max-w-5xl mx-auto grid grid-cols-4 gap-8 mb-6">
      <SmallCard
        title="Total Patients"
        value={totalPatients}
        color="bg-blue-500"
      />
      <SmallCard
        title="Recovery Rate"
        value={recoveryRate}
        color="bg-green-500"
      />
      <SmallCard
        title="Mortality Rate"
        value={mortalityRate}
        color="bg-red-500"
      />
      <SmallCard
        title="Bed Occupancy"
        value={bedOccupancy}
        color="bg-yellow-500"
      />
    </div>
  );
};

export default KPIcard;
