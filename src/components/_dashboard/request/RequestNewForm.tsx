import { useEffect, useCallback, useState } from 'react';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';
import { Form, FormikProvider, useFormik } from 'formik';
// material
import { styled } from '@mui/material/styles';
import { LoadingButton } from '@mui/lab';
import {
  Box,
  Card,
  Stack,
  Radio,
  RadioGroup,
  TextField,
  Typography,
  FormHelperText,
  FormControlLabel
} from '@mui/material';
// hooks
import useAuth from '../../../hooks/useAuth';
import useSelectedValue from '../../../hooks/useSelectedValue';
import useMultiFileUpload from '../../../hooks/useMultiFileUpload';
// redux
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import {
  getRequestStandards,
  getRequestTypes,
  createClientRequest,
  setRequestStatue
} from '../../../redux/slices/request';
// routes
import { PATH_DASHBOARD } from '../../../routes/paths';
// @types
//
import { QuillEditor } from '../../editor';
import { UploadMultiFile } from '../../upload';
//
import HoverPopover from 'material-ui-popup-state/HoverPopover';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';

// ---------------------------------------------------------

const SERVICE_STANDARD = [
  {
    value: '1',
    label: 'عادي',
    info: 'Standard 1 info'
  },
  {
    value: '2',
    label: 'مستعجل',
    info: 'Standard 1 info'
  },
  {
    value: '3',
    label: 'مستعجل جدا',
    info: 'Standard 1 info'
  }
];
// useMultiFileUpload()

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

type RequestNewFormProps = {
  isEdit: boolean;
  // currentRequest?: IRequest | null;
  currentRequest?: any;
};

interface InitialValues {
  Subject: string;
  Details: string;
  TypeId: null | number;
  SubTypeId: null | number | string;
  StandardId: null | number;
  ClientId: string;
  Attachments: File[];
}

