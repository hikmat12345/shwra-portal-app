import { useState, useEffect, ChangeEvent } from 'react';
import {
  Card,
  Table,
  TableBody,
  Container,
  TableContainer,
  TablePagination,
  Button
} from '@mui/material';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import { PATH_DASHBOARD } from '../../../routes/paths';
import useSettings from '../../../hooks/useSettings';
import Page from '../../../components/Page';
import plusFill from '@iconify/icons-eva/plus-fill';
import { Link as RouterLink } from 'react-router-dom';
import Scrollbar from '../../../components/Scrollbar';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import LoadingTable from '../../../components/LoadingTable';
import EmptyTable from '../../../components/EmptyTable';
import { RequestListHead } from '../../../components/_dashboard/request/list';
import { getCategoriesList, setDeleteCategory } from 'redux/slices/categories';
import { Category } from '../../../@types/categories';

import CategoriesListItem from '../../../components/_dashboard/category/CategoriesListItem';

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'arabicName', label: 'اسم التصنبف', alignRight: false },
  { id: 'arabicDescription', label: 'الوصف', alignRight: false },
  { id: 'isActive', label: 'الحالة', alignRight: false },
  { id: 'sortOrder', label: 'الترتيب', alignRight: false },
  { id: '' },
  { id: 'subCategory' }
];

export default function CategoriesList() {
  const { themeStretch } = useSettings();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();

  const { isLoading } = useSelector((state: RootState) => state.appointment);
  const { categoriesList, deleteCategoryStatus } = useSelector(
    (state: RootState) => state.categories
  );
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  const mainCategoriesList = categoriesList.filter((category) => category.parentId === 0);

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);
  useEffect(() => {
    if (deleteCategoryStatus?.status === 'success') {
      enqueueSnackbar('تم حذف التصنيف بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setDeleteCategory({}));
        }
      });

      dispatch(getCategoriesList());
    } else if (deleteCategoryStatus?.status === 'error') {
      deleteCategoryStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setDeleteCategory({}));
          }
        });
      });
    }
  }, [deleteCategoryStatus, enqueueSnackbar, dispatch]);
  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const isRequestEmpty = !isLoading && mainCategoriesList && mainCategoriesList.length === 0;

  return (
    <Page title={`إدارة التصنيفات'   | Shwra`}>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'إدارة التصنيفات'}
          links={[{ name: 'الرئيسية', href: PATH_DASHBOARD.root }, { name: ' التصنيفات' }]}
          action={
            <Button
              variant="contained"
              startIcon={<Icon icon={plusFill} width={20} height={20} />}
              component={RouterLink}
              to={`${PATH_DASHBOARD.categories.createNew}`}
            >
              إضافة تصنيف جديد
            </Button>
          }
        />

        <Card>
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }}>
              <Table>
                <RequestListHead headLabel={TABLE_HEAD} />

                {isLoading && mainCategoriesList?.length === 0 ? (
                  <LoadingTable />
                ) : (
                  <TableBody>
                    {mainCategoriesList &&
                      mainCategoriesList
                        .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                        .map((mainCategory: Category, index) => {
                          const subCategories = categoriesList.filter(
                            (category) => category.parentId === mainCategory.mobileRequestCategoryId
                          );
                          return (
                            <CategoriesListItem
                              key={mainCategory.mobileRequestCategoryId}
                              category={mainCategory}
                              subCategories={subCategories}
                              rowNumber={page * rowsPerPage + index + 1}
                            />
                          );
                        })}
                  </TableBody>
                )}
                {isRequestEmpty && <EmptyTable message="لا يوجد تصنيفات فى الوقت الحالى" />}
              </Table>
            </TableContainer>
          </Scrollbar>
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, 50]}
            component="div"
            count={mainCategoriesList.length}
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
