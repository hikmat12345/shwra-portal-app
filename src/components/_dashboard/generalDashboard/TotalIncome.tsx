import { Box } from '@mui/system';
import BarChart from 'components/shared/barChart/BarChart';
import DataCard from 'components/shared/dataCard/DataCard';
import StatisticsCard from 'components/shared/statisticsCard/StatisticsCard';
import { Fragment, useState } from 'react';
import { useTheme } from '@mui/material/styles';

export default function TotalIncome({
  reproduceChartData,
  incomeData,
  selected,
  setSelected
}: {
  reproduceChartData: any;
  incomeData: any;
  setSelected: (data?: any) => void;
  selected?: number;
}) {
  const theme = useTheme();

  return (
    <>
      <DataCard
        title={'إجمالي الدخل'}
        statistics={225000}
        statisticsText={'SAR'}
        sx={{
          boxShadow: 'none',

          [theme.breakpoints.down('md')]: { width: '100%', marginBottom: '15px' },
          [theme.breakpoints.up('lg')]: { width: '60%' },
          padding: '0 1rem 0 0'
        }}
      >
        <BarChart data={reproduceChartData} />
      </DataCard>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          [theme.breakpoints.down('md')]: { width: '100%' },
          [theme.breakpoints.up('lg')]: { width: '50%' }
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
    </>
  );
}
