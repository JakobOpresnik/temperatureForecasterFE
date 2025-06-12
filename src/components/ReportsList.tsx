import { Link, List, ListItem, Typography } from '@mui/joy';
import type { StationRow } from '../types/supabase_rows';
import { API_BASE_URL } from '../constants/apiClient';
import type { ReactNode } from 'react';

type ReportsListProps = {
  title: string;
  icon?: ReactNode;
  stations: StationRow[];
  reportUrls: string[];
};

const ReportsList = (props: ReportsListProps) => {
  const { title, icon, stations, reportUrls } = props;

  return (
    <>
      <Typography level="body-lg" marginTop={2} startDecorator={icon}>
        {title}
      </Typography>
      <List>
        {stations.map((station: StationRow, index: number) => {
          const reportUrl: string | undefined = reportUrls.find((url: string) =>
            url.includes(station.name),
          );
          return (
            <ListItem sx={{ marginLeft: 2 }}>
              •
              {reportUrl && (
                <Link
                  key={`${station.name}_${index}`}
                  href={`${API_BASE_URL}${reportUrl}`}
                  underline="hover"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {station.name}
                </Link>
              )}
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default ReportsList;
