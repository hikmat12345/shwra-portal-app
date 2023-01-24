import { ReactNode } from 'react';
// material
import { Typography } from '@mui/material';
//

// ----------------------------------------------------------------------

type DocumentListItemProps = {
    children: ReactNode;
};

export default function DocumentListItem({ children }: DocumentListItemProps) {
 
 return (
    <Typography variant="body2" gutterBottom component="div">
        {children}
    </Typography>
  );
}
