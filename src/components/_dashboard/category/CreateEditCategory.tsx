import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Grid,
  Stack,
  Switch,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel,
  FormLabel,
  Autocomplete
} from '@mui/material';
import { fData } from '../../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { UploadAvatar } from '../../upload';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addCategory,
  editcategory,
  getCategoriesList,
  getCategoryDetails,
  setAddCategory,
  setCategoryDetails,
  setEditCategory
} from 'redux/slices/categories';

import { Category } from '../../../@types/categories';

type CreateEditCategoryProps = {
  isEdit: boolean;
  categoryId: string;
};

export default function CreateEditCategory({ isEdit, categoryId }: CreateEditCategoryProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { addCategoryStatus, editCategoryStatus, categoryDetails } = useSelector(
    (state: RootState) => state.categories
  );
  const [isSubmitting, setSubmitting] = useState(false);
  const [icon, setIcon] = useState('');

  const { categoriesList } = useSelector((state: RootState) => state.categories);
  const mainCategoriesList = categoriesList.filter((category) => category.parentId === 0);

  useEffect(() => {
    dispatch(getCategoriesList());
  }, [dispatch]);

  useEffect(() => {
    if (categoryId) {
      dispatch(getCategoryDetails(categoryId));
    }
    return () => {
      setCategoryDetails({});
    };
  }, [dispatch, categoryId]);
  useEffect(() => {
    if (addCategoryStatus?.status === 'success' || editCategoryStatus?.status === 'success') {
      setSubmitting(false);
      enqueueSnackbar(isEdit ? 'تم تعديل التصنيف بنجاح' : 'تم إنشاء التصنيف بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setAddCategory({}));
          dispatch(setEditCategory({}));
        }
      });

      navigate(PATH_DASHBOARD.categories.admin);
    } else if (addCategoryStatus?.status === 'error') {
      setSubmitting(false);
      addCategoryStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setAddCategory({}));
          }
        });
      });
    } else if (editCategoryStatus?.status === 'error') {
      setSubmitting(false);
      editCategoryStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setEditCategory({}));
          }
        });
      });
    }
  }, [editCategoryStatus, addCategoryStatus, enqueueSnackbar, dispatch, navigate, isEdit]);
  const NewUserSchema = Yup.object().shape({
    Name: Yup.string().required(' الاسم مطلوب'),
    ArabicName: Yup.string().required('الاسم بالعربية مطلوب'),
    Description: Yup.string().required('الوصف مطلوب'),
    ArabicDescription: Yup.string().required('الوصف بالعربية مطلوب')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      Name: categoryDetails?.name || '',
      ArabicName: categoryDetails?.arabicName || '',
      Description: categoryDetails?.description || '',
      ArabicDescription: categoryDetails?.arabicDescription || '',
      Icon: categoryDetails?.icon || '',
      IsActive: categoryDetails?.isActive,
      SortOrder: categoryDetails?.sortOrder || 0,
      parentId: categoryDetails?.parentId || 0
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append('MobileRequestCategoryId', categoryId);
        bodyFormData.append('Icon', icon || '');
        bodyFormData.append('Name', values?.Name || '');
        bodyFormData.append('ArabicName', values?.ArabicName || '');
        bodyFormData.append('Description', values?.Description || '');
        bodyFormData.append('ArabicDescription', values.ArabicDescription);
        // @ts-ignore
        bodyFormData.append('IsActive', values?.IsActive);
        // @ts-ignore
        bodyFormData.append('parentId', values?.parentId || 0);
        // @ts-ignore
        bodyFormData.append('SortOrder', values?.SortOrder || 0);
        if (isEdit) {
          dispatch(editcategory(bodyFormData));
        } else {
          dispatch(addCategory(bodyFormData));
        }

        resetForm();
        setSubmitting(true);
      } catch (error: any) {
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setIcon(file);
        setFieldValue('Icon', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ p: 3 }}>
              <FormLabel sx={{ mb: 2, display: 'block', textAlign: 'center' }}>
                صورة التصنيف
              </FormLabel>
              <UploadAvatar
                accept="image/*"
                file={values.Icon ? values.Icon : ''}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.Icon && errors.Icon)}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 2,
                      mx: 'auto',
                      display: 'block',
                      textAlign: 'center',
                      color: 'text.secondary'
                    }}
                  >
                    الصيغ المسموح بها
                    <br />
                    *.jpeg, *.jpg, *.png, *.gif
                    <br /> الحجم الاقصى للصورة {fData(3145728)}
                  </Typography>
                }
              />
              <FormHelperText error sx={{ px: 2, textAlign: 'center' }}>
                {touched.Icon && errors.Icon}
              </FormHelperText>

              <FormControlLabel
                control={
                  <Switch
                    onChange={(event) => {
                      setFieldValue('IsActive', event.target.checked);
                    }}
                    checked={values.IsActive}
                  />
                }
                labelPlacement="start"
                label="نشط"
                sx={{ mt: 5, mx: 0, width: '100%', textAlign: 'center', display: 'block' }}
              />
            </Card>
          </Grid>
          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 3, sm: 2 }}
                sx={{ mb: 2 }}
              >
                <TextField
                  fullWidth
                  label="الإسم"
                  {...getFieldProps('Name')}
                  error={Boolean(touched.Name && errors.Name)}
                  helperText={touched.Name && errors.Name}
                />
                <TextField
                  fullWidth
                  label="الإسم بالعربية"
                  {...getFieldProps('ArabicName')}
                  error={Boolean(touched.ArabicName && errors.ArabicName)}
                  helperText={touched.ArabicName && errors.ArabicName}
                />
              </Stack>
              <Stack direction={{ xs: 'column', sm: 'column' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="الوصف"
                  {...getFieldProps('Description')}
                  error={Boolean(touched.Description && errors.Description)}
                  helperText={touched.Description && errors.Description}
                />
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="الوصف بالعربية"
                  {...getFieldProps('ArabicDescription')}
                  error={Boolean(touched.ArabicDescription && errors.ArabicDescription)}
                  helperText={touched.ArabicDescription && errors.ArabicDescription}
                />

                <Grid container spacing={1}>
                  <Grid item xs={12} sm={4}>
                    <TextField
                      fullWidth
                      type="number"
                      label="الترتيب"
                      {...getFieldProps('SortOrder')}
                      error={Boolean(touched.SortOrder && errors.SortOrder)}
                      helperText={touched.SortOrder && errors.SortOrder}
                    />
                  </Grid>
                  <Grid item xs={12} sm={8}>
                    <Autocomplete
                      fullWidth
                      options={mainCategoriesList}
                      getOptionLabel={(option: any) => option?.arabicName}
                      isOptionEqualToValue={(option, value) =>
                        option.mobileRequestCategoryId === value.mobileRequestCategoryId
                      }
                      value={
                        mainCategoriesList.find(
                          (mainCategory) =>
                            mainCategory.mobileRequestCategoryId === values?.parentId
                        ) || ({ mobileRequestCategoryId: 0, arabicName: '' } as Category)
                      }
                      onChange={(e, val) => setFieldValue('parentId', val?.mobileRequestCategoryId)}
                      renderInput={(params: any) => (
                        <TextField {...params} label="التصنيف الأساسي" />
                      )}
                    />
                  </Grid>
                </Grid>
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!isEdit ? 'إنشاء تصنيف' : 'حفظ التعديلات'}
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
