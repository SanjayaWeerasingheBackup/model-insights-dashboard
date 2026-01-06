import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, ReferenceLine } from 'recharts';

interface CurveData {
  roc: {
    fpr: number[];
    tpr: number[];
    auc: number;
  };
  pr: {
    precision: number[];
    recall: number[];
    auc: number;
  };
}

interface ROCPRCurvesProps {
  curveData?: CurveData;
  modelName: string;
}

export const ROCPRCurves = ({ curveData, modelName }: ROCPRCurvesProps) => {
  if (!curveData) {
    return (
      <Card className="col-span-2">
        <CardHeader>
          <CardTitle>ROC & PR Curves</CardTitle>
          <CardDescription>Performance curves not available for this model</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px] flex items-center justify-center text-muted-foreground">
          <p>Curve data not yet generated. Run the curve generator script to create visualization data.</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare ROC curve data
  const rocData = curveData.roc.fpr.map((fpr, idx) => ({
    fpr: fpr,
    tpr: curveData.roc.tpr[idx],
  }));

  // Prepare PR curve data
  const prData = curveData.pr.recall.map((recall, idx) => ({
    recall: recall,
    precision: curveData.pr.precision[idx],
  }));

  return (
    <Card className="col-span-2">
      <CardHeader>
        <CardTitle>ROC & Precision-Recall Curves</CardTitle>
        <CardDescription>{modelName} - Performance Analysis</CardDescription>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="roc" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="roc">ROC Curve</TabsTrigger>
            <TabsTrigger value="pr">Precision-Recall Curve</TabsTrigger>
          </TabsList>

          <TabsContent value="roc" className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Receiver Operating Characteristic</h4>
                <span className="text-sm text-muted-foreground">
                  AUC: <span className="font-semibold text-foreground">{curveData.roc.auc.toFixed(4)}</span>
                </span>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={rocData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="fpr"
                    label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft' }}
                    className="text-muted-foreground"
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: any) => value.toFixed(4)}
                  />
                  <Legend />
                  <ReferenceLine
                    y={0}
                    x={0}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="5 5"
                  />
                  <ReferenceLine
                    segment={[{ x: 0, y: 0 }, { x: 1, y: 1 }]}
                    stroke="hsl(var(--muted-foreground))"
                    strokeDasharray="5 5"
                    label={{ value: 'Random Classifier', position: 'insideBottomRight' }}
                  />
                  <Line
                    type="monotone"
                    dataKey="tpr"
                    stroke="hsl(var(--primary))"
                    strokeWidth={2}
                    name="ROC Curve"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="text-xs text-muted-foreground mt-2">
                <p>• AUC = 1.0: Perfect classifier</p>
                <p>• AUC = 0.5: Random classifier (diagonal line)</p>
                <p>• Higher AUC indicates better performance</p>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="pr" className="mt-4">
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium">Precision vs Recall Trade-off</h4>
                <span className="text-sm text-muted-foreground">
                  AUC: <span className="font-semibold text-foreground">{curveData.pr.auc.toFixed(4)}</span>
                </span>
              </div>
              <ResponsiveContainer width="100%" height={350}>
                <LineChart data={prData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                  <XAxis
                    dataKey="recall"
                    label={{ value: 'Recall (Sensitivity)', position: 'insideBottom', offset: -5 }}
                    className="text-muted-foreground"
                  />
                  <YAxis
                    label={{ value: 'Precision', angle: -90, position: 'insideLeft' }}
                    className="text-muted-foreground"
                  />
                  <Tooltip
                    contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
                    formatter={(value: any) => value.toFixed(4)}
                  />
                  <Legend />
                  <Line
                    type="monotone"
                    dataKey="precision"
                    stroke="hsl(var(--chart-2))"
                    strokeWidth={2}
                    name="PR Curve"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
              <div className="text-xs text-muted-foreground mt-2">
                <p>• Precision: Of predicted anomalies, how many are correct</p>
                <p>• Recall: Of actual anomalies, how many were detected</p>
                <p>• Higher AUC indicates better overall performance</p>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};
