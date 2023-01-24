import * as Yup from 'yup';
import { merge } from 'lodash';
import { isBefore } from 'date-fns';
import moment from 'moment';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import trash2Fill from '@iconify/icons-eva/trash-2-fill';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Box,
  Button,
  Tooltip,
  TextField,
  IconButton,
  DialogContent,
  DialogActions,
  InputLabel,
  MenuItem,
  FormControl
} from '@mui/material';
import Select from '@mui/material/Select';
import { LoadingButton, MobileDateTimePicker } from '@mui/lab';
import { EventInput } from '@fullcalendar/common';
// @types
// redux
import { useDispatch } from '../../../redux/store';
import { createAvailability, deleteAvailability } from '../../../redux/slices/calendar';
//

type IconColorProps = {
  color: string;
};

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

function IconColor({ color }: IconColorProps) {
  return (
    <Box
      sx={{
        width: 10,
        height: 10,
        mx: 2,
        // display: 'flex',
        borderRadius: '50%',
        //position: 'relative',
        //alignItems: 'center',
        //justifyContent: 'center',
        bgcolor: color
      }}
      component="span"
    ></Box>
  );
}

// ----------------------------------------------------------------------

const AVAILABILITY_OPTIONS = [
  {
    id: 1,
    label: 'متاح',
    color: '#00AB55'
  },
  {
    id: 2,
    label: 'محجوز',
    color: '#FF4842'
  }
];

const getInitialValues = (event: EventInput, range: { start: Date; end: Date } | null) => {
  // eslint-disable-next-line no-underscore-dangle
  const _event = {
    availability: AVAILABILITY_OPTIONS[0].id,
    start: range ? new Date(range.start) : new Date(),
    end: range ? new Date(range.end) : new Date()
  };

  if (event || range) {
    return merge({}, _event, event);
  }

  return _event;
};

// ----------------------------------------------------------------------

type AvailabilityCalendarFormProps = {
  availability: any;
  range: {
    start: Date;
    end: Date;
  } | null;
  onCancel: VoidFunction;
};

export default function AvailabilityCalendarForm({
  availability,
  range,
  onCancel
}: AvailabilityCalendarFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isCreating = !availability;

  const AvailabilitySchema = Yup.object().shape({
    availability: Yup.number().required('Title is required')
  });

  const formik = useFormik({
    initialValues: getInitialValues(availability, range),
    validationSchema: AvailabilitySchema,
    onSubmit: async (values, { resetForm, setSubmitting }) => {
      try {
        const { start, end } = values;

        const newAvailability = {
          date: moment(values.start).format(),
          startTime: moment(start).format(),
          endTime: moment(end).format()
        };

        if (availability.scheduleId) {
          // dispatch(updateAvailability(event.id, newEvent));
          enqueueSnackbar('Update event success', { variant: 'success' });
        } else {
          dispatch(createAvailability(newAvailability));
          enqueueSnackbar('Create event success', { variant: 'success' });
        }

        resetForm();
        onCancel();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } =
    formik;

  const handleDelete = async () => {
    if (!availability.scheduleId) return;
    try {
      onCancel();
      dispatch(deleteAvailability({ availabilityId: availability.scheduleId }));
      enqueueSnackbar('Delete event success', { variant: 'success' });
    } catch (error) {
      console.error(error);
    }
  };

  const isDateError = isBefore(new Date(values.end), new Date(values.start));

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
          <MobileDateTimePicker
            label="تاريخ البداية"
            value={values.start}
            inputFormat="dd/MM/yyyy hh:mm a"
            onChange={(date) => setFieldValue('start', date)}
            renderInput={(params) => <TextField {...params} fullWidth sx={{ mb: 3 }} />}
            disabled={true}
          />

          <MobileDateTimePicker
            label="تاريخ النهاية"
            value={values.end}
            inputFormat="dd/MM/yyyy hh:mm a"
            onChange={(date) => setFieldValue('end', date)}
            renderInput={(params) => (
              <TextField
                {...params}
                fullWidth
                error={Boolean(isDateError)}
                helperText={isDateError && 'End date must be later than start date'}
                sx={{ mb: 3 }}
              />
            )}
            disabled={true}
          />

          {/** Availability input */}

          <FormControl fullWidth>
            <InputLabel id="availability-status-select-label"> الحالة </InputLabel>
            <Select
              labelId="availability-status-select-label"
              id="availability-status-select"
              {...getFieldProps('availability')}
              label="الحالة"
            >
              {AVAILABILITY_OPTIONS.map((option) => (
                <MenuItem value={option.id} key={option.id}>
                  <IconColor color={option.color} />

                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </DialogContent>

        <DialogActions>
          {!isCreating && (
            <Tooltip title="خذف الاتاحة">
              <IconButton onClick={handleDelete}>
                <Icon icon={trash2Fill} width={20} height={20} />
              </IconButton>
            </Tooltip>
          )}
          <Box sx={{ flexGrow: 1 }} />
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
            الغاء
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="جارى الاضافة"
          >
            اضافة
          </LoadingButton>
        </DialogActions>
      </Form>
    </FormikProvider>
  );
}
