import { DatasetVersion } from "@/data/modelData";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";

interface VersionTabsProps {
  versions: DatasetVersion[];
  activeVersion: string;
  onVersionChange: (versionId: string) => void;
}

export const VersionTabs = ({ versions, activeVersion, onVersionChange }: VersionTabsProps) => {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-xl backdrop-blur-sm">
      {versions.map((version) => (
        <button
          key={version.id}
          onClick={() => version.available && onVersionChange(version.id)}
          disabled={!version.available}
          className={cn(
            "version-tab relative",
            activeVersion === version.id 
              ? "version-tab-active" 
              : version.available 
                ? "version-tab-inactive" 
                : "version-tab-inactive opacity-50 cursor-not-allowed"
          )}
        >
          <div className="flex items-center gap-1.5">
            {!version.available && <Lock className="h-3 w-3" />}
            <span className="font-mono text-sm">{version.id.toUpperCase()}</span>
          </div>
          <span className="ml-2 text-xs opacity-80">
            {version.available 
              ? `${version.models.length} models`
              : "Coming Soon"
            }
          </span>
        </button>
      ))}
    </div>
  );
};
