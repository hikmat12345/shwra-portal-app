/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
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
  TablePagination,
  Button
} from '@mui/material';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingTable from '../../../components/LoadingTable';
import EmptyTable from '../../../components/EmptyTable';
import { RequestListHead } from '../../../components/_dashboard/request/list';
import { getFeaturesList, setDeleteFeature } from 'redux/slices/features';
import { Feature } from './../../../../src/@types/features';
import useTable from 'hooks/useTable';
import moment from 'moment';
import Label from 'components/Label';
import { colorizeLawyerStatus } from 'utils/functions';
import FeatureMoreMenu from 'components/_dashboard/feature/list/FeatureMoreMenu';
import { useSnackbar } from 'notistack';
import DeleteFeatureModal from './DeleteFeatureModal';
const TableLink = styled(RouterLink)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'detailArabic', label: 'الميزة', alignRight: false },
  { id: 'isActive', label: 'الحالة', alignRight: false },
  // { id: 'createdBy', label: 'تم الإنشاء بواسطة', alignRight: false },
  { id: 'createdDate', label: 'تاريخ الإنشاء', alignRight: false },
  // { id: 'lastModifiedBy', label: 'تم التعديل بواسطة', alignRight: false },
  { id: 'lastModifiedDate', label: 'تاريخ آخر تعديل', alignRight: false },
  { id: 'packageFeatures', label: 'ميزات الحزمة', alignRight: false },
  { id: '', label: '', alignRight: false }
];

export default function FeaturesList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { featuresList, isLoading, deleteFeatureStatus } = useSelector(
    (state: RootState) => state.features
  );
  const { page, changePage } = useTable();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState<{
    name: string;
    id: string | number;
  }>({
    name: '',
    id: ''
  });

  const sendRequest = () => {
    dispatch(
      getFeaturesList({
        page: page + 1,
        size: rowsPerPage
      })
    );
  };
  useEffect(() => {
    if (deleteFeatureStatus?.status === 'success') {
      sendRequest();
      enqueueSnackbar('تم حذف الباقة بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setDeleteFeature({}));
        }
      });
    } else if (deleteFeatureStatus?.status === 'error') {
      deleteFeatureStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setDeleteFeature({}));
          }
        });
      });
    }
  }, [deleteFeatureStatus, enqueueSnackbar, dispatch]);
  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    changePage(0);
  };
  useEffect(() => {
    sendRequest();
  }, [dispatch, page, rowsPerPage]);

  const isRequestEmpty = !isLoading && featuresList?.data?.length === 0;

  return (
    <Page title={`ميزات الباقة   | Shwra`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'ميزات الباقة'}
          links={[{ name: 'الرئيسية', href: PATH_DASHBOARD.root }, { name: ' ميزات الباقة' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              component={RouterLink}
              to={`${PATH_DASHBOARD.features.add}`}
            >
              إضافة ميزة جديدة
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead headLabel={TABLE_HEAD} />
                {isLoading && featuresList?.data?.length === 0 ? (
                  <LoadingTable />
                ) : (
                  <TableBody>
                    {featuresList &&
                      featuresList?.data?.map((feature: Feature, index) => {
                        const {
                          featureId,
                          detail,
                          detailArabic,
                          isActive,
                          // createdBy,
                          createdDate,
                          // lastModifiedBy,
                          lastModifiedDate,
                          packageFeatures
                        } = feature;

                        return (
                          <TableRow hover key={featureId} role="checkbox">
                            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>

                            <TableCell align="left">
                              <TableLink
                                to={`${PATH_DASHBOARD.features.root}/${featureId}/details`}
                              >
                                {detailArabic || '-'}
                              </TableLink>
                            </TableCell>

                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={isActive ? 'success' : 'error'}
                              >
                                {isActive ? 'نشط' : 'غير نشط'}
                              </Label>
                            </TableCell>
                            {/* <TableCell align="left">{createdBy || '-'}</TableCell> */}

                            <TableCell align="left" dir="ltr">
                              {createdDate
                                ? moment(createdDate).locale('en').format('DD-MM-YYYY  HH:mm A')
                                : '-'}{' '}
                            </TableCell>
                            {/* <TableCell align="left">{lastModifiedBy || '-'}</TableCell> */}

                            <TableCell align="left" dir="ltr">
                              {lastModifiedDate
                                ? moment(lastModifiedDate)
                                    .locale('en')
                                    .format('DD-MM-YYYY  HH:mm A')
                                : '-'}{' '}
                            </TableCell>
                            <TableCell align="left">{packageFeatures || '-'}</TableCell>

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
                              <FeatureMoreMenu
                                onDelete={() => {
                                  setOpenDeleteModal(true);
                                  setSelectedFeature({
                                    name: detailArabic,
                                    id: featureId
                                  });
                                }}
                                featureId={featureId}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                )}
                {isRequestEmpty && (
                  <EmptyTable message="لا يوجد ميزات مضافة فى الوقت الحالى" />
                )}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={featuresList.totalCount}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => changePage(page)}
            onRowsPerPageChange={changeRowsPerPage}
          />
        </Card>
      </Container>
      <DeleteFeatureModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        data={selectedFeature}
      />
    </Page>
  );
}
