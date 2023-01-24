// material
import { Typography, TableRow, TableCell, TableBody } from '@mui/material';
// routes
//
import { MaintenanceIllustration } from '../assets';

// ----------------------------------------------------------------------

type EmptyTableProps = {
  message: string;
};

export default function EmptyTable({ message }: EmptyTableProps) {
  return (
    <TableBody>
      <TableRow>
        <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
          <MaintenanceIllustration sx={{ my: 3, height: 200 }} />

          <Typography sx={{ color: 'text.secondary', m: 2 }}>{message}</Typography>

          {/*
                 <Button
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.ticket.newTicket}
                    //startIcon={<Icon icon={plusFill} />}
                  >
                    انشاء طلب جديد
                  </Button>
*/}
        </TableCell>
      </TableRow>
    </TableBody>
  );
}
