import { Drawer, Link, Stack, Table } from '@mui/joy';
import type { EvalMetrics } from '../types/model';
import type { StationRow } from '../types/supabase_rows';
import { MLFLOW_EXPERIMENT_RUN_URL } from '../constants/mlflow';

type MetricsTableProps = {
  stations: StationRow[];
  metrics: EvalMetrics[];
  isLoaded: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const MetricsTable = (props: MetricsTableProps) => {
  const { stations, metrics, isLoaded, isOpen, onClose } = props;

  const TableHead = () => (
    <thead>
      <tr>
        <th>station</th>
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
              <Link href={`${MLFLOW_EXPERIMENT_RUN_URL}/${metric.run_id}`}>
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
      {isLoaded && (
        <Drawer open={isOpen} onClose={onClose} size="md">
          <Table>
            <TableHead />
            <TableBody />
          </Table>
        </Drawer>
      )}
    </>
  );
};

export default MetricsTable;
