import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip, CartesianGrid, ReferenceLine } from "recharts";
import { ModelVersion } from "@/data/modelData";

interface RocPrChartProps {
  rocData: ModelVersion["rocData"];
  prData: ModelVersion["prData"];
  type: "roc" | "pr";
  aucScore?: number;
}

export const RocPrChart = ({ rocData, prData, type, aucScore }: RocPrChartProps) => {
  const data = type === "roc" ? rocData : prData;
  const title = type === "roc" ? "ROC Curve" : "Precision-Recall Curve";
  const xKey = type === "roc" ? "fpr" : "recall";
  const yKey = type === "roc" ? "tpr" : "precision";
  const xLabel = type === "roc" ? "False Positive Rate" : "Recall";
  const yLabel = type === "roc" ? "True Positive Rate" : "Precision";

  return (
    <div className="chart-container fade-in">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">{title}</h3>
        {aucScore && type === "roc" && (
          <div className="px-3 py-1 bg-primary/10 rounded-full">
            <span className="text-sm font-mono text-primary">AUC: {aucScore.toFixed(3)}</span>
          </div>
        )}
      </div>
      <div className="h-[280px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid 
              strokeDasharray="3 3" 
              stroke="hsl(222, 47%, 16%)" 
            />
            <XAxis 
              dataKey={xKey}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
              domain={[0, 1]}
              tickFormatter={(value) => value.toFixed(1)}
              label={{ 
                value: xLabel, 
                position: "insideBottom", 
                offset: -5,
                fill: "hsl(215, 20%, 55%)",
                fontSize: 11
              }}
            />
            <YAxis 
              domain={[0, 1]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "hsl(215, 20%, 55%)", fontSize: 11 }}
              tickFormatter={(value) => value.toFixed(1)}
              label={{ 
                value: yLabel, 
                angle: -90, 
                position: "insideLeft",
                fill: "hsl(215, 20%, 55%)",
                fontSize: 11
              }}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "hsl(222, 47%, 10%)",
                border: "1px solid hsl(222, 47%, 16%)",
                borderRadius: "8px",
                color: "hsl(210, 40%, 98%)",
              }}
              formatter={(value: number) => [value.toFixed(3), ""]}
            />
            {type === "roc" && (
              <ReferenceLine
                segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]}
                stroke="hsl(222, 47%, 30%)"
                strokeDasharray="5 5"
              />
            )}
            <Line
              type="monotone"
              dataKey={yKey}
              stroke="hsl(174, 72%, 56%)"
              strokeWidth={2.5}
              dot={false}
              activeDot={{ r: 4, fill: "hsl(174, 72%, 56%)" }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
