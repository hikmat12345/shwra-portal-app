/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { styled } from '@mui/material/styles';
import { useTheme } from '@mui/material/styles';
import {
  Card,
  Table,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  TableContainer,
  TablePagination
} from '@mui/material';
import { Icon } from '@iconify/react';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingTable from '../../../components/LoadingTable';
import EmptyTable from '../../../components/EmptyTable';
import { RequestListHead } from '../../../components/_dashboard/request/list';
import { getComplaintsList, setDeleteComplaint } from 'redux/slices/complaints';
import { Complaint } from './../../../../src/@types/complaints';
import useTable from 'hooks/useTable';
import moment from 'moment';
import Label from 'components/Label';
import { colorizeLawyerStatus } from 'utils/functions';
import ComplaintsMoreMenu from 'components/_dashboard/complaints/list/ComplaintsMoreMenu';
import DeleteComplaintModal from './DeleteComplaintModal';
import { useSnackbar } from 'notistack';
const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'name', label: 'الاسم', alignRight: false },
  { id: 'email', label: 'البريد الإلكتروني', alignRight: false },
  { id: 'phoneNumber', label: 'رقم الهاتف', alignRight: false },
  { id: 'detail', label: 'التفاصيل', alignRight: false },
  { id: 'type', label: 'النوع', alignRight: false },
  { id: 'createdDate', label: 'تاريخ الإنشاء', alignRight: false },
  { id: '', label: '', alignRight: false }
];

export default function ComplaintsList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();

  const { complaintsList, isLoading, deleteComplaintStatus } = useSelector(
    (state: RootState) => state.complaints
  );
  const { page, changePage } = useTable();
  const { enqueueSnackbar } = useSnackbar();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedComplaint, setSelectedComplaint] = useState<{
    name: string;
    id: string | number;
  }>({
    name: '',
    id: ''
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const sendRequest = () => {
    dispatch(
      getComplaintsList({
        page: page + 1,
        size: rowsPerPage
      })
    );
  };

  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    changePage(0);
  };
  useEffect(() => {
    sendRequest();
  }, [dispatch, page, rowsPerPage]);
  useEffect(() => {
    if (deleteComplaintStatus?.status === 'success') {
      sendRequest();
      enqueueSnackbar('تم حذف الرسالة بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setDeleteComplaint({}));
        }
      });
    } else if (deleteComplaintStatus?.status === 'error') {
      sendRequest();
      deleteComplaintStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setDeleteComplaint({}));
          }
        });
      });
    }
  }, [deleteComplaintStatus, enqueueSnackbar, dispatch]);
  const isRequestEmpty = !isLoading && complaintsList?.result?.data?.length === 0;

  return (
    <Page title={`الشكاوى و المقترحات   | Shwra`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'الشكاوى و المقترحات'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: ' الشكاوى و المقترحات' }
          ]}
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead headLabel={TABLE_HEAD} />
                {isLoading && complaintsList?.result?.data?.length === 0 ? (
                  <LoadingTable />
                ) : (
                  <TableBody>
                    {complaintsList &&
                      complaintsList?.result?.data?.map((complaint: Complaint, index) => {
                        const {
                          detail,
                          name,
                          email,
                          phoneNumber,
                          type,
                          updatedDate,
                          webMessageId,
                          createdDate
                        } = complaint;

                        return (
                          <TableRow hover key={webMessageId} role="checkbox">
                            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                            <TableCell align="left">
                              <TableLink
                                to={`${PATH_DASHBOARD.complaints.root}/${webMessageId}/details`}
                              >
                                {name || '-'}
                              </TableLink>
                            </TableCell>

                            <TableCell align="left">{detail}</TableCell>

                            <TableCell align="left">{email}</TableCell>
                            <TableCell align="left">{phoneNumber}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={colorizeLawyerStatus(type === 'complaint' ? 0 : 1)}
                              >
                                {type === 'complaint' ? 'شكوى' : 'مقترح'}
                              </Label>
                            </TableCell>
                            <TableCell align="left" dir="ltr">
                              {createdDate
                                ? moment(createdDate).locale('en').format('DD-MM-YYYY')
                                : '-'}{' '}
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
                              <ComplaintsMoreMenu
                                onDelete={() => {
                                  setOpenDeleteModal(true);
                                  setSelectedComplaint({
                                    name: name,
                                    id: webMessageId
                                  });
                                }}
                                messageId={webMessageId}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                )}
                {isRequestEmpty && <EmptyTable message="لا يوجد رسائل فى الوقت الحالى" />}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={complaintsList?.result?.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => changePage(page)}
            onRowsPerPageChange={changeRowsPerPage}
          />
        </Card>
      </Container>
      <DeleteComplaintModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        data={selectedComplaint}
      />
    </Page>
  );
}
