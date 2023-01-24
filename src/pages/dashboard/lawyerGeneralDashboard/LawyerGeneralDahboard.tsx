import { Box, Container } from '@mui/material';
import HeaderBreadcrumbs from 'components/HeaderBreadcrumbs';
import Page from 'components/Page';
import DataCard from 'components/shared/dataCard/DataCard';
import DatePickerCalendar from 'components/shared/DatePickerCalendar/DatePickerCalendar';
import PieChart from 'components/shared/pieChart/PieChart';
import AccountStatistics from 'components/_dashboard/generalDashboard/AccountStatistics';
import ComingAppoinments from 'components/_dashboard/generalDashboard/ComingAppoinments';
import Messages from 'components/_dashboard/generalDashboard/Messages';
import useSettings from 'hooks/useSettings';
import { useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

import {
  appointmentData,
  incomeData,
  pieChart,
  reproduceChartData,
  allMessages,
  reproduceMonthChartData
} from '../adminGeneralDashboard/mockData';

export default function LawyerGeneralDahboard() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const [selected, setSelected] = useState<number>(2);
  const isLoading = false;
  const [chartData, setChartData] = useState<{ month: string; earnings: number }[]>([]);
  const [pieChartData, setPieChartData] = useState<{ id: any; value: number; color: string }[]>([]);
  useEffect(() => {
    setTimeout(() => {
      setChartData(reproduceMonthChartData);
      setPieChartData(pieChart);
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

        {/* third row */}

        <Box
          sx={{
            display: 'flex',
            marginBottom: '10px',
            [theme.breakpoints.down('lg')]: { flexWrap: 'wrap' },
            [theme.breakpoints.up('lg')]: { flexWrap: 'nowrap' }
          }}
        >
          <DataCard
            title={'إجمالي المواعيد'}
            sx={{
              [theme.breakpoints.up('lg')]: { width: '40%' },
              [theme.breakpoints.down('lg')]: { width: '100%', marginBottom: '20px' },
              marginRight: 'auto'
            }}
          >
            <PieChart data={pieChartData} />
          </DataCard>

          <DataCard
            sx={{
              [theme.breakpoints.up('lg')]: { width: '70%', marginLeft: '20px' },
              [theme.breakpoints.down('lg')]: { width: '100%', marginBottom: '20px' },
              display: 'flex',
              [theme.breakpoints.down('md')]: { flexWrap: 'wrap' },

              justifyContent: 'space-between'
            }}
          >
            <AccountStatistics
              reproduceChartData={chartData}
              selected={selected}
              setSelected={setSelected}
              incomeData={incomeData}
            />
          </DataCard>
        </Box>

        {/* foth row */}
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            [theme.breakpoints.down('lg')]: { flexWrap: 'wrap' },
            [theme.breakpoints.up('lg')]: { flexWrap: 'nowrap' }
          }}
        >
          <DataCard
            sx={{
              [theme.breakpoints.up('lg')]: { width: '70%' },
              [theme.breakpoints.down('lg')]: { width: '100%', marginBottom: '20px' },
              display: 'flex',
              justifyContent: 'space-between',

              [theme.breakpoints.down('md')]: { flexWrap: 'wrap' }
            }}
          >
            <DataCard
              title={'المواعيد القادمة'}
              sx={{
                boxShadow: 'none',
                [theme.breakpoints.up('lg')]: { width: '50%' },
                [theme.breakpoints.down('lg')]: { width: '100%', marginBottom: '20px' },
                padding: '0rem 1rem'
              }}
            >
              <ComingAppoinments
                style={{ maxHeight: '100%' }}
                isLoading={isLoading}
                appointmentData={appointmentData}
              />
            </DataCard>{' '}
            <Box
              sx={{
                boxShadow: 'none',
                [theme.breakpoints.up('lg')]: { width: '50%' },
                [theme.breakpoints.down('lg')]: { width: '100%' }
              }}
            >
              <DatePickerCalendar />
            </Box>
          </DataCard>{' '}
          <DataCard
            title={'الرسائل'}
            sx={{
              [theme.breakpoints.up('lg')]: { width: '30%', marginLeft: '20px' },
              [theme.breakpoints.down('lg')]: { width: '100%' }
            }}
          >
            <Messages allMessages={allMessages} isLoading={isLoading} />
          </DataCard>{' '}
        </Box>
      </Container>
    </Page>
  );
}
