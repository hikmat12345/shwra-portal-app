import { Link } from 'react-router-dom';

import { useState, useEffect } from 'react';

// material
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@mui/material';
// redux
import { RootState, useDispatch, useSelector } from '../../redux/store';
import { getClientList, closeModal } from '../../redux/slices/client';

// utils
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
// @types
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import LoadingTable from '../../components/LoadingTable';
import EmptyTable from '../../components/EmptyTable';
import { ClientListHead, ClientMoreMenu } from '../../components/_dashboard/client/list';

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'name', label: 'الشركة', alignRight: false },
  { id: 'client', label: 'اسم العميل', alignRight: false },
  { id: 'requestsCount', label: 'عدد الطلبات', alignRight: false },
  { id: 'newRequestsCount', label: ' عدد الطلبات الجديدة', alignRight: false },
  { id: 'profile', label: 'الحساب', alignRight: false },
  { id: 'status', label: 'الحالة', alignRight: false },
  { id: '' }
];

// ----------------------------------------------------------------------

type Anonymous = Record<string | number, string>;

export default function ClientList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const [page, setPage] = useState(0);
  const [order, setOrder] = useState<'asc' | 'desc'>('asc');
  const [selected, setSelected] = useState<string[]>([]);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const { clientList, statusList, isLoading, error, isOpenModal } = useSelector(
    (state: RootState) => state.client
  );

  useEffect(() => {
    dispatch(
      getClientList({
        page: 1,
        size: 10000
      })
    );
  }, [dispatch]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('test');
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // const handleDeleteClient = (clientId: string) => {
  //    dispatch(deleteClient(clientId));
  // };

  const filteredClient = clientList.clients; // applySortFilter(lawyerList.lawyersDtos, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredClient.length === 0;

  const isClientEmpty = !isLoading && filteredClient.length === 0;

  // Modal Manage state
  // const handleOpenModal = () => {
  //   dispatch(openModal());
  // };

  const handleCloseModal = () => {
    dispatch(closeModal());
  };

  const renderStatusColumn = (status: any) => {
    const statusValue = status.toLowerCase();
    switch (statusValue) {
      case 'Approved':
        return '';
      case 'Blocked':
        return '';
      case 'Pending':
        return '';
      default:
        return status;
    }
  };

  return (
    <Page title="العملاء: قائمة | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="قائمة العملاء"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'العملاء', href: PATH_DASHBOARD.lawyer.root },
            { name: 'قائمة العملاء' }
          ]}
          /*
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              onClick={handleOpenModal}
            >
               عميل جديد
            </Button>
          }*/
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ClientListHead
                  headLabel={TABLE_HEAD}
                  rowCount={clientList.count}
                  numSelected={selected.length}
                />
                {isLoading && <LoadingTable />}
                <TableBody>
                  {clientList.clients
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((row, index) => {
                      const {
                        clientId,
                        firstName,
                        lastName,
                        company,
                        newRequestsCount,
                        requestsCount,
                        isCompleted,
                        status
                      } = row;
                      const name = `${firstName} ${lastName}`;
                      const isItemSelected = selected.indexOf(clientId) !== -1;
                      return (
                        <TableRow hover key={clientId} tabIndex={-1}>
                          <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                          <TableCell align="left">
                            <TableLink to={`${PATH_DASHBOARD.client.root}/${clientId}/profile`}>
                              {company}
                            </TableLink>
                          </TableCell>
                          <TableCell align="left">
                            <TableLink to={`${PATH_DASHBOARD.client.root}/${clientId}/profile`}>
                              {name}
                            </TableLink>
                          </TableCell>
                          <TableCell align="left">{requestsCount}</TableCell>

                          <TableCell align="left">{newRequestsCount}</TableCell>

                          <TableCell align="left">{isCompleted ? 'مكتمل' : 'غير مكتمل'}</TableCell>

                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color="warning"
                            >
                              {status}
                            </Label>
                          </TableCell>

                          <TableCell align="right">
                            <ClientMoreMenu clientId={clientId} statusList={statusList} />
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>

                {isClientEmpty && <EmptyTable message="لا يوجد عملاء فى الوقت الحالى" />}

                {isUserNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                        {/* <SearchNotFound searchQuery={filterName} /> */}
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={clientList.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>

        {/*
        <DialogAnimate open={isOpenModal} onClose={handleCloseModal}>
          <DialogTitle> اضف عميل جديد </DialogTitle>

          <ClientForm 
            onCancel={handleCloseModal}
          />

        </DialogAnimate>
*/}
      </Container>
    </Page>
  );
}
