import { ModelVersion } from "@/data/modelData";

interface VersionTabsProps {
  versions: ModelVersion[];
  activeVersion: string;
  onVersionChange: (versionId: string) => void;
}

export const VersionTabs = ({ versions, activeVersion, onVersionChange }: VersionTabsProps) => {
  return (
    <div className="flex items-center gap-2 p-1.5 bg-secondary/50 rounded-xl backdrop-blur-sm">
      {versions.map((version) => (
        <button
          key={version.id}
          onClick={() => onVersionChange(version.id)}
          className={`version-tab ${
            activeVersion === version.id ? "version-tab-active" : "version-tab-inactive"
          }`}
        >
          <span className="font-mono text-sm">{version.id.toUpperCase()}</span>
          <span className="ml-2 text-xs opacity-80">
            {(version.accuracy * 100).toFixed(1)}%
          </span>
        </button>
      ))}
    </div>
  );
};
