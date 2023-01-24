// material
import { Typography, TableRow, TableCell } from '@mui/material';
// routes
//
import { MaintenanceIllustration } from '../../../../assets';
// guard

// ----------------------------------------------------------------------

export default function LawyerRequestListEmpty() {
  return (
    <TableRow>
      <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
        <MaintenanceIllustration sx={{ my: 3, height: 300 }} />

        <Typography sx={{ color: 'text.secondary', m: 3 }}>
          لا يوجد طلبات فى الوقت الحالى
        </Typography>
      </TableCell>
    </TableRow>
  );
}
