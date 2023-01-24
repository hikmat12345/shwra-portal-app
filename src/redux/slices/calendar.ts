import { map, filter } from 'lodash';
import moment from 'moment';

import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
//
import { CalendarState } from '../../@types/calendar';

// ----------------------------------------------------------------------

enum EventColor {
  'red',
  'green',
  'blue'
}

const initialState: CalendarState = {
  isLoading: false,
  error: false,
  availabilities: [],
  isOpenModal: false,
  selectedAvailabilityId: null,
  selectedRange: null
};

const slice = createSlice({
  name: 'availability-calendar',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET Availabilities
    getAvailabilitiesSuccess(state, action) {
      state.isLoading = false;

      action.payload.forEach((availability: any) => {
        //const dayDate = moment(availability.date).format('YYYY-MM-DD');

        const date = moment(availability.date).format('YYYY-MM-DD HH:mm:ss');

        //const startTime = convertTime12to24(availability.startTime);
        //console.log("startTime", startTime);
        //availability.start = addHoursToDate(date, startTime);
        availability.start = moment(availability.startTime).format();
        delete availability.startTime;

        availability.textColor = EventColor[availability.status];

        //const endTime = convertTime12to24(availability.endTime);
        //availability.end =  addHoursToDate(date, endTime);
        availability.end = moment(availability.endTime).format();
        delete availability.endTime;
      });

      state.availabilities = action.payload;
    },

    // CREATE EVENT
    createAvailabilitySuccess(state, action) {
      const newEvent = action.payload;
      state.isLoading = false;
      state.availabilities = [...state.availabilities, newEvent];
    },

    // UPDATE EVENT
    updateAvailabilitySuccess(state, action) {
      const event = action.payload;
      const updateEvent = map(state.availabilities, (_event) => {
        if (_event.scheduleId === event.id) {
          return event;
        }
        return _event;
      });

      state.isLoading = false;
      state.availabilities = updateEvent;
    },

    // DELETE EVENT
    deleteAvailabilitySuccess(state, action) {
      const { availabilityId } = action.payload;
      const deleteAvailabilities = filter(
        state.availabilities,
        (availability) => availability.scheduleId !== availabilityId
      );
      state.availabilities = deleteAvailabilities;
    },

    // SELECT EVENT
    selectAvailability(state, action) {
      const eventId = action.payload;
      state.isOpenModal = true;
      state.selectedAvailabilityId = eventId;
    },

    // SELECT RANGE
    selectRange(state, action) {
      const { start, end } = action.payload;
      state.isOpenModal = true;
      state.selectedRange = { start, end };
    },

    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },

    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { openModal, closeModal, selectAvailability } = slice.actions;

// ----------------------------------------------------------------------

export function getAvailabilities() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/Schedules');
      dispatch(slice.actions.getAvailabilitiesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function createAvailability({
  date,
  startTime,
  endTime
}: {
  date: string;
  startTime: string;
  endTime: string;
}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/Schedules', {
        date,
        startTime,
        endTime
      });

      dispatch(
        slice.actions.createAvailabilitySuccess({
          createdBy: response.data.createdBy,
          createdDate: response.data.createdDate,
          date: response.data.date,
          startTime: startTime, //moment(response.data.startTime).format(),
          endTime: endTime, //moment(response.data.endTime).format(),
          scheduleId: response.data.scheduleId,
          status: response.data.status
        })
      );
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function updateAvailability(
  availabilityId: string,
  updateAvailability: Partial<{
    allDay: boolean;
    start: Date | null;
    end: Date | null;
  }>
) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/api/calendar/events/update', {
        availabilityId,
        updateAvailability
      });
      dispatch(slice.actions.updateAvailabilitySuccess(response.data.event));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function deleteAvailability({ availabilityId }: { availabilityId: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      await axios.delete(`/Schedules/${availabilityId}`);
      dispatch(slice.actions.deleteAvailabilitySuccess({ availabilityId }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}

// ----------------------------------------------------------------------

export function selectRange(start: Date, end: Date) {
  return async () => {
    dispatch(
      slice.actions.selectRange({
        start: start.getTime(),
        end: end.getTime()
      })
    );
  };
}
