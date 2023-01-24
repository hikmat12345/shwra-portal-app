import * as Sentry from "@sentry/react";
import { find } from 'lodash';
import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
// @types
import {
  RequestState,
  Request
} from '../../@types/request';
// ----------------------------------------------------------------------


const initialState: RequestState = {
  isLoading: false,
  isAssigning: false, 

  error: false,
  requestList: [],
  request: null,

  requestStandardList: [],
  requestTypeList: [],
  requestActionList: [],
  requestStatus:{}
};


const slice = createSlice({
  name: 'request',
  initialState,
  reducers: {

    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    },

    setErrorDefault(state) {
      state.error = false;
    },

    // START LOADING
    startAssignment(state) {
      state.isAssigning = true;
    },

    // HAS ERROR
    hasError(state, action) {
      state.isLoading = false;
      state.error = action.payload;
    },

    // GET MANAGE Request
    getRequestListListSuccess(state, action) {
      state.isLoading = false;
      state.requestList = action.payload;
    },

    // GET MANAGE Request
    getClientRequestListSuccess(state, action) {
      state.isLoading = false;
      state.requestList = action.payload;
    },
    
    // GET MANAGE Request
    getAdminRequestListSuccess(state, action) {
      state.isLoading = false;
      state.requestList = action.payload;
    },

    // GET MANAGE Request
    getLawyerRequestListSuccess(state, action) {
      state.isLoading = false;
      state.requestList = action.payload;
    },

    // GET Request
    getRequestSuccess(state, action) {
      state.isLoading = false;
      state.request = action.payload;
    },

    //  Requst dynamic
    createRequestSuccess(state, action) {
      state.isLoading = false;
      state.requestStatus = action.payload
    },

    // GET MANAGE Request
    getRequestStandardsSuccess(state, action) {
      state.isLoading = false;
      state.requestStandardList = action.payload;
    },

    // GET MANAGE Request
    getRequestTypesSuccess(state, action) {
      state.isLoading = false;
      state.requestTypeList = action.payload;
    },

    // GET MANAGE Request
    getRequestActionListSuccess(state, action) {
      state.isLoading = false;
      state.requestActionList = action.payload;
    },

    // GET MANAGE Request
    changeRequestStateSuccess(state, action) {
      state.isLoading = false;
  
      const { request } = state

      const status: any = find( state.requestActionList , (actionRecord: any) =>  actionRecord.id ===  Number(action.payload.actionId));
      
      state.request ={ 
        ...request,
        status: status.name
      }

    },
  

    /**
     * @assing
     */
    assignLawyerToRequestSuccess(state, action) {
      state.isLoading = false;

      const { request } = state;

      const requestAssignLawyer: Request  = {
        ...request as Request,
        lawyer: action.payload
      }

      state.request = requestAssignLawyer;
      
    },


    /**
     * @comments
     */
    createRequestCommentSuccess(state, action) {

      state.isLoading = false;

      const { request } = state;

      state.request = {
        ...request as Request,
        comments: [
          ...request.comments as  any ,
          action.payload
        ]
      };

    },


    updateRequestCommentSuccess(state, action) {

      state.isLoading = false;

      const { request } = state;

      const requestNewComent: Request  = {
        ...request as Request,
        lawyer: action.payload
      }

      state.request = requestNewComent;

    },
    deleteCommentRequestSuccess(state, action) {

      state.isLoading = false;

      const { request } = state;

      const requestNewComent: Request  = {
        ...request as Request,
        lawyer: action.payload
      }

      state.request = requestNewComent;
      
    },

  }
});


// Reducer
export default slice.reducer;

// Actions
// export const { } = slice.actions;

// ----------------------------------------------------------------------

