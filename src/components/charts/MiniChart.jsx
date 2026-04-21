// components/charts/MiniChart.jsx
import { LineChart, Line, ResponsiveContainer } from "recharts";

const MiniChart = ({ data }) => {
  return (
    <div className="absolute right-0 top-0 w-32 h-full opacity-40">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <Line
            type="monotone"
            dataKey="value"
            stroke="#FF7A18"
            strokeWidth={2}
            dot={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MiniChart;