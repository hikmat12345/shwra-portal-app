import * as Sentry from '@sentry/react';
import { map, filter } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import {
  Friend,
  Gallery,
  Profile,
  UserPost,
  Follower,
  UserData,
  CreditCard,
  UserInvoice,
  UserManager,
  UserAddressBook,
  NotificationSettings,
  Configuration
} from '../../@types/user';
import { createFileUrl } from 'components/file/FilePreview';

// ----------------------------------------------------------------------

type UserState = {
  isLoading: boolean;
  error: boolean;
  myProfile: null | Profile;
  posts: UserPost[];
  users: UserData[];
  userList: UserManager[];
  followers: Follower[];
  friends: Friend[];
  gallery: Gallery[];
  cards: CreditCard[] | null;
  addressBook: UserAddressBook[];
  invoices: UserInvoice[];
  notifications: NotificationSettings | null;
  resetPasswordStatus: any;
  updateProfileStatus: any;
  configurationsList: Configuration[];
  configurationDetails: Configuration;
  addConfigurationStatus: any;
  editConfigurationStatus: any;
  deleteConfigurationStatus: any;
};

const initialState: UserState = {
  isLoading: false,
  error: false,
  myProfile: null,
  posts: [],
  users: [],
  userList: [],
  followers: [],
  friends: [],
  gallery: [],
  cards: null,
  addressBook: [],
  invoices: [],
  notifications: null,
  resetPasswordStatus: {},
  updateProfileStatus: {},
  configurationsList: [],
  configurationDetails: {
    id: '',
    name: '',
    value: '',
    typeId: '',
    type: ''
  },
  addConfigurationStatus: {},
  editConfigurationStatus: {},
  deleteConfigurationStatus: {}
};

export const slice = createSlice({
  name: 'user',
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

    // GET PROFILE
    getProfileSuccess(state, action) {
      state.isLoading = false;
      state.myProfile = action.payload;
    },

    // GET POSTS
    getPostsSuccess(state, action) {
      state.isLoading = false;
      state.posts = action.payload;
    },

    // GET USERS
    getUsersSuccess(state, action) {
      state.isLoading = false;
      state.users = action.payload;
    },

    // DELETE USERS
    deleteUser(state, action) {
      const deleteUser = filter(state.userList, (user) => user.id !== action.payload);
      state.userList = deleteUser;
    },

    // GET FOLLOWERS
    getFollowersSuccess(state, action) {
      state.isLoading = false;
      state.followers = action.payload;
    },

    // ON TOGGLE FOLLOW
    onToggleFollow(state, action) {
      const followerId = action.payload;

      const handleToggle = map(state.followers, (follower) => {
        if (follower.id === followerId) {
          return {
            ...follower,
            isFollowed: !follower.isFollowed
          };
        }
        return follower;
      });

      state.followers = handleToggle;
    },

    // GET FRIENDS
    getFriendsSuccess(state, action) {
      state.isLoading = false;
      state.friends = action.payload;
    },

    // GET GALLERY
    getGallerySuccess(state, action) {
      state.isLoading = false;
      state.gallery = action.payload;
    },

    // GET MANAGE USERS
    getUserListSuccess(state, action) {
      state.isLoading = false;
      state.userList = action.payload;
    },

    // GET CARDS
    getCardsSuccess(state, action) {
      state.isLoading = false;
      state.cards = action.payload;
    },

    // GET ADDRESS BOOK
    getAddressBookSuccess(state, action) {
      state.isLoading = false;
      state.addressBook = action.payload;
    },

    // GET INVOICES
    getInvoicesSuccess(state, action) {
      state.isLoading = false;
      state.invoices = action.payload;
    },

    // GET NOTIFICATIONS
    getNotificationsSuccess(state, action) {
      state.isLoading = false;
      state.notifications = action.payload;
    },
    // GET USERS
    resetPasswordStatus(state, action) {
      state.isLoading = false;
      state.resetPasswordStatus = action.payload;
    },
    updateProfileStatus(state, action) {
      state.isLoading = false;
      state.updateProfileStatus = action.payload;
    },

    // GET ADMIN LIST
    getConfigurationsListSuccess(state, action) {
      state.isLoading = false;
      state.configurationsList = action.payload;
    },
    // GET APPOINTMENT STATUS
    getConfigurationSuccess(state, action) {
      state.isLoading = false;
      state.configurationDetails = action.payload;
    },
    addConfigurationStatus(state, action) {
      state.isLoading = false;
      state.addConfigurationStatus = action.payload;
    },
    editConfigurationStatus(state, action) {
      state.isLoading = false;
      state.editConfigurationStatus = action.payload;
    },
    deleteConfigurationStatus(state, action) {
      state.isLoading = false;
      state.deleteConfigurationStatus = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { onToggleFollow, deleteUser } = slice.actions;

// ----------------------------------------------------------------------

export function getProfile() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/Account/CurrentUser');
      const image: any = response?.data?.profileImageUrl
        ? await createFileUrl({
            fileName: response?.data?.profileImageUrl,
            type: 'image'
          })
        : '';

      if (image) {
        image.onload = () => {
          const profileImage = image.result;
          dispatch(
            slice.actions.getProfileSuccess({
              ...response.data,
              profileImageUrl: profileImage,
              displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
            })
          );
        };
      } else {
        dispatch(
          slice.actions.getProfileSuccess({
            ...response.data,
            profileImageUrl: '',
            displayName: `${response.data?.firstName || ''} ${response.data?.lasttName || ''}`
          })
        );
      }
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function setProfile(data: any) {
  return dispatch(slice.actions.getProfileSuccess(data));
}

export function getUserList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/user/manage-users');
      dispatch(slice.actions.getUserListSuccess(response.data.users));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function resetPassword(data: FormData) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/Account/resetPassword', data);
      dispatch(slice.actions.resetPasswordStatus({ success: true, ...response.data.users }));
    } catch (error: any) {
      Sentry.captureException(error);
      slice.actions.hasError(error);
      dispatch(slice.actions.resetPasswordStatus({ success: false, ...error }));
    }
  };
}

