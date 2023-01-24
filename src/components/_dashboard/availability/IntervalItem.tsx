import { useCallback, useEffect, useState } from 'react';
import { Icon } from '@iconify/react';
import minusFill from '@iconify/icons-eva/minus-fill';
// form

// @mui
import { styled } from '@mui/material/styles';
import { Stack, MenuItem, MenuList, Box } from '@mui/material';
// redux
import { useDispatch } from '../../../redux/store';
import { availabilityOverlapingError } from '../../../redux/slices/availability';

// @types
import { Interval } from '../../../@types/availability';
// utils
import { isOverlapping, hasIntervalError } from '../../../utils/intervals';
// data
import { TIMES } from '../../../_apis_';
// components
import IntervalError from './IntervalError';
import IntervalInput from './IntervalInput';

// ----------------------------------------------------------------------

// ----------------------------------------------------------------------

type IntervalItemProps = {
  dayId: string;
  intervalIndex: string;
  currentInterval: Interval;
  dayIntervals: Interval[];
  onUpdateInterval: (dayId: string, intervalIndex: string, interval: Interval) => void;
};

export default function IntervalItem({
  dayId,
  currentInterval,
  dayIntervals,
  intervalIndex,
  onUpdateInterval
}: IntervalItemProps) {
  const dispatch = useDispatch();

  const [isOverlappingError, setIsOverlappingError] = useState(false);

  const [isIntervalError, setIsIntervalError] = useState(false);

  const handleOverlapping = useCallback((dayIntervals: Interval[], currentInterval: Interval) => {
    setIsOverlappingError(isOverlapping(dayIntervals, currentInterval));
  }, []);

  useEffect(() => {
    const error = hasIntervalError(currentInterval);

    setIsIntervalError(error);

    if (!error) {
      handleOverlapping(dayIntervals, currentInterval);
    }

    if (!isIntervalError) {
      dispatch(availabilityOverlapingError(false));
    } else {
      dispatch(availabilityOverlapingError(true));
    }
  }, [dispatch, handleOverlapping, dayIntervals, currentInterval, isIntervalError]);

  //
  const handleChangeIntervalFrom = useCallback(
    (event: any) => {
      onUpdateInterval(dayId, intervalIndex, { ...currentInterval, from: event.target.value });
    },
    [dayId, intervalIndex, currentInterval, onUpdateInterval]
  );

  //
  const handleChangeIntervalTo = useCallback(
    (event: any) => {
      onUpdateInterval(dayId, intervalIndex, { ...currentInterval, to: event.target.value });
    },
    [dayId, intervalIndex, currentInterval, onUpdateInterval]
  );

  return (
    <Box>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={{ xs: 1, sm: 2, md: 4 }}
        //  sx={{
        //    width: '100%',
        //    m: 1
        //  }}
      >
        <Box>
          <IntervalInput
            autoFocus
            value={currentInterval ? currentInterval.from : '00:00'}
            onChange={handleChangeIntervalFrom}
            error={isOverlappingError || isIntervalError}
          >
            {TIMES.map((time: string) => (
              <MenuItem value={time} key={time}>
                {time}
              </MenuItem>
            ))}
          </IntervalInput>
        </Box>

        <Box sx={{ p: 1 }}>
          <Icon icon={minusFill} width={15} height={15} />
        </Box>

        <Box>
          <IntervalInput
            value={currentInterval ? currentInterval.to : '00:00'}
            onChange={handleChangeIntervalTo}
            error={isOverlappingError || isIntervalError}
          >
            {TIMES.map((time: string) => (
              <MenuItem value={time} key={time}>
                {time}
              </MenuItem>
            ))}
          </IntervalInput>
        </Box>
      </Stack>

      {/* {isOverlappingError && <IntervalError error="Times overlap with another set of times." />} */}

      {isIntervalError && <IntervalError error="برجاء اختيار وقت الإنتهاء بعد وقت البدء" />}
    </Box>
  );
}
