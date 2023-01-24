import * as Yup from 'yup';
import { useCallback, useEffect, useState } from 'react';
import { styled } from '@mui/material/styles';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { useDispatch, useSelector, RootState } from '../../../redux/store';

import {
  Box,
  Card,
  Grid,
  Stack,
  TextField,
  Typography,
  FormHelperText,
  InputAdornment,
  List
} from '@mui/material';
import { fData } from '../../../utils/formatNumber';
import { createLawyer, updateLawyer } from '../../../redux/slices/lawyer';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { UploadAvatar } from '../../upload';
import { UploadMultiFile } from '../../upload';
import useMultiFileUpload from '../../../hooks/useMultiFileUpload';
import FilePreview from '../../file/FilePreview';
import ReactSelect from '../../ReactSelect';
import { getSpecificKeyInArrayOfObjects } from 'utils/functions';
import { getCategoriesListLangWise } from 'redux/slices/categories';
import { getPackagesList } from '../../../redux/slices/packages';
import { useMasterCategories } from '../../../queries/categories';

type LawyerFormProps = {
  isEdit: boolean;
  lawyer?: any;
};

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

export default function LawyerForm({ isEdit, lawyer }: LawyerFormProps) {
  const genderOptions = [
    { value: 0, label: 'ذكر' },
    { value: 1, label: 'انثى' }
  ];

  const typesOptions = [
    { value: 0, label: 'موقع الكترونى' },
    { value: 1, label: 'تطبيق موابيل' },
    { value: 2, label: 'الاثنان معا' }
  ];

  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const NewUserSchema = isEdit
    ? Yup.object().shape({
        firstName: Yup.string().required('الأسم الأول مطلوب'),
        lastName: Yup.string().required('الأسم الأخير مطلوب'),
        email: Yup.string().required('البريد الالكترونى مطلوب').email(),
        phone: Yup.string().required('رقم الهاتف مطلوب').max(10, 'رقم الهاتف غير صحيح '),
        gender: Yup.string().required('الجنس مطلوب'),
        type: Yup.string().required('نوع الابليكشن مطلوب'),
        categoriesIds: Yup.mixed().required('التصنيفات مطلوبة'),
        packageIds: Yup.array().min(1, 'الباقات مطلوبة').required('الباقات مطلوبة'),
        MasterCategoryId: Yup.array()
          .min(1, 'التصنيف الأساسي مطلوب')
          .required('التصنيف الأساسي مطلوب'),
        LawyerLicense: Yup.array(),
        EducationalCertificates: Yup.array(),
        LawyerCv: Yup.array()
      })
    : Yup.object().shape({
        firstName: Yup.string().required('الأسم الأول مطلوب'),
        lastName: Yup.string().required('الأسم الأخير مطلوب'),
        email: Yup.string().required('البريد الالكترونى مطلوب').email(),
        password: Yup.string()
          .required('كلمة المرور مطلوبة')
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            'Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character'
          ),
        phone: Yup.string()
          .required('رقم الهاتف مطلوب')
          .test('inValidPhone', 'رقم الهاتف غير صحيح ', (value: any) => /^(5)(\d{8})$/.test(value)),
        gender: Yup.string().required('الجنس مطلوب'),
        type: Yup.string().required('نوع الابليكشن مطلوب'),
        categoriesIds: Yup.mixed().required('التصنيفات مطلوبة'),
        packageIds: Yup.array().min(1, 'الباقات مطلوبة').required('الباقات مطلوبة'),
        MasterCategoryId: Yup.array()
          .min(1, 'التصنيف الأساسي مطلوب')
          .required('التصنيف الأساسي مطلوب'),
        LawyerLicense: Yup.array().min(1, 'رخصة المحامي مطلوبة'),
        EducationalCertificates: Yup.array().min(1, 'الشهادة التعليمية مطلوبة'),
        LawyerCv: Yup.array().min(1, 'السيرة الذاتية مطلوبة')
      });
  const dispatch = useDispatch();

  const { error, isLawyerCreated } = useSelector((state: RootState) => state.lawyer);
  const { categoriesListLangWise } = useSelector((state: RootState) => state.categories);
  const { packagesList } = useSelector((state: RootState) => state.packages);
  const { data: masterCategoriesData } = useMasterCategories();
  useEffect(() => {
    dispatch(getCategoriesListLangWise());
    dispatch(getPackagesList());
  }, [dispatch]);

  useEffect(() => {
    // @ts-ignore
    if (error?.errors) {
      // @ts-ignore
      Object.values(error.errors)
        .flat()
        .map((item: any) => enqueueSnackbar(item, { variant: 'error' }));
    }
  }, [enqueueSnackbar, error]);

  useEffect(() => {
    if (isLawyerCreated) {
      enqueueSnackbar(!isEdit ? 'تم اضافة المحامى بنجاح' : 'تم التعديل بنجاح', {
        variant: 'success'
      });
      navigate(PATH_DASHBOARD.lawyer.list);
    }
  }, [enqueueSnackbar, isEdit, isLawyerCreated, navigate]);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      avatarUrl: lawyer?.avatarUrl || null,
      firstName: lawyer?.firstName || '',
      lastName: lawyer?.lastName || '',
      email: lawyer?.email || '',
      password: lawyer?.password || '',
      phone: lawyer?.phone || '',
      gender: lawyer?.gender !== null ? lawyer?.gender : '',
      categoriesIds: lawyer?.categories
        ? getSpecificKeyInArrayOfObjects(lawyer?.categories, 'mobileRequestCategoryId')
        : [],
      type: lawyer?.type !== null ? lawyer?.type : '',
      files: lawyer?.files || [],
      userName: lawyer?.userName || '',
      confirmPassword: lawyer?.confirmPassword || '',
      packageIds: lawyer?.packageIds?.length
        ? lawyer?.packageIds
        : packagesList.filter((item: any) => item?.isDefault).map((item) => item.id),
      MasterCategoryId: lawyer?.masterCategory?.map((item: any) => item?.masterCategoryId) || [],
      EducationalCertificates: lawyer?.educationalCertificates ?? [],
      LawyerLicense: [lawyer?.lawyerLicense] ?? [],
      LawyerCv: [lawyer?.cv] ?? []
    },

    validationSchema: NewUserSchema,
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        let bodyFormData = new FormData();
        bodyFormData.append(
          'AvatarUrl',
          new Blob([values.avatarUrl], { type: 'application/octet-stream' })
        );
        bodyFormData.append('FirstName', values.firstName);
        bodyFormData.append('LastName', values.lastName);
        bodyFormData.append('UserName', values.email);
        bodyFormData.append('Email', values.email);
        bodyFormData.append('Password', values.password);
        bodyFormData.append('ConfirmPassword', values.password);
        bodyFormData.append('PhoneNumber', values.phone);
        bodyFormData.append('CountryCode', '+966');
        bodyFormData.append('Gender', values.gender);
        for (let index = 0; index < values.packageIds?.length; index++) {
          bodyFormData.append('PackageIds', values.packageIds[index]);
        }
        for (let index = 0; index < values.MasterCategoryId?.length; index++) {
          bodyFormData.append('MasterCategoryId', values.MasterCategoryId[index]);
        }
        for (let index = 0; index < values.categoriesIds?.length; index++) {
          bodyFormData.append('CategoriesIds', values.categoriesIds[index]);
        }
        bodyFormData.append('Type', values.type);
        for (let index = 0; index < values.EducationalCertificates.length; index++) {
          bodyFormData.append('EducationalCertificates', values.EducationalCertificates[index]);
        }
        bodyFormData.append('LawyerLicense', values.LawyerLicense[0]);
        bodyFormData.append('CV', values.LawyerCv[0]);

        let updateDate = {
          ...values,
          phoneNumber: values.phone
        };
        delete updateDate.phone;

        isEdit
          ? await dispatch(updateLawyer(bodyFormData, lawyer.lawyerId))
          : await dispatch(createLawyer(bodyFormData));
        setSubmitting(false);
      } catch (error: any) {
        console.error(error);
        setSubmitting(false);
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

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

  const { files, removeAllFile } = useMultiFileUpload();

  useEffect(() => {
    setFieldValue('files', files);
  }, [files, setFieldValue]);

  const handleRemoveAll = () => {
    removeAllFile();
  };

  const [licenceFiles, setLicenceFiles] = useState<any[]>([]);
  const [certificateFiles, setCertificateFiles] = useState<any[]>([]);
  const [editLawyerCV, setEditLawyerCV] = useState(false);
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <Card sx={{ py: 10, px: 3 }}>
              <Box sx={{ mb: 5 }}>
                <UploadAvatar
                  accept="image/*"
                  file={values.avatarUrl}
                  maxSize={3145728}
                  onDrop={handleDrop}
                  error={Boolean(touched.avatarUrl && errors.avatarUrl)}
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
                  {touched.avatarUrl && errors.avatarUrl}
                </FormHelperText>
              </Box>
            </Card>
          </Grid>

          <Grid item xs={12} md={8}>
            <Card sx={{ p: 3 }}>
              <Stack spacing={3}>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="الأسم الاول"
                    {...getFieldProps('firstName')}
                    error={Boolean(touched.firstName && errors.firstName)}
                    helperText={touched.firstName && errors.firstName}
                  />
                  <TextField
                    fullWidth
                    label="الأسم الاخير"
                    {...getFieldProps('lastName')}
                    error={Boolean(touched.lastName && errors.lastName)}
                    helperText={touched.lastName && errors.lastName}
                  />
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <TextField
                    fullWidth
                    label="البريد الالكترونى"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                  />
                  <TextField
                    fullWidth
                    label="كلمة المرور"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    type="password"
                    autoComplete="new-password"
                  />
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <div style={{ width: '100%' }}>
                    <ReactSelect
                      options={genderOptions}
                      value={formik.values.gender}
                      onChange={(value: any) => formik.setFieldValue('gender', value.value)}
                      placeholder="اختر الجنس"
                    />
                    {touched.gender && errors.gender && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.gender && errors.gender}
                      </FormHelperText>
                    )}
                  </div>
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
                </Stack>
                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <div style={{ width: '100%' }}>
                    <ReactSelect
                      options={categoriesListLangWise}
                      value={formik.values.categoriesIds}
                      label={'name'}
                      valueName={'mobileRequestCategoryId'}
                      onChange={(value: any) =>
                        formik.setFieldValue(
                          'categoriesIds',
                          value.map((item: any) => item.mobileRequestCategoryId)
                        )
                      }
                      isMulti={true}
                      placeholder="التصنيفات"
                    />
                    {touched.categoriesIds && errors.categoriesIds && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.categoriesIds && errors.categoriesIds}
                      </FormHelperText>
                    )}
                  </div>

                  <div style={{ width: '100%' }}>
                    <ReactSelect
                      options={typesOptions}
                      value={formik.values.type}
                      onChange={(value: any) => formik.setFieldValue('type', value.value)}
                      placeholder="النوع"
                    />
                    {touched.type && errors.type && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.type && errors.type}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>

                <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 3, sm: 2 }}>
                  <div style={{ width: '100%' }}>
                    <ReactSelect
                      options={packagesList}
                      value={formik.values.packageIds}
                      label={'name'}
                      valueName={'id'}
                      onChange={(value: any) =>
                        formik.setFieldValue(
                          'packageIds',
                          value.map((item: any) => item.id)
                        )
                      }
                      isMulti={true}
                      placeholder="الباقات"
                    />
                    {touched.packageIds && errors.packageIds && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.packageIds && errors.packageIds}
                      </FormHelperText>
                    )}
                  </div>
                  <div style={{ width: '100%' }}>
                    <ReactSelect
                      options={masterCategoriesData}
                      value={formik.values.MasterCategoryId}
                      label={'name'}
                      valueName={'masterCategoryId'}
                      onChange={(value: any) =>
                        formik.setFieldValue(
                          'MasterCategoryId',
                          value.map((item: any) => item.masterCategoryId)
                        )
                      }
                      isMulti={true}
                      placeholder="التصنيف الأساسي"
                    />
                    {touched.MasterCategoryId && errors.MasterCategoryId && (
                      <FormHelperText error sx={{ px: 2 }}>
                        {touched.MasterCategoryId && errors.MasterCategoryId}
                      </FormHelperText>
                    )}
                  </div>
                </Stack>

                <Box sx={{ m: 3 }}>
                  <LabelStyle>الشهادة التعليمية</LabelStyle>
                  <UploadMultiFile
                    showPreview={false}
                    hideFilePreview={certificateFiles?.length === 0 ? true : false}
                    maxSize={3145728}
                    files={values.EducationalCertificates}
                    onDrop={(files) => {
                      setCertificateFiles([...certificateFiles, ...files]);
                      setFieldValue('EducationalCertificates', [
                        ...values?.EducationalCertificates,
                        ...files
                      ]);
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
                    error={Boolean(
                      touched.EducationalCertificates && errors.EducationalCertificates
                    )}
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
                  {values.EducationalCertificates?.length &&
                  isEdit &&
                  certificateFiles?.length === 0 ? (
                    <List>
                      <>
                        {values?.EducationalCertificates?.map((certificate: any, i: number) => {
                          return (
                            <FilePreview
                              key={i}
                              src={certificate}
                              isDelete={true}
                              handleDelete={(e, file) => {
                                setFieldValue(
                                  'EducationalCertificates',
                                  values.EducationalCertificates?.filter(
                                    (certificateFile: any) => certificateFile !== file
                                  )
                                );
                              }}
                            />
                          );
                        })}
                      </>
                    </List>
                  ) : (
                    ''
                  )}
                </Box>

                <Box sx={{ m: 3 }}>
                  <LabelStyle>رخصة المحامي</LabelStyle>
                  <UploadMultiFile
                    showPreview={false}
                    hideFilePreview={licenceFiles?.length === 0 ? true : false}
                    maxSize={3145728}
                    multiple={false}
                    files={values.LawyerLicense}
                    onDrop={(files) => {
                      setLicenceFiles([...licenceFiles, ...files]);
                      setFieldValue('LawyerLicense', files);
                    }}
                    onRemove={(file: any) => {
                      setLicenceFiles(
                        licenceFiles?.filter((licenceFile) => licenceFile.name !== file?.name)
                      );
                      setFieldValue('LawyerLicense', file);
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
                {values?.LawyerLicense &&
                isEdit &&
                typeof values?.LawyerCv[0] === 'string' &&
                licenceFiles?.length === 0 ? (
                  <List>
                    <FilePreview
                      src={values?.LawyerLicense[0]}
                      isDelete={true}
                      handleDelete={() => {
                        setFieldValue('LawyerLicense', null);
                      }}
                    />
                  </List>
                ) : (
                  ''
                )}

                <Box sx={{ m: 3 }}>
                  <LabelStyle>السيرة الذاتية</LabelStyle>
                  <UploadMultiFile
                    showPreview={false}
                    hideFilePreview={!editLawyerCV ? true : false}
                    maxSize={3145728}
                    multiple={false}
                    files={values.LawyerCv}
                    onDrop={(files) => {
                      setFieldValue('LawyerCv', files);
                      setEditLawyerCV(true);
                    }}
                    onRemove={() => {
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
                  {values?.LawyerCv && isEdit && typeof values?.LawyerCv[0] === 'string' ? (
                    <List>
                      <FilePreview
                        src={values?.LawyerCv[0]}
                        isDelete={true}
                        handleDelete={() => {
                          setFieldValue('LawyerCv', null);
                        }}
                      />
                    </List>
                  ) : (
                    ''
                  )}
                </Box>

                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
                    {!isEdit ? 'انشاء' : 'تعديل'}
                  </LoadingButton>
                </Box>
              </Stack>
            </Card>
          </Grid>
        </Grid>
      </Form>
    </FormikProvider>
  );
}
