import { ReactNode } from 'react';
// material
import { Typography } from '@mui/material';
//

// ----------------------------------------------------------------------

type DocumentTextProps = {
    children: ReactNode;
};

export default function DocumentText({ children }: DocumentTextProps) {
 
 return (
      <Typography variant="subtitle2" gutterBottom component="div">
         { children }
      </Typography>
  );
}
