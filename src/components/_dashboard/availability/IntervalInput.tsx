import { Icon } from '@iconify/react';
// @mui
import { styled } from '@mui/material/styles';
import {
  TextField,
  MenuList,
  TextFieldProps
} from '@mui/material';

// ----------------------------------------------------------------------

const ariaLabel = { 'aria-label': 'description' };

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ScrollMenu = styled(MenuList)({
  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  overflow: 'auto',
});

// ----------------------------------------------------------------------

type IntervalInputProps = {
    children?: any;
};

export default function IntervalInput({ children , ...other }: IntervalInputProps & TextFieldProps) {
 

  return (
         <TextField
            select
            fullWidth
            variant="outlined"
            size="small"
            sx={{ width: 100 }}
            {...other}
            SelectProps={{
              MenuProps: {
                  PaperProps: {
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                      overflow: 'auto',
                    },
                  },
              },
              IconComponent: () => <Icon  icon='' />,
            }}
          >
          { children }
        </TextField>
  );
}