import { Brain, Calendar, Layers } from "lucide-react";
import { ModelVersion } from "@/data/modelData";

interface DashboardHeaderProps {
  version: ModelVersion;
}

export const DashboardHeader = ({ version }: DashboardHeaderProps) => {
  return (
    <div className="mb-8 fade-in">
      <div className="flex items-center gap-3 mb-2">
        <div className="p-2 rounded-lg bg-primary/10 animate-pulse-glow">
          <Brain className="h-6 w-6 text-primary" />
        </div>
        <h1 className="text-3xl font-bold tracking-tight">
          ML Model Dashboard
        </h1>
      </div>
      <div className="flex items-center gap-4 text-sm text-muted-foreground mt-3">
        <div className="flex items-center gap-1.5">
          <Layers className="h-4 w-4" />
          <span>Active: <span className="text-foreground font-medium">{version.name}</span></span>
        </div>
        <div className="w-px h-4 bg-border" />
        <div className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>Trained: <span className="text-foreground font-medium">{version.trainedAt}</span></span>
        </div>
        <div className="w-px h-4 bg-border" />
        <span>{version.epochs} epochs</span>
      </div>
    </div>
  );
};
