import { Table, Typography } from '@mui/joy';
import type { ModelHyperparameters } from '../types/model';
import SettingsIcon from '@mui/icons-material/Settings';

type HyperparametersTableProps = {
  hyperparameters: ModelHyperparameters[];
};

const HyperparametersTable = (props: HyperparametersTableProps) => {
  const { hyperparameters } = props;
  const params: ModelHyperparameters = hyperparameters[0];

  const TableHead = () => (
    <thead>
      <tr>
        <th>Hyperparameter</th>
        <th>Value</th>
      </tr>
    </thead>
  );

  const TableBody = () => (
    <tbody>
      <tr>
        <td>Test size</td>
        <td>{params.test_size}</td>
      </tr>
      <tr>
        <td>Val size</td>
        <td>{params.val_size}</td>
      </tr>
      <tr>
        <td>Lookback</td>
        <td>{params.lookback}</td>
      </tr>
      <tr>
        <td>Forecast horizon</td>
        <td>{params.forecast_horizon}</td>
      </tr>
      <tr>
        <td>Batch size</td>
        <td>{params.batch_size}</td>
      </tr>
      <tr>
        <td>Dropout</td>
        <td>{params.dropout}</td>
      </tr>
      <tr>
        <td>Learning rate</td>
        <td>{params.learning_rate}</td>
      </tr>
      <tr>
        <td>Patiennce</td>
        <td>{params.patience}</td>
      </tr>
      <tr>
        <td>Epochs</td>
        <td>{params.epochs}</td>
      </tr>
    </tbody>
  );

  return (
    <>
      <Typography
        level="body-lg"
        marginTop={2}
        marginBottom={0.5}
        startDecorator={<SettingsIcon color="primary" />}
      >
        Model Hyperparameters
      </Typography>
      <Typography level="body-sm" color="neutral" marginBottom={2} marginLeft={4}>
        same for all models*
      </Typography>
      <Table>
        <TableHead />
        <TableBody />
      </Table>
    </>
  );
};

export default HyperparametersTable;
