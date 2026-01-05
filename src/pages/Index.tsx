import { useState } from "react";
import { Target, TrendingDown, Award, Crosshair } from "lucide-react";
import { modelVersions } from "@/data/modelData";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { VersionTabs } from "@/components/dashboard/VersionTabs";
import { StatCard } from "@/components/dashboard/StatCard";
import { ClassDistributionChart } from "@/components/dashboard/ClassDistributionChart";
import { SplitChart } from "@/components/dashboard/SplitChart";
import { LossAccuracyChart } from "@/components/dashboard/LossAccuracyChart";
import { RocPrChart } from "@/components/dashboard/RocPrChart";

const Index = () => {
  const [activeVersionId, setActiveVersionId] = useState("v3");
  
  const activeVersion = modelVersions.find(v => v.id === activeVersionId) || modelVersions[2];

  return (
    <div className="min-h-screen bg-background p-6 lg:p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6 mb-8">
          <DashboardHeader version={activeVersion} />
          <VersionTabs 
            versions={modelVersions} 
            activeVersion={activeVersionId} 
            onVersionChange={setActiveVersionId} 
          />
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <StatCard
            title="Accuracy"
            value={`${(activeVersion.accuracy * 100).toFixed(1)}%`}
            subtitle="On test set"
            icon={Target}
            trend="up"
            trendValue={`+${((activeVersion.accuracy - 0.8) * 100).toFixed(1)}% from baseline`}
          />
          <StatCard
            title="Loss"
            value={activeVersion.loss.toFixed(3)}
            subtitle="Final validation"
            icon={TrendingDown}
          />
          <StatCard
            title="F1 Score"
            value={activeVersion.f1Score.toFixed(3)}
            subtitle="Harmonic mean"
            icon={Award}
          />
          <StatCard
            title="AUC-ROC"
            value={activeVersion.aucScore.toFixed(3)}
            subtitle="Area under curve"
            icon={Crosshair}
          />
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <ClassDistributionChart data={activeVersion.classDistribution} />
          <SplitChart split={activeVersion.splitPercentages} />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          <LossAccuracyChart 
            lossData={activeVersion.lossHistory} 
            accuracyData={activeVersion.accuracyHistory}
            type="loss"
          />
          <LossAccuracyChart 
            lossData={activeVersion.lossHistory} 
            accuracyData={activeVersion.accuracyHistory}
            type="accuracy"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <RocPrChart 
            rocData={activeVersion.rocData} 
            prData={activeVersion.prData}
            type="roc"
            aucScore={activeVersion.aucScore}
          />
          <RocPrChart 
            rocData={activeVersion.rocData} 
            prData={activeVersion.prData}
            type="pr"
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-sm text-muted-foreground">
          <p>Model metrics dashboard • Last updated: {new Date().toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
};

export default Index;
