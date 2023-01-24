// material
import { TableRow, TableCell, TableHead } from '@mui/material';

// ----------------------------------------------------------------------

type ClientListHeadProps = {
  rowCount: number;
  headLabel: any[];
  numSelected: number;
};

export default function ClientListHead({ rowCount, headLabel, numSelected }: ClientListHeadProps) {
  return (
    <TableHead>
      <TableRow>
        {headLabel.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.alignRight ? 'right' : 'left'}
            //sortDirection={orderBy === headCell.id ? order : false}
          >
            {/*
            <TableSortLabel
              hideSortIcon
              active={orderBy === headCell.id}
              direction={orderBy === headCell.id ? order : 'asc'}
              onClick={() => onRequestSort(headCell.id)}
            >
            */}

            {headCell.label}

            {/*
              {orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }}>
                  {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                </Box>
              ) : null}
            </TableSortLabel>
              */}
          </TableCell>
        ))}
      </TableRow>
    </TableHead>
  );
}
