/* eslint-disable react-hooks/exhaustive-deps */

import { styled, useTheme } from '@mui/material/styles';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import checkmark from '@iconify/icons-eva/checkmark-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import userIcon from '@iconify/icons-eva/person-fill';
import phoneIcon from '@iconify/icons-eva/phone-call-fill';
import searchFill from '@iconify/icons-eva/search-fill';
import { Icon } from '@iconify/react';
import {
  Box,
  Card,
  Container,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
  TextField,
  Typography
} from '@mui/material';
import { MIconButton } from 'components/@material-extend';
import DataTableFilters from 'components/dataTableFilters/dataTableFilters';
import { AppointmentAction } from 'components/_dashboard/appointment/list';
import SelectLawyer from 'components/_dashboard/appointment/list/SelectLawyer';
import useDebounce from 'hooks/useDebounce';
import useTable from 'hooks/useTable';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { getCategories } from 'redux/slices/availability';
import { getLawyerList } from 'redux/slices/lawyer';
import { colorizeAdminAppontmentStatus, getSpecificKeyInArrayOfObjects } from 'utils/functions';
import EmptyTable from '../../components/EmptyTable';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Label from '../../components/Label';
import LoadingTable from '../../components/LoadingTable';
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import { RequestListHead } from '../../components/_dashboard/request/list';
import useSettings from '../../hooks/useSettings';
import {
  getAdminAppointmentList,
  getAppointmentStatus,
  setChangeAppointmentLawyer
} from '../../redux/slices/appointment';
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { PATH_DASHBOARD } from '../../routes/paths';
// ----------------------------------------------------------------------

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'lawyerName', label: 'اسم المحامي', alignRight: false },
  { id: 'customerName', label: 'اسم العميل', alignRight: false },
  { id: 'lawyerNumber', label: 'هاتف المحامي', alignRight: false },
  { id: 'customerNumber', label: 'هاتف العميل', alignRight: false },
  { id: 'categoryName', label: 'التصنيف', alignRight: false },
  { id: 'appointmentDate', label: 'تاريخ الموعد', alignRight: false },
  { id: 'createdDate', label: 'تاريخ الإنشاء', alignRight: false },
  { id: 'status', label: 'الحالة', alignRight: false },
  { id: 'isCallRequested', label: 'تم طلب الإتصال', alignRight: false }
];

