import { Card, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import SubTitle from 'components/SubTitles';
import { CSSProperties, ReactNode } from 'react';
import CountUp from 'react-countup';

type DataCardProps = {
  children?: ReactNode;
  title?: string;
  statisticsText?: string;
  statistics?: number | string | ReactNode;
  sx?: CSSProperties;
};

const NumberText = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: '#d49e24',
  marginBottom: theme.spacing(1),
  fontSize: '1rem',
  fontFamily: 'bold'
}));
const CardTitle = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  borderBottom: '1px solid #DFE3E8'
}));
export default function DataCard({
  children,
  statistics,
  statisticsText,
  title,
  sx = {}
}: DataCardProps) {
  return (
    <Card sx={{ padding: '1.5rem 1rem', ...sx }}>
      {title && (
        <CardTitle>
          <SubTitle>{title}</SubTitle>
          {statistics && (
            <NumberText>
              {' '}
              <p
                style={{
                  direction: 'ltr'
                }}
              >
                {/* @ts-ignore */}
                <CountUp end={statistics} duration={1} separator={','} />
                {` ${statisticsText || ''}`}
              </p>
            </NumberText>
          )}
        </CardTitle>
      )}
      {children}
    </Card>
  );
}
