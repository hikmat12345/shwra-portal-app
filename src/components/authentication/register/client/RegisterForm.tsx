import * as Yup from 'yup';
import { useState } from 'react';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import eyeFill from '@iconify/icons-eva/eye-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {
  Stack,
  TextField,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  Typography,
  FormHelperText
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
import useAuth from '../../../../hooks/useAuth';
import useIsMountedRef from '../../../../hooks/useIsMountedRef';
import { MIconButton } from '../../../@material-extend';
import TermsService from './TermsService';
import PrivacyPolicy from './PrivacyPolicy';
// ----------------------------------------------------------------------

type InitialValues = {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  acceptTerms: boolean;
  afterSubmit?: string;
  PhoneNumber: string;
};

export default function RegisterForm() {
  const { register } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const RegisterSchema = Yup.object().shape({
    firstName: Yup.string().min(2, 'قصير جدا!').max(50, 'طويل جدا!').required('الاسم مطلوب'),
    lastName: Yup.string().min(2, 'قصير جدا').max(50, 'طويل جدا!').required('الاسم مطلوب'),
    email: Yup.string().email('يجب ادخال ايميل صالح').required('الايميل مطلوب'),
    PhoneNumber: Yup.string()
      .required('رقم الهاتف مطلوب')
      .test('inValidPhone', 'رقم الهاتف غير صحيح ', (value: any) => /^(5)(\d{8})$/.test(value)),
    password: Yup.string()
      .required('برجاء ادخال كلمة المرور')
      .min(8, 'يجب ان تكون كلمة المرور اكثر من 8 حروف')
      .matches(RegExp('(.*[a-z].*)'), 'يجب ان تحتوي على حرف صغير')
      .matches(RegExp('(.*[A-Z].*)'), 'يجب ان تحتوي على حرف كبير')
      .matches(RegExp('(.*\\d.*)'), 'يجب ان تحتوي على رقم')
      .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'يجب ان تحتوي على حرف خاص'),
    acceptTerms: Yup.boolean().required().oneOf([true], 'يجب الموافقة على الشروط والأحكام')
  });

  const formik = useFormik<InitialValues>({
    initialValues: {
      firstName: '',
      lastName: '',
      email: '',
      password: '',
      PhoneNumber: '',
      acceptTerms: false
    },
    validationSchema: RegisterSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await register(
          values.email,
          values.password,
          values.PhoneNumber,
          values.firstName,
          values.lastName
        );
        enqueueSnackbar('تم التسجيل بنجاح', {
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
      } catch (error: any) {
        Object.values(error.errors)
          .flat()
          .map((item: any) => enqueueSnackbar(item, { variant: 'error' }));
        if (isMountedRef.current) {
          setErrors({ afterSubmit: `${error.error} برجاء التاكد من البيانات` });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, values, handleSubmit, isSubmitting, getFieldProps } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {/* {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>} */}

          <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
            <TextField
              fullWidth
              label="الاسم الاول"
              {...getFieldProps('firstName')}
              error={Boolean(touched.firstName && errors.firstName)}
              helperText={touched.firstName && errors.firstName}
            />

            <TextField
              fullWidth
              label="اسم العائلة"
              {...getFieldProps('lastName')}
              error={Boolean(touched.lastName && errors.lastName)}
              helperText={touched.lastName && errors.lastName}
            />
          </Stack>

          <TextField
            fullWidth
            autoComplete="username"
            type="email"
            label="البريد الاليكترونى"
            {...getFieldProps('email')}
            error={Boolean(touched.email && errors.email)}
            helperText={touched.email && errors.email}
          />

          <TextField
            fullWidth
            label="رقم الهاتف"
            type="string"
            {...getFieldProps('PhoneNumber')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Typography sx={{ direction: 'rtl' }}>+966</Typography>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.PhoneNumber && errors.PhoneNumber)}
            helperText={touched.PhoneNumber && errors.PhoneNumber}
          />
          <TextField
            fullWidth
            autoComplete="current-password"
            type={showPassword ? 'text' : 'password'}
            label="كلمة المرور"
            {...getFieldProps('password')}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                    <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                  </IconButton>
                </InputAdornment>
              )
            }}
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          {/** term an condation approval */}
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <FormControlLabel
              style={{ marginLeft: '0' }}
              control={<Checkbox {...getFieldProps('acceptTerms')} checked={values.acceptTerms} />}
              label=""
            />

            <Typography
              variant="body2"
              align="center"
              sx={{ color: 'text.secondary', mt: 0.5 }}
              style={{ cursor: 'pointer' }}
            >
              أوافق على شورى &nbsp;
              <TermsService />
              &nbsp;و&nbsp;
              <PrivacyPolicy />.
            </Typography>
          </div>

          <FormHelperText sx={{ color: 'red' }}>
            {' '}
            {touched.acceptTerms && errors.acceptTerms}{' '}
          </FormHelperText>

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            انشاء حساب
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
