import { Box, Container } from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import DataCard from 'components/shared/dataCard/DataCard';
import CategoryAssignments from 'components/_dashboard/generalDashboard/CategoryAssignments';
import ComingAppoinments from 'components/_dashboard/generalDashboard/ComingAppoinments';
import LawyersAssignments from 'components/_dashboard/generalDashboard/LawyersAssignments';
import StatisticsInfo from 'components/_dashboard/generalDashboard/StatisticsInfo';
import TotalAppoinments from 'components/_dashboard/generalDashboard/TotalAppoinments';
import TotalIncome from 'components/_dashboard/generalDashboard/TotalIncome';
import useSettings from 'hooks/useSettings';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  appointmentData,
  cardsData,
  categoryAssignments,
  incomeData,
  reproduceChartData,
  TABLE_HEAD,
  reproduceMonthChartData
} from './mockData';

export default function AdminGeneralDahboard() {
  const theme = useTheme();

  const { themeStretch } = useSettings();
  const [selected, setSelected] = useState<number>(2);
  const isLoading = false;

  const [chartData, setChartData] = useState<{ month: string; earnings: number }[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setChartData(reproduceMonthChartData);
    }, 1500);
  }, []);
  useEffect(() => {
    if (selected === 2) {
      // 2==month
      setChartData(reproduceMonthChartData);
    } else {
      setChartData(reproduceChartData);
    }
  }, [selected]);
  return (
    <Page title="الرئيسية| Shwra">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs heading="الرئيسية" links={[{ name: '', href: '' }]} />
        <Box
          sx={{
            display: 'flex',
            marginBottom: '10px',
            [theme.breakpoints.down('lg')]: { flexWrap: 'wrap' },
            [theme.breakpoints.up('lg')]: { flexWrap: 'nowrap' }
          }}
        >
          <Box
            sx={{
              [theme.breakpoints.up('lg')]: { width: '40%' },
              [theme.breakpoints.down('lg')]: { width: '100%' },
              marginRight: 'auto'
            }}
          >
            <Box sx={{ marginBottom: '20px' }}>
              <TotalAppoinments />
            </Box>
            <Box sx={{ marginBottom: '20px' }}>
              <DataCard title={'المواعيد القادمة'}>
                <ComingAppoinments isLoading={isLoading} appointmentData={appointmentData} />
              </DataCard>
            </Box>
          </Box>
          <Box
            sx={{
              [theme.breakpoints.up('lg')]: { width: '70%', marginLeft: '20px' },
              [theme.breakpoints.down('lg')]: { width: '100%', marginBottom: '20px' }
            }}
          >
            <DataCard
              sx={{
                marginBottom: '20px'
              }}
            >
              <StatisticsInfo cardsData={cardsData} />
            </DataCard>
            <DataCard
              sx={{
                display: 'flex',
                [theme.breakpoints.down('lg')]: { flexWrap: 'wrap' },
                [theme.breakpoints.up('lg')]: { flexWrap: 'nowrap' },
                justifyContent: 'space-between'
              }}
            >
              <TotalIncome
                reproduceChartData={chartData}
                incomeData={incomeData}
                selected={selected}
                setSelected={setSelected}
              />
            </DataCard>
          </Box>
        </Box>

        {/* second row */}
        <Box
          sx={{
            display: 'flex',
            marginBottom: '30px',
            [theme.breakpoints.down('lg')]: { flexWrap: 'wrap' },
            [theme.breakpoints.up('lg')]: { flexWrap: 'nowrap' }
          }}
        >
          <DataCard
            title={'تعينات المحامين'}
            sx={{
              [theme.breakpoints.up('lg')]: { width: '70%' },
              [theme.breakpoints.down('lg')]: { width: '100%', marginBottom: '20px' }
            }}
          >
            <LawyersAssignments TABLE_HEAD={TABLE_HEAD} />
          </DataCard>
          <DataCard
            title={'التعيينات حسب الفئة'}
            sx={{
              [theme.breakpoints.up('lg')]: { width: '30%', marginLeft: '20px' },
              [theme.breakpoints.down('lg')]: { width: '100%', marginBottom: '30px' }
            }}
          >
            <CategoryAssignments categoryAssignments={categoryAssignments} isLoading={isLoading} />
          </DataCard>{' '}
        </Box>
      </Container>
    </Page>
  );
}
