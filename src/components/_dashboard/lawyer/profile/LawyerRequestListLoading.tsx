// material
import {
  Box,

  CircularProgress,
  TableRow,
  TableBody,
  TableCell
} from '@mui/material';


// ----------------------------------------------------------------------

  

export default function LawyerRequestListLoading() {
    return (
      <TableBody>
        <TableRow>
          <TableCell align="center" colSpan={10} sx={{ py: 3 }}>
           <Box>
             <CircularProgress />
           </Box>
          </TableCell>
        </TableRow>
      </TableBody>
    );
}
  