export function getRequest({
  requestId
}:{
  requestId: string
}) {
  return async () => {

    // console.log("getRequest:id", requestId)
    dispatch(slice.actions.startLoading());

    try {

      const response = await axios.get(`/Requests/${requestId}`);
      // console.log("getRequest:response", response)
      dispatch(slice.actions.getRequestSuccess(response.data));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

//------------------------------------------------------------------------

export function getClientRequestList({
  clientId
}:{
  clientId: string
}) {
  return async () => {
    // console.log("getRequest:id", clientId)
    dispatch(slice.actions.startLoading());
    try {

        const response = await axios.get(`/Clients/${clientId}/requests`);
        // console.log("getRequest:response", response)

        dispatch(slice.actions.getClientRequestListSuccess(response.data.requests));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

//------------------------------------------------------------------------

export function getAdminRequestList() {
  return async () => {
    // console.log("getRequest:id", )
    dispatch(slice.actions.startLoading());
    try {

        const response = await axios.get('/Requests',
          { 
            params: { 
              page: 1,
              size: 1000
            } 
          }
        )
        // console.log("getRequest:response", response)
        dispatch(slice.actions.getAdminRequestListSuccess(response.data.requests));
  
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}
export function setAdminRequestList (data: any) {
  return dispatch(slice.actions.getAdminRequestListSuccess(data));
}
//------------------------------------------------------------------------

//-------------------------------------------------------------------------------------

export function getLawyerRequestList({
  lawyerId
}:{
  lawyerId: string
}) {
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
export function setLawyerRequestList(data: any){
  return dispatch(slice.actions.getLawyerRequestListSuccess(data));
}
//------------------------------------------------------------------------

export function createClientRequest(data: any) {
  return async () => {
    // console.log("createClientRequest:data", data)
    dispatch(slice.actions.startLoading());
    dispatch(slice.actions.setErrorDefault());
    try {

       let formData = new FormData();
   
       formData.append("Subject", data.Subject);
       formData.append("Details", data.Details);
       formData.append("TypeId", data.TypeId);
       formData.append("SubTypeId", data.SubTypeId);
       formData.append("StandardId", data.StandardId);
       formData.append("ClientId", data.ClientId);

       data.Attachments.forEach((file: any) =>{
        formData.append("Files", file);
       });


       const response = await  axios.post('/Requests', 
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });

        dispatch(slice.actions.createRequestSuccess({ status:'success', ...response.data.requests }));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
      dispatch(slice.actions.createRequestSuccess({ status:'error', error }));

    }
  };
}


export function setRequestStatue(data: any) {
  return  dispatch(slice.actions.createRequestSuccess(data));
}

//------------------------------------------------------------------------

export function getRequestTypes() {
  return async () => {
  
    dispatch(slice.actions.startLoading());
    try {
        const response = await axios.get(`/Lookups/RequestTypes`);
        // console.log("createdRequest:response", response)

        dispatch(slice.actions.getRequestTypesSuccess(response.data));
    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}


//------------------------------------------------------------------------

export function getRequestStandards() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {

        const response = await axios.get(`/Lookups/RequestStandards`);
        // console.log("createdRequest:response", response)

        dispatch(slice.actions.getRequestStandardsSuccess(response.data));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

/***
 * @Request manage request status
 */
//------------------------------------------------------------------------
 
export function getRequestActionList() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {

        const response = await axios.get(`/Lookups/RequestActions`);
        // console.log("createdRequest:response", response)

        dispatch(slice.actions.getRequestActionListSuccess(response.data));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

//------------------------------------------------------------------------

export function changeRequestState({
  requestId,
  actionId
}:{
  requestId: string;
  actionId: string;
}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {

        await axios.put(`/Requests/${requestId}/${actionId}`);

        dispatch(slice.actions.changeRequestStateSuccess({ actionId }));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

//----------------------------------------------------------------------------------------------
export function assignLawyerToRequest({
  requestId,
  lawyerId
}:{
  requestId: string 
  lawyerId: string
}) {
  return async () => {
    dispatch(slice.actions.startAssignment());
    try {

        await axios.post(`/Requests/${requestId}/${lawyerId}`)

        const response = await axios.get(`/Lawyers/${lawyerId}`);
        dispatch(slice.actions.assignLawyerToRequestSuccess(response.data));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}


//----------------------------------------------------------------------------------------------


export function createRequestComment({
  requestId,
  body,
  Attachments
}:{
  requestId: string;
  body: string;
  Attachments: any;
}) {
  return async () => {
   // dispatch(slice.actions.startLoading());
    try {

      let formData = new FormData();
   
      formData.append("RequestId", requestId );
      formData.append("Body", body );

      Attachments.forEach((file: any) =>{
        formData.append("Files", file);
      });

      const response = await axios.post('/Comments',
          formData, 
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
      )

      const comment = await axios.get(`/Comments/${response.data}`);

      dispatch(slice.actions.createRequestCommentSuccess(comment.data));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

//----------------------------------------------------------------------------------------
export function updateRequestComment({
  requestId,
  body,
  file
}:{
  requestId: string;
  body: string;
  file: any;
}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {

        const response = await axios.put('/Comments')

        dispatch(slice.actions.updateRequestCommentSuccess(response.data));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

//----------------------------------------------------------------------------------------
export function deleteCommentRequest({
  commentId
}:{
  commentId: string;
}) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {

        const response = await axios.delete(`/Comments/${commentId}`)

        dispatch(slice.actions.deleteCommentRequestSuccess(response.data));

    } catch (error) {
      Sentry.captureException(error);
      dispatch(slice.actions.hasError(true));
    }
  };
}

//--------------------------------------------------------------------------------------------

