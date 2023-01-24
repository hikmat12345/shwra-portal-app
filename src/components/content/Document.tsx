// material
import { Box } from '@mui/material';
//

// ----------------------------------------------------------------------

type DocumentProps = {
  children: React.ReactNode;
};

export default function Document({ children }: DocumentProps) {
  return <Box>{children}</Box>;
}
