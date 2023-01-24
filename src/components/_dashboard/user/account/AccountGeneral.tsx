import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useCallback, useEffect, useState } from 'react';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import {
  Box,
  Grid,
  Card,
  Stack,
  Switch,
  TextField,
  FormControlLabel,
  Typography,
  FormHelperText,
  Autocomplete,
  InputAdornment
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import { UploadAvatar } from '../../../upload';
// utils
import { fData } from '../../../../utils/formatNumber';
// @types
import { Profile } from '../../../../@types/user';
//
import countries from '../countries';
import { getProfile, setUpdateProfile, updateProfile } from 'redux/slices/user';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from 'redux/store';

// ----------------------------------------------------------------------

interface InitialState extends Omit<Profile, 'password' | 'id' | 'role'> {
  afterSubmit?: string;
}

export default function AccountGeneral() {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const [image, setImage] = useState('');
  const [isSubmitting, setSubmitting] = useState(false);
  const UpdateUserSchema = Yup.object().shape({
    firstName: Yup.string().required('الاسم الأول مطلوب'),
    lastName: Yup.string().required('اسم العائلة مطلوب'),
    phoneNumber: Yup.string()
      .required('رقم الهاتف مطلوب')
      .test('inValidPhone', 'رقم الهاتف غير صحيح ', (value: any) => /^(5)(\d{8})$/.test(value))
  });
  const { updateProfileStatus, myProfile } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    if (updateProfileStatus?.value) {
      setSubmitting(false);
      enqueueSnackbar(updateProfileStatus?.value, {
        variant: 'success',
        onClose: () => dispatch(setUpdateProfile({}))
      });
      dispatch(getProfile());
    } else if (updateProfileStatus?.errors) {
      setSubmitting(false);
      Object.keys(updateProfileStatus?.errors).map((key, index) => {
        return enqueueSnackbar(updateProfileStatus?.errors[key][0], {
          variant: 'error',
          onClose: () => dispatch(setUpdateProfile({}))
        });
      });
    }
  }, [updateProfileStatus, enqueueSnackbar, dispatch]);
  const formik = useFormik<InitialState>({
    enableReinitialize: true,
    initialValues: {
      firstName: myProfile?.firstName || '',
      lastName: myProfile?.lastName || '',
      email: myProfile?.email || '',
      profileImageUrl: myProfile?.profileImageUrl || '',
      phoneNumber: myProfile?.phoneNumber || '',
      country: myProfile?.country || '',
      address: myProfile?.address || '',
      state: myProfile?.state || '',
      city: myProfile?.city || '',
      zipCode: myProfile?.zipCode || '',
      about: myProfile?.about || '',
      isPublic: myProfile?.isPublic || ''
    },
    validationSchema: UpdateUserSchema,
    onSubmit: async (values: any, { setErrors }) => {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append('ProfileImage', image || '');
        bodyFormData.append('FirstName', values?.firstName || '');
        bodyFormData.append('LastName', values?.lastName || '');
        bodyFormData.append('Email', myProfile?.email || '');
        bodyFormData.append('Country', values.country);
        bodyFormData.append('City', values.city);
        bodyFormData.append('Address', values.address);
        bodyFormData.append('State', values.state);
        bodyFormData.append('PhoneNumber', values.phoneNumber ? values.phoneNumber : '');
        bodyFormData.append('ZipCode', values.zipCode);
        bodyFormData.append('About', values.about);
        dispatch(updateProfile(myProfile?.id, bodyFormData));
        setSubmitting(true);
      } catch (error: any) {
        setErrors(error);
      }
    }
  });

  const { values, errors, touched, handleSubmit, getFieldProps, setFieldValue } = formik;

  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setImage(file);
        setFieldValue('profileImageUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );
  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3, textAlign: 'center' }}>
              <UploadAvatar
                accept="image/*"
                file={values.profileImageUrl ? values.profileImageUrl : ''}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.profileImageUrl && errors.profileImageUrl)}
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
                {touched.profileImageUrl && errors.profileImageUrl}
              </FormHelperText>

              <FormControlLabel
                control={<Switch {...getFieldProps('isPublic')} color="primary" />}
                labelPlacement="start"
                label="حساب عام"
                sx={{ mt: 5 }}
              />
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={{ xs: 2, md: 3 }}>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    label="الاسم الأول"
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
                  <TextField
                    fullWidth
                    disabled
                    label="البريد الإلكتروني"
                    {...getFieldProps('email')}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField
                    fullWidth
                    type="string"
                    label="رقم الهاتف"
                    {...getFieldProps('phoneNumber')}
                    value={values?.phoneNumber}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <Typography sx={{ direction: 'rtl' }}>+966</Typography>
                        </InputAdornment>
                      )
                    }}
                    error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                    helperText={touched.phoneNumber && errors.phoneNumber}
                  />
                  <TextField fullWidth label="العنوان" {...getFieldProps('address')} />
                </Stack>
                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <Autocomplete
                    fullWidth
                    options={countries}
                    getOptionLabel={(option: any) => option?.label}
                    // @ts-ignore
                    value={countries?.filter((country) => country?.label === values?.country)[0]}
                    onChange={(e, val) => setFieldValue('country', val?.label)}
                    renderInput={(params: any) => (
                      <TextField
                        {...params}
                        label="البلد"
                        SelectProps={{ native: true }}
                        error={Boolean(touched.country && errors.country)}
                        helperText={touched.country && errors.country}
                      />
                    )}
                  />
                  <TextField fullWidth label="الولاية / المنطقة" {...getFieldProps('state')} />
                </Stack>

                <Stack direction={{ xs: 'column', md: 'row' }} spacing={2}>
                  <TextField fullWidth label="المدينه" {...getFieldProps('city')} />
                  <TextField fullWidth label="الرمز البريدي" {...getFieldProps('zipCode')} />
                </Stack>

                <TextField
                  {...getFieldProps('about')}
                  fullWidth
                  multiline
                  minRows={4}
                  maxRows={4}
                  label="عن"
                />
              </Stack>

              <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                  حفظ التغييرات
                </LoadingButton>
              </Box>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
