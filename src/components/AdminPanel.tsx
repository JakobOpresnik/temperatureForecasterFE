import { Box, Divider, Drawer } from '@mui/joy';
import type { EvalMetrics, ModelHyperparameters } from '../types/model';
import type { StationRow } from '../types/supabase_rows';
import MetricsTable from './MetricsTable';
import { useAdminPanelData } from '../hooks/useAdminPanelData';
import ReportsList from './ReportsList';
import ReportIcon from '@mui/icons-material/Report';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import HyperparametersTable from './HyperparametersTable';

type AdminPanelProps = {
  stations: StationRow[];
  metrics: EvalMetrics[];
  hyperparameters: ModelHyperparameters[];
  isLoaded: boolean;
  isOpen: boolean;
  onClose: () => void;
};

const AdminPanel = (props: AdminPanelProps) => {
  const { stations, metrics, hyperparameters, isLoaded, isOpen, onClose } = props;

  const { testReportUrls, validationReportUrls } = useAdminPanelData();

  console.log('test reports: ', testReportUrls);
  console.log('validation reports: ', validationReportUrls);

  return (
    <>
      {isLoaded && (
        <Drawer open={isOpen} onClose={onClose} size="md">
          <Box padding={2}>
            <Divider />
            <MetricsTable stations={stations} metrics={metrics} />
            <Divider />
            <ReportsList
              title="Data Validation Reports"
              icon={<CheckBoxIcon color="primary" />}
              stations={stations}
              reportUrls={validationReportUrls}
            />
            <Divider />
            <ReportsList
              title="Data Test Reports"
              icon={<ReportIcon color="primary" />}
              stations={stations}
              reportUrls={testReportUrls}
            />
            <Divider />
            <HyperparametersTable hyperparameters={hyperparameters} />
          </Box>
        </Drawer>
      )}
    </>
  );
};

export default AdminPanel;
