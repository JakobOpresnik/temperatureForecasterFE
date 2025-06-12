import { Table, Typography } from '@mui/joy';
import { useStats } from '../hooks/useStats';
import type { StatsTableProps } from '../types/stats';

const StatsTable = (props: StatsTableProps) => {
  const { title, forecast } = props;

  const { avg: tempAvg, max: tempMax, min: tempMin } = useStats(forecast);

  return (
    <>
      <Typography level="body-md" sx={{ paddingTop: 2 }}>
        {title}
      </Typography>
      <Table>
        <tbody>
          <tr>
            <th>Average</th>
            <th>{tempAvg.toFixed(1)}°C</th>
          </tr>
          <tr>
            <th>Max</th>
            <th>{tempMax.toFixed(1)}°C</th>
          </tr>
          <tr>
            <th>Min</th>
            <th>{tempMin.toFixed(1)}°C</th>
          </tr>
        </tbody>
      </Table>
    </>
  );
};

export default StatsTable;
