import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
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
import { getLawyerRequestList, setLawyerRequestList } from '../../redux/slices/request';
// utils
import { fDate } from '../../utils/formatTime';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useAuth from '../../hooks/useAuth';
// @types
// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';

import {
  RequestListHead,
  RequestMoreMenu,
  RequestListEmpty
} from '../../components/_dashboard/request/list';
// ----------------------------------------------------------------------

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: 'title', label: 'الموضوع', alignRight: false },
  { id: 'standard', label: 'نوع الخدمة', alignRight: false },
  { id: 'type', label: 'معيار الخدمة', alignRight: false },
  { id: 'create_at', label: 'تاريخ الانشاء', alignRight: false },
  { id: 'updated_at', label: 'تاريخ التحديث', alignRight: false },
  { id: 'status', label: 'حالة الطلب', alignRight: false }
];

export default function RequestListLawyer() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { requestList, isLoading, error } = useSelector((state: RootState) => state.request);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(8);

  useEffect(() => {
    dispatch(
      getLawyerRequestList({
        lawyerId: user?.id as string
      })
    );
  }, [dispatch, user]);

  useEffect(() => {
    return () => {
      dispatch(setLawyerRequestList([]));
    };
  }, [dispatch]);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRequests = requestList;
  const isRequestEmpty = !isLoading && filteredRequests && filteredRequests.length === 0;

  return (
    <Page title="الاستشارات: انشاء استشاره جديدة | Shwra">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/** page header */}
        <HeaderBreadcrumbs
          heading="الطلبات المكلف بها"
          links={[
            { name: 'لوحه التحكم', href: PATH_DASHBOARD.root },
            { name: 'الطلبات', href: PATH_DASHBOARD.request.root }
          ]}
        />

        {/*** Request list */}

        <Card>
          {/*          
          <RequestListToolbar
            numSelected={selected.length}
            filterName={filterName}
            onFilterName={handleFilterByName}
          />
*/}

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead
                  // order={order}
                  // orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  // rowCount={RequestList.length}
                  // numSelected={selected.length}
                  // onRequestSort={handleRequestSort}
                  // onSelectAllClick={handleSelectAllClick}
                />
                <TableBody>
                  {requestList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((request) => {
                      const { requestId, subject, status, type, standard } = request;

                      return (
                        <TableRow
                          hover
                          key={requestId}
                          tabIndex={-1}
                          //selected={isItemSelected}
                          //aria-checked={isItemSelected}
                        >
                          {/** table row  */}

                          <TableCell align="left">
                            <TableLink to={`${PATH_DASHBOARD.request.root}/${requestId}/detail`}>
                              {subject}
                            </TableLink>
                          </TableCell>

                          <TableCell align="left"> {standard} </TableCell>

                          <TableCell align="left">
                            <Label
                              variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                              color="error"
                            >
                              {type}
                            </Label>
                          </TableCell>

                          <TableCell align="left">{fDate(Date.now())}</TableCell>

                          <TableCell align="left">{fDate(Date.now())}</TableCell>

                          <TableCell align="left"> {status} </TableCell>
                        </TableRow>
                      );
                    })}

                  {isRequestEmpty && <RequestListEmpty />}
                </TableBody>
                {/*isRequestNotFound && (
                  <TableBody>
                    <TableRow>
                      <TableCell align="center" colSpan={6} sx={{ py: 3 }}>
                       {<SearchNotFound searchQuery={filterName} /> }
                      </TableCell>
                    </TableRow>
                  </TableBody>
                )*/}
              </Table>
            </TableContainer>
          </Scrollbar>

          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={requestList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>
    </Page>
  );
}
