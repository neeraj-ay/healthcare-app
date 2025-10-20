export default function Patients({ patients }) {
  return (
    <>
      {patients.map((p) => (
        <tr key={p.patient_id}>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 box-border">
            {p.patient_id}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 box-border">
            {p.name}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 box-border">
            {p.age}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 box-border">
            {p.gender}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 box-border">
            {p.department}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 box-border">
            {p.outcome}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 box-border">
            {p.admission_date}
          </td>
          <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-900 box-border">
            <button className="text-blue-600 hover:underline">View</button>
          </td>
        </tr>
      ))}
    </>
  );
}
