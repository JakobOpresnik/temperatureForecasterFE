export type EvalMetrics = {
  mae: number;
  mse: number;
  rmse: number;
  run_id: string;
};

export type ModelHyperparameters = {
  test_size: number;
  val_size: number;
  lookback: number;
  forecast_horizon: number;
  batch_size: number;
  dropout: number;
  learning_rate: number;
  patience: number;
  epochs: number;
  run_id: number;
};

export type ModelsMetrics = {
  models: string[];
  metrics: EvalMetrics[];
  hyperparameters: ModelHyperparameters[];
};
