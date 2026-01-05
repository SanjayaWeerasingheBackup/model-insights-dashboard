import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, Legend, CartesianGrid } from "recharts";
import { ModelVersion } from "@/data/modelData";

interface LossAccuracyChartProps {
  lossData: ModelVersion["lossHistory"];
  accuracyData: ModelVersion["accuracyHistory"];
  type: "loss" | "accuracy";
}

export const LossAccuracyChart = ({ lossData, accuracyData, type }: LossAccuracyChartProps) => {
  const data = type === "loss" ? lossData : accuracyData;
  const title = type === "loss" ? "Loss Curve" : "Accuracy Curve";
  const yDomain = type === "loss" ? [0, "auto"] : [0, 1];

  return (
    <div className="chart-container fade-in">
      <h3 className="text-lg font-semibold mb-4">{title}</h3>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(222, 47%, 16%)" 
              vertical={false}
            />
            <XAxis 
              dataKey="epoch" 
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
              label={{ 
                value: "Epoch", 
                position: "insideBottom", 
                offset: -5,
                fill: "hsl(215, 20%, 55%)",
                fontSize: 12
              }}
            />
            <YAxis 
              domain={yDomain as [number, number | "auto"]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
              tickFormatter={(value) => type === "accuracy" ? `${(value * 100).toFixed(0)}%` : value.toFixed(2)}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 10%)",
                border: "1px solid hsl(222, 47%, 16%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value: number) => [
                type === "accuracy" ? `${(value * 100).toFixed(2)}%` : value.toFixed(4),
                ""
              ]}
              labelFormatter={(label) => `Epoch ${label}`}
            />
            <Legend
              wrapperStyle={{ paddingTop: "10px" }}
              formatter={(value) => <span className="text-sm text-foreground capitalize">{value}</span>}
            />
            <Line
              type="monotone"
              dataKey="train"
              name="Training"
              stroke="hsl(174, 72%, 56%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(174, 72%, 56%)" }}
            />
            <Line
              type="monotone"
              dataKey="validation"
              name="Validation"
              stroke="hsl(280, 65%, 60%)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(280, 65%, 60%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
