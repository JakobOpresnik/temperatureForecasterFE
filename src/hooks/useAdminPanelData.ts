import { useEffect, useState } from 'react';
import { TestReportApi } from '../services/testReportApi';
import { ValidationReportApi } from '../services/validationReportApi';

export const useAdminPanelData = () => {
  const [testReportUrls, setTestReportUrls] = useState<string[]>([]);
  const [validationReportUrls, setValidationReportUrls] = useState<string[]>([]);

  const fetchTestReports = async (): Promise<void> => {
    try {
      const reportUrls: string[] = await TestReportApi.getAll();
      setTestReportUrls(reportUrls);
    } catch (err) {
      console.error(err);
    }
  };

  const fetchValidationReports = async (): Promise<void> => {
    try {
      const reportUrls: string[] = await ValidationReportApi.getAll();
      setValidationReportUrls(reportUrls);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchTestReports();
    fetchValidationReports();
  }, []);

  return {
    testReportUrls,
    validationReportUrls,
  };
};
