import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ModelResult } from "@/data/modelData";

interface ConfusionMatrixProps {
  model: ModelResult;
}

export const ConfusionMatrix = ({ model }: ConfusionMatrixProps) => {
  const { tn, fp, fn, tp } = model.confusionMatrix;
  const total = tn + fp + fn + tp;
  
  const getPercentage = (value: number) => ((value / total) * 100).toFixed(1);
  
  return (
    <Card className="chart-container">
      <CardHeader className="pb-4">
        <CardTitle className="text-lg font-semibold text-foreground">
          Confusion Matrix
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex flex-col items-center">
          {/* Labels */}
          <div className="text-xs text-muted-foreground mb-2 font-medium">
            Predicted
          </div>
          
          <div className="flex items-center gap-4">
            {/* Y-axis label */}
            <div className="text-xs text-muted-foreground font-medium -rotate-90 w-4">
              Actual
            </div>
            
            {/* Matrix */}
            <div className="grid grid-cols-3 gap-1 text-center">
              {/* Header row */}
              <div className="p-2"></div>
              <div className="p-2 text-xs font-medium text-muted-foreground">Normal</div>
              <div className="p-2 text-xs font-medium text-muted-foreground">Anomaly</div>
              
              {/* Normal row */}
              <div className="p-2 text-xs font-medium text-muted-foreground">Normal</div>
              <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                <div className="text-lg font-bold text-green-400">{tn.toLocaleString()}</div>
                <div className="text-xs text-green-400/80">TN ({getPercentage(tn)}%)</div>
              </div>
              <div className="p-4 rounded-lg bg-red-500/20 border border-red-500/30">
                <div className="text-lg font-bold text-red-400">{fp.toLocaleString()}</div>
                <div className="text-xs text-red-400/80">FP ({getPercentage(fp)}%)</div>
              </div>
              
              {/* Anomaly row */}
              <div className="p-2 text-xs font-medium text-muted-foreground">Anomaly</div>
              <div className="p-4 rounded-lg bg-orange-500/20 border border-orange-500/30">
                <div className="text-lg font-bold text-orange-400">{fn.toLocaleString()}</div>
                <div className="text-xs text-orange-400/80">FN ({getPercentage(fn)}%)</div>
              </div>
              <div className="p-4 rounded-lg bg-green-500/20 border border-green-500/30">
                <div className="text-lg font-bold text-green-400">{tp.toLocaleString()}</div>
                <div className="text-xs text-green-400/80">TP ({getPercentage(tp)}%)</div>
              </div>
            </div>
          </div>
          
          {/* Legend */}
          <div className="flex flex-wrap gap-4 mt-4 text-xs text-muted-foreground">
            <span><span className="text-green-400">TN</span> = True Negative</span>
            <span><span className="text-red-400">FP</span> = False Positive</span>
            <span><span className="text-orange-400">FN</span> = False Negative</span>
            <span><span className="text-green-400">TP</span> = True Positive</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};
