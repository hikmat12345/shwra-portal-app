// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { TextField, TextFieldProps, MenuList } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

interface IProps {
  name: string;
  children?: any;
}

export  function RHFSelect({ name, children, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          label=''
          select
          fullWidth
          SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
          {...other}
          InputLabelProps={{ shrink: false }}
        >
          {children}
        </TextField>
      )}
    />
  );
}




// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;

const ScrollMenu = styled(MenuList)({
  maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
  overflow: 'auto',
});


export function RHFDateSelect({ name, children, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState: { error } }) => (
        <TextField
          {...field}
          select
          fullWidth
         // SelectProps={{ native: true }}
          error={!!error}
          helperText={error?.message}
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
           {children}
        </TextField>
      )}
    />
  );
}