export function setResetPassword(data: any) {
  return dispatch(slice.actions.resetPasswordStatus(data));
}

export function updateProfile(userId: string | number, data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put('/Account/Update', data, { params: { id: userId } });
      dispatch(slice.actions.updateProfileStatus(response.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.updateProfileStatus(error));
    }
  };
}
export function setUpdateProfile(data: any) {
  return dispatch(slice.actions.updateProfileStatus(data));
}

// ----------------------------------------------------------------------start configurations
export function getConfigurationsList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/DefaultConfiguration');
      dispatch(slice.actions.getConfigurationsListSuccess(response?.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getConfigurationDetails(configurationId: string | number) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/DefaultConfiguration/${configurationId}`);
      const icon: any = await createFileUrl({
        fileName: response?.data?.icon,
        type: 'image'
      });

      icon.onload = () => {
        try {
          const image = icon.result;
          dispatch(slice.actions.getConfigurationSuccess({ ...response?.data, icon: image }));
        } catch (err) {
          dispatch(slice.actions.getConfigurationSuccess({ ...response?.data, icon: '' }));
        }
      };
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setConfigurationDetails(data: any) {
  return dispatch(slice.actions.getConfigurationSuccess(data));
}

export function addConfiguration(data: Configuration[]) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post(`/DefaultConfiguration`, data);
      dispatch(slice.actions.addConfigurationStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.addConfigurationStatus({ status: 'error', error: error }));
    }
  };
}

export function setAddConfiguration(data: any) {
  return dispatch(slice.actions.addConfigurationStatus(data));
}

export function editConfiguration(data: Configuration[]) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.put(`/DefaultConfiguration`, data);
      dispatch(slice.actions.editConfigurationStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.editConfigurationStatus({ status: 'error', error: error }));
    }
  };
}

export function setEditConfiguration(data: any) {
  return dispatch(slice.actions.editConfigurationStatus(data));
}

export function deleteConfiguration(data: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.delete(`/DefaultConfiguration`, {
        headers: {},
        data: data
      });
      dispatch(slice.actions.deleteConfigurationStatus({ status: 'success', ...response?.data }));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.deleteConfigurationStatus({ status: 'error', error: error }));
    }
  };
}

export function setDeleteConfiguration(data: any) {
  return dispatch(slice.actions.deleteConfigurationStatus(data));
}
// ---------------------------------------------------------------------- end configurations
