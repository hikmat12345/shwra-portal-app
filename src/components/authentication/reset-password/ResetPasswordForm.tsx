import * as Yup from 'yup';
// formik
import { Form, FormikProvider, useFormik } from 'formik';
// react router
import { useSearchParams, Navigate, useLocation } from 'react-router-dom';
// material
import { TextField, Alert, Stack } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useAuth from '../../../hooks/useAuth';
import useIsMountedRef from '../../../hooks/useIsMountedRef';
// paths
import { PATH_AUTH } from '../../../routes/paths';
import { useParams } from 'react-router';
import { useSnackbar } from 'notistack';

// ----------------------------------------------------------------------

type InitialValues = {
  token: string;
  email: string;
  password: string;
  passwordConfirmation: string;
  afterSubmit?: string;
};

export default function ChangePassword() {
  const { resetPassword } = useAuth();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();

  // get token from url
  const [searchParams] = useSearchParams();
  const ResetPasswordSchema = Yup.object().shape({
    token: Yup.string().required('الايميل مطلوب'),
    email: Yup.string().email('يجب ادخال بريد اليكترونى صالح').required('الايميل مطلوب'),
    password: Yup.string()
      .required('Password is required')
      .required('برجاء ادخال كلمة المرور')
      .min(8, 'يجب ان تكون كلمة المرور اكثر من 8 حروف')
      .matches(RegExp('(.*[a-z].*)'), 'يجب ان تحتوي على حرف صغير')
      .matches(RegExp('(.*[A-Z].*)'), 'يجب ان تحتوي على حرف كبير')
      .matches(RegExp('(.*\\d.*)'), 'يجب ان تحتوي على رقم')
      .matches(RegExp('[!@#$%^&*(),.?":{}|<>]'), 'يجب ان تحتوي على حرف خاص'),

    passwordConfirmation: Yup.string()
      .required('Password confirmation is required')
      .oneOf([Yup.ref('password'), null], 'Passwords must match')
  });
  const formik = useFormik<InitialValues>({
    initialValues: {
      token: `${window.location.search.split('token=')[1].split('&')[0]}` || '',
      email: searchParams.get('email') || '',
      password: '',
      passwordConfirmation: ''
    },
    validationSchema: ResetPasswordSchema,
    onSubmit: async (values, { setErrors, setSubmitting }) => {
      try {
        await resetPassword(
          values.token,
          values.password,
          values.passwordConfirmation,
          values.email
        );

        if (isMountedRef.current) {
          setSubmitting(false);
        }
        enqueueSnackbar('تم إعاده تعيين كلمة المرور بنجاح', {
          variant: 'success',
          onClose: () => {
            formik.resetForm();
          }
        });
      } catch (error) {
        // @ts-ignore
        error?.errors?.map((error: any) => {
          return enqueueSnackbar(error, {
            variant: 'error'
          });
        });
        if (isMountedRef.current) {
          // @ts-ignore
          setErrors({ afterSubmit: error.message });
          setSubmitting(false);
        }
      }
    }
  });

  const { errors, touched, isSubmitting, handleSubmit, getFieldProps } = formik;

  if (!searchParams.get('token')) {
    return <Navigate to={PATH_AUTH.login} />;
  }

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Stack spacing={3}>
          {errors.afterSubmit && <Alert severity="error">{errors.afterSubmit}</Alert>}

          <TextField
            fullWidth
            {...getFieldProps('password')}
            type="password"
            label="كلمة المرور"
            error={Boolean(touched.password && errors.password)}
            helperText={touched.password && errors.password}
          />

          <TextField
            fullWidth
            {...getFieldProps('passwordConfirmation')}
            type="password"
            label="تأكيد كلمة المرور"
            error={Boolean(touched.passwordConfirmation && errors.passwordConfirmation)}
            helperText={touched.passwordConfirmation && errors.passwordConfirmation}
          />

          <LoadingButton
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            loading={isSubmitting}
          >
            {'تغيير كلمة المرور'}
          </LoadingButton>
        </Stack>
      </Form>
    </FormikProvider>
  );
}
