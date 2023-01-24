import { useReducer, useEffect } from 'react';
// material
import Select, { SelectChangeEvent } from '@mui/material/Select';
import {
  Button,
  InputLabel,
  MenuItem,
  FormControl,
  Box,
  Stack,
  Autocomplete,
  TextField,
  ListItem
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
// redux
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import {
  getRequestTypes,
  getRequestStandards,
  getRequestActionList
} from '../../../../redux/slices/request';
import { getClientList } from '../../../../redux/slices/client';
// utils
import { getFullName } from '../../../../utils/helper';

type Action = {
  type: ActionKind;
  payload: any;
};

enum ActionKind {
  SelectCompany = 'SELECT_COMPANY',
  SelectStandard = 'SELECT_STANDARD',
  SelectType = 'SELECT_TYPE',
  SelectStatus = 'SELECT_STATUS',
  ResetFilter = 'RESET_FILTER'
}

type State = {
  company: string;
  standard: string;
  type: string;
  status: string;
};

const initialState: State = {
  company: '',
  standard: '',
  type: '',
  status: ''
};

function reducer(state: State, action: Action) {
  const { type, payload } = action;

  switch (type) {
    case ActionKind.SelectCompany:
      return {
        ...state,
        company: String(payload)
      };

    case ActionKind.SelectStandard:
      return {
        ...state,
        standard: String(payload)
      };

    case ActionKind.SelectType:
      return {
        ...state,
        type: String(payload)
      };
    case ActionKind.SelectStatus:
      return {
        ...state,
        status: String(payload)
      };

    case ActionKind.ResetFilter:
      return initialState;

    default:
      return state;
  }
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250
    }
  }
};

// ----------------------------------------------------------------------

type RequestFilterFormProps = {
  onFilter: Function;
  onReset: Function;
};

export default function RequestFilterForm({ onFilter, onReset }: RequestFilterFormProps) {
  // redux
  const reduxDispatch = useDispatch();
  const { requestStandardList, requestTypeList, requestActionList, isLoading, error } = useSelector(
    (state: RootState) => state.request
  );
  const { clientList } = useSelector((state: RootState) => state.client);

  useEffect(() => {
    reduxDispatch(getRequestTypes());
    reduxDispatch(getRequestStandards());
    reduxDispatch(getRequestActionList());
    reduxDispatch(
      getClientList({
        page: 1,
        size: 10000
      })
    );
  }, [reduxDispatch]);

  // ----------------------------------------------------------------------
  const [state, dispatch] = useReducer(reducer, initialState);

  const handleCompanyChange = (value: string) => {
    dispatch({
      type: ActionKind.SelectCompany,
      payload: value
    });
  };

  const handleTypeChange = (event: SelectChangeEvent) => {
    dispatch({
      type: ActionKind.SelectType,
      payload: event.target.value
    });
  };

  const handleStandardChange = (event: SelectChangeEvent) => {
    dispatch({
      type: ActionKind.SelectStandard,
      payload: event.target.value
    });
  };

  const handleStatusChange = (event: SelectChangeEvent) => {
    dispatch({
      type: ActionKind.SelectStatus,
      payload: event.target.value
    });
  };

  const handleFilterState = () => {
    onFilter(state);
  };

  const handleResetFilterState = () => {
    dispatch({
      type: ActionKind.ResetFilter,
      payload: {}
    });

    onReset(initialState);
  };

  return (
    <div>
      <Stack direction={{ xs: 'column', sm: 'row' }}>
        <FormControl variant="filled" sx={{ m: 2, minWidth: 170 }}>
          <Autocomplete
            fullWidth
            options={clientList.clients}
            getOptionLabel={(option) => getFullName(option)}
            popupIcon={<KeyboardArrowDownIcon />}
            renderInput={(params) => (
              <TextField {...params} variant="filled" label="العميل" placeholder="الكل" />
            )}
            onChange={(_, value) => handleCompanyChange(value?.clientId ?? '')}
            renderOption={(props, option) => (
              <li {...props} key={option?.clientId}>
                {getFullName(option)}
              </li>
            )}
          />
        </FormControl>

        <FormControl variant="filled" sx={{ m: 2, minWidth: 120, width: 'auto' }}>
          <InputLabel id="demo-simple-select-filled-label"> نوع الخدمة </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={state.type}
            onChange={handleTypeChange}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>الكل</em>
            </MenuItem>
            {requestTypeList.map((type) => (
              <MenuItem value={String(type.arabicName)} key={type.requestTypeId}>
                {' '}
                {type.arabicName}{' '}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 2, minWidth: 120, width: 'auto' }}>
          <InputLabel id="demo-simple-select-filled-label"> معيار الخدمة </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={state.standard}
            onChange={handleStandardChange}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>الكل</em>
            </MenuItem>
            {requestStandardList.map((stander) => (
              <MenuItem value={String(stander.arabicName)} key={stander.requestStandardId}>
                {' '}
                {stander.arabicName}{' '}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <FormControl variant="filled" sx={{ m: 2, minWidth: 120, width: 'auto' }}>
          <InputLabel id="demo-simple-select-filled-label"> حالة الطلب </InputLabel>
          <Select
            labelId="demo-simple-select-filled-label"
            id="demo-simple-select-filled"
            value={state.status}
            onChange={handleStatusChange}
            MenuProps={MenuProps}
          >
            <MenuItem value="">
              <em>الكل</em>
            </MenuItem>
            {requestActionList.map((action) => (
              <MenuItem value={String(action.name)} key={action.id}>
                {' '}
                {action.name}{' '}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Box>
          <Button variant="contained" onClick={handleFilterState} sx={{ mx: 1, my: 3.5 }}>
            فلترة
          </Button>

          <Button variant="outlined" onClick={handleResetFilterState} sx={{ mx: 1, my: 3.5 }}>
            حذف الفلتر
          </Button>
        </Box>
      </Stack>
    </div>
  );
}
