import { Table, Typography } from '@mui/joy';
import type { Forecast } from '../types/forecast';
import { useStats } from '../hooks/useStats';

type StatsTableProps = {
  title: string;
  forecast: Forecast;
};

const StatsTable = (props: StatsTableProps) => {
  const { title, forecast } = props;

  const {
    avg: tempAvg,
    max: tempMax,
    min: tempMin,
    show: shouldShowStatsTable,
  } = useStats(forecast);

  return (
    <>
      {shouldShowStatsTable && (
        <>
          <Typography level='body-md' sx={{ paddingTop: 2 }}>
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
      )}
    </>
  );
};

export default StatsTable;
