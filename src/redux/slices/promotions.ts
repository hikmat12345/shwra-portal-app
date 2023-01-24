import * as Sentry from '@sentry/react';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';
import { PromotionsState } from '../../@types/promotions';
import { createFileUrl } from 'components/file/FilePreview';

// ----------------------------------------------------------------------

const initialState: PromotionsState = {
  isLoading: false,
  error: false,
  promotionsList: { promotionCodesListDto: [], count: 0, size: 0, page: 0 },
  promotionDetails: {
    codeId: 0,
    codeName: '',
    createdDate: '',
    discount: '',
    limit: '',
    limitRemaining: '',
    status: false
  },
  addPromotionStatus: {},
  editPromotionStatus: {},
  deletePromotionStatus: {}
};

const slice = createSlice({
  name: 'promotions',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getPromotionsListSuccess(state, action) {
      state.isLoading = false;
      state.promotionsList = action.payload;
    },
    getPromotionSuccess(state, action) {
      state.isLoading = false;
      state.promotionDetails = action.payload;
    },
    addPromotionStatus(state, action) {
      state.isLoading = false;
      state.addPromotionStatus = action.payload;
    },
    editPromotionStatus(state, action) {
      state.isLoading = false;
      state.editPromotionStatus = action.payload;
    },
    deletePromotionStatus(state, action) {
      state.isLoading = false;
      state.deletePromotionStatus = action.payload;
    }
  }
});

export default slice.reducer;

//-------------------------------------------------------------------------------------

export function getPromotionsList(params: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/PromotionCode', { params: { ...params } });
      dispatch(slice.actions.getPromotionsListSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPromotionDetails(promotionId: string | number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/Promotion/${promotionId}`);

      dispatch(slice.actions.getPromotionSuccess({ ...response?.data, image: '' }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setPromotionDetails(data: any) {
  return dispatch(slice.actions.getPromotionSuccess(data));
}

export function addPromotion(data: FormData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/PromotionCode`, data);
      dispatch(slice.actions.addPromotionStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.addPromotionStatus({ status: 'error', error: error }));
    }
  };
}

export function setAddPromotion(data: any) {
  return dispatch(slice.actions.addPromotionStatus(data));
}

export function editpromotion(data: FormData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/PromotionCode`, data);
      dispatch(slice.actions.editPromotionStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.editPromotionStatus({ status: 'error', error: error }));
    }
  };
}

export function setEditPromotion(data: any) {
  return dispatch(slice.actions.editPromotionStatus(data));
}

export function deletePromotion(promotionId: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/PromotionCode/${promotionId}`);
      dispatch(slice.actions.deletePromotionStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.deletePromotionStatus({ status: 'error', error: error }));
    }
  };
}

export function setDeletePromotion(data: any) {
  return dispatch(slice.actions.deletePromotionStatus(data));
}
