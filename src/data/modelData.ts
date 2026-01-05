export interface ModelVersion {
  id: string;
  name: string;
  accuracy: number;
  loss: number;
  epochs: number;
  trainedAt: string;
  classDistribution: { name: string; count: number; percentage: number }[];
  splitPercentages: { train: number; validation: number; test: number };
  lossHistory: { epoch: number; train: number; validation: number }[];
  accuracyHistory: { epoch: number; train: number; validation: number }[];
  rocData: { fpr: number; tpr: number }[];
  prData: { recall: number; precision: number }[];
  aucScore: number;
  f1Score: number;
  precision: number;
  recall: number;
}

export const modelVersions: ModelVersion[] = [
  {
    id: "v1",
    name: "Version 1",
    accuracy: 0.847,
    loss: 0.412,
    epochs: 50,
    trainedAt: "2024-01-15",
    classDistribution: [
      { name: "Class A", count: 2500, percentage: 25 },
      { name: "Class B", count: 3200, percentage: 32 },
      { name: "Class C", count: 1800, percentage: 18 },
      { name: "Class D", count: 2500, percentage: 25 },
    ],
    splitPercentages: { train: 70, validation: 15, test: 15 },
    lossHistory: Array.from({ length: 50 }, (_, i) => ({
      epoch: i + 1,
      train: 2.5 * Math.exp(-0.05 * i) + 0.3 + Math.random() * 0.05,
      validation: 2.6 * Math.exp(-0.045 * i) + 0.35 + Math.random() * 0.08,
    })),
    accuracyHistory: Array.from({ length: 50 }, (_, i) => ({
      epoch: i + 1,
      train: Math.min(0.95, 0.4 + 0.55 * (1 - Math.exp(-0.08 * i)) + Math.random() * 0.02),
      validation: Math.min(0.92, 0.35 + 0.52 * (1 - Math.exp(-0.07 * i)) + Math.random() * 0.03),
    })),
    rocData: Array.from({ length: 100 }, (_, i) => ({
      fpr: i / 100,
      tpr: Math.min(1, Math.pow(i / 100, 0.5) + Math.random() * 0.02),
    })),
    prData: Array.from({ length: 100 }, (_, i) => ({
      recall: i / 100,
      precision: Math.max(0.3, 1 - 0.5 * (i / 100) + Math.random() * 0.05),
    })),
    aucScore: 0.89,
    f1Score: 0.82,
    precision: 0.85,
    recall: 0.79,
  },
  {
    id: "v2",
    name: "Version 2",
    accuracy: 0.912,
    loss: 0.287,
    epochs: 75,
    trainedAt: "2024-02-20",
    classDistribution: [
      { name: "Class A", count: 3000, percentage: 24 },
      { name: "Class B", count: 3750, percentage: 30 },
      { name: "Class C", count: 2500, percentage: 20 },
      { name: "Class D", count: 3250, percentage: 26 },
    ],
    splitPercentages: { train: 75, validation: 12.5, test: 12.5 },
    lossHistory: Array.from({ length: 75 }, (_, i) => ({
      epoch: i + 1,
      train: 2.2 * Math.exp(-0.06 * i) + 0.2 + Math.random() * 0.04,
      validation: 2.3 * Math.exp(-0.055 * i) + 0.25 + Math.random() * 0.06,
    })),
    accuracyHistory: Array.from({ length: 75 }, (_, i) => ({
      epoch: i + 1,
      train: Math.min(0.97, 0.45 + 0.52 * (1 - Math.exp(-0.1 * i)) + Math.random() * 0.015),
      validation: Math.min(0.94, 0.4 + 0.5 * (1 - Math.exp(-0.09 * i)) + Math.random() * 0.025),
    })),
    rocData: Array.from({ length: 100 }, (_, i) => ({
      fpr: i / 100,
      tpr: Math.min(1, Math.pow(i / 100, 0.4) + Math.random() * 0.015),
    })),
    prData: Array.from({ length: 100 }, (_, i) => ({
      recall: i / 100,
      precision: Math.max(0.4, 1 - 0.4 * (i / 100) + Math.random() * 0.04),
    })),
    aucScore: 0.93,
    f1Score: 0.89,
    precision: 0.91,
    recall: 0.87,
  },
  {
    id: "v3",
    name: "Version 3",
    accuracy: 0.945,
    loss: 0.198,
    epochs: 100,
    trainedAt: "2024-03-10",
    classDistribution: [
      { name: "Class A", count: 4000, percentage: 25 },
      { name: "Class B", count: 4400, percentage: 27.5 },
      { name: "Class C", count: 3600, percentage: 22.5 },
      { name: "Class D", count: 4000, percentage: 25 },
    ],
    splitPercentages: { train: 80, validation: 10, test: 10 },
    lossHistory: Array.from({ length: 100 }, (_, i) => ({
      epoch: i + 1,
      train: 2.0 * Math.exp(-0.07 * i) + 0.15 + Math.random() * 0.03,
      validation: 2.1 * Math.exp(-0.065 * i) + 0.18 + Math.random() * 0.05,
    })),
    accuracyHistory: Array.from({ length: 100 }, (_, i) => ({
      epoch: i + 1,
      train: Math.min(0.98, 0.5 + 0.48 * (1 - Math.exp(-0.12 * i)) + Math.random() * 0.01),
      validation: Math.min(0.96, 0.45 + 0.48 * (1 - Math.exp(-0.11 * i)) + Math.random() * 0.02),
    })),
    rocData: Array.from({ length: 100 }, (_, i) => ({
      fpr: i / 100,
      tpr: Math.min(1, Math.pow(i / 100, 0.35) + Math.random() * 0.01),
    })),
    prData: Array.from({ length: 100 }, (_, i) => ({
      recall: i / 100,
      precision: Math.max(0.5, 1 - 0.35 * (i / 100) + Math.random() * 0.03),
    })),
    aucScore: 0.96,
    f1Score: 0.93,
    precision: 0.94,
    recall: 0.92,
  },
];
