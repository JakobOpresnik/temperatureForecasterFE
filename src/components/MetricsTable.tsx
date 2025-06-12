import { Link, Stack, Table, Typography } from '@mui/joy';
import type { EvalMetrics } from '../types/model';
import type { StationRow } from '../types/supabase_rows';
import AssessmentIcon from '@mui/icons-material/Assessment';
import { MLFLOW_EXPERIMENT_RUN_URL } from '../constants/mlflow';

type MetricsTableProps = {
  stations: StationRow[];
  metrics: EvalMetrics[];
};

const MetricsTable = (props: MetricsTableProps) => {
  const { stations, metrics } = props;

  console.log(
    'stations before: ',
    stations.map((s) => s.name),
  );

  // swap for correct station name order
  [stations[2], stations[4]] = [stations[4], stations[2]];

  console.log(
    'stations after: ',
    stations.map((s) => s.name),
  );

  const TableHead = () => (
    <thead>
      <tr>
        <th style={{ width: 100 }}>station</th>
        <th>MAE</th>
        <th>MSE</th>
        <th>RMSE</th>
      </tr>
    </thead>
  );

  const TableBody = () => (
    <tbody>
      {metrics.map((metric: EvalMetrics, index: number) => (
        <tr key={`${stations[index].name}_${index}`}>
          <td>
            <Stack flexDirection="column">
              <Link
                href={`${MLFLOW_EXPERIMENT_RUN_URL}/${metric.run_id}`}
                underline="hover"
                target="_blank" // open link in new tab
                rel="noopener noreferrer"
              >
                {stations[index].name}
              </Link>
            </Stack>
          </td>
          <td>{metric.mae}</td>
          <td>{metric.mse}</td>
          <td>{metric.rmse}</td>
        </tr>
      ))}
    </tbody>
  );

  return (
    <>
      <Typography
        level="body-lg"
        marginBlock={2}
        startDecorator={<AssessmentIcon color="primary" />}
      >
        Model Evaluation Metrics
      </Typography>
      <Table>
        <TableHead />
        <TableBody />
      </Table>
    </>
  );
};

export default MetricsTable;
