import plusFill from '@iconify/icons-eva/plus-fill';
import { Icon } from '@iconify/react';
import {
  Button,
  Card,
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import PackageMoreMenu from 'components/_dashboard/package/list/PackageMoreMenu';
import moment from 'moment';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { Link, Link as RouterLink } from 'react-router-dom';
import { getPackagesList, setDeletePackage } from 'redux/slices/packages';
import { Package } from '../../../../src/@types/packages';
import EmptyTable from '../../../components/EmptyTable';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Label from '../../../components/Label';
import LoadingTable from '../../../components/LoadingTable';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import { RequestListHead } from '../../../components/_dashboard/request/list';
import useSettings from '../../../hooks/useSettings';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import DeletePackageModal from './DeletePackageModal';

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'name_Arabic', label: 'اسم الباقة', alignRight: false },
  { id: 'description_Arabic', label: 'الوصف', alignRight: false },
  { id: 'isActive', label: 'الحالة', alignRight: false },
  { id: 'isTamara', label: 'يمكن الدفع بواسطة تمارا', alignRight: false },
  { id: 'isFollowUp', label: 'المتابعة', alignRight: false },
  { id: 'followUpTimeDuration', label: 'وقت المتابعة', alignRight: false },
  { id: 'createdDate', label: 'تاريخ الإنشاء', alignRight: false },
  { id: 'amount', label: 'المقدار', alignRight: false },
  { id: '' }
];

export default function PackagesList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading } = useSelector((state: RootState) => state.appointment);
  const { packagesList, deletePackageStatus } = useSelector((state: RootState) => state.packages);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedPackage, setSelectedPackage] = useState<{
    name: string;
    id: string | number;
  }>({
    name: '',
    id: ''
  });
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  useEffect(() => {
    dispatch(getPackagesList());
  }, [dispatch]);
  useEffect(() => {
    if (deletePackageStatus?.status === 'success') {
      enqueueSnackbar('تم حذف الباقة بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setDeletePackage({}));
        }
      });
    } else if (deletePackageStatus?.status === 'error') {
      deletePackageStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setDeletePackage({}));
          }
        });
      });
    }
  }, [deletePackageStatus, enqueueSnackbar, dispatch]);
  const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isRequestEmpty = !isLoading && packagesList && packagesList.length === 0;

  return (
    <Page title={`إدارة الباقات'   | Shwra`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'إدارة الباقات'}
          links={[{ name: 'الرئيسية', href: PATH_DASHBOARD.root }, { name: ' الباقات' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              component={RouterLink}
              to={`${PATH_DASHBOARD.packages.add}`}
            >
              إضافة باقة جديد
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead headLabel={TABLE_HEAD} />

                {isLoading && packagesList?.length === 0 ? (
                  <LoadingTable />
                ) : (
                  <TableBody>
                    {packagesList &&
                      packagesList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((data: Package, index) => {
                          const {
                            id,
                            name_Arabic,
                            description_Arabic,
                            isActive,
                            isFollowUp,
                            followUpTimeDuration,
                            createdDate,
                            amount,
                            isTamara
                          } = data;

                          return (
                            <TableRow hover key={id}>
                              <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>
                              <TableCell align="left">
                                <TableLink to={`${PATH_DASHBOARD.packages.root}/${id}/details`}>
                                  {name_Arabic || '-'}
                                </TableLink>
                              </TableCell>

                              <TableCell align="left">{description_Arabic}</TableCell>

                              <TableCell align="left">
                                <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={isActive ? 'success' : 'error'}
                                >
                                  {isActive ? 'نشط' : 'غير نشط'}
                                </Label>
                              </TableCell>
                              <TableCell align="left">
                                <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={isTamara ? 'success' : 'error'}
                                >
                                  {isTamara ? 'نعم' : 'لا'}
                                </Label>
                              </TableCell>

                              <TableCell align="left">
                                <Label
                                  variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                  color={isFollowUp ? 'success' : 'error'}
                                >
                                  {isFollowUp ? 'نعم' : 'لا'}
                                </Label>
                              </TableCell>
                              <TableCell align="left">{followUpTimeDuration}</TableCell>

                              <TableCell align="left" dir="ltr">
                                {moment(createdDate).locale('en').format('DD-MM-YYYY hh:mm A')}{' '}
                              </TableCell>
                              <TableCell align="left">{amount}</TableCell>

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
                                {id && (
                                  <PackageMoreMenu
                                    onDelete={() => {
                                      setOpenDeleteModal(true);
                                      setSelectedPackage({
                                        name: name_Arabic,
                                        id: id
                                      });
                                    }}
                                    packageId={id}
                                  />
                                )}
                              </TableCell>
                            </TableRow>
                          );
                        })}
                  </TableBody>
                )}
                {isRequestEmpty && <EmptyTable message="لا يوجد باقات فى الوقت الحالى" />}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={packagesList.length}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => setPage(page)}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        </Card>
      </Container>

      {/* <DeletePackageModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        data={selectedPackage}
      /> */}
    </Page>
  );
}
