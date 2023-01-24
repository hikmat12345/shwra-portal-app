import { Link } from 'react-router-dom';
import { useState } from 'react';
import {
  TableCell,
  TableRow,
  IconButton,
  TableBody,
  Table,
  Collapse,
  Divider
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import ArrowDropUpIcon from '@mui/icons-material/ArrowDropUp';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';

import Label from '../../Label';
import { Category } from '../../../@types/categories';
import { PATH_DASHBOARD } from '../../../routes/paths';
import CategoryMoreMenu from './list/CategoryMoreMenu';
import DeleteCategoryModal from '../../../pages/dashboard/categoriesManagement/DeleteCategoryModal';
import { RequestListHead } from '../request/list';

const TableLink = styled(Link)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.primary,
  marginBottom: theme.spacing(1)
}));

type Props = {
  category: Category;
  subCategories?: Category[];
  rowNumber?: number;
};

const TABLE_HEAD = [
  { id: 'number', label: 'رقم', alignRight: false },
  { id: 'arabicName', label: 'اسم التصنبف', alignRight: false },
  { id: 'arabicDescription', label: 'الوصف', alignRight: false },
  { id: 'isActive', label: 'الحالة', alignRight: false },
  { id: 'sortOrder', label: 'الترتيب', alignRight: false },
  { id: '' }
];

function CategoriesListItem(props: Props): JSX.Element {
  const { category, subCategories, rowNumber } = props;
  const { mobileRequestCategoryId, arabicName, arabicDescription, isActive, sortOrder } = category;
  const theme = useTheme();
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<{
    name: string;
    id: string | number;
  }>({
    name: '',
    id: ''
  });
  const [openSubCategory, setOpenSubCategory] = useState(false);
  const handleOpenSubCategory = () => setOpenSubCategory((prev) => !prev);

  return (
    <>
      <TableRow hover key={mobileRequestCategoryId}>
        {rowNumber ? <TableCell align="left">{rowNumber}</TableCell> : null}

        <TableCell align="left">
          <TableLink to={`${PATH_DASHBOARD.categories.admin}/${mobileRequestCategoryId}/details`}>
            {arabicName || '-'}
          </TableLink>
        </TableCell>

        <TableCell align="left">{arabicDescription}</TableCell>

        <TableCell align="left">
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={isActive ? 'success' : 'error'}
          >
            {isActive ? 'نشط' : 'غير نشط'}
          </Label>
        </TableCell>
        <TableCell align="left">{sortOrder}</TableCell>
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
          <CategoryMoreMenu
            onDelete={() => {
              setOpenDeleteModal(true);
              setSelectedCategory({
                name: arabicName,
                id: mobileRequestCategoryId
              });
            }}
            categoryId={mobileRequestCategoryId}
          />
        </TableCell>
        {subCategories?.length ? (
          <TableCell align="right">
            <IconButton onClick={handleOpenSubCategory}>
              {openSubCategory ? <ArrowDropUpIcon /> : <ArrowDropDownIcon />}
            </IconButton>
          </TableCell>
        ) : null}
      </TableRow>
      <TableRow>
        <TableCell
          sx={{ p: 0, paddingLeft: '0px !important', paddingRight: '0px !important' }}
          colSpan={6}
        >
          <Collapse unmountOnExit in={openSubCategory}>
            <Table>
              <RequestListHead headLabel={TABLE_HEAD} />
              <TableBody>
                {subCategories?.map((subCategory, index) => {
                  return (
                    <TableRow hover key={subCategory.mobileRequestCategoryId}>
                      <TableCell align="left">{index + 1}</TableCell>
                      <TableCell align="left">
                        <TableLink
                          to={`${PATH_DASHBOARD.categories.admin}/${subCategory.mobileRequestCategoryId}/details`}
                        >
                          {subCategory.arabicName || '-'}
                        </TableLink>
                      </TableCell>

                      <TableCell align="left">{subCategory.arabicDescription}</TableCell>

                      <TableCell align="left">
                        <Label
                          variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
                          color={isActive ? 'success' : 'error'}
                        >
                          {isActive ? 'نشط' : 'غير نشط'}
                        </Label>
                      </TableCell>
                      <TableCell align="left">{subCategory.sortOrder}</TableCell>
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
                        <CategoryMoreMenu
                          onDelete={() => {
                            setOpenDeleteModal(true);
                            setSelectedCategory({
                              name: subCategory.arabicName,
                              id: subCategory.mobileRequestCategoryId
                            });
                          }}
                          categoryId={subCategory.mobileRequestCategoryId}
                        />
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
            <Divider />
          </Collapse>
        </TableCell>
      </TableRow>

      <DeleteCategoryModal
        open={openDeleteModal}
        setOpen={setOpenDeleteModal}
        category={selectedCategory}
      />
    </>
  );
}
export default CategoriesListItem;
