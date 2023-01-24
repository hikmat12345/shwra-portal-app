import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';
// material
import { useTheme } from '@mui/material/styles';
import { styled } from '@mui/material/styles';
import {
  Typography,
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
import { getClient, getClientRequests } from '../../redux/slices/client';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// utils
// hooks
import useSettings from '../../hooks/useSettings';
// components
import Page from '../../components/Page';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Label from '../../components/Label';
import Scrollbar from '../../components/Scrollbar';
import {
  ClientDetailCard,
  ClientRequestListEmpty,
  ClientRequestListHead
} from '../../components/_dashboard/client/profile';

// ----------------------------------------------------------------------

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

//-------------------------------------------------------------------------

const TABLE_HEAD = [
  { id: 'title', label: 'الموضوع', alignRight: false },
  { id: 'standard', label: 'نوع الخدمة', alignRight: false },
  { id: 'type', label: 'معيار الخدمة', alignRight: false },
  // { id: 'create_at', label: 'تاريخ الانشاء', alignRight: false },
  // { id: 'updated_at', label: 'تاريخ التحديث', alignRight: false },
  { id: 'status', label: 'حالة الطلب', alignRight: false }
];

// ----------------------------------------------------------------------

export default function ClientProfile() {
  const { themeStretch } = useSettings();
  const theme = useTheme();

  const dispatch = useDispatch();

  const { clientId = '' } = useParams();

  const { client, clientRequestList, isLoading, error } = useSelector(
    (state: RootState) => state.client
  );

  useEffect(() => {
    dispatch(
      getClient({
        clientId
      })
    );

    dispatch(
      getClientRequests({
        clientId
      })
    );
  }, [dispatch, clientId]);

  ///-----------------------------------------------------------------
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(6);

  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const filteredRequests = clientRequestList;

  const isRequestEmpty = !isLoading && filteredRequests && filteredRequests.length === 0;

  return (
    <Page title="العملاء: الملف | شورى">
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading="ملف العميل"
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'العملاء', href: PATH_DASHBOARD.client.root },
            { name: client?.company || '' }
          ]}
        />

        {client && <ClientDetailCard client={client} />}

        <Typography variant="h6" gutterBottom component="div" sx={{ mb: { xs: 2, md: 2 } }}>
          الطلبات الخاصة بالعميل
        </Typography>

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <ClientRequestListHead headLabel={TABLE_HEAD} />
                <TableBody>
                  {clientRequestList
                    .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                    .map((request) => {
                      const { requestId, subject, status, type, standard } = request;

                      return (
                        <TableRow hover tabIndex={-1} key={requestId}>
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

                          <TableCell align="left">{status}</TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>

                {isRequestEmpty && <ClientRequestListEmpty />}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={filteredRequests.length}
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
