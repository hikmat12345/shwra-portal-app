import { ReactNode } from 'react';
// material
import { Box } from '@mui/material';
//

// ----------------------------------------------------------------------

type DocumentListProps = {
  children: ReactNode;
};

export default function DocumentList({ children }: DocumentListProps) {
  return (
    <Box
      sx={{
        ml: 2
      }}
    >
      {children}
    </Box>
  );
}
