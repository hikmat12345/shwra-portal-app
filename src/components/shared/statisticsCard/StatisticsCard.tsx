import ArrowDownIcon from '@iconify/icons-eva/trending-down-fill';
import ArrowUpIcon from '@iconify/icons-eva/trending-up-fill';
import { Icon } from '@iconify/react';
import { Box, Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { CSSProperties, ReactNode } from 'react';
import CountUp from 'react-countup';

type StatisticsCardProps = {
  data: {
    id: number | string;
    title?: string;
    income: number;
    number: number;
    isUpword: boolean;
    percentage?: number | string;
    cardColor?: string;
    icon?: ReactNode;
    textColor?: string;
    time?: string;
  };
  type: 'chartCard' | 'infoCard';
  iconContainerStyle?: CSSProperties;
  cardStyles?: CSSProperties;
  onClick?: (e?: any) => void;
  selected?: number;
};
const IconContainer = styled('div')(({ theme }: any) => ({
  backgroundColor: theme.backgroundColor ? theme?.backgroundColor : 'white',
  padding: '5px',
  borderRadius: '5px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '25px',
  height: '25px',
  marginRight: '5px',
  '.MuiSvgIcon-root ': {
    fontSize: '16px'
  },
  ...theme
}));
export default function StatisticsCard({
  data,
  iconContainerStyle = {},
  type,
  cardStyles,
  onClick,
  selected
}: StatisticsCardProps) {
  return (
    <Card
      onClick={(e) => {
        onClick && onClick(e);
      }}
      sx={{
        justifyContent: 'space-between',
        padding: '1rem',
        width: 'calc(48% - 5px)',
        marginRight: '10px',
        marginBottom: '10px',
        maxHeight: '150px',
        cursor: 'pointer',
        boxShadow:
          selected === data?.id
            ? '0 0 2px 0 rgb(145 158 171 / 24%), 0 16px 32px -4px rgb(145 158 171 / 24%)'
            : 'none',
        backgroundColor: data.cardColor
          ? data.cardColor
          : selected
          ? selected === data?.id
            ? '#fff'
            : '#f4f9f9'
          : '#fff',
        color: selected ? (selected === data?.id ? '#d49e24' : '#d49e24') : 'black',
        ...cardStyles
      }}
    >
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center'
        }}
      >
        <IconContainer
          theme={{
            backgroundColor: selected === data?.id ? '#d49e24' : 'white',
            fontSize: '16px',
            '.MuiSvgIcon-root ': {
              color: selected === data?.id ? '#fff' : '#637381'
            },
            ...iconContainerStyle
          }}
        >
          {data.icon}
        </IconContainer>
        <Typography sx={{ fontSize: '12px', fontWeight: '700' }}>{data.title}</Typography>
      </Box>

      <Typography
        sx={{
          fontSize: type === 'chartCard' ? '1rem' : '2.2rem',
          fontWeight: '700',
          margin: type === 'chartCard' ? '0.2rem 0 1rem 0 ' : '0.5rem 0',
          textAlign: type === 'chartCard' ? 'left' : 'right'
        }}
      >
        {' '}
        {type === 'chartCard' && (
          <Typography
            sx={{
              margin: '1rem 0 0 0 ',
              color: '#637381',
              fontSize: '12px'
            }}
          >
            {data?.time === 'yearly' ? 'هذه السنة' : 'هذا الشهر'}
          </Typography>
        )}
        {data?.number ? (
          <>
            <CountUp end={data.number} duration={2} separator={','} />+{' '}
          </>
        ) : (
          <>
            {' '}
            <CountUp end={data.income} duration={2} separator={','} scrollSpyOnce />k SAR
          </>
        )}
      </Typography>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {type === 'infoCard' && (
          <Typography sx={{ fontSize: '10px', fontWeight: '700' }}>آخر 7 أيام</Typography>
        )}{' '}
        <Typography
          sx={{
            fontSize: '10px',
            fontWeight: '700',
            display: 'flex',
            alignItems: 'center',
            color: data.textColor || '#637381'
          }}
        >
          <span>{data.percentage}%</span>
          <Icon
            icon={data.isUpword ? ArrowUpIcon : ArrowDownIcon}
            style={{
              fontSize: '14px',
              marginRight: '3px'
            }}
          />
        </Typography>
      </Box>
    </Card>
  );
}
