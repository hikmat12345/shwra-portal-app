import { Box } from '@mui/system';
import DataCard from 'components/shared/dataCard/DataCard';
import DatePickerCalendar from 'components/shared/DatePickerCalendar/DatePickerCalendar';
import StatisticsCard from 'components/shared/statisticsCard/StatisticsCard';
import { Fragment } from 'react';

export default function UpcomingAppointments({ cardsData }: { cardsData: any }) {
  return (
    <>
      <DataCard
        title={'المواعيد القادمة'}
        statistics={225000}
        statisticsText={'SAR'}
        sx={{
          boxShadow: 'none',
          padding: '0 1rem 0 0',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'stretch'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            width: '50%'
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
        <Box sx={{ marginBottom: '20px', width: '50%' }}>
          <DatePickerCalendar />
        </Box>
      </DataCard>
    </>
  );
}
