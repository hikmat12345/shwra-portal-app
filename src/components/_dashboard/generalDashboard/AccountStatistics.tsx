import { Box } from '@mui/system';
import BarChart from 'components/shared/barChart/BarChart';
import DataCard from 'components/shared/dataCard/DataCard';
import StatisticsCard from 'components/shared/statisticsCard/StatisticsCard';
import { Fragment, useEffect, useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function AccountStatistics({
  reproduceChartData,
  incomeData,
  setSelected,
  selected
}: {
  reproduceChartData: any;
  incomeData: any;
  setSelected: (data?: any) => void;
  selected?: number;
}) {
  const theme = useTheme();
  return (
    <>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          width: '50%',

          [theme.breakpoints.down('md')]: { width: '100%' }
        }}
      >
        {incomeData?.map((card: any, i: number) => {
          return (
            <Fragment key={card?.id}>
              <StatisticsCard
                onClick={() => setSelected(card?.id)}
                selected={selected}
                data={card}
                type={'chartCard'}
                cardStyles={{
                  maxHeight: 'unset',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  marginRight: i === 1 ? '0' : '5px',
                  width: 'calc(50% - 5px)'
                }}
              />
            </Fragment>
          );
        })}
      </Box>
      <DataCard
        title={'الرصيد'}
        statistics={4300}
        statisticsText={'SAR'}
        sx={{
          boxShadow: 'none',
          width: '60%',
          [theme.breakpoints.down('md')]: { width: '100%' },
          padding: '0 1rem',
          marginLeft: '10px'
        }}
      >
        <BarChart data={reproduceChartData} />
      </DataCard>
    </>
  );
}
