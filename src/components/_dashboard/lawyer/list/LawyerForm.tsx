import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useFormik, Form, FormikProvider } from 'formik';
import {
  Box,
  Button,
  TextField,
  DialogContent,
  DialogActions,
  Stack
} from '@mui/material';
import { LoadingButton } from '@mui/lab';
// redux
import { useDispatch } from '../../../../redux/store';
import { getLawyerList } from '../../../../redux/slices/lawyer';
import axios from '../../../../utils/axios'

type LawyerFormProps = {
  lawyer?: any;
  onCancel: VoidFunction;
};

export default function LawyerForm({ lawyer, onCancel }: LawyerFormProps) {
  const { enqueueSnackbar } = useSnackbar();
  const dispatch = useDispatch();
  const isCreating = !lawyer;

  const LawyerSchema = Yup.object().shape({
    firstName: Yup.string().required('الاسم مطلوب'),
    lastName: Yup.string().required('الاسم مطلوب'),
    email: Yup.string().required('الايميل مطلوب'),
    password: Yup.string().required('كلمة المرور مطلوبة').matches(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
        "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and one special case Character"
      ),
  });

  const formik = useFormik({
    initialValues: {
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        categoriesIds: [],
        confirmPassword:'',
        userName:'',

    },
    validationSchema: LawyerSchema,
    onSubmit: async (values) => {
      try {
        values.confirmPassword = values.password
        values.userName = values.email
        const response = await axios.post('/Lawyers',values);
        enqueueSnackbar('تم اضافة المحامى بنجاح', { variant: 'success' });
        if(response.status === 201){
          onCancel();
          dispatch(getLawyerList({
            page: 1,
            size: 1000
          }));
        }
      } catch (error:any) {
        Object.values(error.errors).flat().map((item:any)=>
        enqueueSnackbar(item, { variant: 'error' })
        )
      }
    }
  });

  const { values, errors, touched, handleSubmit, isSubmitting, getFieldProps, setFieldValue } = formik;

  return (
    <FormikProvider value={formik}>
      <Form autoComplete="off" noValidate onSubmit={handleSubmit}>
        <DialogContent sx={{ pb: 0, overflowY: 'unset' }}>
            <Stack direction={{ xs: 'column', sm: 'row'  }} spacing={2}>
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
            <Box sx={{ pt: 3 }}>
                <TextField
                    fullWidth
                    autoComplete="username"
                    type="email"
                    label="البريد الاليكترونى"
                    {...getFieldProps('email')}
                    error={Boolean(touched.email && errors.email)}
                    helperText={touched.email && errors.email}
                />
            </Box>
            <Box sx={{ py: 3 }}>
                <TextField
                    fullWidth
                    label="كلمة المرور"
                    {...getFieldProps('password')}
                    error={Boolean(touched.password && errors.password)}
                    helperText={touched.password && errors.password}
                    type="password"
                    autoComplete="new-password"
                />
            </Box>

        </DialogContent>
        <DialogActions>
          <Button type="button" variant="outlined" color="inherit" onClick={onCancel}>
            الغاء
          </Button>
          <LoadingButton
            type="submit"
            variant="contained"
            loading={isSubmitting}
            loadingIndicator="Loading..."
          >
            اضافه
          </LoadingButton>
        </DialogActions>

      </Form>
    </FormikProvider>
  );
}
