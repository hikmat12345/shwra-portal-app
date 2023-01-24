import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector, RootState } from '../../../../redux/store';

import eyeFill from '@iconify/icons-eva/eye-fill';
import eyeOffFill from '@iconify/icons-eva/eye-off-fill';
import {
  Box,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  GridSize,
  Checkbox,
  FormControlLabel,
  InputAdornment,
  IconButton
} from '@mui/material';
import { fData } from '../../../../utils/formatNumber';
import { registerClient, setRegisterClient } from '../../../../redux/slices/client';
import { UploadAvatar } from '../../../upload';
import { UploadMultiFile } from '../../../upload';
import useMultiFileUpload from '../../../../hooks/useMultiFileUpload';
import { styled } from '@mui/material/styles';
import ReactSelect from '../../../ReactSelect';
import { genderOptions } from 'utils/enums';
import { Icon } from '@iconify/react';
import TermsService from './TermsService';
import PrivacyPolicy from './PrivacyPolicy';
import { getCategoriesListLangWise } from 'redux/slices/categories';

type LawyerRegisterFormProps = {
  imageGrid?: GridSize;
  formGrid?: GridSize;
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function LawyerRegisterForm({ formGrid, imageGrid }: LawyerRegisterFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState(false);

  const NewUserSchema = Yup.object().shape({
    FirstName: Yup.string().required('الأسم الأول مطلوب'),
    LastName: Yup.string().required('الأسم الأخير مطلوب'),
    Email: Yup.string().required('البريد الالكترونى مطلوب').email(),
    Password: Yup.string()
      .required('كلمة المرور مطلوبة')
      .matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        ' رمز المرور يجب أن يحتوي على 8 أحرف ،  على الأقل حرف واحد كبير ، حرف واحد صغير ، رقم واحد و رمز واحد'
      ),
    PhoneNumber: Yup.string()
      .required('رقم الهاتف مطلوب')
      .test('inValidPhone', 'رقم الهاتف غير صحيح ', (value: any) =>
        /^(5)(\d{8})$/.test(value)
      ),
    Gender: Yup.string().required('الجنس مطلوب'),
    CategoriesIds: Yup.array().min(1, 'التصنيفات مطلوبة'),
    acceptTerms: Yup.boolean().required().oneOf([true], 'يجب الموافقة على الشروط والأحكام'),
    LawyerLicense: Yup.array().min(1, 'رخصة المحامي مطلوبة'),
    EducationalCertificates: Yup.array().min(1, 'الشهادة التعليمية مطلوبة'),
    LawyerCv: Yup.array().min(1, 'السيرة الذاتية مطلوبة')
  });
  const dispatch = useDispatch();

  const { error, clientRegister } = useSelector((state: RootState) => state.client);
  const { categoriesListLangWise } = useSelector((state: RootState) => state.categories);
    useEffect(() => {
    dispatch(getCategoriesListLangWise());
    return () => {
      dispatch(setRegisterClient(''));
    };
  }, [dispatch]);

  useEffect(() => {
    if (error || clientRegister) {
      // @ts-ignore
      error?.errors?.map((item: any) =>
        enqueueSnackbar(item, {
          variant: 'error',
          onClose: () => {
            dispatch(setRegisterClient(''));
          }
        })
      );
    }
  }, [enqueueSnackbar, error, clientRegister, dispatch]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatarUrl: null,
      FirstName: '',
      LastName: '',
      Email: '',
      Password: '',
      PhoneNumber: '',
      Gender: '',
      CategoriesIds: [],
      OtherDocuments: [],
      UserName: '',
      ConfirmPassword: '',
      acceptTerms: false,
      LawyerLicense: [],
      EducationalCertificates: [],
      LawyerCv: []
    },

    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append('UserName', values.Email);
        bodyFormData.append('Email', values.Email);
        bodyFormData.append('Password', values.Password);
        bodyFormData.append('ConfirmPassword', values.Password);
        bodyFormData.append('PhoneNumber', values.PhoneNumber);
        bodyFormData.append('CountryCode', '+966');
        bodyFormData.append('FirstName', values.FirstName);
        bodyFormData.append('LastName', values.LastName);
        bodyFormData.append('Gender', values.Gender);
        for (let index = 0; index < values.CategoriesIds.length; index++) {
          bodyFormData.append('CategoriesIds', values.CategoriesIds[index]);
        }
        for (let index = 0; index < values.EducationalCertificates.length; index++) {
          bodyFormData.append('EducationalCertificates', values.EducationalCertificates[index]);
        }
        bodyFormData.append('LawyerLicense', values.LawyerLicense[0]);
        bodyFormData.append('CV', values.LawyerCv[0]);

        await dispatch(registerClient(bodyFormData));
        setSubmitting(false);
      } catch (error: any) {
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  useEffect(() => {
    if (clientRegister) {
      enqueueSnackbar('تم إنشاء الحساب بنجاح سوف يصلك بريد الكتروني ', {
        variant: 'success'
      });
      formik.resetForm();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [enqueueSnackbar, clientRegister]);
  const handleDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      if (file) {
        setFieldValue('avatarUrl', {
          ...file,
          preview: URL.createObjectURL(file)
        });
      }
    },
    [setFieldValue]
  );

  const { removeAllFile } = useMultiFileUpload();

  const [certificateFiles, setCertificateFiles] = useState<any[]>([]);
  const [licenceFiles, setLicenceFiles] = useState<any[]>([]);

  const handleRemoveAll = () => {
    removeAllFile();
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={imageGrid ? imageGrid : 4}>
            <Box
              sx={{
                mb: 0,
                p: 2,
                border: '1px solid rgba(145, 158, 171, 0.32)',
                borderRadius: '8px'
              }}
            >
              <UploadAvatar
                accept="image/*"
                file={values.avatarUrl}
                maxSize={3145728}
                onDrop={handleDrop}
                error={Boolean(touched.avatarUrl && errors.avatarUrl)}
                styles={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-start',
                  flexWrap: 'wrap',
                  '.MuiPaper-root': {
                    width: '100%'
                  }
                }}
                sx={{
                  margin: 0
                }}
                caption={
                  <Typography
                    variant="caption"
                    sx={{
                      mt: 0,
                      mx: '2rem',
                      display: 'block',
                      textAlign: 'left',
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
              <FormHelperText error sx={{ px: 2, textAlign: 'left' }}>
                {touched.avatarUrl && errors.avatarUrl}
              </FormHelperText>
            </Box>
          </Grid>
          <Grid item xs={12} md={formGrid ? formGrid : 8}>
            <Stack spacing={3}>
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField
                  fullWidth
                  label="الأسم الاول"
                  {...getFieldProps('FirstName')}
                  error={Boolean(touched.FirstName && errors.FirstName)}
                  helperText={touched.FirstName && errors.FirstName}
                />
                <TextField
                  fullWidth
                  label="الأسم الاخير"
                  {...getFieldProps('LastName')}
                  error={Boolean(touched.LastName && errors.LastName)}
                  helperText={touched.LastName && errors.LastName}
                />
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <TextField
                  fullWidth
                  label="البريد الالكترونى"
                  {...getFieldProps('Email')}
                  error={Boolean(touched.Email && errors.Email)}
                  helperText={touched.Email && errors.Email}
                />
                <TextField
                  fullWidth
                  autoComplete="new-password"
                  type={showPassword ? 'text' : 'password'}
                  label="كلمة المرور"
                  {...getFieldProps('Password')}
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton edge="end" onClick={() => setShowPassword((prev) => !prev)}>
                          <Icon icon={showPassword ? eyeFill : eyeOffFill} />
                        </IconButton>
                      </InputAdornment>
                    )
                  }}
                  error={Boolean(touched.Password && errors.Password)}
                  helperText={touched.Password && errors.Password}
                />
              </Stack>

              <Stack
                direction={{ xs: 'column', sm: 'row' }}
                spacing={{ xs: 3, sm: 2 }}
                sx={{ alignItems: 'stretch' }}
              >
                <div
                  style={{
                    width: '100%'
                  }}
                >
                  <ReactSelect
                    options={genderOptions}
                    value={formik.values.Gender}
                    onChange={(value: any) => {
                      formik.setFieldValue('Gender', value ? value.value : '');
                    }}
                    placeholder="اختر الجنس"
                    controleStyles={{
                      border: `1px solid ${
                        touched.Gender && errors.Gender
                          ? '#FF4842 !important'
                          : 'rgba(145, 158, 171, 0.32)'
                      }`,
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '55px',
                      width: '100%',
                      // @ts-ignore
                      '&:hover': {
                        borderColor: `${touched.Gender && errors.Gender ? '#FF4842' : '#212B36'}`
                      }
                    }}
                  />
                  {touched.Gender && errors.Gender && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.Gender && errors.Gender}
                    </FormHelperText>
                  )}
                </div>

                <Box sx={{ width: '100%', display: 'flex', position: 'relative' }}>
                  <TextField
                    fullWidth
                    label="رقم الهاتف"
                    {...getFieldProps('PhoneNumber')}
                    type="string"
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
                </Box>
              </Stack>

              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                <div style={{ width: '100%' }}>
                  <ReactSelect
                    options={categoriesListLangWise}
                    value={formik.values.CategoriesIds}
                    label={'name'}
                    valueName={'mobileRequestCategoryId'}
                    onChange={(value: any) =>
                      formik.setFieldValue(
                        'CategoriesIds',
                        value.map((item: any) => item.mobileRequestCategoryId)
                      )
                    }
                    isMulti={true}
                    placeholder="التصنيفات"
                    controleStyles={{
                      border: `1px solid ${
                        touched.CategoriesIds && errors.CategoriesIds
                          ? '#FF4842 !important'
                          : 'rgba(145, 158, 171, 0.32)'
                      }`,
                      borderRadius: '8px',
                      alignItems: 'center',
                      justifyContent: 'center',
                      height: '55px',
                      width: '100%',
                      // @ts-ignore
                      '&:hover': {
                        borderColor: `${
                          touched.CategoriesIds && errors.CategoriesIds ? '#FF4842' : '#212B36'
                        }`
                      }
                    }}
                  />

                  {touched.CategoriesIds && errors.CategoriesIds && (
                    <FormHelperText error sx={{ px: 2 }}>
                      {touched.CategoriesIds && errors.CategoriesIds}
                    </FormHelperText>
                  )}
                </div>
              </Stack>
              <Box sx={{ m: 3 }}>
                <LabelStyle>الشهادة التعليمية</LabelStyle>
                <UploadMultiFile
                  showPreview={false}
                  maxSize={3145728}
                  files={values.EducationalCertificates}
                  onDrop={(files) => {
                    setCertificateFiles([...certificateFiles, ...files]);
                    setFieldValue('EducationalCertificates', [...certificateFiles, ...files]);
                  }}
                  onRemove={(file: any) => {
                    setCertificateFiles(
                      certificateFiles?.filter(
                        (certificateFile) => certificateFile.name !== file?.name
                      )
                    );
                    setFieldValue(
                      'EducationalCertificates',
                      certificateFiles?.filter(
                        (certificateFile) => certificateFile.name !== file?.name
                      )
                    );
                  }}
                  onRemoveAll={handleRemoveAll}
                  error={Boolean(touched.EducationalCertificates && errors.EducationalCertificates)}
                  dropBoxStyles={{ p: 2 }}
                  imgStyles={{
                    '@media (max-width: 780px)': {
                      width: 150
                    }
                  }}
                />
                {touched.EducationalCertificates && errors.EducationalCertificates && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.EducationalCertificates && errors.EducationalCertificates}
                  </FormHelperText>
                )}
              </Box>
              <Box sx={{ m: 3 }}>
                <LabelStyle>رخصة المحامي</LabelStyle>
                <UploadMultiFile
                  showPreview={false}
                  maxSize={3145728}
                  multiple={false}
                  files={values.LawyerLicense}
                  onDrop={(files) => {
                    setLicenceFiles([...licenceFiles, ...files]);
                    setFieldValue('LawyerLicense', [...licenceFiles, ...files]);
                  }}
                  onRemove={(file: any) => {
                    setLicenceFiles(
                      licenceFiles?.filter((licenceFile) => licenceFile.name !== file?.name)
                    );
                    setFieldValue(
                      'LawyerLicense',
                      licenceFiles?.filter((licenceFile) => licenceFile.name !== file?.name)
                    );
                  }}
                  onRemoveAll={handleRemoveAll}
                  error={Boolean(touched.LawyerLicense && errors.LawyerLicense)}
                  dropBoxStyles={{ p: 2 }}
                  imgStyles={{
                    '@media (max-width: 780px)': {
                      width: 150
                    }
                  }}
                />
                {touched.LawyerLicense && errors.LawyerLicense && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.LawyerLicense && errors.LawyerLicense}
                  </FormHelperText>
                )}
              </Box>

              <Box sx={{ m: 3 }}>
                <LabelStyle>السيرة الذاتية</LabelStyle>
                <UploadMultiFile
                  showPreview={false}
                  maxSize={3145728}
                  multiple={false}
                  files={values.LawyerCv}
                  onDrop={(files) => {
                    setFieldValue('LawyerCv', files);
                  }}
                  onRemove={(file: any) => {
                    setFieldValue('LawyerCv', []);
                  }}
                  onRemoveAll={handleRemoveAll}
                  error={Boolean(touched.LawyerCv && errors.LawyerCv)}
                  dropBoxStyles={{ p: 2 }}
                  imgStyles={{
                    '@media (max-width: 780px)': {
                      width: 150
                    }
                  }}
                />
                {touched.LawyerCv && errors.LawyerCv && (
                  <FormHelperText error sx={{ px: 2 }}>
                    {touched.LawyerCv && errors.LawyerCv}
                  </FormHelperText>
                )}
              </Box>

              {/** term an condation approval */}
              <div style={{ display: 'flex', alignItems: 'center' }}>
                <FormControlLabel
                  style={{ marginLeft: '0' }}
                  control={
                    <Checkbox {...getFieldProps('acceptTerms')} checked={values.acceptTerms} />
                  }
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
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
