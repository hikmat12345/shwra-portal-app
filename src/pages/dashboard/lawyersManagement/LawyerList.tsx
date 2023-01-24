import { Link } from 'react-router-dom';
import { Icon } from '@iconify/react';
import { useState, useEffect, useRef } from 'react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import FullCalendar from '@fullcalendar/react'; // => request placed at the top
import {
  Card,
  Table,
  Button,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
  Dialog,
  DialogContent,
  IconButton,
  Box,
  Stack,
  FormControl,
  InputLabel,
  Select,
  MenuItem
} from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { getLawyerList, setUpdateLawyerStatus } from '../../../redux/slices/lawyer';
// utils
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// hooks
import useSettings from '../../../hooks/useSettings';
// @types
import { WeekEvent } from '../../../@types/availability';
// components
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingTable from '../../../components/LoadingTable';
import EmptyTable from '../../../components/EmptyTable';
import { LawyerListHead, LawyerMoreMenu } from '../../../components/_dashboard/lawyer/list';
import { useSnackbar } from 'notistack';
import Close from '@mui/icons-material/Close';
import { getAvailabilities, setAvailabilities } from 'redux/slices/availability';
import { colorizeLawyerStatus, getDayDate } from 'utils/functions';
import LawyerWeekAvailability from './LawyerWeekAvailability';
import moment from 'moment';
import 'moment/locale/ar';
import Label from 'components/Label';
import { useTheme } from '@mui/material/styles';
import { ILawyerList } from '../../../@types/lawyer';
import ChangeStatusModal from './ChangeStatusModal';

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'firstName', label: 'الأسم الأول', alignRight: false },
  { id: 'lastName', label: 'الأسم الأخير', alignRight: false },
  { id: 'email', label: 'البريد الالكترونى', alignRight: false },
  { id: 'phone', label: 'رقم الهاتف', alignRight: false },
  { id: 'status', label: 'الحالة', alignRight: false },
  { id: 'type', label: 'النوع', alignRight: false },
  { id: '' }
];

