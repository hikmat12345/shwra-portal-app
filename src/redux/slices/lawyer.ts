import * as Sentry from '@sentry/react';
import { filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';
import { LawyerState } from '../../@types/lawyer';

const initialState: LawyerState = {
  isLoading: false,
  statusLoading: false,
  error: false,
  lawyerList: {
    count: 0,
    lawyersDtos: [],
    page: 0,
    size: 0
  },
  lawyerRequestList: [],
  lawyer: null,
  isOpenModal: false,
  isLawyerDeleted: false,
  isLawyerCreated: false,
  lawyerStatus: {}
};

const slice = createSlice({
  name: 'lawyer',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },
    statusLoading(state) {
      state.statusLoading = true;
    },
    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },
    // GET LAWYER LIST
    getLawyerListSuccess(state, action) {
      state.isLoading = false;
      state.lawyerList = action.payload;
    },
    // GET LAWYER BY ID
    getLawyerSuccess(state, action) {
      state.isLoading = false;
      state.statusLoading = false;
      state.lawyer = action.payload;
    },
    // CREATE LAWYER
    createLawyerSuccess(state, action) {
      state.isLoading = false;
      state.isOpenModal = false;
      state.isLawyerCreated = true;
      state.lawyerList = {
        ...state.lawyerList,
        lawyersDtos: [...state.lawyerList.lawyersDtos, action.payload]
      };
    },
    // UPDATE LAWYER
    updateLawyerSuccess(state, action) {
      state.isLoading = false;
      state.isLawyerCreated = true;
    },
    // DELETE LAWYER
    deleteLawyerSuccess(state, action) {
      state.isLawyerDeleted = true;
      state.isLoading = false;
      const deleteLawyer = filter(
        state.lawyerList.lawyersDtos,
        (layer) => layer.lawyerId !== action.payload
      );
      state.lawyerList = {
        ...state.lawyerList,
        lawyersDtos: deleteLawyer
      };
    },
    resetLawyerState(state) {
      state.isLawyerDeleted = false;
      state.isLawyerCreated = false;
    },
    // GET LAWYER REQUEST LIST
    getLawyerRequestListSuccess(state, action) {
      state.isLoading = false;
      state.lawyerRequestList = action.payload;
    },
    // OPEN MODAL
    openModal(state) {
      state.isOpenModal = true;
    },
    // CLOSE MODAL
    closeModal(state) {
      state.isOpenModal = false;
    },

    updateLawyerStatusSuccess(state, action) {
      state.lawyerStatus = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;
// Actions
export const { openModal, closeModal } = slice.actions;
//-------------------------------------------------------------------------------------
export function getLawyerList({ page, size }: { page: number; size: number }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/Lawyers', {
        params: {
          page,
          size
        }
      });

      dispatch(slice.actions.getLawyerListSuccess(response.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
//----------------------------------------------------------------------------
export function getLawyer(lawyerId: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    dispatch(slice.actions.statusLoading());
    try {
      const response = await axios.get(`/Lawyers/${lawyerId}`);
      dispatch(slice.actions.getLawyerSuccess(response.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function setLawyer(data: any) {
  return dispatch(slice.actions.getLawyerSuccess(data));
}
export function createLawyer(params: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/Lawyers', params);
      const createdLawyer = await axios.get(`/Lawyers/${response.data}`);
      dispatch(slice.actions.createLawyerSuccess(createdLawyer.data));
      dispatch(slice.actions.resetLawyerState());
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function updateLawyer(params: any, lawyerId: string) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/Lawyers/UpdateLawyerByAdmin/${lawyerId}`, params);

      dispatch(slice.actions.updateLawyerSuccess(response.data));
      dispatch(slice.actions.resetLawyerState());
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function deleteLawyer({ lawyerId }: { lawyerId: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/Lawyers/${lawyerId}`);
      dispatch(slice.actions.deleteLawyerSuccess(lawyerId));
      dispatch(slice.actions.resetLawyerState());
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getLawyerRequests({ lawyerId }: { lawyerId: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/Lawyers/${lawyerId}/requests`);

      dispatch(slice.actions.getLawyerRequestListSuccess(response.data.requests));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function updateLawyerStatus(lawyerId: string, statusId: number) {
  return async () => {
    dispatch(slice.actions.statusLoading());
    try {
      const response = await axios.put(`/Lawyers/ChangeLawyerStatus/${lawyerId}/${statusId}`);
      dispatch(
        slice.actions.updateLawyerStatusSuccess({ success: true, message: 'Updated Successfully' })
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setUpdateLawyerStatus(data: {}) {
  return dispatch(slice.actions.updateLawyerStatusSuccess(data));
}
