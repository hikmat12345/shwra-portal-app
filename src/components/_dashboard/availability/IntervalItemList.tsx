// @mui
import { Box, Grid } from '@mui/material';
// @types
import { Interval } from '../../../@types/availability';
// utils
// components
import IntervalItem from './IntervalItem';
import IntervalDelete from './IntervalDelete';

type IntervalItemListProps = {
  dayId: string;
  intervals: Interval[];
  onRemoveInterval: (dayId: string, intervalIndex: string) => void;
  onUpdateInterval: (dayId: string, intervalIndex: string, interval: Interval) => void;
};

export default function IntervalItemList({
  intervals,
  dayId,
  onRemoveInterval,
  onUpdateInterval
}: IntervalItemListProps) {
  return (
    <Box>
      {intervals.map((interval: any, index: number) => (
        <Box key={index}>
          <Grid
            container
            spacing={2}
            //key={index}
            sx={{
              m: 1
            }}
          >
            <Grid item>
              <IntervalItem
                dayId={dayId}
                currentInterval={interval}
                dayIntervals={intervals}
                intervalIndex={`${index}`}
                onUpdateInterval={onUpdateInterval}
              />
            </Grid>
            <Grid item>
              <IntervalDelete
                dayId={dayId}
                intervalIndex={`${index}`}
                onRemoveInterval={onRemoveInterval}
              />
            </Grid>
          </Grid>
        </Box>
      ))}
    </Box>
  );
}