export default function LawyerList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [page, setPage] = useState(0);
  const [selected, setSelected] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState<string | number>('');
  const [weekEvents, setWeekEvents] = useState<WeekEvent[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openScheduleModal, setOpenScheduleModal] = useState(false);
  const [openStatusModal, setOpenStatusModal] = useState(false);
  const [modalType, setModalType] = useState<'approve' | 'decline' | 'delete' | ''>('');
  const [selectedLawyer, setselectedLawyer] = useState<{
    name: string;
    id: string;
    statusId: number;
  }>({
    name: '',
    id: '',
    statusId: 0
  });
  const { lawyerStatus, lawyerList, isLoading, isLawyerDeleted } = useSelector(
    (state: RootState) => state.lawyer
  );
  const lawyerAvailability = useSelector((state: RootState) => state.availability?.rules);
  const [lawyers, setLawyers] = useState<ILawyerList>({
    count: 0,
    lawyersDtos: [],
    page: 0,
    size: 0
  });
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    const dataProcessed: any = [];

    lawyerAvailability?.map((data: any) => {
      return data?.intervals?.map((int: any) => {
        const startDate = getDayDate(
          data?.dayId,
          parseInt(int?.from?.split(':')[0]),
          parseInt(int?.from?.split(':')[1])
        );
        const endDate = getDayDate(
          data?.dayId,
          parseInt(int?.to?.split(':')[0]),
          parseInt(int?.to?.split(':')[1])
        );
        return dataProcessed.push({
          dayId: data?.dayId,
          start: startDate,
          end: endDate,
          textColor: '#d49e24',
          title: `${moment(startDate).format('h:mm')} ${moment(startDate)
            .locale('ar')
            .format('A')} - ${moment(endDate).format('h:mm')} ${moment(endDate)
            .locale('ar')
            .format('A')} `
        });
      });
    });
    setWeekEvents(dataProcessed);
  }, [lawyerAvailability]);

  // dedect if lawyer deleted
  useEffect(() => {
    if (isLawyerDeleted) {
      enqueueSnackbar('تم حذف المحامى بنجاح', { variant: 'success' });
    }
  }, [isLawyerDeleted, enqueueSnackbar]);
  useEffect(() => {
    if (lawyerList) {
      setLawyers(lawyerList);
    }
  }, [lawyerList]);
  useEffect(() => {
    if (statusFilter !== '' && lawyers?.lawyersDtos?.length < 5) {
      setRowsPerPage(lawyers?.lawyersDtos?.length);
    } else {
      setRowsPerPage(5);
    }
  }, [lawyers, statusFilter]);
  const calendarRef = useRef<FullCalendar>(null);

  useEffect(() => {
    dispatch(
      getLawyerList({
        page: 1,
        size: 1000
      })
    );
  }, [dispatch]);
  useEffect(() => {
    if (lawyerStatus?.success) {
      dispatch(
        getLawyerList({
          page: 1,
          size: 1000
        })
      );
      dispatch(setUpdateLawyerStatus({}));
    }
  }, [dispatch, lawyerStatus]);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleDeleteLawyer = (lawyerId: string) => {
  //   dispatch(deleteLawyer({ lawyerId }));
  // };

  const isLawyerEmpty = !isLoading && lawyers?.lawyersDtos?.length === 0;

  return (
    <Page title="المحامين: قائمة | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="قائمة المحامين"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'المحامين', href: PATH_DASHBOARD.lawyer.root },
            { name: 'قائمة المحامين' }
          ]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              component={RouterLink}
              to={`${PATH_DASHBOARD.lawyer.root}/new`}
            >
              محامى جديد
            </Button>
          }
        />
        <Card>
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            //spacing={{ xs: 1, sm: 3, md: 4 }}
          >
            <FormControl variant="filled" sx={{ m: 2, minWidth: 120, width: 'auto' }}>
              <InputLabel id="demo-simple-select-filled-label"> الحالة </InputLabel>
              <Select
                labelId="demo-simple-select-filled-label"
                id="demo-simple-select-filled"
                value={statusFilter}
                onChange={(e, val) => {
                  setStatusFilter(e?.target?.value);
                }}
                // MenuProps={MenuProps}
              >
                <MenuItem value="">
                  <em>الكل</em>
                </MenuItem>

                {[
                  { name: 'Pending', id: 0 },
                  { name: 'Approved', id: 1 },
                  { name: 'Blocked', id: 2 }
                ].map((status) => (
                  <MenuItem value={status?.id} key={status?.id}>
                    {' '}
                    {status?.name}{' '}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <Box>
              <Button
                variant="contained"
                onClick={() => {
                  if (statusFilter !== '') {
                    setLawyers({
                      ...lawyerList,
                      lawyersDtos: lawyerList?.lawyersDtos?.filter(
                        (lawyer) => lawyer?.statusId === statusFilter
                      )
                    });
                    setPage(0);
                  } else {
                    setLawyers({ ...lawyerList });
                    setPage(0);
                  }
                }}
                sx={{ mx: 1, my: 3.5 }}
              >
                فلترة
              </Button>

              <Button
                variant="outlined"
                onClick={() => {
                  setLawyers({ ...lawyerList });
                  setStatusFilter('');
                  setPage(0);
                }}
                sx={{ mx: 1, my: 3.5 }}
              >
                حذف الفلتر
              </Button>
            </Box>
          </Stack>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <LawyerListHead
                  //order={order}
                  //orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={lawyers?.lawyersDtos?.length}
                  numSelected={selected.length}
                  //onRequestSort={handleRequestSort}
                  //onSelectAllClick={handleSelectAllClick}
                />
                {isLoading && <LoadingTable />}
                <TableBody>
                  {lawyers?.lawyersDtos
                    ?.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        lawyerId,
                        firstName,
                        lastName,
                        email,
                        phone,
                        status,
                        type,
                        statusId
                      } = row;

                      return (
                        <TableRow hover key={lawyerId} tabIndex={-1}>
                          <TableCell component="th" scope="row">
                            <Typography>{page * rowsPerPage + index + 1}</Typography>
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <TableLink to={`${PATH_DASHBOARD.lawyer.root}/${lawyerId}/profile`}>
                              {firstName}
                            </TableLink>
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <TableLink to={`${PATH_DASHBOARD.lawyer.root}/${lawyerId}/profile`}>
                              {lastName}
                            </TableLink>
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Typography noWrap>{email}</Typography>
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Typography noWrap>{phone ? phone : '-'}</Typography>
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={colorizeLawyerStatus(statusId)}
                            >
                              {status}
                            </Label>
                          </TableCell>

                          <TableCell component="th" scope="row">
                            <Typography noWrap>{type}</Typography>
                          </TableCell>
                          <TableCell
                            align="right"
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              flexDirection: 'row',
                              flexWrap: 'nowrap'
                            }}
                          >
                            {statusId === 0 ? (
                              <>
                                <Button
                                  sx={{
                                    p: '5px 8px',
                                    fontSize: '12px',
                                    minWidth: 'auto',
                                    lineHeight: '100%',
                                    borderRadius: '30px',
                                    color: '#229A16',
                                    backgroundColor: 'rgba(84, 214, 44, 0.16)',
                                    boxShadow: '0 6px 8px 0 rgb(242 242 242)',
                                    '&:hover': {
                                      color: 'white'
                                    }
                                  }}
                                  variant="contained"
                                  color={'success'}
                                  onClick={() => {
                                    setOpenStatusModal(true);
                                    setModalType('approve');
                                    setselectedLawyer({
                                      name: `${firstName} ${lastName}`,
                                      id: lawyerId,
                                      statusId: 1
                                    });
                                  }}
                                >
                                  قبول
                                </Button>
                                <Button
                                  variant="contained"
                                  sx={{
                                    p: '5px 8px',
                                    fontSize: '12px',
                                    minWidth: 'auto',
                                    lineHeight: '100%',
                                    borderRadius: '30px',
                                    color: '#B72136',
                                    backgroundColor: 'rgba(255, 72, 66, 0.16)',
                                    mx: '5px',
                                    boxShadow: '0 6px 8px 0 rgb(242 242 242)',
                                    '&:hover': {
                                      color: 'white'
                                    }
                                  }}
                                  color="error"
                                  onClick={() => {
                                    setOpenStatusModal(true);
                                    setModalType('decline');
                                    setselectedLawyer({
                                      name: `${firstName} ${lastName}`,
                                      id: lawyerId,
                                      statusId: 2
                                    });
                                  }}
                                >
                                  رفض
                                </Button>
                              </>
                            ) : (
                              <Typography sx={{ width: '100%', textAlign: 'center' }}>-</Typography>
                            )}

                            <LawyerMoreMenu
                              onDelete={() => {
                                setOpenStatusModal(true);
                                setModalType('delete');
                                setselectedLawyer({
                                  name: `${firstName} ${lastName}`,
                                  id: lawyerId,
                                  statusId: 2
                                });
                              }}
                              userName={lawyerId}
                              handleScheduleClick={() => {
                                setOpenScheduleModal(true);
                                dispatch(getAvailabilities(lawyerId));
                              }}
                            />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>

                {isLawyerEmpty && <EmptyTable message="لا يوجد محامين فى الوقت الحالى" />}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={lawyers?.lawyersDtos?.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
      <ChangeStatusModal
        type={modalType}
        open={openStatusModal}
        setOpen={setOpenStatusModal}
        lawyer={selectedLawyer}
      />
      <Dialog
        open={openScheduleModal}
        onClose={() => {
          setOpenScheduleModal(false);
          dispatch(setAvailabilities(null));
        }}
        PaperProps={{
          sx: { width: '90%', maxWidth: '90%' }
        }}
      >
        <DialogContent>
          <IconButton
            onClick={() => {
              setOpenScheduleModal(false);
              setAvailabilities(null);
            }}
            aria-label="delete"
            size="large"
          >
            <Close sx={{ color: 'text.primary' }} />
          </IconButton>
          <Box
            sx={{
              paddingRight: 0,
              paddingLeft: 0
            }}
          >
            <LawyerWeekAvailability weekEvents={weekEvents} calendarRef={calendarRef} />
          </Box>
        </DialogContent>
      </Dialog>
    </Page>
  );
}
