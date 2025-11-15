import React from "react";

/**
 * series: [{label, value}]
 * Simple responsive bar chart using SVG
 */
export default function ReportChart({ series = [], granularity = "day" }) {
  if (!series || series.length === 0)
    return <div className="text-sm text-gray-500">No data to display</div>;

  const max = Math.max(...series.map((s) => s.value || 0), 1);
  const width = 700;
  const height = 200;
  const padding = 30;
  const innerW = width - padding * 2;
  const barW = (innerW / series.length) * 0.8;
  const gap = (innerW / series.length) * 0.2;

  return (
    <div className="overflow-x-auto">
      <svg
        viewBox={`0 0 ${width} ${height}`}
        width="100%"
        height="220"
        role="img"
        aria-label="Admissions chart"
      >
        {/* axis line */}
        <line
          x1={padding}
          y1={height - padding}
          x2={width - padding}
          y2={height - padding}
          stroke="#E5E7EB"
        />
        {series.map((s, i) => {
          const x = padding + i * (barW + gap) + gap / 2;
          const h = Math.round(((s.value || 0) / max) * (height - padding * 2));
          const y = height - padding - h;
          return (
            <g key={s.label}>
              <rect x={x} y={y} width={barW} height={h} fill="#2563EB" />
              <text
                x={x + barW / 2}
                y={height - padding + 14}
                fontSize="10"
                fill="#6B7280"
                textAnchor="middle"
              >
                {s.label}
              </text>
            </g>
          );
        })}
      </svg>
    </div>
  );
}
