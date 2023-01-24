// material
import { TableRow, TableCell, TableHead } from '@mui/material';

// ----------------------------------------------------------------------

type AppointmentListHeadProps = {
  rowCount: number;
  headLabel: any[];
};

export default function AppointmentListHead({ headLabel }: AppointmentListHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell key={headCell.id} align={headCell.alignRight ? 'right' : 'left'}>
            {headCell.label}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
