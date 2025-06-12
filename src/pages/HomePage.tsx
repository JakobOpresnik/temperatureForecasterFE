import type { StationRow } from '../types/supabase_rows';
import { MapContainer, TileLayer } from 'react-leaflet';
import StationMarker from '../components/StationMarker';
import { MAP_LAYER, STARTING_COORDINATES } from '../constants/map';
import { useHomePageData } from '../hooks/useHomePageData';
import { Stack, Table } from '@mui/joy';
import type { EvalMetrics } from '../types/model';

const HomePage = () => {
  const { stations, forecasts, metrics } = useHomePageData();
  return (
    <>
      <Stack>
        <Table>
          <thead>
            <th>station</th>
            <th>MAE</th>
            <th>MSE</th>
            <th>RMSE</th>
          </thead>
          <tbody>
            {metrics.map((metric: EvalMetrics, index: number) => (
              <tr>
                <td>{stations[index].name}</td>
                <td>{metric.mae}</td>
                <td>{metric.mse}</td>
                <td>{metric.rmse}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Stack>
      <MapContainer center={STARTING_COORDINATES} zoom={9} style={{ height: '100vh' }}>
        <TileLayer url={MAP_LAYER} />
        {stations.map((station: StationRow, index: number) => (
          <StationMarker key={`${index}_${station}`} station={station} forecasts={forecasts} />
        ))}
      </MapContainer>
    </>
  );
};

export default HomePage;
