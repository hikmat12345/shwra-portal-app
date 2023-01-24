import { filter } from 'lodash';
// @mui
import { Paper, Typography, Button } from '@mui/material';
// @types
import { Rule, Interval } from '../../../@types/availability';
// components
import AvailabilitySchedulesDay from './AvailabilitySchedulesDay';
import { Box } from '@mui/system';

// ----------------------------------------------------------------------

type AvailabilitySchedulesProps = {
  schedules: Rule[];
  defaultDays: {
    id: string;
    name: string;
  }[];
  onChangeDayAvailability: (dayId: string) => void;
  onRemoveInterval: (dayId: string, intervalIndex: string) => void;
  onUpdateInterval: (dayId: string, intervalIndex: string, interval: Interval) => void;
  onCreateInterval: (dayId: string) => void;
};

export default function AvailabilitySchedules({
  schedules,
  defaultDays,
  onChangeDayAvailability,
  onRemoveInterval,
  onUpdateInterval,
  onCreateInterval
}: AvailabilitySchedulesProps) {
  return (
    <Paper
      elevation={0}
      sx={{
        m: 2
      }}
    >
      <Typography
        variant="h6"
        component="h6"
        sx={{
          fontSize: '1.25rem',
          my: '1rem !important'
        }}
      >
        حدد ساعاتك الأسبوعية
      </Typography>

      {defaultDays.map((day) => (
        <AvailabilitySchedulesDay
          key={day.id}
          day={day}
          dayRule={filter(schedules, (rule: Rule) => rule.dayId === day.id)[0]}
          onChangeDayAvailability={onChangeDayAvailability}
          onRemoveInterval={onRemoveInterval}
          onUpdateInterval={onUpdateInterval}
          onCreateInterval={onCreateInterval}
        />
      ))}

      <Box
        sx={{
          mt: 2
        }}
      >
        <Button
          variant="contained"
          color="primary"
          sx={{
            width: '100%',
            textTransform: 'none',
            fontSize: '1.25rem',
            fontWeight: 'bold',
            p: 2,
            m: 0
          }}
        >
          حفظ التغييرات
        </Button>
      </Box>
    </Paper>
  );
}
