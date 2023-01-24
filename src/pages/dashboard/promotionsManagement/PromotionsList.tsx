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
import { getPromotionsList, setDeletePromotion } from 'redux/slices/promotions';
import { Promotion } from './../../../../src/@types/promotions';
import useTable from 'hooks/useTable';
import moment from 'moment';
import Label from 'components/Label';
import { colorizeLawyerStatus } from 'utils/functions';
import PromotionMoreMenu from 'components/_dashboard/promotion/list/PromotionMoreMenu';
import { useSnackbar } from 'notistack';
import DeletePromotionModal from './DeletePromotionModal';

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'codeName', label: 'الاسم', alignRight: false },
  { id: 'diemailscount', label: 'نسبة الخصم', alignRight: false },
  { id: 'limit', label: 'الحد الأقصى لكود الخصم', alignRight: false },
  { id: 'limitRemaining', label: 'الباقي من الحد الأقصى لكود الخصم', alignRight: false },
  { id: 'status', label: 'الحالة', alignRight: false },
  { id: 'createdDate', label: 'تاريخ الإنشاء', alignRight: false },
  { id: '', label: '', alignRight: false }
];

export default function PromotionsList() {
  const { themeStretch } = useSettings();
  const theme = useTheme();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { promotionsList, isLoading, deletePromotionStatus } = useSelector(
    (state: RootState) => state.promotions
  );
  const { page, changePage } = useTable();
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedPromotion, setSelectedPromotion] = useState<{
    name: string;
    id: string | number;
  }>({
    name: '',
    id: ''
  });

  const sendRequest = () => {
    dispatch(
      getPromotionsList({
        page: page + 1,
        size: rowsPerPage
      })
    );
  };
  useEffect(() => {
    if (deletePromotionStatus?.status === 'success') {
      sendRequest();
      enqueueSnackbar('تم حذف الباقة بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setDeletePromotion({}));
        }
      });
    } else if (deletePromotionStatus?.status === 'error') {
      deletePromotionStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setDeletePromotion({}));
          }
        });
      });
    }
  }, [deletePromotionStatus, enqueueSnackbar, dispatch]);
  const changeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    changePage(0);
  };
  useEffect(() => {
    sendRequest();
  }, [dispatch, page, rowsPerPage]);

  const isRequestEmpty = !isLoading && promotionsList?.promotionCodesListDto?.length === 0;

  return (
    <Page title={`أكواد الخصم   | Shwra`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'أكواد الخصم'}
          links={[{ name: 'الرئيسية', href: PATH_DASHBOARD.root }, { name: ' أكواد الخصم' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              component={RouterLink}
              to={`${PATH_DASHBOARD.promotions.add}`}
            >
              إضافة كود خصم جديد
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead headLabel={TABLE_HEAD} />
                {isLoading && promotionsList?.promotionCodesListDto?.length === 0 ? (
                  <LoadingTable />
                ) : (
                  <TableBody>
                    {promotionsList &&
                      promotionsList?.promotionCodesListDto?.map((promotion: Promotion, index) => {
                        const {
                          codeId,
                          codeName,
                          discount,
                          limit,
                          limitRemaining,
                          status,
                          createdDate
                        } = promotion;

                        return (
                          <TableRow hover key={codeId} role="checkbox">
                            <TableCell align="left">{page * rowsPerPage + index + 1}</TableCell>

                            <TableCell align="left">{codeName || '-'}</TableCell>

                            <TableCell align="left">{discount}</TableCell>

                            <TableCell align="left">{limit}</TableCell>
                            <TableCell align="left">{limitRemaining}</TableCell>
                            <TableCell align="left">
                              <Label
                                variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                                color={colorizeLawyerStatus(status ? 0 : 1)}
                              >
                                {status ? 'نشط' : 'غير نشط'}
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
                              <PromotionMoreMenu
                                onDelete={() => {
                                  setOpenDeleteModal(true);
                                  setSelectedPromotion({
                                    name: codeName,
                                    id: codeId
                                  });
                                }}
                                promotionId={codeId}
                              />
                            </TableCell>
                          </TableRow>
                        );
                      })}
                  </TableBody>
                )}
                {isRequestEmpty && <EmptyTable message="لا يوجد أكواد خصم فى الوقت الحالى" />}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={promotionsList.count}
            rowsPerPage={rowsPerPage}
            page={page}
            onPageChange={(e, page) => changePage(page)}
            onRowsPerPageChange={changeRowsPerPage}
          />
        </Card>
      </Container>
      <DeletePromotionModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        data={selectedPromotion}
      />
    </Page>
  );
}
