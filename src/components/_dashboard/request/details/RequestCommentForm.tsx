import * as Yup from 'yup';
import { useEffect, useCallback } from 'react';
import { useFormik, Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
// material
import { styled } from '@mui/material/styles';
import { Box, Typography, FormHelperText } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// hooks
import useMultiFileUpload from '../../../../hooks/useMultiFileUpload';
// redux
import { useDispatch } from '../../../../redux/store';
import { createRequestComment } from '../../../../redux/slices/request';
// utils
import { UploadMultiFile } from '../../../upload';
import { QuillEditor } from '../../../editor';

// ----------------------------------------------------------------------

const RootStyles = styled('div')(({ theme }) => ({
  padding: theme.spacing(3),
  borderRadius: theme.shape.borderRadiusMd,
  backgroundColor: theme.palette.background.neutral
}));

const LabelStyle = styled(Typography)(({ theme }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1)
}));

// ----------------------------------------------------------------------

type FormValues = {
  body: string;
  requestId: string;
  Attachments: File[];
};

type RequestCommentFormProps = {
  requestId: string;
};

export default function RequestCommentForm({ requestId }: RequestCommentFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();

  const CommentSchema = Yup.object().shape({
    body: Yup.string().required('محتوى التعليق مطلوب')
  });

  const formik = useFormik<FormValues>({
    initialValues: {
      body: '',
      requestId: requestId,
      Attachments: []
    },
    validationSchema: CommentSchema,
    onSubmit: async (values, { setSubmitting, resetForm, setErrors }) => {
      try {
        await dispatch(createRequestComment(values));

        resetForm();

        setSubmitting(false);

        enqueueSnackbar('تم اضافة التعليق بنجاح', { variant: 'success' });
      } catch (error) {
        console.error(error);
        setSubmitting(false);
        setErrors(error.code);
      }
    }
  });

  const { errors, values, touched, handleSubmit, isSubmitting, setFieldValue } = formik;
  ///------------------------------------------------------------

  const { files, handleNewFile, removeOneFile, removeAllFile } = useMultiFileUpload();

  const handleDrop = useCallback(
    (acceptedFiles) => {
      handleNewFile({
        file: acceptedFiles
      });
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
    removeOneFile(file);
  };

  return (
    <RootStyles>
      <Typography variant="subtitle1" sx={{ mb: 3 }}>
        اضف رد
      </Typography>
      <FormikProvider value={formik}>
        <Form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <Box>
            <LabelStyle> الرد * </LabelStyle>
            <QuillEditor
              simple
              id="ticket-body"
              value={values.body}
              onChange={(val) => setFieldValue('body', val)}
              error={Boolean(touched.body && errors.body)}
            />
            {touched.body && errors.body && (
              <FormHelperText error sx={{ px: 2 }}>
                {touched.body && errors.body}
              </FormHelperText>
            )}
          </Box>

          <Box sx={{ m: 3 }}>
            <LabelStyle>المرفقات</LabelStyle>
            <UploadMultiFile
              showPreview={false}
              maxSize={3145728}
              //accept="*/*"
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

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            <LoadingButton type="submit" variant="contained" loading={isSubmitting}>
              اضافه الرد
            </LoadingButton>
          </Box>
        </Form>
      </FormikProvider>
    </RootStyles>
  );
}
