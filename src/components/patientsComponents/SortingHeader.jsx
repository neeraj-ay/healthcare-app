export default function SortingHeader({
  columns,
  sortField,
  sortOrder,
  onSort,
}) {
  const renderLabel = (label, field) =>
    sortField === field ? `${label} ${sortOrder === "asc" ? "▲" : "▼"}` : label;

  const handleKey = (e, field) => {
    if (e.key === "Enter" || e.key === " ") {
      e.preventDefault();
      onSort(field);
    }
  };

  return (
    <thead className="bg-gray-50">
      <tr>
        {columns.map((col) => (
          <th
            key={col.field}
            className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider select-none cursor-pointer box-border"
            role="button"
            tabIndex={0}
            aria-sort={
              sortField === col.field
                ? sortOrder === "asc"
                  ? "ascending"
                  : "descending"
                : "none"
            }
            onClick={() => onSort(col.field)}
            onKeyDown={(e) => handleKey(e, col.field)}
          >
            {renderLabel(col.label, col.field)}
          </th>
        ))}
        <th className="px-4 py-4 text-left text-xs font-medium text-gray-500 uppercase tracking-wider box-border">
          Action
        </th>
      </tr>
    </thead>
  );
}
