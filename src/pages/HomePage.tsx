import type { StationRow } from '../types/supabase_rows';
import { MapContainer, TileLayer } from 'react-leaflet';
import StationMarker from '../components/StationMarker';
import { MAP_LAYER, STARTING_COORDINATES } from '../constants/map';
import { useHomePageData } from '../hooks/useHomePageData';

const HomePage = () => {
  const { stations, forecasts } = useHomePageData();
  return (
    <MapContainer center={STARTING_COORDINATES} zoom={9} style={{ height: '100vh' }}>
      <TileLayer url={MAP_LAYER} />
      {stations.map((station: StationRow, index: number) => (
        <StationMarker key={`${index}_${station}`} station={station} forecasts={forecasts} />
      ))}
    </MapContainer>
  );
};

export default HomePage;
