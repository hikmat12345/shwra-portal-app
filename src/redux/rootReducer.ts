import { combineReducers } from 'redux';
// import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// slices
import userReducer from './slices/user';
import requestReducer from './slices/request';
import lawyerReducer from './slices/lawyer';
import clientReducer from './slices/client';
import calendarReducer from './slices/calendar';
import availabilityReducer from './slices/availability';
import appointmentReducer from './slices/appointment';
import categoriesReducer from './slices/categories';
import packagesReducer from './slices/packages';
import complaintsReducer from './slices/complaints';
import promotionsReducer from './slices/promotions';
import featureReducer from './slices/features';


// ----------------------------------------------------------------------

const rootPersistConfig = {
  key: 'root',
  storage,
  keyPrefix: 'redux-',
  whitelist: []
};

const rootReducer = combineReducers({
  user: userReducer,
  request: requestReducer,
  lawyer: lawyerReducer,
  client: clientReducer,
  calendar: calendarReducer,
  availability: availabilityReducer,
  appointment: appointmentReducer,
  categories: categoriesReducer,
  packages: packagesReducer,
  complaints: complaintsReducer,
  promotions: promotionsReducer,
  features: featureReducer,
});

export { rootPersistConfig, rootReducer };
