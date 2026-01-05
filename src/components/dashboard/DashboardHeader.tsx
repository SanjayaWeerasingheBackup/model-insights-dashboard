import { Brain, Calendar, Database, Layers } from "lucide-react";
import { DatasetVersion, ModelResult } from "@/data/modelData";

interface DashboardHeaderProps {
  dataset: DatasetVersion;
  model?: ModelResult;
}

export const DashboardHeader = ({ dataset, model }: DashboardHeaderProps) => {
  return (
    <div className="mb-2 fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 animate-pulse-glow">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          ML Model Dashboard
        </h1>
      </div>
      <p className="text-muted-foreground mb-3">{dataset.datasetName}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
        <div className="flex items-center gap-1.5">
          <Layers className="h-4 w-4" />
          <span>Dataset: <span className="text-foreground font-medium">{dataset.name}</span></span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5">
          <Database className="h-4 w-4" />
          <span><span className="text-foreground font-medium">{dataset.totalSamples.toLocaleString()}</span> samples</span>
        </div>
        <div className="w-px h-4 bg-border" />
        <span><span className="text-foreground font-medium">{dataset.features}</span> features</span>
        {model && (
          <>
            <div className="w-px h-4 bg-border" />
            <div className="flex items-center gap-1.5">
              <Calendar className="h-4 w-4" />
              <span>{dataset.date}</span>
            </div>
          </>
        )}
      </div>
    </div>
  );
};
