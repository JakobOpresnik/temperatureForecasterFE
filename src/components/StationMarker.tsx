import '../App.css';
import { Marker, Popup } from 'react-leaflet';
import CircularProgress from '@mui/joy/CircularProgress';
import { Stack, Typography } from '@mui/joy';
import TemperatureChart from './TemperatureChart';
import { Card, CardContent, CardHeader } from './ui/card';
import StatsTable from './StatsTable';
import { useMarkerData } from '../hooks/useMarkerData';
import type { StationMarkerProps } from '../types/marker';

const StationMarker = ({ station, forecasts }: StationMarkerProps) => {
  const {
    show: shouldShowPopup,
    actuals,
    predictions,
    timestamps,
    forecast,
  } = useMarkerData({ station, forecasts });

  return (
    <Marker position={[station.latitude, station.longitude]}>
      <Popup>
        {shouldShowPopup ? (
          <Card style={{ width: 350, border: 0 }} className="!shadow-none">
            <CardHeader>
              <Typography level="h3">{station.name}</Typography>
              <Typography level="body-sm">
                {station.latitude}, {station.longitude}
              </Typography>
            </CardHeader>
            <CardContent>
              <>
                <TemperatureChart
                  actuals={actuals}
                  predictions={predictions}
                  timestamps={timestamps ?? []}
                />
                {forecast && <StatsTable title="Stats for the last 9 hours" forecast={forecast} />}
              </>
            </CardContent>
          </Card>
        ) : (
          <Stack marginLeft={5}>
            <CircularProgress variant="soft" sx={{ alignSelf: 'center' }} />
          </Stack>
        )}
      </Popup>
    </Marker>
  );
};

export default StationMarker;
