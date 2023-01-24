import * as Yup from 'yup';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import closeFill from '@iconify/icons-eva/close-fill';
// material
import { Stack, TextField, Alert, InputAdornment, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
//
import { MIconButton } from '../../@material-extend';

// ----------------------------------------------------------------------

type InitialValues = {
  userId: string;
  firstName: string;
  lastName: string;
  phone: string;
  address: string;
  company: string;
  afterSubmit?: string;
};

export default function ProfileCompleteForm() {
  const { completeProfile, user } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'قصير جدا!').max(50, 'طويل جدا').required('الاسم مطلوب'),
    lastName: Yup.string().min(2, 'قصير جدا!').max(50, 'طويل جدا!').required('الاسم مطلوب'),
    phone: Yup.string()
      .required('رقم الهاتف مطلوب')
      .test('inValidPhone', 'رقم الهاتف غير صحيح ', (value: any) => /^(5)(\d{8})$/.test(value)),
    address: Yup.string().required('العنوان مطلوب'),
    company: Yup.string().required('اسم الشركة مطلوب')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      userId: user?.id as string,
      firstName: user?.firstName || '',
      lastName: user?.lastName || '',
      phone: '',
      address: '',
      company: ''
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await completeProfile({
          userId: values.userId,
          firstName: values.firstName,
          lastName: values.lastName,
          phone: values.phone,
          address: values.address,
          company: values.company
        });

        enqueueSnackbar('تم اكمال الملف الشخصى بنجاح', {
          variant: 'success',
          action: (key) => (
            <MIconButton size="small" onClick={() => closeSnackbar(key)}>
              <Icon icon={closeFill} />
            </MIconButton>
          )
        });
        if (isMountedRef.current) {
          setSubmitting(false);
        }
      } catch (error) {
        console.error(error);
        if (isMountedRef.current) {
          setErrors({ afterSubmit: error.error });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              disabled
              label="الاسم الاول"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              disabled
              label="اسم العائلة"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            label="اسم الشركة"
            {...getFieldProps('company')}
            error={Boolean(touched.company && errors.company)}
            helperText={touched.company && errors.company}
          />

          <TextField
            fullWidth
            label="رقم الهاتف"
            type="string"
            {...getFieldProps('phone')}
            value={formik?.values?.phone}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ direction: 'rtl' }}>+966</Typography>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.phone && errors.phone)}
            helperText={touched.phone && errors.phone}
          />

          <TextField
            fullWidth
            label="العنوان"
            {...getFieldProps('address')}
            error={Boolean(touched.address && errors.address)}
            helperText={touched.address && errors.address}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            حفظ البيانات
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
