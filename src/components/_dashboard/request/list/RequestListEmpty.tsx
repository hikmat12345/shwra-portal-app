import { Link as RouterLink } from 'react-router-dom';
// material
import {
  Button,
  Typography,

  TableRow,
  TableCell
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
//
import { NoDataIllustration } from '../../../../assets';
// guard
import CanGuard from '../../../../guards/CanGuard';



// ----------------------------------------------------------------------



export default function RequestListEmpty() {
    return (
        <TableRow>
          <TableCell align="center" colSpan={10} sx={{ py: 3 }}>

                <NoDataIllustration sx={{ my: 3, height: 250 }} />

                <Typography sx={{ color: 'text.secondary', m: 3 }} >
                  لا يوجد طلبات فى الوقت الحالى 
                </Typography>
                
                <CanGuard accessibleRoles={["Client"]}>
                  <Button
                    variant="contained"
                    component={RouterLink}
                    to={PATH_DASHBOARD.request.newRequest}
                    //startIcon={<Icon icon={plusFill} />}
                  >
                    انشاء طلب جديد
                  </Button>
                </CanGuard>


          </TableCell>
        </TableRow>

    );
}
  