export default function AdminAppointments() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const changeAppointmentLawyerStatus = useSelector(
    (state: RootState) => state.appointment.changeAppointmentLawyerStatus
  );
  const { adminAppointmentsList, isLoading, appointmentStatus } = useSelector(
    (state: RootState) => state.appointment
  );
  const { lawyerList } = useSelector((state: RootState) => state.lawyer);
  const { categoriesList } = useSelector((state: RootState) => state.availability);
  const { page, changePage } = useTable();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [lawyerFilter, setLawyerFilter] = useState<any>([]);
  const [categoryFilter, setCategoryFilter] = useState<any>();
  const [statusFilter, setStatusFilter] = useState<any>();
  const [searchInput, setSearchInput] = useState<any>(null);
  const searchDebounce = useDebounce<string>(searchInput, 500);
  const [order, setOrder] = useState<'asc' | 'desc' | ''>('');
  const [orderBy, setOrderBy] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  const [openLawyer, setOpenLawyer] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const filters = {
    categories: categoryFilter?.value ? [categoryFilter?.value] : [],
    statuses:
      (statusFilter && statusFilter?.id !== null) || statusFilter?.id !== undefined
        ? [statusFilter?.id]
        : [],
    lawyersIds: lawyerFilter ? getSpecificKeyInArrayOfObjects(lawyerFilter, 'lawyerId') : []
  };
  const sendRequest = (
    filters?: {},
    search?: any,
    sort?: { orderBy: string | null; order: 'asc' | 'desc' | '' }
  ) => {
    dispatch(
      getAdminAppointmentList({
        page: page + 1,
        size: rowsPerPage,
        ...filters,
        search: search !== null ? search : searchDebounce,
        Orderby:
          sort?.orderBy !== null
            ? `${sort?.orderBy?.charAt(0)?.toUpperCase()}${sort?.orderBy?.slice(1)}`
            : orderBy !== null
            ? `${orderBy?.charAt(0)?.toUpperCase()}${orderBy?.slice(1)}`
            : '',
        OrderDirection: sort?.order !== null ? sort?.order : order
      })
    );
  };

  const handleRequestSort = (isAsc: any, property: any) => {
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };
  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    changePage(0);
  };
  const handleFilterClick = () => {
    sendRequest(filters, searchInput, { orderBy: orderBy, order: order });
    changePage(0);
  };
  const handleFilerClear = () => {
    setOrder('');
    setOrderBy(null);
    sendRequest(
      {
        categories: [],
        statuses: [],
        lawyersIds: []
      },
      searchInput,
      { orderBy: '', order: '' }
    );
    changePage(0);
  };
  const handleClickSerachAction = () => {
    if (searchInput) {
      setSearchInput('');
      sendRequest(filters, '', { orderBy: orderBy, order: order });
    } else {
      return;
    }
  };
  useEffect(() => {
    dispatch(getCategories());
    dispatch(
      getLawyerList({
        page: 1,
        size: 1000
      })
    );
    dispatch(getAppointmentStatus());
    // sendRequest({}, '', { orderBy: null, order: '' });
  }, []);
  useEffect(() => {
    sendRequest(filters, searchInput, { orderBy: orderBy, order: order });
  }, [dispatch, page, rowsPerPage]);

  useEffect(() => {
    if (searchDebounce !== null) {
      sendRequest(filters, searchDebounce, { orderBy: orderBy, order: order });
    }
  }, [searchDebounce]);
  useEffect(() => {
    if (orderBy !== null) {
      sendRequest(filters, searchInput, { orderBy: orderBy, order: order });
    }
  }, [order, orderBy]);
  useEffect(() => {
    if (changeAppointmentLawyerStatus?.status) {
      setOpenLawyer(false);
    }
    if (changeAppointmentLawyerStatus?.status === 'success') {
      sendRequest(filters, searchInput, { orderBy: orderBy, order: order });
      enqueueSnackbar('تم إعادة تعيين المحامي بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setChangeAppointmentLawyer({}));
        }
      });
    } else if (changeAppointmentLawyerStatus?.status === 'error') {
      changeAppointmentLawyerStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setChangeAppointmentLawyer({}));
          },
          action: (key: any) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
      });
    }
  }, [changeAppointmentLawyerStatus, enqueueSnackbar, closeSnackbar, dispatch]);
  const isRequestEmpty = !isLoading && adminAppointmentsList?.appointment?.length === 0;

  return (
    <Page title={`المواعيد   | Shwra`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={' المواعيد الخاصة بالأدمن'}
          links={[{ name: 'الرئيسية', href: PATH_DASHBOARD.root }, { name: ' المواعيد' }]}
        />

        <Card>
          {/* <Box sx={{ margin: '1rem' }}>
            <TextField
              fullWidth
              label="بحث"
              value={searchInput}
              onChange={(e) => setSearchInput(e?.target?.value)}
              InputProps={{
                endAdornment: (
                  <IconButton onClick={() => handleClickSerachAction()}>
                    <Icon icon={searchInput ? closeFill : searchFill} width={20} height={20} />
                  </IconButton>
                )
              }}
            />{' '}
          </Box> */}
          <DataTableFilters
            handleFilterClick={handleFilterClick}
            handleFilerClear={handleFilerClear}
            filters={[
              {
                list: lawyerList?.lawyersDtos?.filter((lawyer) => lawyer.statusId === 1),
                label: 'المحامي',
                multiple: true,
                inputName: 'firstName',
                inputValue: 'lawyerId',
                value: lawyerFilter,
                handleChange: (value: any) => setLawyerFilter(value)
              },
              {
                list: appointmentStatus,
                label: 'الحالة',
                multiple: false,
                inputName: 'name',
                inputValue: 'id',
                value: statusFilter,
                handleChange: (value: any) => setStatusFilter(value)
              },
              {
                list: categoriesList,
                label: 'الفئات',
                multiple: false,
                inputName: 'label',
                inputValue: 'value',
                value: categoryFilter,
                handleChange: (value: any) => setCategoryFilter(value)
              }
            ]}
          />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead
                  headLabel={TABLE_HEAD}
                  handleRequestSort={handleRequestSort}
                  order={order}
                  orderBy={orderBy}
                  hasSort={true}
                />

                {isLoading && adminAppointmentsList?.appointment?.length === 0 ? (
                  <LoadingTable />
                ) : (
                  <TableBody>
                    {adminAppointmentsList?.appointment.map((app: any, index) => {
                      const {
                        appointmentId,
                        statusName,
                        statusId,
                        appointmentDate,
                        customerName,
                        customerNumber,
                        lawyerName,
                        lawyerNumber,
                        appointmentTime,
                        createdDate,
                        isCallRequested,
                        categoryName
                      } = app;

                      return (
                        <TableRow hover key={appointmentId}>
                          <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>

                          <TableCell align="left">
                            <TableLink
                              to={`${PATH_DASHBOARD.appointments.admin}/${appointmentId}/details`}
                            >
                              {lawyerName}
                            </TableLink>
                          </TableCell>

                          <TableCell align="left">{customerName}</TableCell>

                          <TableCell align={`${lawyerNumber ? 'left' : 'center'}`}>
                            {lawyerNumber || '-'}
                          </TableCell>

                          <TableCell align="left">{customerNumber}</TableCell>
                          <TableCell align="left">{categoryName}</TableCell>

                          <TableCell align="left" dir="ltr">
                            {moment(appointmentDate).locale('en').format('DD-MM-YYYY')}{' '}
                            {appointmentTime}
                          </TableCell>
                          <TableCell align="left" dir="ltr">
                            {moment(createdDate).locale('en').format('DD-MM-YYYY hh:mm A')}{' '}
                          </TableCell>
                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={colorizeAdminAppontmentStatus(statusId)}
                            >
                              {statusName}
                            </Label>
                          </TableCell>
                          <TableCell align="left">
                            <Box sx={{ display: 'flex', alignItems: 'center', padding: '0 1rem' }}>
                              <Label
                                variant={'outlined'}
                                color={isCallRequested ? 'success' : 'error'}
                              >
                                <Icon
                                  icon={isCallRequested ? checkmark : closeFill}
                                  width={20}
                                  height={20}
                                  color={isCallRequested ? 'success' : 'error'}
                                />
                              </Label>
                              {!isCallRequested && (
                                <IconButton
                                  aria-label="call"
                                  onClick={() => {
                                    setOpen(true);
                                    setSelectedAppointment(app);
                                  }}
                                  sx={{
                                    borderRadius: '2px',
                                    padding: '0.5rem 1rem',
                                    display: 'flex',
                                    alignItems: 'center',
                                    marginLeft: '5px'
                                  }}
                                >
                                  <Icon
                                    color={'#229A16'}
                                    style={{
                                      marginLeft: '5px'
                                    }}
                                    icon={phoneIcon}
                                    width={15}
                                    height={15}
                                  />
                                  <Typography
                                    sx={{
                                      fontSize: '14px',
                                      whiteSpace: 'nowrap'
                                    }}
                                  >
                                    {' '}
                                    إجراء مكالمة
                                  </Typography>
                                </IconButton>
                              )}
                            </Box>
                            <IconButton
                              aria-label="call"
                              onClick={() => {
                                setOpenLawyer(true);
                                setSelectedAppointment(app);
                              }}
                              sx={{
                                borderRadius: '2px',
                                padding: '0.5rem 1rem',
                                display: 'flex',
                                alignItems: 'center',
                                marginLeft: '5px'
                              }}
                            >
                              <Icon
                                color={'#d49e24'}
                                style={{
                                  marginLeft: '5px'
                                }}
                                icon={userIcon}
                                width={18}
                                height={18}
                              />
                              <Typography
                                sx={{
                                  fontSize: '14px',
                                  whiteSpace: 'nowrap'
                                }}
                              >
                                {' '}
                                إعادة تعيين محامي
                              </Typography>
                            </IconButton>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                )}
                {isRequestEmpty && <EmptyTable message="لا يوجد مواعيد فى الوقت الحالى" />}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            component="div"
            count={adminAppointmentsList?.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(_e, page) => changePage(page)}
            onRowsPerPageChange={changeRowsPerPage}
          />
        </Card>
      </Container>

      <AppointmentAction
        open={open}
        setOpen={setOpen}
        appointment={selectedAppointment}
        setSelectedAppointment={setSelectedAppointment}
      />
      {openLawyer && (
        <SelectLawyer
          open={openLawyer}
          setOpen={setOpenLawyer}
          appointment={selectedAppointment}
          setSelectedAppointment={setSelectedAppointment}
          lawyerList={lawyerList?.lawyersDtos}
        />
      )}
    </Page>
  );
}
