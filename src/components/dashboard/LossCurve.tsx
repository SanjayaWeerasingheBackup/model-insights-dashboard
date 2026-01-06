import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

interface TrainingHistory {
  loss: number[];
  val_loss?: number[];
  epochs?: number;
}

interface LossCurveProps {
  trainingHistory?: TrainingHistory;
  modelName: string;
}

export const LossCurve = ({ trainingHistory, modelName }: LossCurveProps) => {
  // Only show for neural network models
  const isNeuralNetwork = modelName.toLowerCase().includes('autoencoder') ||
                          modelName.toLowerCase().includes('neural') ||
                          modelName.toLowerCase().includes('deep');

  if (!isNeuralNetwork) {
    return null; // Don't show for traditional ML models
  }

  if (!trainingHistory || !trainingHistory.loss) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Training Loss Curve</CardTitle>
          <CardDescription>Training history not available</CardDescription>
        </CardHeader>
        <CardContent className="h-[250px] flex items-center justify-center text-muted-foreground">
          <p>Loss curve data not yet available for this model.</p>
        </CardContent>
      </Card>
    );
  }

  // Prepare chart data
  const chartData = trainingHistory.loss.map((loss, idx) => ({
    epoch: idx + 1,
    'Training Loss': loss,
    'Validation Loss': trainingHistory.val_loss ? trainingHistory.val_loss[idx] : null,
  }));

  const finalTrainLoss = trainingHistory.loss[trainingHistory.loss.length - 1];
  const finalValLoss = trainingHistory.val_loss
    ? trainingHistory.val_loss[trainingHistory.val_loss.length - 1]
    : null;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Training Loss Curve</CardTitle>
        <CardDescription>
          {modelName} - Loss over {trainingHistory.loss.length} epochs
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
            <XAxis
              dataKey="epoch"
              label={{ value: 'Epoch', position: 'insideBottom', offset: -5 }}
              className="text-muted-foreground"
            />
            <YAxis
              label={{ value: 'Loss (MSE)', angle: -90, position: 'insideLeft' }}
              className="text-muted-foreground"
            />
            <Tooltip
              contentStyle={{ backgroundColor: 'hsl(var(--card))', border: '1px solid hsl(var(--border))' }}
              formatter={(value: any) => value?.toFixed(6)}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="Training Loss"
              stroke="hsl(var(--primary))"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
            {trainingHistory.val_loss && (
              <Line
                type="monotone"
                dataKey="Validation Loss"
                stroke="hsl(var(--chart-2))"
                strokeWidth={2}
                dot={false}
                activeDot={{ r: 4 }}
                strokeDasharray="5 5"
              />
            )}
          </LineChart>
        </ResponsiveContainer>

        <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
          <div className="space-y-1">
            <p className="text-muted-foreground">Final Training Loss</p>
            <p className="text-lg font-semibold">{finalTrainLoss.toFixed(6)}</p>
          </div>
          {finalValLoss && (
            <div className="space-y-1">
              <p className="text-muted-foreground">Final Validation Loss</p>
              <p className="text-lg font-semibold">{finalValLoss.toFixed(6)}</p>
            </div>
          )}
        </div>

        <div className="text-xs text-muted-foreground mt-3">
          <p>• Lower loss indicates better model fit</p>
          <p>• Gap between training and validation loss indicates overfitting</p>
          <p>• Decreasing loss shows model is learning</p>
        </div>
      </CardContent>
    </Card>
  );
};
