import * as Sentry from '@sentry/react';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import { AppointmentState } from '../../@types/appointment';

// ----------------------------------------------------------------------

const initialState: AppointmentState = {
  isLoading: false,
  error: false,
  commingAppointmentList: [],
  lastAppointmentList: [],
  adminAppointmentsList: {
    totalCount: 0,
    page: 0,
    size: 0,
    appointment: []
  },
  appointmentDetails: {
    appointmentId: '',
    statusId: 0,
    statusName: '',
    appointmentDate: '',
    createdDate: '',
    categoryId: 0,
    categoryName: '',
    customerName: '',
    customerNumber: '',
    lawyerName: null,
    lawyerNumber: '',
    attachedFiles: [],
    details: '',
    customerImage: '',
    lawyerImage: '',
    appointmentTime: ''
  },
  appointmentStatus: [],
  lawyerAppointments: {
    totalCount: 0,
    page: 0,
    size: 0,
    appointments: []
  },
  appointmentCallStatus: {},
  changeAppointmentLawyerStatus: {}
};

const slice = createSlice({
  name: 'appointment',
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

    // GET CLIENT LIST
    getCommingAppointmentListSuccess(state, action) {
      state.isLoading = false;
      state.commingAppointmentList = action.payload;
    },

    // GET CLIENT LIST
    getLastAppointmentListSuccess(state, action) {
      state.isLoading = false;
      state.lastAppointmentList = action.payload;
    },

    // GET ADMIN LIST
    getAdminAppointmentListSuccess(state, action) {
      state.isLoading = false;
      state.adminAppointmentsList = action.payload;
    },
    // GET APPOINTMENT STATUS
    getAppointmentStatusSuccess(state, action) {
      state.isLoading = false;
      state.appointmentStatus = action.payload;
    },
    // GET APPOINTMENT DETAILS
    getAppointmentDetailsSuccess(state, action) {
      state.isLoading = false;
      state.appointmentDetails = action.payload;
    },
    // GET USER APPOINTMENTS
    getLawyerAppointmensSuccess(state, action) {
      state.isLoading = false;
      state.lawyerAppointments = action.payload;
    },
    getAppointmentCallSuccess(state, action) {
      state.isLoading = false;
      state.appointmentCallStatus = action.payload;
    },
    changeAppointmentLawyerSuccess(state, action) {
      state.isLoading = false;
      state.changeAppointmentLawyerStatus = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const {} = slice.actions;

//-------------------------------------------------------------------------------------

export function getCommingAppointmentList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fetch('/apis/comming-appointment.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      dispatch(slice.actions.getCommingAppointmentListSuccess(data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

//----------------------------------------------------------------------------

export function getLastAppointmentList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fetch('/apis/last-appointment.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      dispatch(slice.actions.getLastAppointmentListSuccess(data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
//----------------------------------------------------------------------------

export function getAdminAppointmentList(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/Appointments/GetAll', data);
      dispatch(slice.actions.getAdminAppointmentListSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAppointmentStatus() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/Lookups/AppointmentStatus');
      dispatch(slice.actions.getAppointmentStatusSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getAppointmentDetails(appointmentId: string | number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/Appointments/${appointmentId}`);
      dispatch(slice.actions.getAppointmentDetailsSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getLawyerAppointments(lawyerId: string | number, params?: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/Appointments/lawyer/${lawyerId}`, { params });
      dispatch(slice.actions.getLawyerAppointmensSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setLawyerAppointments(data?: any) {
  return dispatch(slice.actions.getLawyerAppointmensSuccess(data));
}

export function getAppointmentCall(appointmentId: string | number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/CallCenter/SubmitInfoForCall/${appointmentId}`);
      dispatch(slice.actions.getAppointmentCallSuccess({ ...response?.data, status: 'success' }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.getAppointmentCallSuccess({ error, status: 'error' }));
    }
  };
}

export function setAppointmentCall(data?: any) {
  return dispatch(slice.actions.getAppointmentCallSuccess(data));
}

export function changeAppointmentLawyer(AppointmentId: string, LawyerId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`Appointments/ChangeAppointmentLawyer`, null, {
        params: {
          AppointmentId: AppointmentId,
          LawyerId: LawyerId
        }
      });
      dispatch(
        slice.actions.changeAppointmentLawyerSuccess({ ...response?.data, status: 'success' })
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.changeAppointmentLawyerSuccess({ error, status: 'error' }));
    }
  };
}

export function setChangeAppointmentLawyer(data?: any) {
  return dispatch(slice.actions.changeAppointmentLawyerSuccess(data));
}
