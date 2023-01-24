import * as Sentry from '@sentry/react';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';
import { ComplaintsState } from '../../@types/complaints';

// ----------------------------------------------------------------------

const initialState: ComplaintsState = {
  isLoading: false,
  error: false,
  complaintsList: { result: { data: [], totalCount: 0 } },
  complaintDetails: {
    createdDate: '',
    detail: '',
    email: '',
    phoneNumber: '',
    type: '',
    updatedDate: '',
    webMessageId: '',
    name: ''
  },
  deleteComplaintStatus: {}
};

const slice = createSlice({
  name: 'complaints',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET complaints LIST
    getComplaintsListSuccess(state, action) {
      state.isLoading = false;
      state.complaintsList = action.payload;
    },
    // GET complain details
    getComplaintDetailsSuccess(state, action) {
      state.isLoading = false;
      state.complaintDetails = action.payload?.result;
    },
    deleteComplaint(state, action) {
      state.isLoading = false;
      state.deleteComplaintStatus = action.payload;
    }
  }
});

export default slice.reducer;

//-------------------------------------------------------------------------------------

export function getComplaintsList(params: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/WebMessages', { params: { ...params } });
      dispatch(slice.actions.getComplaintsListSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getComplaintsDetails(complaintId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/WebMessages/${complaintId}`);
      dispatch(slice.actions.getComplaintDetailsSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function deleteComplaint(complaintId: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/WebMessages/${complaintId}`);
      dispatch(slice.actions.deleteComplaint({ ...response?.data, status: 'success' }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.deleteComplaint({ error: error, status: 'error' }));
    }
  };
}

export function setDeleteComplaint(data: any) {
  return dispatch(slice.actions.deleteComplaint(data));
}
