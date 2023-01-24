/* eslint-disable react-hooks/exhaustive-deps */

import { Icon } from '@iconify/react';
import infoIcon from '@iconify/icons-eva/info-fill';
import phoneIcon from '@iconify/icons-eva/phone-call-fill';

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
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import useTable from 'hooks/useTable';
import moment from 'moment';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { colorizeAdminAppontmentStatus } from 'utils/functions';
import EmptyTable from '../../../../components/EmptyTable';
import Label from '../../../../components/Label';
import LoadingTable from '../../../../components/LoadingTable';
import Page from '../../../../components/Page';
import Scrollbar from '../../../../components/Scrollbar';
import { RequestListHead } from '../../../../components/_dashboard/request/list';
import useSettings from '../../../../hooks/useSettings';
import { getLawyerAppointments } from '../../../../redux/slices/appointment';
import { RootState, useDispatch, useSelector } from '../../../../redux/store';
import AppointmentAction from './AppointmentAction';
// ----------------------------------------------------------------------

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  display: 'inline-block'
}));

const TABLE_HEAD = [
  { id: 'appointmentDate', label: 'تاريخ الموعد', alignRight: false },
  { id: 'categoryName', label: 'التصنيف', alignRight: false },
  { id: 'statusName', label: 'الحالة', alignRight: false },
  { id: 'paymentAmount', label: 'القيمة المدفوعة', alignRight: false },
  { id: '' }
];
const COMPLETED_TABLE_HEAD = [
  { id: 'appointmentDate', label: 'تاريخ الموعد', alignRight: false },
  { id: 'categoryName', label: 'التصنيف', alignRight: false },
  { id: 'statusName', label: 'الحالة', alignRight: false },
  { id: 'paymentAmount', label: 'القيمة المدفوعة', alignRight: false }
];

export default function AdminAppointments({ statusId }: { statusId: number }) {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState({});

  const { lawyerAppointments, isLoading } = useSelector((state: RootState) => state.appointment);
  const { myProfile } = useSelector((state: RootState) => state.user);
  const { page, changePage } = useTable();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const sendRequest = (filters: {}) => {
    dispatch(
      getLawyerAppointments(myProfile?.id, {
        statusId: statusId,
        page: page + 1,
        size: rowsPerPage,
        ...filters
      })
    );
  };
  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    changePage(0);
  };
  useEffect(() => {
    changePage(0);
  }, [statusId]);
  useEffect(() => {
    sendRequest({
      categories: [],
      statuses: [],
      lawyersIds: []
    });
  }, [dispatch, page, rowsPerPage]);

  const isRequestEmpty = !isLoading && lawyerAppointments?.appointments.length === 0;

  return (
    <Page title={`المواعيد   | Shwra`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead headLabel={TABLE_HEAD} />

                {isLoading && lawyerAppointments?.appointments.length === 0 ? (
                  <LoadingTable />
                ) : (
                  <TableBody>
                    {lawyerAppointments?.appointments?.map((app: any) => {
                      const {
                        appointmentId,
                        statusName,
                        statusId,
                        appointmentDate,
                        categoryName,
                        totalAmount,
                        appointmentTime
                      } = app;

                      return (
                        <TableRow hover key={appointmentId}>
                          <TableCell align="left" dir="ltr">
                            {moment(appointmentDate).locale('en').format('DD-MM-YYYY')}{' '}
                            {appointmentTime}
                          </TableCell>
                          <TableCell align="left">{categoryName}</TableCell>
                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color={colorizeAdminAppontmentStatus(statusId)}
                            >
                              {statusName}
                            </Label>
                          </TableCell>
                          <TableCell align="left">{totalAmount}</TableCell>
                          <TableCell component="th" scope="row" padding="none">
                            <Box sx={{ display: 'flex', alignItems: 'center' }}>
                              <IconButton
                                aria-label="delete"
                                onClick={() => {
                                  setOpen(true);
                                  setSelectedAppointment(app);
                                }}
                                sx={{
                                  borderRadius: '2px',
                                  padding: '0.5rem 1rem',
                                  display: 'flex',
                                  alignItems: 'center'
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

                              <TableLink
                                to={`${PATH_DASHBOARD.appointments.root}/${appointmentId}/details`}
                              >
                                <IconButton
                                  sx={{
                                    borderRadius: '2px',
                                    padding: '0.5rem 1rem',
                                    display: 'flex',
                                    alignItems: 'center'
                                  }}
                                  aria-label="details"
                                >
                                  <Icon
                                    color="#d49e24"
                                    style={{
                                      marginLeft: '5px'
                                    }}
                                    icon={infoIcon}
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
                                    تفاصيل الإستشارة
                                  </Typography>
                                </IconButton>
                              </TableLink>
                            </Box>
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
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={lawyerAppointments?.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => changePage(page)}
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
    </Page>
  );
}
