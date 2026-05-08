"use client";

type Props = {
  data: { close: number }[];
  positive?: boolean;
  width?: number;
  height?: number;
  className?: string;
};

export function Sparkline({ data, positive = true, width = 120, height = 36, className }: Props) {
  if (!data || data.length === 0) return null;
  const values = data.map((d) => d.close);
  const min = Math.min(...values);
  const max = Math.max(...values);
  const span = max - min || 1;
  const step = width / (values.length - 1);

  const points = values
    .map((v, i) => {
      const x = i * step;
      const y = height - ((v - min) / span) * (height - 4) - 2;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  const areaPoints = `0,${height} ${points} ${width},${height}`;
  const stroke = positive ? "#20C997" : "#FF4D4D";
  const fill = positive ? "rgba(32, 201, 151, 0.18)" : "rgba(255, 77, 77, 0.18)";

  return (
    <svg
      viewBox={`0 0 ${width} ${height}`}
      width={width}
      height={height}
      className={className}
      preserveAspectRatio="none"
    >
      <polygon points={areaPoints} fill={fill} />
      <polyline
        points={points}
        fill="none"
        stroke={stroke}
        strokeWidth={1.6}
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
  );
}
