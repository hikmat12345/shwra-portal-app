import { ReactNode } from 'react';
// material
import { Typography } from '@mui/material';
//

// ----------------------------------------------------------------------

type DocumentTitleProps = {
    children: ReactNode;
};

export default function DocumentTitle({ children }: DocumentTitleProps) {
 
 return (
      <Typography variant="h6" gutterBottom component="div">
         { children }
      </Typography>
  );
}
