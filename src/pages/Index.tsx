import { useState } from "react";
import { Target, Shield, Crosshair, AlertTriangle } from "lucide-react";
import { datasetVersions } from "@/data/modelData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { VersionTabs } from "@/components/dashboard/VersionTabs";
import { ModelSelector } from "@/components/dashboard/ModelSelector";
import { StatCard } from "@/components/dashboard/StatCard";
import { ClassDistributionChart } from "@/components/dashboard/ClassDistributionChart";
import { SplitChart } from "@/components/dashboard/SplitChart";
import { ConfusionMatrix } from "@/components/dashboard/ConfusionMatrix";
import { MetricsTable } from "@/components/dashboard/MetricsTable";
import { Card, CardContent } from "@/components/ui/card";

const Index = () => {
  const [activeVersionId, setActiveVersionId] = useState("v3");
  const [activeModelId, setActiveModelId] = useState("ocsvm");
  
  const activeDataset = datasetVersions.find(v => v.id === activeVersionId) || datasetVersions[2];
  const activeModel = activeDataset.models.find(m => m.id === activeModelId) || activeDataset.models[0];

  // Reset model selection when switching datasets
  const handleVersionChange = (versionId: string) => {
    setActiveVersionId(versionId);
    const dataset = datasetVersions.find(v => v.id === versionId);
    if (dataset && dataset.models.length > 0) {
      // Select the best model (highest accuracy) by default
      const bestModel = [...dataset.models].sort((a, b) => b.accuracy - a.accuracy)[0];
      setActiveModelId(bestModel.id);
    }
  };

  if (!activeDataset.available) {
    return (
      <div className="min-h-screen bg-background p-6 lg:p-8">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
            <DashboardHeader dataset={activeDataset} />
            <VersionTabs 
              versions={datasetVersions} 
              activeVersion={activeVersionId} 
              onVersionChange={handleVersionChange} 
            />
          </div>
          <Card className="p-12 text-center">
            <CardContent className="flex flex-col items-center gap-4">
              <AlertTriangle className="h-16 w-16 text-muted-foreground" />
              <h2 className="text-2xl font-bold">Dataset Coming Soon</h2>
              <p className="text-muted-foreground max-w-md">
                V2 results using the CIC-IDS2018 dataset are not yet available. 
                Please check back later or select another dataset version.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-6">
          <DashboardHeader dataset={activeDataset} model={activeModel} />
          <VersionTabs 
            versions={datasetVersions} 
            activeVersion={activeVersionId} 
            onVersionChange={handleVersionChange} 
          />
        </div>

        {/* Model Selector */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-muted-foreground mb-3">Select Model</h3>
          <ModelSelector 
            models={activeDataset.models}
            activeModelId={activeModelId}
            onModelChange={setActiveModelId}
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Accuracy"
            value={`${(activeModel.accuracy * 100).toFixed(2)}%`}
            subtitle="On test set"
            icon={Target}
            trend={activeModel.accuracy > 0.75 ? "up" : undefined}
            trendValue={activeModel.accuracy > 0.75 ? "Good performance" : undefined}
          />
          <StatCard
            title="Precision"
            value={`${(activeModel.precision * 100).toFixed(2)}%`}
            subtitle="True positive rate"
            icon={Crosshair}
          />
          <StatCard
            title="Recall"
            value={`${(activeModel.recall * 100).toFixed(2)}%`}
            subtitle="Sensitivity"
            icon={Shield}
          />
          <StatCard
            title="FPR"
            value={`${(activeModel.fpr * 100).toFixed(2)}%`}
            subtitle="False Positive Rate"
            icon={AlertTriangle}
            trend={activeModel.fpr < 0.1 ? "up" : "down"}
            trendValue={activeModel.fpr < 0.1 ? "Low false alarms" : "High false alarms"}
          />
        </div>

        {/* Charts Grid - Row 1 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ClassDistributionChart data={activeDataset.classDistribution} />
          <SplitChart split={activeDataset.splitPercentages} splitInfo={activeDataset.splitInfo} />
        </div>

        {/* Charts Grid - Row 2 */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <MetricsTable model={activeModel} />
          <ConfusionMatrix model={activeModel} />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>ML-Based Threat-Aware Autoscaling • {activeDataset.datasetName} • {activeDataset.date}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
