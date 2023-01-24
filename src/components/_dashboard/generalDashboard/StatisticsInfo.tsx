import { Box } from '@mui/system';
import DatePickerCalendar from 'components/shared/DatePickerCalendar/DatePickerCalendar';
import StatisticsCard from 'components/shared/statisticsCard/StatisticsCard';
import { Fragment } from 'react';
import { useTheme } from '@mui/material/styles';

export default function StatisticsInfo({ cardsData }: { cardsData: any }) {
  const theme = useTheme();

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch',

          [theme.breakpoints.down('sm')]: { flexWrap: 'wrap' }
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            [theme.breakpoints.down('sm')]: { width: '100%', marginBottom: '15px' },
            [theme.breakpoints.up('lg')]: { width: '50%' },
          }}
        >
          {cardsData?.map((card: any) => {
            return (
              <Fragment key={card?.id}>
                <StatisticsCard data={card} type={'infoCard'} />
              </Fragment>
            );
          })}
        </Box>
        <Box
          sx={{
            marginBottom: '20px',
            [theme.breakpoints.down('sm')]: { width: '100%', marginBottom: '15px' },
            [theme.breakpoints.up('lg')]: { width: '50%' },
          }}
        >
          <DatePickerCalendar />
        </Box>
      </Box>
    </>
  );
}
