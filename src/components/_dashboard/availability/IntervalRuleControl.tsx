// @mui
import { Typography, Checkbox, Stack, Box } from '@mui/material';

// -------------------------------------------------------------------

export interface IntervalRuleControlProps {
  day: {
    id: string;
    name: string;
  };
  isAvailable: boolean;
  onChangeDayAvailability: (dayId: string) => void;
}

export default function IntervalRuleControl({
  day,
  isAvailable,
  onChangeDayAvailability
}: IntervalRuleControlProps) {
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onChangeDayAvailability(day.id);
  };

  return (
    <Stack
      direction={{ xs: 'column', sm: 'row' }}
      spacing={{ xs: 1, sm: 2, md: 4 }}
      sx={{
        width: 150
      }}
    >
      <Box>
        <Checkbox
          edge="end"
          onChange={handleChange}
          checked={isAvailable}
          inputProps={{ 'aria-labelledby': day.name }}
        />
      </Box>
      <Box>
        <Typography
          variant="h6"
          component="h6"
          sx={{
            // fontSize: '1rem',
            my: '0.5rem !important'
          }}
        >
          {day.name}
        </Typography>
      </Box>
    </Stack>
  );
}
