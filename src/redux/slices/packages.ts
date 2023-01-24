import * as Sentry from '@sentry/react';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';
import { Package, PackagesState } from '../../@types/packages';
import { createFileUrl } from 'components/file/FilePreview';

// ----------------------------------------------------------------------

const initialState: PackagesState = {
  isLoading: false,
  error: false,
  packagesList: [],
  packageDetails: {
    id: 0,
    name: '',
    name_Arabic: '',
    description: '',
    description_Arabic: '',
    amount: 0,
    isActive: false,
    isFollowUp: false,
    followUpTimeDuration: 0,
    createdBy: '',
    createdDate: '',
    lastModifiedDate: '',
    lastModifiedBy: '',
    iconURL: '',
    isTamara:false
  },
  addPackageStatus: {},
  editPackageStatus: {},
  deletePackageStatus: {}
};

const slice = createSlice({
  name: 'packages',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    getPackagesListSuccess(state, action) {
      state.isLoading = false;
      state.packagesList = action.payload;
    },
    getPackageSuccess(state, action) {
      state.isLoading = false;
      state.packageDetails = action.payload;
    },
    addPackageStatus(state, action) {
      state.isLoading = false;
      state.addPackageStatus = action.payload;
    },
    editPackageStatus(state, action) {
      state.isLoading = false;
      state.editPackageStatus = action.payload;
    },
    deletePackageStatus(state, action) {
      state.isLoading = false;
      state.deletePackageStatus = action.payload;
    }
  }
});

export default slice.reducer;

//-------------------------------------------------------------------------------------

export function getPackagesList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/Package/GetListPackages');
      dispatch(slice.actions.getPackagesListSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getPackageDetails(packageId: string | number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/Package/${packageId}`);
   
      dispatch(slice.actions.getPackageSuccess({ ...response?.data, image: '' }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setPackageDetails(data: any) {
  return dispatch(slice.actions.getPackageSuccess(data));
}

export function addPackage(data: Package) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/Package/Create`, data);
      dispatch(slice.actions.addPackageStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.addPackageStatus({ status: 'error', error: error }));
    }
  };
}

export function setAddPackage(data: any) {
  return dispatch(slice.actions.addPackageStatus(data));
}

export function editpackage(data: Package) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/Package/Update`, data);
      dispatch(slice.actions.editPackageStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.editPackageStatus({ status: 'error', error: error }));
    }
  };
}

export function setEditPackage(data: any) {
  return dispatch(slice.actions.editPackageStatus(data));
}

export function deletePackage(packageId: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/Package/Delate/${packageId}`);
      dispatch(slice.actions.deletePackageStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.deletePackageStatus({ status: 'error', error: error }));
    }
  };
}

export function setDeletePackage(data: any) {
  return dispatch(slice.actions.deletePackageStatus(data));
}
