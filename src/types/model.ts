export type EvalMetrics = {
  mae: number;
  mse: number;
  rmse: number;
  run_id: string;
};

export type ModelsMetrics = {
  models: string[];
  metrics: EvalMetrics[];
};
