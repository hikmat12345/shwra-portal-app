/* eslint-disable react-hooks/exhaustive-deps */
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import { LoadingButton } from '@mui/lab';
import {
  Autocomplete,
  Box,
  Card,
  Checkbox,
  FormControlLabel,
  Grid,
  Stack,
  Switch,
  TextField
} from '@mui/material';
import { Feature, FeaturesList } from './../../../../src/@types/features';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getFeaturesList } from 'redux/slices/features';
import {
  addPackage,
  editpackage,
  getPackageDetails,
  setAddPackage,
  setEditPackage,
  setPackageDetails
} from 'redux/slices/packages';
import { RootState } from 'redux/store';
import * as Yup from 'yup';
import { PATH_DASHBOARD } from '../../../routes/paths';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
type CreateEditPackageProps = {
  isEdit: boolean;
  packageId: string;
};

export default function CreateEditPackage({ isEdit, packageId }: CreateEditPackageProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { addPackageStatus, editPackageStatus, packageDetails } = useSelector(
    (state: RootState) => state.packages
  );

  const packageFeaturesList: FeaturesList = useSelector(
    (state: RootState) => state.features?.featuresList
  );
  const userdata = useSelector((state: RootState) => state.user?.myProfile);
  const [isSubmitting, setSubmitting] = useState(false);
  const [featuresList, setFeaturesList] = useState<FeaturesList>({
    data: [],
    totalCount: 0,
    size: 0,
    page: 0
  });
  useEffect(() => {
    if (packageId) {
      dispatch(getPackageDetails(packageId));
    }
  }, [dispatch, packageId]);
  useEffect(() => {
    return () => {
      setPackageDetails({});
    };
  }, []);
  useEffect(() => {
    if (packageFeaturesList?.data?.length > 0) {
      setFeaturesList({
        ...packageFeaturesList,
        data: packageFeaturesList?.data?.filter((data: any) => data?.isActive)
      });
    }
  }, [packageFeaturesList]);
  useEffect(() => {
    if (addPackageStatus?.status === 'success' || editPackageStatus?.status === 'success') {
      setSubmitting(false);
      enqueueSnackbar(isEdit ? 'تم تعديل الباقة بنجاح' : 'تم إنشاء الباقة بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setAddPackage({}));
          dispatch(setEditPackage({}));
        }
      });

      navigate(PATH_DASHBOARD.packages.list);
    } else if (addPackageStatus?.status === 'error') {
      setSubmitting(false);
      Object.values(addPackageStatus?.error?.errors)?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setAddPackage({}));
          }
        });
      });
    } else if (editPackageStatus?.status === 'error') {
      setSubmitting(false);
      Object.values(editPackageStatus?.error?.errors)?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setEditPackage({}));
          }
        });
      });
    }
  }, [editPackageStatus, addPackageStatus, enqueueSnackbar, dispatch, navigate, isEdit]);
  const NewUserSchema = Yup.object().shape({
    name: Yup.string().required(' الاسم مطلوب'),
    name_Arabic: Yup.string().required('الاسم بالعربية مطلوب'),
    description: Yup.string().required('الوصف مطلوب'),
    description_Arabic: Yup.string().required('الوصف بالعربية مطلوب'),
    amount: Yup.string().required('المقدار مطلوب')
  });
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: packageDetails?.name || '',
      name_Arabic: packageDetails?.name_Arabic || '',
      description: packageDetails?.description || '',
      description_Arabic: packageDetails?.description_Arabic || '',
      isActive: typeof packageDetails?.isActive === 'undefined' ? false : packageDetails?.isActive,
      isFollowUp: packageDetails?.isFollowUp,
      followUpTimeDuration: packageDetails?.followUpTimeDuration || 0,
      amount: packageDetails?.amount || 0,
      packageFeatures:
        packageDetails?.packageFeature?.filter((feature: Feature) => feature.isActive) || [],
      isTamara: typeof packageDetails?.isTamara === 'undefined' ? false : packageDetails?.isTamara
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        const featureArr = featuresList.data
          .filter((feature) => feature.isActive)
          .reduce(
            (acc, curr) => [
              ...acc,
              {
                featureId: curr.featureId,
                isActive:
                  curr.featureId ===
                  values?.packageFeatures?.find((val: Feature) => val.featureId === curr.featureId)
                    ?.featureId
              }
            ],
            [] as any[]
          );
        if (isEdit) {
          dispatch(
            editpackage({
              id: packageId,
              lastModifiedBy: userdata?.id,
              ...values,
              packageFeatures: featureArr
            })
          );
        } else {
          dispatch(addPackage({ ...values, packageFeatures: featureArr }));
        }

        resetForm();
        setSubmitting(true);
      } catch (error: any) {
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;
  useEffect(() => {
    if (featuresList?.data && isEdit) {
      if (packageDetails?.packageFeature?.length > 0 && featuresList?.data?.length > 0) {
        let data = featuresList?.data?.filter(
          (data, i) => data?.featureId === packageDetails?.packageFeature[i]?.featureId
        );
        formik.setFieldValue('packageFeatures', data);
      }
    }
  }, [packageDetails]);
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {' '}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3 }}>
              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 3, sm: 2 }}
                sx={{ mb: 2 }}
              >
                <TextField
                  fullWidth
                  label="الإسم"
                  {...getFieldProps('name')}
                  error={Boolean(touched.name && errors.name)}
                  helperText={touched.name && errors.name}
                />
                <TextField
                  fullWidth
                  label="الإسم بالعربية"
                  {...getFieldProps('name_Arabic')}
                  error={Boolean(touched.name_Arabic && errors.name_Arabic)}
                  helperText={touched.name_Arabic && errors.name_Arabic}
                />
              </Stack>
              <Stack
                sx={{ mb: 2 }}
                direction={{ xs: 'column', sm: 'column' }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="الوصف"
                  {...getFieldProps('description')}
                  error={Boolean(touched.description && errors.description)}
                  helperText={touched.description && errors.description}
                />
                <TextField
                  multiline
                  rows={4}
                  fullWidth
                  label="الوصف بالعربية"
                  {...getFieldProps('description_Arabic')}
                  error={Boolean(touched.description_Arabic && errors.description_Arabic)}
                  helperText={touched.description_Arabic && errors.description_Arabic}
                />
              </Stack>
              <Stack
                sx={{ mb: 2 }}
                direction={{ xs: 'column', sm: 'column' }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  label="المقدار"
                  type="number"
                  {...getFieldProps('amount')}
                  error={Boolean(touched.amount && errors.amount)}
                  helperText={touched.amount && errors.amount}
                />
              </Stack>
              <Stack
                sx={{ mb: 2 }}
                direction={{ xs: 'column', sm: 'column' }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <Autocomplete
                  multiple
                  fullWidth
                  id="checkboxes-tags-demo"
                  options={featuresList?.data}
                  onOpen={() => {
                    if (featuresList?.data?.length === 0) {
                      dispatch(getFeaturesList());
                    }
                  }}
                  value={formik.values?.packageFeatures}
                  onChange={(e, val) => {
                    setFieldValue('packageFeatures', val);
                  }}
                  disableCloseOnSelect
                  getOptionLabel={(option) => option.detailArabic}
                  renderOption={(props, option, { selected }) => {
                    return (
                      <li {...props}>
                        <Checkbox
                          icon={icon}
                          checkedIcon={checkedIcon}
                          style={{ marginRight: 8 }}
                          checked={selected}
                        />
                        {option.detailArabic}
                      </li>
                    );
                  }}
                  renderInput={(params) => (
                    <TextField {...params} label="إضافة ميزات" placeholder="إضافة ميزة" />
                  )}
                />
              </Stack>
              <Stack
                sx={{ mb: 2, alignItems: 'center', justifyContent: 'flex-between' }}
                direction={{ xs: 'row', sm: 'row' }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(event) => {
                        setFieldValue('isFollowUp', event.target.checked);
                      }}
                      checked={values.isFollowUp}
                    />
                  }
                  label="متابعة"
                />
                <TextField
                  sx={{ mx: 0, width: '100%' }}
                  label="وقت المتابعة"
                  type="number"
                  {...getFieldProps('followUpTimeDuration')}
                  error={Boolean(touched.followUpTimeDuration && errors.followUpTimeDuration)}
                  helperText={touched.followUpTimeDuration && errors.followUpTimeDuration}
                />
              </Stack>{' '}
              <Stack
                sx={{ mb: 2, alignItems: 'center', justifyContent: 'flex-between' }}
                direction={{ xs: 'row', sm: 'row' }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <FormControlLabel
                  control={
                    <Switch
                      onChange={(event) => {
                        setFieldValue('isActive', event.target.checked);
                      }}
                      checked={values.isActive}
                    />
                  }
                  label="نشط"
                />

                <FormControlLabel
                  control={
                    <Switch
                      onChange={(event) => {
                        setFieldValue('isTamara', event.target.checked);
                      }}
                      checked={values.isTamara}
                    />
                  }
                  label="الدفع بواسطة تمارا"
                  sx={{ mx: 0, width: '50%' }}
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!isEdit ? 'إنشاء باقة' : 'حفظ التعديلات'}
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
