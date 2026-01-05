export interface ModelResult {
  id: string;
  name: string;
  accuracy: number;
  precision: number;
  recall: number;
  f1Score: number;
  fpr: number; // False Positive Rate
  trainingTime: string;
  throughput: string;
  confusionMatrix: {
    tn: number;
    fp: number;
    fn: number;
    tp: number;
  };
}

export interface DatasetVersion {
  id: string;
  name: string;
  datasetName: string;
  date: string;
  totalSamples: number;
  features: number;
  classDistribution: { name: string; count: number; percentage: number }[];
  splitPercentages: { train: number; validation: number; test: number };
  models: ModelResult[];
  available: boolean;
}

export const datasetVersions: DatasetVersion[] = [
  {
    id: "v1",
    name: "V1",
    datasetName: "CSIC 2010 HTTP Traffic",
    date: "2026-01-03",
    totalSamples: 61065,
    features: 11,
    available: true,
    classDistribution: [
      { name: "Normal", count: 36000, percentage: 59 },
      { name: "Anomalous", count: 25065, percentage: 41 },
    ],
    splitPercentages: { train: 80, validation: 0, test: 20 },
    models: [
      {
        id: "knn",
        name: "KNN (LOF)",
        accuracy: 0.7853,
        precision: 0.9913,
        recall: 0.7301,
        f1Score: 0.8409,
        fpr: 0.0224,
        trainingTime: "7.32s",
        throughput: "4,500 samples/s",
        confusionMatrix: { tn: 7039, fp: 161, fn: 6765, tp: 18300 },
      },
      {
        id: "isolation_forest",
        name: "Isolation Forest",
        accuracy: 0.7393,
        precision: 0.8663,
        recall: 0.7856,
        f1Score: 0.8240,
        fpr: 0.4221,
        trainingTime: "0.80s",
        throughput: "62,500 samples/s",
        confusionMatrix: { tn: 4161, fp: 3039, fn: 5373, tp: 19692 },
      },
      {
        id: "ocsvm",
        name: "One-Class SVM",
        accuracy: 0.5497,
        precision: 0.9422,
        recall: 0.4478,
        f1Score: 0.6071,
        fpr: 0.0956,
        trainingTime: "19.53s",
        throughput: "3,058 samples/s",
        confusionMatrix: { tn: 6512, fp: 688, fn: 13840, tp: 11225 },
      },
      {
        id: "gmm",
        name: "GMM",
        accuracy: 0.4774,
        precision: 0.9243,
        recall: 0.3565,
        f1Score: 0.5146,
        fpr: 0.1017,
        trainingTime: "1.12s",
        throughput: "250,000 samples/s",
        confusionMatrix: { tn: 6468, fp: 732, fn: 16129, tp: 8936 },
      },
      {
        id: "autoencoder",
        name: "Autoencoder",
        accuracy: 0.4689,
        precision: 0.9597,
        recall: 0.3302,
        f1Score: 0.4914,
        fpr: 0.0483,
        trainingTime: "50.57s",
        throughput: "7,633 samples/s",
        confusionMatrix: { tn: 6852, fp: 348, fn: 16788, tp: 8277 },
      },
    ],
  },
  {
    id: "v2",
    name: "V2",
    datasetName: "CIC-IDS2018",
    date: "Coming Soon",
    totalSamples: 0,
    features: 40,
    available: false,
    classDistribution: [],
    splitPercentages: { train: 0, validation: 0, test: 0 },
    models: [],
  },
  {
    id: "v3",
    name: "V3",
    datasetName: "BCCC-cPacket Cloud DDoS 2024",
    date: "2026-01-04",
    totalSamples: 540494,
    features: 317,
    available: true,
    classDistribution: [
      { name: "Benign", count: 349178, percentage: 64.6 },
      { name: "Attack", count: 170436, percentage: 31.5 },
      { name: "Suspicious", count: 20880, percentage: 3.9 },
    ],
    splitPercentages: { train: 100, validation: 0, test: 0 }, // Trained only on Benign
    models: [
      {
        id: "ocsvm",
        name: "One-Class SVM",
        accuracy: 0.8841,
        precision: 0.9432,
        recall: 0.8175,
        f1Score: 0.8759,
        fpr: 0.0493,
        trainingTime: "74.5 min",
        throughput: "255 samples/s",
        confusionMatrix: { tn: 47537, fp: 2463, fn: 9123, tp: 40877 },
      },
      {
        id: "knn",
        name: "KNN (LOF)",
        accuracy: 0.8089,
        precision: 0.9347,
        recall: 0.6643,
        f1Score: 0.7766,
        fpr: 0.0464,
        trainingTime: "9.6 min",
        throughput: "596 samples/s",
        confusionMatrix: { tn: 47680, fp: 2320, fn: 16787, tp: 33213 },
      },
      {
        id: "autoencoder",
        name: "Autoencoder",
        accuracy: 0.5683,
        precision: 0.7908,
        recall: 0.1856,
        f1Score: 0.3007,
        fpr: 0.0491,
        trainingTime: "8.6 min",
        throughput: "42,539 samples/s",
        confusionMatrix: { tn: 47545, fp: 2455, fn: 40719, tp: 9281 },
      },
      {
        id: "gmm",
        name: "GMM",
        accuracy: 0.5444,
        precision: 0.7372,
        recall: 0.1381,
        f1Score: 0.2326,
        fpr: 0.0492,
        trainingTime: "9.9s",
        throughput: "309,785 samples/s",
        confusionMatrix: { tn: 47539, fp: 2461, fn: 43096, tp: 6904 },
      },
      {
        id: "isolation_forest",
        name: "Isolation Forest",
        accuracy: 0.5402,
        precision: 0.7242,
        recall: 0.1300,
        f1Score: 0.2205,
        fpr: 0.0495,
        trainingTime: "2.2s",
        throughput: "226,137 samples/s",
        confusionMatrix: { tn: 47524, fp: 2476, fn: 43499, tp: 6501 },
      },
    ],
  },
];