export default function RequestNewForm({ isEdit, currentRequest }: RequestNewFormProps) {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();

  const dispatch = useDispatch();

  const { user } = useAuth();

  const { requestStandardList, requestTypeList, isLoading, error, requestStatus } = useSelector(
    (state: RootState) => state.request
  );

  useEffect(() => {
    dispatch(getRequestStandards());
    dispatch(getRequestTypes());
  }, [dispatch]);
  //------------------------------------------------------------------------------
  // popover for info preview
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePopoverClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  //--------------------------------------------------------------------------------------
  useEffect(() => {
    if (requestStatus?.status === 'success') {
      enqueueSnackbar(!isEdit ? 'تم انشاء التذكره بنجاح' : 'تم تحديث التذكره', {
        variant: 'success'
      });
      navigate(`${PATH_DASHBOARD.request.root}/list/client`);
    } else if (requestStatus?.status === 'error') {
      Object.values(requestStatus?.error?.errors)
        .flat()
        .map((error: any) => {
          return enqueueSnackbar(error, {
            variant: 'error',
            onClose: () => {
              dispatch(setRequestStatue({}));
            }
          });
        });
    }
  }, [requestStatus, enqueueSnackbar, navigate, isEdit, dispatch]);

  // form vaildator schema
  const NewRequestSchema = Yup.object().shape({
    Subject: Yup.string().required('العنوان مطلوب'),
    Details: Yup.string().required('التفاصيل مطلوب'),
    StandardId: Yup.number().nullable(false).typeError('برجاء اختيار معيار الخدمة')
    // TypeId: '',
    // StandardId: '',
    // ClientId: ''
  });

  const formInitialValues: InitialValues = {
    Subject: '',
    Details: '',
    TypeId: 1,
    SubTypeId: '',
    StandardId: null,
    ClientId: user?.id as string,
    Attachments: []
  };

  // create from
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: formInitialValues,
    validationSchema: NewRequestSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await dispatch(createClientRequest(values));

        resetForm();
        setSubmitting(false);
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        // @ts-ignore
        setErrors(error);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue, getFieldProps } =
    formik;

  const { hasChildFeild, childFeild, handleChildFeild } = useSelectedValue(requestTypeList);

  useEffect(() => {
    handleChildFeild(Number(values.TypeId));
  }, [handleChildFeild, values.TypeId]);

  ///------------------------------------------------------------

  const { files, handleNewFile, removeOneFile, removeAllFile } = useMultiFileUpload();
  const handleDrop = useCallback(
    (acceptedFiles) => {
      // console.log("acceptedFiles", acceptedFiles)

      handleNewFile({
        file: acceptedFiles
      });

      /*
acceptedFiles
        .map((file: File | string) =>
          Object.assign(file, {
          preview: URL.createObjectURL(file)
        })
       ) 
*/
    },
    [handleNewFile]
  );

  useEffect(() => {
    setFieldValue('Attachments', files);
  }, [files, setFieldValue]);

  const handleRemoveAll = () => {
    removeAllFile();
  };

  const handleRemove = (file: File | string) => {
    // console.log("handleRemove:file", file)

    removeOneFile(file);
  };

  return (
    <FormikProvider value={formik}>
      <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
        <Card sx={{ py: 10, px: 3 }}>
          {/* {error && (<h1> { error } </h1>)} */}

          <Box sx={{ m: 3 }}>
            <TextField
              fullWidth
              label="الموضوع"
              {...getFieldProps('Subject')}
              error={Boolean(touched.Subject && errors.Subject)}
              helperText={touched.Subject && errors.Subject}
            />
          </Box>

          <Box sx={{ m: 3 }}>
            <LabelStyle> نوع الخدمة </LabelStyle>
            <RadioGroup {...getFieldProps('TypeId')} row>
              <Stack spacing={1} direction="row">
                {requestTypeList.map((type) => {
                  // console.log("typetype", type)
                  // console.log("type.requestTypeId", type.requestTypeId)
                  // console.log("TypeId", Number(values.TypeId))
                  return (
                    <FormControlLabel
                      key={type.requestTypeId}
                      value={`${type.requestTypeId}`}
                      control={<Radio />}
                      label={type.arabicName}
                    />
                  );
                })}
              </Stack>
            </RadioGroup>
          </Box>

          {hasChildFeild && (
            <Box sx={{ m: 3 }}>
              <TextField
                select
                fullWidth
                label={`نوع ${childFeild && childFeild.arabicName}`}
                placeholder={`اختر نوع ${childFeild && childFeild.arabicName}`}
                {...getFieldProps('SubTypeId')}
                SelectProps={{ native: true }}
                error={Boolean(touched.SubTypeId && errors.SubTypeId)}
                helperText={touched.SubTypeId && errors.SubTypeId}
              >
                <option value="" />
                {childFeild &&
                  childFeild.requestSubTypes.map((option) => (
                    <option key={option.requestSubTypeId} value={option.requestSubTypeId}>
                      {option.arabicName}
                    </option>
                  ))}
              </TextField>
            </Box>
          )}

          <Box sx={{ m: 3 }}>
            <LabelStyle>معيار الخدمة </LabelStyle>
            <RadioGroup {...getFieldProps('StandardId')} row>
              <Stack spacing={1} direction="row">
                {requestStandardList.map((standard) => (
                  <PopupState
                    variant="popover"
                    popupId="demoPopover"
                    key={`${standard.requestStandardId}`}
                  >
                    {(popupState) => (
                      <div>
                        <FormControlLabel
                          value={`${standard.requestStandardId}`}
                          control={<Radio />}
                          label={standard.arabicName}
                          {...bindHover(popupState)}
                        />

                        <HoverPopover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'center'
                          }}
                          transformOrigin={{
                            vertical: 'top',
                            horizontal: 'center'
                          }}
                        >
                          <Typography sx={{ m: 1 }} variant="caption">
                            {standard.arabicDescription}
                          </Typography>
                        </HoverPopover>
                      </div>
                    )}
                  </PopupState>
                ))}
              </Stack>
            </RadioGroup>
            {touched.StandardId && errors.StandardId && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.StandardId && errors.StandardId}
              </FormHelperText>
            )}
          </Box>

          <Box sx={{ m: 3 }}>
            <LabelStyle>المرفقات</LabelStyle>
            <UploadMultiFile
              showPreview={false}
              maxSize={3145728}
              //accept="*/*"
              accept="application/pdf"
              files={values.Attachments}
              onDrop={handleDrop}
              onRemove={handleRemove}
              onRemoveAll={handleRemoveAll}
              error={Boolean(touched.Attachments && errors.Attachments)}
            />
            {touched.Attachments && errors.Attachments && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.Attachments && errors.Attachments}
              </FormHelperText>
            )}
          </Box>

          <Box sx={{ m: 3 }}>
            <LabelStyle> التفاصيل </LabelStyle>
            <QuillEditor
              simple
              id="request-detalis"
              value={values.Details}
              onChange={(val) => setFieldValue('Details', val)}
              error={Boolean(touched.Details && errors.Details)}
            />
            {touched.Details && errors.Details && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.Details && errors.Details}
              </FormHelperText>
            )}
          </Box>

          {/** submit request */}
          <Box sx={{ m: 3, display: 'flex', justifyContent: 'flex-end' }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              {!isEdit ? 'انشاء طلب' : 'تحديث الطلب'}
            </LoadingButton>
          </Box>
        </Card>
      </Form>
    </FormikProvider>
  );
}
