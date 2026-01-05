import { ModelResult } from "@/data/modelData";
import { cn } from "@/lib/utils";
import { Trophy, Zap, Shield } from "lucide-react";

interface ModelSelectorProps {
  models: ModelResult[];
  activeModelId: string;
  onModelChange: (modelId: string) => void;
}

const getBadge = (model: ModelResult, allModels: ModelResult[]) => {
  const bestAccuracy = Math.max(...allModels.map(m => m.accuracy));
  const fastestThroughput = Math.max(...allModels.map(m => parseFloat(m.throughput.replace(/,/g, ''))));
  const lowestFpr = Math.min(...allModels.map(m => m.fpr));
  
  if (model.accuracy === bestAccuracy) return { icon: Trophy, label: "Best", color: "text-yellow-500" };
  if (parseFloat(model.throughput.replace(/,/g, '')) === fastestThroughput) return { icon: Zap, label: "Fastest", color: "text-cyan-400" };
  if (model.fpr === lowestFpr) return { icon: Shield, label: "Lowest FPR", color: "text-green-400" };
  return null;
};

export const ModelSelector = ({ models, activeModelId, onModelChange }: ModelSelectorProps) => {
  return (
    <div className="flex flex-wrap gap-2">
      {models.map((model) => {
        const badge = getBadge(model, models);
        return (
          <button
            key={model.id}
            onClick={() => onModelChange(model.id)}
            className={cn(
              "relative px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200",
              "border border-border/50 hover:border-primary/50",
              activeModelId === model.id
                ? "bg-primary text-primary-foreground shadow-lg shadow-primary/25"
                : "bg-secondary/50 text-foreground hover:bg-secondary"
            )}
          >
            <div className="flex items-center gap-2">
              {badge && <badge.icon className={cn("h-3.5 w-3.5", badge.color)} />}
              <span>{model.name}</span>
            </div>
            <span className={cn(
              "block text-xs mt-0.5",
              activeModelId === model.id ? "text-primary-foreground/80" : "text-muted-foreground"
            )}>
              {(model.accuracy * 100).toFixed(1)}% accuracy
            </span>
          </button>
        );
      })}
    </div>
  );
};
