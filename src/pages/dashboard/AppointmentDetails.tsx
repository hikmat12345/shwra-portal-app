import { Fragment, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getAppointmentDetails } from 'redux/slices/appointment';
import moment from 'moment';
import { PATH_DASHBOARD } from 'routes/paths';
import { Avatar, Box, Card, Container, Divider, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Label from 'components/Label';
import HeaderBreadcrumbs from '../../components/HeaderBreadcrumbs';
import Page from '../../components/Page';
import { RootState, useDispatch, useSelector } from '../../redux/store';
import UserProfilePlaceHolder from 'assets/user_profile_placeholder';
import FilePreviewList from 'components/file/FilePreviewList';
import { colorizeAdminAppontmentStatus, getData } from 'utils/functions';
import SubTitle from 'components/SubTitles';

export default function AppointmentDetails({ role = 'admin' }: { role?: 'lawyer' | 'admin' }) {
  const dispatch = useDispatch();
  const [customerPic, setCustomerPic] = useState<any>('');
  const [lawyerPic, setLawyerPic] = useState<any>('');
  const systemTheme = useTheme();
  const { appointmentId = '' } = useParams();

  const { appointmentDetails } = useSelector((state: RootState) => state.appointment);
  useEffect(() => {
    dispatch(getAppointmentDetails(appointmentId));
  }, [dispatch, appointmentId]);

  const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    borderBottom: `2px solid ${systemTheme.palette.primary.main}`,
    width: 'auto',
    display: 'inline-block',
    paddingBottom: 5
  }));

  useEffect(() => {
    if (appointmentDetails?.customerImage) {
      getData(appointmentDetails?.customerImage, setCustomerPic);
    }
    if (appointmentDetails?.lawyerImage) {
      getData(appointmentDetails?.lawyerImage, setLawyerPic);
    }
  }, [appointmentDetails]);
  return (
    <Page title={`المواعيد: تفاصيل الموعد   | Shwra`}>
      <Container maxWidth={appointmentDetails ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'تفاصيل الموعد'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'كل المواعيد', href: PATH_DASHBOARD.appointments.admin },
            {
              name: `${
                appointmentDetails?.lawyerName === null
                  ? 'جارى التحميل ....'
                  : appointmentDetails?.lawyerName
              }`
            }
          ]}
        />

        <Fragment>
          <Card
            sx={{
              mb: 3,
              p: { xs: 3, md: 5 },
              position: 'relative'
            }}
          >
            <Box sx={{ mb: { xs: 4, md: 4 } }}>
              <Title>الموعد </Title>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>التاريخ والموعد</SubTitle>
                  <Typography dir="ltr" align="left">
                    {moment(appointmentDetails?.appointmentDate).locale('ar').format('DD-MM-YYY')}
                    {` ${appointmentDetails?.appointmentTime}`}
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>الحالة</SubTitle>
                  <Label
                    variant={systemTheme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={colorizeAdminAppontmentStatus(appointmentDetails?.statusId)}
                  >
                    {appointmentDetails?.statusName}
                  </Label>
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>التصنيف</SubTitle>
                  {appointmentDetails?.categoryName}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>التفاصيل</SubTitle>
                  {appointmentDetails?.details}
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ mb: { xs: 4, md: 4 } }} />

            <Box sx={{ mb: { xs: 4, md: 4 } }}>
              <Title>المحامي </Title>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>الاسم</SubTitle>
                  {appointmentDetails?.lawyerName}
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>الهاتف</SubTitle>
                  {appointmentDetails?.lawyerNumber || '-'}
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>الجنس</SubTitle>
                  {appointmentDetails?.lawyerGender === 0 ? 'ذكر' : 'أنثى' || '-'}
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>صورة المحامي</SubTitle>
                  {appointmentDetails?.lawyerImage ? (
                    <Avatar
                      alt={appointmentDetails?.lawyerName || ''}
                      src={lawyerPic ? lawyerPic : '/static/icons/ic_notification_shipping.svg'}
                      sx={{ width: 48, height: 48 }}
                    />
                  ) : (
                    <UserProfilePlaceHolder style={{ width: 40, height: 40 }} />
                  )}
                </Grid>
              </Grid>
            </Box>
            {role !== 'lawyer' && (
              <>
                <Divider sx={{ mb: { xs: 4, md: 4 } }} />

                <Box sx={{ mb: { xs: 4, md: 4 } }}>
                  <Title>العميل </Title>
                  <Grid container spacing={2}>
                    <Grid item xs={6} md={3} lg={3}>
                      <SubTitle>الاسم</SubTitle>
                      {appointmentDetails?.customerName}
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <SubTitle>الهاتف</SubTitle>
                      {appointmentDetails?.customerNumber || '-'}
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <SubTitle>الجنس</SubTitle>
                      {appointmentDetails?.customerGender === 1
                        ? 'أنثى'
                        : (appointmentDetails?.customerGender === 0 && 'ذكر') || '-'}
                    </Grid>
                    <Grid item xs={6} md={3} lg={3}>
                      <SubTitle>صورة العميل</SubTitle>
                      {appointmentDetails?.customerImage ? (
                        <>
                          <Avatar
                            alt={appointmentDetails?.customerName || 'customer pic'}
                            src={
                              customerPic
                                ? customerPic
                                : '/static/icons/ic_notification_shipping.svg'
                            }
                            sx={{ width: 48, height: 48 }}
                          />
                        </>
                      ) : (
                        <UserProfilePlaceHolder style={{ width: 40, height: 40 }} />
                      )}
                    </Grid>
                  </Grid>
                </Box>
              </>
            )}
            <Divider sx={{ mb: { xs: 4, md: 4 } }} />
            <Box sx={{ mb: { xs: 4, md: 4 } }}>
              <Title>تفاصيل الموعد </Title>
              <Box sx={{ mb: { xs: 2, md: 2 } }}>
                <SubTitle>الرقم</SubTitle>
                {appointmentDetails?.appointmentId}
              </Box>
            </Box>

            <Divider sx={{ mb: { xs: 4, md: 4 } }} />

            <Box sx={{ mb: { xs: 4, md: 4 } }}>
              <Title>عملية الدفع </Title>
              <Grid container spacing={2}>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>المبلغ</SubTitle>
                  <Typography dir="ltr" align="left">
                    {appointmentDetails?.totalAmount} SAR
                  </Typography>
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>حالة العملية</SubTitle>
                  <Label
                    variant={systemTheme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color="info"
                  >
                    {appointmentDetails?.paymentStatus}
                  </Label>
                </Grid>
                <Grid item xs={6} md={3} lg={3}>
                  <SubTitle>نسبة الخصم</SubTitle>

                  <Typography dir="ltr" align="left">
                    {console.log(
                      appointmentDetails?.totalAmount,
                      appointmentDetails?.paymentAmount
                    )}
                    {appointmentDetails?.totalAmount &&
                    appointmentDetails?.paymentAmount &&
                    appointmentDetails?.totalAmount !== appointmentDetails?.paymentAmount
                      ? (
                          100 -
                          (appointmentDetails?.paymentAmount / appointmentDetails?.totalAmount) *
                            100
                        ).toFixed(3)
                      : 0}{' '}
                    %
                  </Typography>
                </Grid>
              </Grid>
            </Box>

            <Divider sx={{ mb: { xs: 4, md: 4 } }} />

            <Box sx={{ mb: { xs: 4, md: 4 } }}>
              <Title> المرفقات</Title>
              {appointmentDetails?.attachedFiles?.length > 0 ? (
                <FilePreviewList attachments={appointmentDetails?.attachedFiles} />
              ) : (
                <Typography variant="body1" display="block" sx={{ py: 1 }}>
                  لا يوجد مرفقات
                </Typography>
              )}
            </Box>
          </Card>
        </Fragment>
      </Container>
    </Page>
  );
}
