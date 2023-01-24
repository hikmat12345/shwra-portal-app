import moment from 'moment';
import { Box } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import { styled } from '@mui/material/styles';

import Scrollbar from '../../Scrollbar';
import DataCard from '../../shared/dataCard/DataCard';
import { useTotalAppointments } from '../../../queries/dashboard';

const ToolTip = styled('div')(() => ({
  backgroundColor: '#fff',
  padding: '5px 10px',
  border: '1px solid #DFE3E8',
  fontSize: '12px',
  borderRadius: '5px',
  direction: 'rtl'
}));

const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

export default function TotalAppoinments() {
  const { data } = useTotalAppointments();
  const totalAppointments = data?.total;

  const chartAppointmentsData = labels.map(
    (item) =>
      data?.appointments?.find(
        (appointment) => appointment?.month === item && appointment?.year === `${moment().year()}`
      ) ?? { month: item, total: 0 }
  );

  return (
    <DataCard title={'إجمالي المواعيد'} statistics={totalAppointments}>
      <Box
        sx={{
          direction: 'rtl'
        }}
      >
        <Scrollbar
          sx={{
            width: '100%',
            overflowY: 'hidden',
            overflowX: 'auto'
          }}
          // @ts-ignore
          scrollStyles={{
            bar: {
              backgroundColor: '#d49e24'
            },
            track: {
              backgroundColor: '#F4F6F8'
            }
          }}
        >
          <Box sx={{ height: 210, minWidth: '500px' }}>
            {/*<Bar options={options} data={chartData} />*/}
            <ResponsiveBar
              tooltip={(e) => <ToolTip>{`${e.data.total}موعد`}</ToolTip>}
              data={chartAppointmentsData}
              minValue={0}
              keys={['total']}
              indexBy="month"
              margin={{ top: 50, right: 10, bottom: 40, left: 30 }}
              padding={0.25}
              defs={[
                {
                  id: 'gradientC',
                  type: 'linearGradient',
                  colors: [
                    { offset: 0, color: '#d49e24' },
                    { offset: 100, color: '#dab65e' }
                  ]
                }
              ]}
              fill={[
                {
                  match: {
                    id: 'total'
                  },
                  id: 'gradientC'
                }
              ]}
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: '',
                legendPosition: 'middle',
                legendOffset: 32
              }}
              gridYValues={5}
              axisLeft={{
                tickValues: 5,
                tickSize: 0,
                renderTick: ({ value, x, y }) => {
                  return (
                    <g transform={`translate(${x - 25},${y + 4})`}>
                      <text
                        style={{
                          fill: '#637381',
                          fontSize: '12px',
                          marginRight: '10px'
                        }}
                      >
                        {value}
                      </text>
                    </g>
                  );
                },
                tickPadding: 40,
                tickRotation: 0,
                legend: ''
              }}
              enableLabel={false}
              labelSkipHeight={4}
              labelTextColor={{
                from: 'color',
                modifiers: [['darker', 1.6]]
              }}
            />
          </Box>
        </Scrollbar>
      </Box>
    </DataCard>
  );
}
