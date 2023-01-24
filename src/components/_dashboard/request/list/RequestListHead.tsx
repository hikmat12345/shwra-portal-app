// material
import { TableRow, TableCell, TableHead, TableSortLabel, Box } from '@mui/material';
import { visuallyHidden } from '@mui/utils';

// ----------------------------------------------------------------------

type TicketListHeadProps = {
  headLabel: any[];
  hideSortIcon?: boolean;
  handleRequestSort?: (isAsc: any, property: any) => void;
  hasSort?: boolean;
  orderBy?: any;
  order?: any;
};

export default function RequestListHead({
  headLabel,
  hasSort,
  handleRequestSort,
  order,
  orderBy
}: TicketListHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            sortDirection={orderBy === headCell.id ? order : false}
          >
            {hasSort ? (
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={(e) =>
                  handleRequestSort &&
                  handleRequestSort(orderBy === headCell.id && order === 'asc', headCell.id)
                }
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            ) : (
              headCell.label
            )}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
