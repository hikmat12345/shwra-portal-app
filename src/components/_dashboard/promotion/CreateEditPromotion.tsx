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
  FormLabel
} from '@mui/material';
import { fData } from '../../../utils/formatNumber';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { UploadAvatar } from '../../upload';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addPromotion,
  editpromotion,
  getPromotionDetails,
  setAddPromotion,
  setPromotionDetails,
  setEditPromotion
} from 'redux/slices/promotions';

type CreateEditPromotionProps = {
  isEdit: boolean;
  promotionId: string;
};

export default function CreateEditPromotion({ isEdit, promotionId }: CreateEditPromotionProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { addPromotionStatus, editPromotionStatus, promotionDetails } = useSelector(
    (state: RootState) => state.promotions
  );
  const [isSubmitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (promotionId) {
      dispatch(getPromotionDetails(promotionId));
    }
    return () => {
      setPromotionDetails({});
    };
  }, [dispatch, promotionId]);
  useEffect(() => {
    if (addPromotionStatus?.status === 'success' || editPromotionStatus?.status === 'success') {
      setSubmitting(false);
      enqueueSnackbar(isEdit ? 'تم تعديل كود الخصم بنجاح' : 'تم إنشاء كود الخصم بنجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setAddPromotion({}));
          dispatch(setEditPromotion({}));
        }
      });

      navigate(PATH_DASHBOARD.promotions.list);
    } else if (addPromotionStatus?.status === 'error') {
      setSubmitting(false);
      Object.values(addPromotionStatus?.error?.errors)?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setAddPromotion({}));
          }
        });
      });
    } else if (editPromotionStatus?.status === 'error') {
      setSubmitting(false);
      editPromotionStatus?.error?.errors?.map((error: any) => {
        return enqueueSnackbar(error, {
          variant: 'error',
          onClose: () => {
            dispatch(setEditPromotion({}));
          }
        });
      });
    }
  }, [editPromotionStatus, addPromotionStatus, enqueueSnackbar, dispatch, navigate, isEdit]);
  const NewUserSchema = Yup.object().shape({
    CodeName: Yup.string().required(' الاسم مطلوب'),
    Discount: Yup.string().required('نسبة الخصم مطلوبة'),
    limit: Yup.string().required('الحد مطلوب')
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      CodeName: promotionDetails?.codeName || '',
      Discount: promotionDetails?.discount || '',
      limit: promotionDetails?.limit || ''
    },
    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append('CodeName', values?.CodeName || '');
        // @ts-ignore 
        bodyFormData.append('limit', values?.limit || '');
        // @ts-ignore 
        bodyFormData.append('Discount', values?.Discount || '');
        if (isEdit) {
          // dispatch(editpromotion(bodyFormData));
        } else {
          dispatch(addPromotion(bodyFormData));
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
                  label="اسم الكود"
                  {...getFieldProps('CodeName')}
                  error={Boolean(touched.CodeName && errors.CodeName)}
                  helperText={touched.CodeName && errors.CodeName}
                />
              </Stack>
              <Stack
                sx={{ mb: 2 }}
                direction={{ xs: 'column', sm: 'column' }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  type="number"
                  label="نسبة الخصم"
                  {...getFieldProps('Discount')}
                  error={Boolean(touched.Discount && errors.Discount)}
                  helperText={touched.Discount && errors.Discount}
                />
              </Stack>

              <Stack
                sx={{ mb: 2 }}
                direction={{ xs: 'column', sm: 'column' }}
                spacing={{ xs: 3, sm: 2 }}
              >
                <TextField
                  label="الحد الأقصى للكود"
                  type="number"
                  {...getFieldProps('limit')}
                  error={Boolean(touched.limit && errors.limit)}
                  helperText={touched.limit && errors.limit}
                />
              </Stack>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!isEdit ? 'إنشاء كود الخصم' : 'حفظ التعديلات'}
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
