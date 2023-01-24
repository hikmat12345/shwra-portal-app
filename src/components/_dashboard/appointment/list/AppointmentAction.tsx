import { Icon } from '@iconify/react';
import moment from 'moment';
// material
import { styled } from '@mui/material/styles';
import {
  Box,
  Typography,
  Button,
  DialogTitle,
  DialogContent,
  DialogActions,
  Divider
} from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';
import { DialogAnimate } from '../../../animate';
import Label from '../../../Label';
import { RootState } from 'redux/store';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAppointmentCall, setAppointmentCall } from 'redux/slices/appointment';

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

var formatter = new Intl.NumberFormat('ar-SA', {
  style: 'currency',
  currency: 'SAR'
});

export default function AppointmentAction({
  open,
  setOpen,
  appointment,
  setSelectedAppointment
}: any) {
  const dispatch = useDispatch();
  const [openCallStatus, setOpenCallStatus] = useState(false);

  const appointmentCallStatus = useSelector(
    (state: RootState) => state.appointment.appointmentCallStatus
  );
  useEffect(() => {
    setAppointmentCall({});
    return () => {
      setAppointmentCall({});
      setSelectedAppointment({});
    };
  }, [setSelectedAppointment]);
  useEffect(() => {
    if (appointmentCallStatus?.status === 'success') {
      setOpen(false);
      if (!openCallStatus) {
        setOpenCallStatus(true);
      }
    } else if (appointmentCallStatus?.status === 'error') {
      setOpen(false);
      if (!openCallStatus) {
        setOpenCallStatus(true);
      }
    }
  }, [appointmentCallStatus, openCallStatus, setOpen]);
  return (
    <Box display="flex" alignItems="center" justifyContent="flex-end" p={2}>
      <DialogAnimate
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        <DialogTitle>
          <Typography variant="h6" gutterBottom component="div">
            تفاصيل الموعد
          </Typography>
        </DialogTitle>

        <Divider />

        <DialogContent dividers>
          <Box sx={{ mb: 2 }}>
            <LabelStyle>التاريخ</LabelStyle>
            <Typography variant="subtitle2" gutterBottom component="div">
              {moment(appointment?.appointmentDate).locale('en').format('DD-MM-YYYY')}{' '}
              {appointment?.appointmentTime}{' '}
            </Typography>
          </Box>

          <Box sx={{ mb: 2 }}>
            <LabelStyle>التصنيف</LabelStyle>
            <Label variant="filled" color="default">
              {appointment?.categoryName}
            </Label>
          </Box>

          <Box sx={{ mb: 2 }}>
            <LabelStyle>التكلفة</LabelStyle>
            <Typography variant="subtitle2" gutterBottom component="div">
              {formatter.format(appointment?.paymentAmount ? appointment?.paymentAmount : 0)}
            </Typography>
          </Box>
        </DialogContent>
        <Divider />

        <DialogActions sx={{ p: 5 }}>
          <LoadingButton
            variant="contained"
            startIcon={<Icon icon="ic:round-video-call" />}
            onClick={() => {
              dispatch(getAppointmentCall(appointment?.appointmentId));
              setOpen(false);
              setSelectedAppointment({});
            }}
            color="success"
          >
            بدء المكالمة
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
      </DialogAnimate>
      <DialogAnimate
        open={openCallStatus}
        onClose={() => {
          setOpenCallStatus(false);
          setAppointmentCall({});
        }}
      >
        <DialogContent>
          <DialogTitle>
            <Typography variant="h6" component="div">
              سوف يتم ارسال مكالمة لك في أقرب وقت
            </Typography>
          </DialogTitle>
        </DialogContent>
        <Divider />

        <DialogActions sx={{ p: 5 }}>
          <Button
            onClick={() => {
              setOpenCallStatus(false);
              setAppointmentCall({});
            }}
            color="error"
          >
            إغلاق
          </Button>
        </DialogActions>
      </DialogAnimate>
    </Box>
  );
}
