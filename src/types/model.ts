export type EvalMetrics = {
    mse: number;
    mae: number;
    rmse: number;
}

export type ModelsMetrics = {
    models: string[];
    metrics: EvalMetrics[]
}