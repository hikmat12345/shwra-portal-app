// form
import { useFormContext, Controller } from 'react-hook-form';
// @mui
import { Checkbox, FormControlLabel, FormGroup, TextFieldProps, TextField } from '@mui/material';
import TimePicker from '@mui/lab/TimePicker';
// ----------------------------------------------------------------------

interface IProps {
  name: string;
}

export default function RHFTime({ name, ...other }: IProps & TextFieldProps) {
  const { control } = useFormContext();

  return (
        <Controller
          name={name}
          control={control}
          render={({ field }) =>{
             return(<TimePicker
              {...field} 
              showToolbar={false}
              readOnly={true}
              disableOpenPicker={true}
              renderInput={(field) => <TextField {...field} {...other}  />}
            />)
          }
          }
        />
  );
}