import * as Sentry from '@sentry/react';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';
import { FeaturesState } from '../../@types/features';

// ----------------------------------------------------------------------

const initialState: FeaturesState = {
  isLoading: false,
  error: false,
  featuresList: { data: [], totalCount: 0, size: 0, page: 0 },
  featureDetails: {
    featureId: '',
    detail: '',
    detailArabic: '',
    isActive: false
  },
  addFeatureStatus: {},
  editFeatureStatus: {},
  deleteFeatureStatus: {}
};

const slice = createSlice({
  name: 'features',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getFeaturesListSuccess(state, action) {
      state.isLoading = false;
      state.featuresList = action.payload;
    },
    getFeatureSuccess(state, action) {
      state.isLoading = false;
      state.featureDetails = action.payload;
    },
    addFeatureStatus(state, action) {
      state.isLoading = false;
      state.addFeatureStatus = action.payload;
    },
    editFeatureStatus(state, action) {
      state.isLoading = false;
      state.editFeatureStatus = action.payload;
    },
    deleteFeatureStatus(state, action) {
      state.isLoading = false;
      state.deleteFeatureStatus = action.payload;
    }
  }
});

export default slice.reducer;

//-------------------------------------------------------------------------------------

export function getFeaturesList(params?: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/PackageFeature/GetListPackageFeatures', {
        params: { ...params }
      });
      dispatch(slice.actions.getFeaturesListSuccess(response?.data?.result));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getFeatureDetails(featureId: string | number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/PackageFeature/GetPackageFeatureById/${featureId}`);

      dispatch(slice.actions.getFeatureSuccess(response?.data?.result));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setFeatureDetails(data: any) {
  return dispatch(slice.actions.getFeatureSuccess(data));
}

export function addFeature(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/PackageFeature/CreateFeature`, data);
      if (response?.data?.errors?.length > 0) {
        dispatch(slice.actions.addFeatureStatus({ error: { ...response?.data }, status: 'error' }));
      } else {
        dispatch(slice.actions.addFeatureStatus({ ...response?.data, status: 'success' }));
      }
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.addFeatureStatus({ error: error, status: 'error' }));
    }
  };
}

export function setAddFeature(data: any) {
  return dispatch(slice.actions.addFeatureStatus(data));
}

export function editfeature(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/PackageFeature/UpdateFeature`, data);
      console.log(response?.data);
      if (response?.data?.errors?.length > 0) {
        dispatch(
          slice.actions.editFeatureStatus({ error: { ...response?.data }, status: 'error' })
        );
      } else {
        dispatch(slice.actions.editFeatureStatus({ ...response?.data, status: 'success' }));
      }
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.editFeatureStatus({ error: error, status: 'error' }));
    }
  };
}

export function setEditFeature(data: any) {
  return dispatch(slice.actions.editFeatureStatus(data));
}

export function deleteFeature(featureId: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/FeatureCode/${featureId}`);
      dispatch(slice.actions.deleteFeatureStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.deleteFeatureStatus({ status: 'error', error: error }));
    }
  };
}

export function setDeleteFeature(data: any) {
  return dispatch(slice.actions.deleteFeatureStatus(data));
}
