import * as Sentry from '@sentry/react';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
import axios from '../../utils/axios';
import { CategoriesState } from '../../@types/categories';
import { createFileUrl } from 'components/file/FilePreview';

// ----------------------------------------------------------------------

const initialState: CategoriesState = {
  isLoading: false,
  error: false,
  categoriesList: [],
  categoryDetails: {
    mobileRequestCategoryId: 0,
    name: '',
    arabicName: '',
    description: '',
    arabicDescription: '',
    icon: '',
    isActive: false,
    sortOrder: 0
  },
  addCategoryStatus: {},
  editCategoryStatus: {},
  deleteCategoryStatus: {},
  categoriesListLangWise: []
};

const slice = createSlice({
  name: 'categories',
  initialState,
  reducers: {
    startLoading(state) {
      state.isLoading = true;
    },
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET ADMIN LIST
    getCategoriesListSuccess(state, action) {
      state.isLoading = false;
      state.categoriesList = action.payload;
    },
    // GET ADMIN LIST
    getCategoriesListLangWiseSuccess(state, action) {
      state.isLoading = false;
      state.categoriesListLangWise = action.payload;
    },
    // GET APPOINTMENT STATUS
    getCategorySuccess(state, action) {
      state.isLoading = false;
      state.categoryDetails = action.payload;
    },
    addCategoryStatus(state, action) {
      state.isLoading = false;
      state.addCategoryStatus = action.payload;
    },
    editCategoryStatus(state, action) {
      state.isLoading = false;
      state.editCategoryStatus = action.payload;
    },
    deleteCategoryStatus(state, action) {
      state.isLoading = false;
      state.deleteCategoryStatus = action.payload;
    }
  }
});

export default slice.reducer;

//-------------------------------------------------------------------------------------

export function getCategoriesList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/MobileRequestCategories');
      dispatch(slice.actions.getCategoriesListSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCategoriesListLangWise() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(
        '/MobileRequestCategories/MobileRequestCategoryLanguageWise'
      );
      dispatch(slice.actions.getCategoriesListLangWiseSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getCategoryDetails(categoryId: string | number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/MobileRequestCategories/${categoryId}`);
      const icon: any = await createFileUrl({
        fileName: response?.data?.icon,
        type: 'image'
      });

      if (icon) {
        icon.onload = () => {
          try {
            const image = icon.result;
            dispatch(slice.actions.getCategorySuccess({ ...response?.data, icon: image }));
          } catch (err) {
            console.log(err);
            dispatch(slice.actions.getCategorySuccess({ ...response?.data, icon: '' }));
          }
        };
      } else {
        dispatch(slice.actions.getCategorySuccess({ ...response?.data, icon: '' }));
      }
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setCategoryDetails(data: any) {
  return dispatch(slice.actions.getCategorySuccess(data));
}

export function addCategory(data: FormData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/MobileRequestCategories`, data);
      dispatch(slice.actions.addCategoryStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.addCategoryStatus({ status: 'error', error: error }));
    }
  };
}

export function setAddCategory(data: any) {
  return dispatch(slice.actions.addCategoryStatus(data));
}

export function editcategory(data: FormData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/MobileRequestCategories`, data);
      dispatch(slice.actions.editCategoryStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.editCategoryStatus({ status: 'error', error: error }));
    }
  };
}

export function setEditCategory(data: any) {
  return dispatch(slice.actions.editCategoryStatus(data));
}

export function deleteCategory(categoryId: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/MobileRequestCategories/${categoryId}`);
      dispatch(slice.actions.deleteCategoryStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.deleteCategoryStatus({ status: 'error', error: error }));
    }
  };
}

export function setDeleteCategory(data: any) {
  return dispatch(slice.actions.deleteCategoryStatus(data));
}
