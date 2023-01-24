import { Fragment } from 'react';
// @mui
import { Typography } from '@mui/material';

type IntervalItemListProps = {
  error?: string;
}

export default function IntervalError({ error }: IntervalItemListProps) {

  return (
   <Fragment>
    {error &&(
        <Typography variant="body2"  sx={{ color: 'error.main' }} gutterBottom>
          {error}
        </Typography>
    )}
   </Fragment>
  );
}