import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from "recharts";
import { ModelVersion } from "@/data/modelData";

interface ClassDistributionChartProps {
  data: ModelVersion["classDistribution"];
}

const COLORS = [
  "hsl(174, 72%, 56%)",
  "hsl(280, 65%, 60%)",
  "hsl(45, 93%, 58%)",
  "hsl(340, 75%, 55%)",
  "hsl(210, 80%, 60%)",
];

export const ClassDistributionChart = ({ data }: ClassDistributionChartProps) => {
  return (
    <div className="chart-container fade-in">
      <h3 className="text-lg font-semibold mb-4">Class Distribution</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={3}
              dataKey="count"
              nameKey="name"
            >
              {data.map((_, index) => (
                <Cell 
                  key={`cell-${index}`} 
                  fill={COLORS[index % COLORS.length]}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 10%)",
                border: "1px solid hsl(222, 47%, 16%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value: number, name: string) => [`${value} samples`, name]}
            />
            <Legend
              wrapperStyle={{ paddingTop: "20px" }}
              formatter={(value) => <span className="text-sm text-foreground">{value}</span>}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-4 grid grid-cols-2 gap-2">
        {data.map((item, index) => (
          <div key={item.name} className="flex items-center gap-2 text-sm">
            <div 
              className="w-3 h-3 rounded-full" 
              style={{ backgroundColor: COLORS[index % COLORS.length] }}
            />
            <span className="text-muted-foreground">{item.name}:</span>
            <span className="font-mono font-medium">{item.percentage}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};
