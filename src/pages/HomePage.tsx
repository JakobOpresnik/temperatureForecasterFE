import type { StationRow } from '../types/supabase_rows';
import { MapContainer, TileLayer } from 'react-leaflet';
import StationMarker from '../components/StationMarker';
import { MAP_LAYER, STARTING_COORDINATES } from '../constants/map';
import { useHomePageData } from '../hooks/useHomePageData';
import { Button, Stack } from '@mui/joy';
import { useMemo, useState } from 'react';
import AdminPanel from '../components/AdminPanel';

const HomePage = () => {
  const { stations, forecasts, metrics, hyperparameters } = useHomePageData();

  const [shouldShowAdminPanel, setShouldShowAdminPanel] = useState<boolean>(false);
  const areStationsLoaded: boolean = useMemo(() => stations.length > 0, [stations]);

  const toggleShowAdminPanel = () => {
    setShouldShowAdminPanel((prev: boolean) => !prev);
  };

  return (
    <>
      <Stack flexDirection="row">
        <Button sx={{ marginBottom: 4 }} onClick={toggleShowAdminPanel}>
          SHOW ADMIN PANEL
        </Button>
      </Stack>
      <AdminPanel
        stations={stations}
        metrics={metrics}
        hyperparameters={hyperparameters}
        isLoaded={areStationsLoaded}
        isOpen={shouldShowAdminPanel}
        onClose={() => setShouldShowAdminPanel(false)}
      />
      <MapContainer
        center={STARTING_COORDINATES}
        zoom={8.5}
        style={{ height: '82vh', width: '91vw', borderRadius: '10px' }}
      >
        <TileLayer url={MAP_LAYER} />
        {stations.map((station: StationRow, index: number) => (
          <StationMarker key={`${index}_${station}`} station={station} forecasts={forecasts} />
        ))}
      </MapContainer>
    </>
  );
};

export default HomePage;
