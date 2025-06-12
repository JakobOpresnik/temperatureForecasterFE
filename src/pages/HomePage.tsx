import type { StationRow } from '../types/supabase_rows';
import { MapContainer, TileLayer } from 'react-leaflet';
import StationMarker from '../components/StationMarker';
import { MAP_LAYER, STARTING_COORDINATES } from '../constants/map';
import { useHomePageData } from '../hooks/useHomePageData';
import { Button } from '@mui/joy';
import { useMemo, useState } from 'react';
import MetricsTable from '../components/MetricsTable';

const HomePage = () => {
  const { stations, forecasts, metrics } = useHomePageData();

  const [shouldShowAdminPanel, setShouldShowAdminPanel] = useState<boolean>(false);
  const areStationsLoaded: boolean = useMemo(() => stations.length > 0, [stations]);

  const toggleShowAdminPanel = () => {
    setShouldShowAdminPanel((prev: boolean) => !prev);
  };

  return (
    <>
      <Button onClick={toggleShowAdminPanel}>Show Admin Panel</Button>
      <MetricsTable
        stations={stations}
        metrics={metrics}
        isLoaded={areStationsLoaded}
        isOpen={shouldShowAdminPanel}
        onClose={() => setShouldShowAdminPanel(false)}
      />
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
