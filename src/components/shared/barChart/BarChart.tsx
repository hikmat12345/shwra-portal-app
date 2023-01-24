import { styled } from '@mui/material/styles';
import { Box } from '@mui/material';
import { ResponsiveBar } from '@nivo/bar';
import './charts.css';
import Scrollbar from 'components/Scrollbar';
import { CSSProperties } from 'react';

type BarChartProps = {
  data: { month: string; earnings: number }[];
  sx?: CSSProperties;
  ChartSx?: CSSProperties;
};

const ToolTip = styled('div')(({ theme }) => ({
  backgroundColor: '#fff',
  padding: '5px 10px',
  border: '1px solid #DFE3E8',
  fontSize: '12px',
  borderRadius: '5px',
  direction: 'rtl'
}));
export default function BarChart({ data = [], sx = {}, ChartSx = {} }: BarChartProps) {
  const getMax = [...data];
  return (
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
        <Box sx={{ height: 200, minWidth: '500px', ...sx }}>
          <ResponsiveBar
            tooltip={(e) => <ToolTip>{`${e.data.earnings} SAR`}</ToolTip>}
            data={data}
            minValue={0}
            maxValue={
              getMax?.length > 0
                ? getMax?.sort((a, b) => b?.earnings - a?.earnings)[0]?.earnings
                : 50
            }
            keys={['earnings']}
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
                  id: 'earnings'
                },
                id: 'gradientC'
              },
              {
                match: {
                  id: 'earnings'
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
              tickSize: 0,
              tickValues: [0, 10, 20, 30],
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
                      {value}k
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
  );
}
