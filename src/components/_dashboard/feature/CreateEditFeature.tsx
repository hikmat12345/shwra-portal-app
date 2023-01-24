import * as Yup from 'yup';
import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Box, Card, FormControlLabel, Grid, Stack, Switch, TextField } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addFeature,
  getFeatureDetails,
  setAddFeature,
  setFeatureDetails,
  setEditFeature,
  editfeature
} from 'redux/slices/features';

type CreateEditFeatureProps = {
  isEdit: boolean;
  featureId: string;
};

export default function CreateEditFeature({ isEdit, featureId }: CreateEditFeatureProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { addFeatureStatus, editFeatureStatus, featureDetails } = useSelector(
    (state: RootState) => state.features
  );
  const userdata = useSelector((state: RootState) => state.user?.myProfile);

  const [isSubmitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (featureId) {
      dispatch(getFeatureDetails(featureId));
    }
    return () => {
      setFeatureDetails({});
    };
  }, [dispatch, featureId]);
  useEffect(() => {
    if (addFeatureStatus?.status === 'success' || editFeatureStatus?.status === 'success') {
      setSubmitting(false);
      enqueueSnackbar(isEdit ? 'تم تعديل الميزة بنجاح' : 'تم إنشاء الميزة بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setAddFeature({}));
          dispatch(setEditFeature({}));
        }
      });

      navigate(PATH_DASHBOARD.features.list);
    } else if (addFeatureStatus?.status === 'error') {
      setSubmitting(false);
      Object.values(addFeatureStatus?.error?.errors)?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setAddFeature({}));
          }
        });
      });
    } else if (editFeatureStatus?.status === 'error') {
      setSubmitting(false);
      editFeatureStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setEditFeature({}));
          }
        });
      });
    }
  }, [editFeatureStatus, addFeatureStatus, enqueueSnackbar, dispatch, navigate, isEdit]);
  const NewUserSchema = Yup.object().shape({
    detail: Yup.string().required('معلومات الميزة مطلوبة'),
    detailArabic: Yup.string().required('معلومات الميزة بالعربية مطلوبة')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      detail: featureDetails?.detail || '',
      detailArabic: featureDetails?.detailArabic || '',
      isActive: typeof featureDetails?.isActive === 'undefined' ? false : featureDetails?.isActive
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        if (isEdit) {
          dispatch(editfeature({ featureId: featureId, ...values, lastModifiedBy: userdata?.id }));
        } else {
          dispatch(addFeature({ ...values, createdBy: userdata?.id }));
        }

        resetForm();
        setSubmitting(true);
      } catch (error: any) {
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps } = formik;

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
                  label="الميزة"
                  {...getFieldProps('detail')}
                  error={Boolean(touched.detail && errors.detail)}
                  helperText={touched.detail && errors.detail}
                />
              </Stack>
              <Stack
                sx={{ mb: 2 }}
                direction={{ xs: 'column', sm: 'column' }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  fullWidth
                  label="الميزة بالعربية"
                  {...getFieldProps('detailArabic')}
                  error={Boolean(touched.detailArabic && errors.detailArabic)}
                  helperText={touched.detailArabic && errors.detailArabic}
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
                        setFieldValue('isActive', event.target.checked);
                      }}
                      checked={values.isActive}
                    />
                  }
                  label="نشط"
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!isEdit ? 'إنشاء ميزة' : 'حفظ التعديلات'}
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
