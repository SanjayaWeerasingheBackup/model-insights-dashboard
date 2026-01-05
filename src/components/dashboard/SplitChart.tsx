import { BarChart, Bar, XAxis, YAxis, ResponsiveContainer, Tooltip, Cell } from "recharts";

interface SplitChartProps {
  split: { train: number; validation: number; test: number };
}

const COLORS = [
  "hsl(174, 72%, 56%)",
  "hsl(280, 65%, 60%)",
  "hsl(45, 93%, 58%)",
];

export const SplitChart = ({ split }: SplitChartProps) => {
  const data = [
    { name: "Train", value: split.train },
    { name: "Validation", value: split.validation },
    { name: "Test", value: split.test },
  ].filter(item => item.value > 0);

  return (
    <div className="chart-container fade-in">
      <h3 className="text-lg font-semibold mb-4">Train / Validation / Test Split</h3>
      <div className="h-[200px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} layout="vertical" barSize={28}>
            <XAxis 
              type="number" 
              domain={[0, 100]} 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 12 }}
              tickFormatter={(value) => `${value}%`}
            />
            <YAxis 
              type="category" 
              dataKey="name" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(210, 40%, 98%)", fontSize: 13 }}
              width={80}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 10%)",
                border: "1px solid hsl(222, 47%, 16%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value: number) => [`${value}%`, "Percentage"]}
            />
            <Bar dataKey="value" radius={[0, 6, 6, 0]}>
              {data.map((_, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 flex justify-center gap-6">
        {data.map((item, index) => (
          <div key={item.name} className="text-center">
            <div 
              className="w-3 h-3 rounded-full mx-auto mb-1" 
              style={{ backgroundColor: COLORS[index] }}
            />
            <p className="text-xs text-muted-foreground">{item.name}</p>
            <p className="font-mono font-bold text-lg">{item.value}%</p>
          </div>
        ))}
      </div>
    </div>
  );
};
