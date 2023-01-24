import { useState, useEffect } from 'react';
// material
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Box, InputLabel, MenuItem, FormControl } from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import { getLawyerList } from '../../../../redux/slices/lawyer';

type RequestLawyerAssignProps = {
  requestId: string;
  onLawyerSelected: Function;
};

export default function RequestLawyerAssignForm({
  requestId,
  onLawyerSelected
}: RequestLawyerAssignProps) {
  // redux
  const dispatch = useDispatch();

  const { lawyerList, isLoading, error } = useSelector((state: RootState) => state.lawyer);

  useEffect(() => {
    dispatch(
      getLawyerList({
        page: 1,
        size: 1000
      })
    );
  }, [dispatch]);

  // select input
  const [assignLawyer, setAssignLawyer] = useState('');

  const handleChange = (event: SelectChangeEvent) => {
    setAssignLawyer(event.target.value as string);
    onLawyerSelected({
      lawyerId: event.target.value as string
    });
  };

  return (
    <Box sx={{ minWidth: 250, p: 3 }}>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label"> اختر محامى </InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={assignLawyer}
          label="Age"
          onChange={handleChange}
        >
          {lawyerList.lawyersDtos.map((lawyer) => {
            const { lawyerId, firstName, lastName } = lawyer;
            const name = `${firstName} ${lastName}`;

            return (
              <MenuItem key={lawyerId} value={lawyerId}>
                {' '}
                {name}{' '}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
}
