import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelResult } from "@/data/modelData";
import { Clock, Activity } from "lucide-react";

interface MetricsTableProps {
  model: ModelResult;
}

export const MetricsTable = ({ model }: MetricsTableProps) => {
  const metrics = [
    { label: "Accuracy", value: `${(model.accuracy * 100).toFixed(2)}%`, highlight: model.accuracy > 0.75 },
    { label: "Precision", value: `${(model.precision * 100).toFixed(2)}%`, highlight: model.precision > 0.9 },
    { label: "Recall", value: `${(model.recall * 100).toFixed(2)}%`, highlight: model.recall > 0.7 },
    { label: "F1-Score", value: model.f1Score.toFixed(4), highlight: model.f1Score > 0.75 },
    { label: "False Positive Rate", value: `${(model.fpr * 100).toFixed(2)}%`, highlight: model.fpr < 0.1, inverse: true },
  ];

  return (
    <Card className="chart-container">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Performance Metrics
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {metrics.map((metric) => (
            <div 
              key={metric.label}
              className="flex items-center justify-between p-3 rounded-lg bg-secondary/30"
            >
              <span className="text-sm text-muted-foreground">{metric.label}</span>
              <span className={`font-mono font-semibold ${
                metric.highlight 
                  ? metric.inverse ? 'text-green-400' : 'text-primary' 
                  : metric.inverse ? 'text-orange-400' : 'text-foreground'
              }`}>
                {metric.value}
              </span>
            </div>
          ))}
        </div>
        
        {/* Speed Metrics */}
        <div className="mt-4 pt-4 border-t border-border/50">
          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Clock className="h-3.5 w-3.5" />
                <span className="text-xs">Training Time</span>
              </div>
              <span className="font-mono font-semibold text-foreground">
                {model.trainingTime}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-secondary/30">
              <div className="flex items-center gap-2 text-muted-foreground mb-1">
                <Activity className="h-3.5 w-3.5" />
                <span className="text-xs">Throughput</span>
              </div>
              <span className="font-mono font-semibold text-foreground text-sm">
                {model.throughput}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
