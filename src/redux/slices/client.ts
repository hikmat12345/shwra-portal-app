import * as Sentry from '@sentry/react';
import { findIndex, find } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// service
import { accountService } from '../../services';
// @types
import { ClientState } from '../../@types/client';

// ----------------------------------------------------------------------

const initialState: ClientState = {
  isLoading: false,
  error: false,

  clientList: {
    count: 0,
    clients: [],
    page: 0,
    size: 0
  },

  clientRequestList: [],

  statusList: [],

  client: null,

  isOpenModal: false,
  clientRegister: ''
};

const slice = createSlice({
  name: 'client',
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
    getClientListSuccess(state, action) {
      state.isLoading = false;
      state.clientList = action.payload;
    },

    // GET CLIENT BY ID
    getClientSuccess(state, action) {
      state.isLoading = false;
      state.client = action.payload;
    },

    // CREATE CLIENT
    createClientSuccess(state, action) {
      state.isLoading = false;

      state.clientList = {
        ...state.clientList,
        clients: [...state.clientList.clients, action.payload]
      };
    },

    // UPDATE CLIENT
    updateClientSuccess(state, action) {
      state.isLoading = false;
    },

    // DELETE CLIENT
    deleteClientSuccess(state, action) {
      state.isLoading = false;
    },

    // MANAGE CLIENT
    manageClientSuccess(state, action) {
      state.isLoading = false;

      const status: any = find(
        state.statusList,
        (actionRecord: any) => actionRecord.id === Number(action.payload.statusId)
      );

      const clientIndex: any = findIndex(
        state.clientList.clients,
        (actionRecord: any) => actionRecord.clientId === String(action.payload.clientId)
      );

      state.clientList.clients[clientIndex].status = status.name;
    },

    // STATUS CLIENT
    clientStatusListSuccess(state, action) {
      state.isLoading = false;
      state.statusList = action.payload;
    },

    //----------------------------------------
    // GET CLIENT REQUEST LIST
    getClientRequestListSuccess(state, action) {
      state.isLoading = false;
      state.clientRequestList = action.payload;
    },
    //----------------------------------------
    registerClientSuccess(state, action) {
      state.isLoading = false;
      state.isOpenModal = false;
      state.clientRegister = action.payload;
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
export const { openModal, closeModal } = slice.actions;

//-------------------------------------------------------------------------------------

export function getClientList({ page, size }: { page: number; size: number }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/Clients', {
        params: {
          page,
          size
        }
      });

      dispatch(slice.actions.getClientListSuccess(response.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

//----------------------------------------------------------------------------

export function getClient({ clientId }: { clientId: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/Clients/${clientId}`);

      dispatch(slice.actions.getClientSuccess(response.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function createClient({
  firstName,
  lastName,
  email,
  password
}: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const createdClient = await axios.post('/Account/client/register', {
        firstName,
        lastName,
        userName: email,
        email,
        password,
        confirmPassword: password
      });

      const response = await axios.get(`/Clients/${createdClient.data.userId}`);

      dispatch(slice.actions.createClientSuccess(response.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

//--------------------------------------------------------------------------------

export function manageClientStatus({ clientId, statusId }: { clientId: string; statusId: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      dispatch(
        slice.actions.manageClientSuccess({
          clientId,
          statusId
        })
      );
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function getClientRequests({ clientId }: { clientId: string }) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get(`/Clients/${clientId}/requests`);

      dispatch(slice.actions.getClientRequestListSuccess(response.data.requests));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function registerClient(payload: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/Lawyers/register', payload);
      dispatch(slice.actions.registerClientSuccess(response.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(error));
    }
  };
}

export function setRegisterClient(data?: any) {
  return () => {
    dispatch(slice.actions.registerClientSuccess(data));
    dispatch(slice.actions.hasError(data));
  };
}
