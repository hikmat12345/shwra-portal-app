// material
import LoadingButton from '@mui/lab/LoadingButton';
import {
    Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl,
    InputLabel, MenuItem, Select, Typography
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { changeAppointmentLawyer, setAppointmentCall } from 'redux/slices/appointment';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};



export default function SelectLawyer({
  open,
  setOpen,
  appointment,
  setSelectedAppointment,
  lawyerList
}: any) {
  const dispatch = useDispatch();

  const [lawyerFilter, setLawyerFilter] = useState<any>({
    lawyerId: lawyerList.find((lawyer: any) => lawyer.firstName === appointment.lawyerName)
      ?.lawyerId,
    firstName: appointment.lawyerName
  });

  useEffect(() => {
    setAppointmentCall({});
    return () => {
      setAppointmentCall({});
      setSelectedAppointment({});
    };
  }, [setSelectedAppointment]);

  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" p={2}>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        PaperProps={{
          sx: {
            width: '60%'
          }
        }}
      >
        <DialogTitle>
          <Typography variant="h6" gutterBottom component="div">
            إعادة تعيين محامي
          </Typography>
        </DialogTitle>

        <Divider />

        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <FormControl
              variant="filled"
              sx={{
                m: 0,
                width: '100%'
              }}
            >
              <InputLabel id="select"> المحامي </InputLabel>
              <Select
                labelId="select"
                id="slectBox"
                value={lawyerFilter}
                onChange={(e: any) => {
                  setLawyerFilter({
                    lawyerId: e.target.value.lawyerId,
                    firstName: e.target.value.firstName
                  });
                }}
                MenuProps={MenuProps}
                renderValue={(selected: any) => `${selected.firstName} `}
              >
                {lawyerList?.map((item: any) => {
                  return (
                    <MenuItem value={item} key={item.lawyerId}>
                      <em>{`${item.firstName}`}</em>
                    </MenuItem>
                  );
                })}
              </Select>
            </FormControl>
          </Box>
        </DialogContent>
        <Divider />

        <DialogActions sx={{ p: 5 }}>
          <LoadingButton
            variant="contained"
            onClick={() => {
              dispatch(changeAppointmentLawyer(appointment.appointmentId, lawyerFilter.lawyerId));
            }}
            color="success"
          >
            إعادة تعيين
          </LoadingButton>

          <Button
            onClick={() => {
              setOpen(false);
              setSelectedAppointment({});
            }}
            color="error"
          >
            إلغاء
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
