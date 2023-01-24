import { useEffect, useState } from 'react';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { FieldArray, Form, FormikProvider, useFormik } from 'formik';
import { LoadingButton } from '@mui/lab';
import { Box, Card, Grid, Stack, Switch, TextField, InputLabel } from '@mui/material';
import { PATH_DASHBOARD } from '../../../routes/paths';
import { RootState } from 'redux/store';
import { useDispatch, useSelector } from 'react-redux';
import {
  addConfiguration,
  editConfiguration,
  setAddConfiguration,
  setConfigurationDetails,
  getConfigurationDetails,
  setEditConfiguration
} from 'redux/slices/user';
import { Configuration } from '../../../../src/@types/user';
import { styled } from '@mui/material/styles';

type CreateEditConfigurationProps = {
  isEdit: boolean;
  configurationId: string;
  configurationsList: Configuration[];
};

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
  width: 62,
  height: 34,
  padding: 7,
  '& .MuiSwitch-switchBase': {
    margin: 1,
    padding: 0,
    transform: 'translateX(6px)',
    '&.Mui-checked': {
      color: '#fff',
      transform: 'translateX(22px)',
      '& .MuiSwitch-thumb:before': {
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" ><path fill="${encodeURIComponent(
          '#fff'
        )}" d="M17 1.01L7 1c-1.1 0-2 .9-2 2v18c0 1.1.9 2 2 2h10c1.1 0 2-.9 2-2V3c0-1.1-.9-1.99-2-1.99zM17 19H7V5h10v14z"></path></svg>')`
      },
      '& + .MuiSwitch-track': {
        opacity: 1,
        backgroundColor: theme.palette.mode === 'dark' ? '#eacf92' : '#eacf92'
      }
    }
  },
  '& .MuiSwitch-thumb': {
    backgroundColor: theme.palette.mode === 'dark' ? '#d49e24' : '#d49e24',
    width: 32,
    height: 32,
    '&:before': {
      content: "''",
      position: 'absolute',
      width: '100%',
      height: '100%',
      left: 0,
      top: 0,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'center',
      backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24" ><path fill="${encodeURIComponent(
        '#fff'
      )}" d="M20 18c1.1 0 1.99-.9 1.99-2L22 6c0-1.1-.9-2-2-2H4c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2H0v2h24v-2h-4zM4 6h16v10H4V6z"></path></svg>')`
    }
  },
  '& .MuiSwitch-track': {
    opacity: 1,
    backgroundColor: theme.palette.mode === 'dark' ? '#eacf92' : '#eacf92',
    borderRadius: 20 / 2
  }
}));
export default function CreateEditConfiguration({
  isEdit,
  configurationId,
  configurationsList
}: CreateEditConfigurationProps) {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { enqueueSnackbar } = useSnackbar();
  const { addConfigurationStatus, editConfigurationStatus, configurationDetails } = useSelector(
    (state: RootState) => state.user
  );
  const [isSubmitting, setSubmitting] = useState(false);
  useEffect(() => {
    if (configurationId) {
      dispatch(getConfigurationDetails(configurationId));
    }
    return () => {
      setConfigurationDetails({});
    };
  }, [dispatch, configurationId]);
  useEffect(() => {
    if (
      addConfigurationStatus?.status === 'success' ||
      editConfigurationStatus?.status === 'success'
    ) {
      setSubmitting(false);
      enqueueSnackbar(isEdit ? 'تم تعديل الإعدادات بنجاح' : 'تم إنشاء إعدادات نجاح', {
        variant: 'success',
        onClose: () => {
          dispatch(setAddConfiguration({}));
          dispatch(setEditConfiguration({}));
        }
      });

      navigate(PATH_DASHBOARD.user.account);
    } else if (addConfigurationStatus?.status === 'error') {
      setSubmitting(false);

      Object?.values(addConfigurationStatus?.error?.errors)
        .flat()
        .map((error: any) => {
          return enqueueSnackbar(error, {
            variant: 'error',
            onClose: () => {
              dispatch(setAddConfiguration({}));
            }
          });
        });
    } else if (editConfigurationStatus?.status === 'error') {
      setSubmitting(false);
      Object?.values(editConfigurationStatus?.error?.errors)
        .flat()
        .map((error: any) => {
          return enqueueSnackbar(error, {
            variant: 'error',
            onClose: () => {
              dispatch(setEditConfiguration({}));
            }
          });
        });
    }
  }, [
    editConfigurationStatus,
    addConfigurationStatus,
    enqueueSnackbar,
    dispatch,
    navigate,
    isEdit
  ]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: { configurationsList: configurationsList },
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      let data = values?.configurationsList?.map((data) => {
        return {
          id: data.id,
          name: data.name,
          value: data.value,
          type: `${data.typeId}`
        };
      });
      try {
        if (isEdit) {
          dispatch(editConfiguration(data));
        } else {
          dispatch(addConfiguration(data));
        }
        // resetForm();
        setSubmitting(true);
      } catch (error: any) {
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, setFieldValue, getFieldProps, initialValues } =
    formik;
  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        {' '}
        <Grid container spacing={3}>
          <Grid item xs={12} md={12}>
            <Card sx={{ p: 3, overflow: 'unset' }}>
              <FieldArray name="tickets">
                {() =>
                  values.configurationsList.map((config: any, i) => {
                    const ticketErrors =
                      (errors.configurationsList?.length && errors.configurationsList[i]) || {};
                    const ticketTouched =
                      (touched.configurationsList?.length && touched.configurationsList[i]) || {};
                    return (
                      <div key={i} className="">
                        <Stack
                          direction={{ xs: 'column', sm: 'row' }}
                          spacing={{ xs: 3, sm: 2 }}
                          sx={{ mb: 2 }}
                        >
                          <TextField
                            fullWidth
                            label="الإسم"
                            {...getFieldProps(`configurationsList.${i}.name`)}
                            disabled={true}

                            // error={Boolean(touched.Name && errors.Name)}
                            // helperText={touched.Name && errors.Name}
                          />

                          <TextField
                            fullWidth
                            label="القيمة"
                            {...getFieldProps(`configurationsList.${i}.value`)}
                          />
                          <Box
                            sx={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <InputLabel sx={{ fontSize: '12px', color: '#919EAB' }}>
                              موقع الكترونى
                            </InputLabel>
                            <MaterialUISwitch sx={{ m: 1 }} checked={config.typeId === 1} />
                            <InputLabel sx={{ fontSize: '12px', color: '#919EAB' }}>
                              تطبيق موبايل
                            </InputLabel>
                          </Box>
                        </Stack>
                      </div>
                    );
                  })
                }
              </FieldArray>
            </Card>
          </Grid>
        </Grid>
        <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
          <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
            {!isEdit ? 'إنشاء الإعدادات' : 'حفظ التعديلات'}
          </LoadingButton>
        </Box>
      </Form>
    </FormikProvider>
  );
}
