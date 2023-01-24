import { ReactNode } from 'react';
// material
import { Box, Typography } from '@mui/material';

// ----------------------------------------------------------------------

type DocumentBlockProps = {
    children: ReactNode;
};

export default function DocumentBlock({ children }: DocumentBlockProps) {
  

 return (
    <Box sx={{
      color: 'text.primary',
      mx: 2,
      my: 5,
    }}>

        { children }

    </Box>
  );
}
