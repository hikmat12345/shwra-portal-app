import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
// material
import { Stack, Card, TextField, InputAdornment, IconButton } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// utils
import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import { resetPassword, setResetPassword } from 'redux/slices/user';
import useAuth from 'hooks/useAuth';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';
import { useEffect, useState } from 'react';
import { Icon } from '@iconify/react';

// ----------------------------------------------------------------------

export default function AccountChangePassword() {
  const dispatch = useDispatch();
  const { user } = useAuth();

  const { enqueueSnackbar, closeSnackbar } = useSnackbar();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { resetPasswordStatus, error } = useSelector((state: RootState) => state.user);
  const ChangePassWordSchema = Yup.object().shape({
    newPassword: Yup.string()
      .min(6, 'كلمة المرور يجب ان تحتوي على الأقل 6 احرف')
      .required('كلمة المرور الجديدة مطلوبة'),
    confirmNewPassword: Yup.string().oneOf(
      [Yup.ref('newPassword'), null],
      'يجب ان تتطابق كلمة المرور'
    )
  });

  const formik = useFormik({
    initialValues: {
      newPassword: '',
      confirmNewPassword: ''
    },
    validationSchema: ChangePassWordSchema,
    onSubmit: async (values,{ setErrors, setSubmitting }) => {
      try {
      setIsSubmitting(true)
      let bodyFormData = new FormData();
      bodyFormData.append('Token', user?.token);
      bodyFormData.append('Email', user?.email);
      bodyFormData.append('NewPassword', values?.newPassword);
      bodyFormData.append('ConfirmPassword', values?.confirmNewPassword);
      dispatch(resetPassword(bodyFormData));
    }
    catch (error: any) {
      setErrors(error);
    }
  }
  });
  useEffect(() => {
    if (resetPasswordStatus && resetPasswordStatus?.success === false) {
      setIsSubmitting(false);
      resetPasswordStatus?.errors?.map((item: any) =>
        enqueueSnackbar(item, {
          variant: 'error',
          onClose: () => {
            dispatch(setResetPassword(''));
            closeSnackbar();
          }
        })
      );
    } else if (resetPasswordStatus && resetPasswordStatus?.success) {
      setIsSubmitting(false);
      enqueueSnackbar('تم تغيير كلمة المرور بنجاح ', {
        variant: 'success',
        onClose: () => {
          dispatch(setResetPassword(''));
          closeSnackbar();
        }
      });
    }
  }, [dispatch, resetPasswordStatus, error, enqueueSnackbar, closeSnackbar]);
  const { errors, touched, handleSubmit, getFieldProps } = formik;

  return (
    <Card sx={{ p: 3 }}>
      <FormikProvider value={formik}>
        <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
          <Stack spacing={3} alignItems="flex-end">
          
            <TextField
              {...getFieldProps('newPassword')}
              fullWidth
              autoComplete="on"
              type={showNewPassword ? 'text' : 'password'}
              label="كلمة المرور الجديدة"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowNewPassword((prev) => !prev)}>
                      <Icon icon={showNewPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.newPassword && errors.newPassword)}
              helperText={
                (touched.newPassword && errors.newPassword) ||
                'كلمة المرور يجب ان تحتوي على الأقل 6 احرف'
              }
            />

            <TextField
              {...getFieldProps('confirmNewPassword')}
              fullWidth
              autoComplete="on"
              type={showConfirmPassword ? 'text' : 'password'}
              label="تأكيد كلمة المرور الجديدة"
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" onClick={() => setShowConfirmPassword((prev) => !prev)}>
                      <Icon icon={showConfirmPassword ? eyeFill : eyeOffFill} />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              error={Boolean(touched.confirmNewPassword && errors.confirmNewPassword)}
              helperText={touched.confirmNewPassword && errors.confirmNewPassword}
            />

            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              حفظ التعديلات
            </LoadingButton>
          </Stack>
        </Form>
      </FormikProvider>
    </Card>
  );
}
