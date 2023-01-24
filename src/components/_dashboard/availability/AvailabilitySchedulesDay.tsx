// @mui
import { Typography, Divider, Box, Grid } from '@mui/material';
// redux

// @types
import { Rule, Interval } from '../../../@types/availability';
// components
import IntervalRuleControl from './IntervalRuleControl';
import IntervalClone from './IntervalClone';
import IntervalCreate from './IntervalCreate';
import IntervalItemList from './IntervalItemList';

// ----------------------------------------------------------------------

type AvailabilitySchedulesDayProps = {
  day: {
    id: string;
    name: string;
  };
  dayRule: Rule;
  onChangeDayAvailability: (dayId: string) => void;
  onRemoveInterval: (dayId: string, intervalIndex: string) => void;
  onUpdateInterval: (dayId: string, intervalIndex: string, interval: Interval) => void;
  onCreateInterval: (dayId: string) => void;
};

export default function AvailabilitySchedulesDay({
  day,
  dayRule,
  onChangeDayAvailability,
  onRemoveInterval,
  onUpdateInterval,
  onCreateInterval
}: AvailabilitySchedulesDayProps) {
  const hasIntervals = dayRule && dayRule.intervals && dayRule.intervals.length > 0 ? true : false;

  return (
    <Box sx={{ position: 'relative' }}>
      <Grid container spacing={2}>
        <Grid item>
          <IntervalRuleControl
            day={day}
            isAvailable={hasIntervals}
            onChangeDayAvailability={onChangeDayAvailability}
          />
        </Grid>

        <Grid item>
          {hasIntervals ? (
            <>
              <IntervalItemList
                dayId={day.id}
                intervals={dayRule.intervals}
                onRemoveInterval={onRemoveInterval}
                onUpdateInterval={onUpdateInterval}
              />

              {/* i will move IntervalDelete to here with Stack */}
            </>
          ) : (
            <Typography variant="body2" gutterBottom>
              غير متوفر
            </Typography>
          )}
        </Grid>
      </Grid>

      {/* Interval Action */}
      <Box sx={{ position: 'absolute', top: 25, right: 15 }}>
        <IntervalClone dayId={day.id} dayList={[day]} />

        <IntervalCreate dayId={day.id} onCreateInterval={onCreateInterval} />
      </Box>

      <Divider sx={{ my: 2 }} />
    </Box>
  );
}
