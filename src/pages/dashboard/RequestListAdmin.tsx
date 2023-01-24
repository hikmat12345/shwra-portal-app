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
import { getAdminRequestList, setAdminRequestList } from '../../redux/slices/request';
// utils
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useSettings from '../../hooks/useSettings';
import useFilter from '../../hooks/useFilter';

// components
import Page from '../../components/Page';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import LoadingTable from '../../components/LoadingTable';
import EmptyTable from '../../components/EmptyTable';
import {
  RequestListHead,
  RequestMoreMenu,
  RequestFilterForm
} from '../../components/_dashboard/request/list';
import moment from 'moment/moment';
// ----------------------------------------------------------------------

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'title', label: 'الموضوع', alignRight: false },
  { id: 'standard', label: 'نوع الخدمة', alignRight: false },
  { id: 'type', label: 'معيار الخدمة', alignRight: false },
  { id: 'company', label: 'الشركة', alignRight: false },
  { id: 'createdDate', label: 'تاريخ الإنشاء', alignRight: false },
  // { id: 'updated_at', label: 'تاريخ التحديث', alignRight: false },
  { id: 'status', label: 'حالة الطلب', alignRight: false }
];

type State = {
  company: string;
  standard: string;
  type: string;
  status: string;
};

export default function RequestListAdmin() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { requestList, isLoading, error } = useSelector((state: RootState) => state.request);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  useEffect(() => {
    dispatch(getAdminRequestList());

    return () => {
      dispatch(setAdminRequestList([]));
    };
  }, [dispatch]);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  // console.log("filteredRequests", filteredRequests)
  //const isRequesrequestNotFound =  filteredRequests.length === 0;

  //------------------------------------------------------------------------------------

  const { filtedData, applyFilter } = useFilter(requestList);

  const handleApplyFilter = (filter: State) => {
    applyFilter(filter);
  };

  const handleResetFilter = (filter: State) => {
    applyFilter(filter);
  };

  const isRequestEmpty = !isLoading && filtedData && filtedData.length === 0;

  return (
    <Page title="الاستشارات: انشاء استشاره جديدة | Shwra">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        {/** page header */}
        <HeaderBreadcrumbs
          heading="الطلبات الخاصة بالادمن"
          links={[
            { name: 'لوحه التحكم', href: PATH_DASHBOARD.root },
            { name: 'الطلبات', href: PATH_DASHBOARD.request.root }
          ]}
        />

        <Card>
          <RequestFilterForm onFilter={handleApplyFilter} onReset={handleResetFilter} />

          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead headLabel={TABLE_HEAD} />

                {isLoading && <LoadingTable />}

                <TableBody>
                  {filtedData &&
                    filtedData
                      .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                      .map((request, index) => {
                        const { requestId, subject, status, type, standard, client, createdDate } =
                          request;

                        return (
                          <TableRow hover key={requestId} tabIndex={-1}>
                            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>

                            <TableCell align="left">
                              <TableLink to={`${PATH_DASHBOARD.request.root}/${requestId}/detail`}>
                                {subject}
                              </TableLink>
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color="warning"
                              >
                                {type}
                              </Label>
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color="error"
                              >
                                {standard}
                              </Label>
                            </TableCell>

                            <TableCell align="left">{client?.company}</TableCell>

                            <TableCell align="left" dir="ltr">
                              {moment(createdDate).locale('en').format('DD-MM-YYYY hh:mm A')}
                            </TableCell>

                            <TableCell align="left">{status}</TableCell>
                          </TableRow>
                        );
                      })}
                </TableBody>

                {isRequestEmpty && <EmptyTable message="لا يوجد طلبات فى الوقت الحالى" />}

                {/*isRequesrequestNotFound && (
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
            count={filtedData.length}
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
