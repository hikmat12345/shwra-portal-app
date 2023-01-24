import { styled } from '@mui/material/styles';
import { Box, Typography } from '@mui/material';
import { ResponsivePie } from '@nivo/pie';
import { CSSProperties } from 'react';

type PieChartProps = {
  data: any[];
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
export default function PieChart({ data, sx = {}, ChartSx = {} }: PieChartProps) {
  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'space-between',
        padding: '1rem 0'
      }}
    >
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          width: '50%'
        }}
      >
        {data?.map((data) => (
          <div
            key={data?.id}
            style={{
              width: '50%'
            }}
          >
            <div
              style={{
                display: 'flex',
              }}
            >
              <span
                style={{
                  backgroundColor: data?.color || '#d3d8db',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  marginLeft: '5px'
                }}
              ></span>
              <Typography
                sx={{
                  fontSize: '12px',

                  color: '#637381'
                }}
              >
                Lorem Ipsum
                <Typography
                  sx={{
                    fontSize: '12px',
                    color: '#212B36'
                  }}
                >
                  {data?.value} %
                </Typography>
              </Typography>
            </div>
          </div>
        ))}
      </Box>
      <Box sx={{ height: 150, minWidth: '50%', ...sx }}>
        <ResponsivePie
          data={data}
          margin={{ top: 20, right: 20, bottom: 20, left: 20 }}
          innerRadius={0.65}
          activeOuterRadiusOffset={5}
          borderWidth={3}
          borderColor="#ffffff"
          enableArcLinkLabels={false}
          enableArcLabels={false}
          colors={(datum) => datum.data.color}
          defs={[
            {
              id: 'gradientA',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#dfe3e4' },
                { offset: 100, color: '#e2e6e7' }
              ]
            },
            {
              id: 'gradientC',
              type: 'linearGradient',
              colors: [
                { offset: 0, color: '#d49e24' },
                { offset: 100, color: '#f2d99b' }
              ]
            }
          ]}
          fill={[
            {
              match: {
                id: 'Jan'
              },
              id: 'gradientC'
            },
            {
              match: {
                id: 'Mar'
              },
              id: 'gradientA'
            }
          ]}
          tooltip={(e) => <ToolTip>{`${e.datum.id}: ${e.datum.value} %`}</ToolTip>}
        />
      </Box>
    </Box>
  );
}
