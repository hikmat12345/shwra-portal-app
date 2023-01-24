import { find, findIndex } from 'lodash';
import produce from 'immer';

import { createSlice } from '@reduxjs/toolkit';
import { dispatch } from '../store';
// utils
import axios from '../../utils/axios';
import { getDayIntervals, createIntervals } from '../../utils/intervals';
import { updateRule, createRule, deleteRule, getRule } from '../../utils/rules'; //
import { AvailabilityState, Rule, Interval } from '../../@types/availability';

// ----------------------------------------------------------------------

const initialState: AvailabilityState = {
  isLoading: false,
  // for sync with backend
  isSynced: false,
  isChanged: false,
  isEditing: false,
  isOnline: true,
  error: false,
  rules: [],
  workDays: [],
  workHours: [],
  isOpenModal: false,
  selectedAvailabilityId: null,
  selectedRange: null,
  categoriesList: [],
  lawyerAvailability: null,
  overlapingError: false,
  availabilityStatus: {}
};

const slice = createSlice({
  name: 'lawyer-availability',
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
    // set workDays
    getWorkDaysSuccess(state, action) {
      state.isLoading = false;
      state.workDays = action.payload;
    },
    // set categories
    getCategoriesSuccess(state, action) {
      state.isLoading = false;
      state.categoriesList = action.payload.map((item: any) => {
        return {
          value: item.mobileRequestCategoryId,
          label: item.arabicName
        };
      });
    },
    // set workHours
    getWorkDayTimesSuccess(state, action) {
      state.isLoading = false;
      state.workHours = action.payload;
    },

    // GET Availabilities
    getAvailabilitiesSuccess(state, action) {
      state.isLoading = false;
      state.isSynced = true;
      state.isChanged = false;
      state.rules = action.payload;
      state.lawyerAvailability = action.payload;
    },

    asyncAvailabilitiesSuccess(state, action) {
      state.isSynced = true;

      state.isChanged = false;
      state.availabilityStatus = action.payload;
    },
    availabilitiesChanges(state) {
      state.isChanged = true;
    },
    hasOverlapingError(state, action) {
      state.overlapingError = action.payload;
    },

    //------------------------------------------------------------------------
    dayAvailabilityToggleSuccess(state, action) {
      state.isChanged = true;
      const { dayId } = action.payload;
      const { rules } = state;

      const rule = getRule(rules, dayId);

      const index = findIndex(rules, { dayId });

      let updatedRules;
      // check if day intervals is empty
      if (rule) {
        // delete day intervals
        updatedRules = deleteRule(rules, dayId);
      } else {
        // create day intervals
        updatedRules = createRule(rules, index, dayId);
        state.isChanged = true;
      }

      state.rules = updatedRules;
      state.isSynced = false;
    },

    // ------------------------------------------------------------------------
    // TIME SOLET EVENT
    // ------------------------------------------------------------------------

    // CREATE TIME SLOT
    createIntervalSuccess(state, action) {
      const { dayId } = action.payload;

      state.isChanged = true;
      // 1- create new interval based on selected day last interval
      const dayIntervals = getDayIntervals(state.rules, dayId);

      const newIntervals = createIntervals(dayIntervals);

      // 2- add new interval to day intervals
      const newDayIntervals = {
        dayId,
        intervals: newIntervals
      };

      // 3- add update day rule to state  replace with update rule
      const index = findIndex(state.rules, { dayId });

      const updatedRules = updateRule(state.rules, index, newDayIntervals);

      state.rules = updatedRules;

      state.isEditing = true;
      state.isSynced = false;
    },

    // UPDATE TIME SLOT
    updateIntervalSuccess(state, action) {
      try {
        const { intervalIndex, interval, dayId } = action.payload;

        // const is isVaildInterval(interval, state.rules);

        // 1- validate interval
        const isVaild = true;

        if (!isVaild) {
          throw new Error('interval is not vaild');
        }

        // 1- create new interval based on selected day last interval
        const dayIntervals = find(state.rules, (rule: Rule) => rule.dayId === dayId);

        dayIntervals.intervals.splice(intervalIndex, 1, interval);

        // 3- add update day rule to state
        const index = findIndex(state.rules, { dayId });

        const nextState = produce(state.rules, (draft: any) => {
          draft.splice(index, 1, dayIntervals);
        });

        state.rules = nextState;

        state.isEditing = true;
        state.isSynced = false;
      } catch (error) {
        console.log('error', error);
      }
    },

    // DELETE TIME SLOT
    deleteIntervalSuccess(state, action) {
      const { intervalIndex, dayId } = action.payload;

      const dayIntervals = find(state.rules, (rule: Rule) => rule.dayId === dayId);

      dayIntervals.intervals.splice(intervalIndex, 1);

      // 3- add update day rule to state
      const index = findIndex(state.rules, { dayId });

      const nextState = produce(state.rules, (draft: any) => {
        draft.splice(index, 1, dayIntervals);
      });

      state.isEditing = true;
      state.isSynced = false;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
// export const {  } = slice.actions;
//----------------------------------------------------------------------
export function getWorkDays() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fetch('/apis/work_days.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();

      dispatch(slice.actions.getWorkDaysSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function getCategories() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/MobileRequestCategories');
      dispatch(slice.actions.getCategoriesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
//----------------------------------------------------------------------
export function getWorkDayTimes() {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await fetch('/apis/work_days.json', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await response.json();
      dispatch(slice.actions.getWorkDayTimesSuccess(data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
// ----------------------------------------------------------------------

export function getAvailabilities(lawyerId?: any) {
  return async () => {
    dispatch(slice.actions.startLoading());
    try {
      const response = await axios.get('/Lawyers/availability', { params: { lawyerId } });
      dispatch(slice.actions.getAvailabilitiesSuccess(response.data));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
    }
  };
}
export function setAvailabilities(data?: any) {
  return dispatch(slice.actions.getAvailabilitiesSuccess(data));
}

// ----------------------------------------------------------------------

export function asyncAvailabilities(rules: Rule[]) {
  return async () => {
    // dispatch(slice.actions.startLoading());
    try {
      const response = await axios.post('/Lawyers/availability', rules);
      dispatch(slice.actions.asyncAvailabilitiesSuccess({ status: 'success', ...response.data }));
    } catch (error) {
      dispatch(slice.actions.hasError(error));
      dispatch(slice.actions.asyncAvailabilitiesSuccess({ status: 'error', error }));
    }
  };
}

export function setAvailabilitiesStatus(data: any) {
  return dispatch(slice.actions.asyncAvailabilitiesSuccess(data));
}

export function availabilityOverlapingError(hasError: boolean) {
  return dispatch(slice.actions.hasOverlapingError(hasError));
}
export function availabilitiesChanges() {
  return dispatch(slice.actions.availabilitiesChanges());
}

// ----------------------------------------------------------------------
// Role Availability
// ----------------------------------------------------------------------

export function dayAvailabilityToggle({ dayId }: { dayId: string }) {
  return async () => {
    dispatch(slice.actions.dayAvailabilityToggleSuccess({ dayId }));
  };
}

// ----------------------------------------------------------------------
//  Time Interval
// ----------------------------------------------------------------------

export function createInterval({ dayId }: { dayId: string }) {
  return async () => {
    dispatch(
      slice.actions.createIntervalSuccess({
        dayId
      })
    );
  };
}

// ----------------------------------------------------------------------

export function updateInterval({
  dayId,
  intervalIndex,
  interval
}: {
  dayId: string;
  intervalIndex: string;
  interval: Interval;
}) {
  return async () => {
    dispatch(
      slice.actions.updateIntervalSuccess({
        dayId,
        intervalIndex,
        interval
      })
    );
  };
}

// ----------------------------------------------------------------------

export function deleteInterval({ dayId, intervalIndex }: { dayId: string; intervalIndex: string }) {
  return async () => {
    dispatch(
      slice.actions.deleteIntervalSuccess({
        dayId,
        intervalIndex
      })
    );
  };
}
