import {
  BarChart,
  Bar,
  XAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Cell
} from "recharts";

const RevenueChart = ({ data, range, setRange }) => {
  return (
    <div className="bg-[#161212] border border-[#241E1E] rounded-lg p-3">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-white text-sm">Total Revenue</h2>

        {/* <div className="flex gap-2 text-xs">
          <span className="bg-[#1E1919] px-2 py-1 rounded">1W</span>
          <span className="bg-[#1E1919] px-2 py-1 rounded">1M</span>
          <span className="bg-[#1E1919] px-2 py-1 rounded">6M</span>
          <span className="bg-[#FF7A18] px-2 py-1 rounded text-white">1Y</span>
        </div> */}
        <div className="flex gap-2 text-xs">
            {["1W", "1M", "1Y"].map((item) => (
                <button
                key={item}
                onClick={() => setRange(item)}
                className={`px-2 py-1 rounded ${
                    range === item
                    ? "bg-[#FF7A18] text-white"
                    : "bg-[#1E1919]"
                }`}
                >
                {item}
                </button>
            ))}
        </div>
      </div>

      <div className="w-full h-36">
        <ResponsiveContainer>
          <BarChart data={data}>
            
            <CartesianGrid stroke="#2A1E1A" vertical={false} />

            <XAxis
              dataKey="label"
              stroke="#888"
              fontSize={12}
            />

            <Tooltip
              contentStyle={{
                background: "#1E1919",
                border: "none",
                color: "#fff"
              }}
            />

            <Bar dataKey="value" radius={[10, 10, 0, 0]}>
              {data.map((entry, index) => (
                <Cell
                  key={index}
                  fill={
                    entry.highlight
                      ? "#FF7A18"
                      : "rgba(255,122,24,0.2)"
                  }
                />
              ))}
            </Bar>

          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default RevenueChart;