import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { PATH_DASHBOARD } from 'routes/paths';
import { Avatar, Box, Card, Container, Grid, Skeleton, Stack, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Label from 'components/Label';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import SubTitle from 'components/SubTitles';
import createAvatar from 'utils/createAvatar';
import { getComplaintsDetails } from 'redux/slices/complaints';

export default function ComplaintsDetails() {
  const dispatch = useDispatch();

  const systemTheme = useTheme();
  const { complaintId = '' } = useParams();

  const { complaintDetails, isLoading } = useSelector((state: RootState) => state.complaints);
  useEffect(() => {
    dispatch(getComplaintsDetails(complaintId));
  }, [dispatch, complaintId]);

  const Title = styled(Typography)(({ theme }) => ({
    ...theme.typography.subtitle1,
    color: theme.palette.text.primary,
    marginBottom: theme.spacing(2),
    borderBottom: `2px solid ${systemTheme.palette.primary.main}`,
    width: 'auto',
    display: 'inline-block',
    paddingBottom: 5
  }));
  return (
    <Page title={`المواعيد: تفاصيل الشكاوى و المقترحات   | Shwra`}>
      <Container maxWidth={complaintDetails ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'تفاصيل الشكاوى و المقترحات'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الشكاوى و المقترحات', href: PATH_DASHBOARD.appointments.admin },
            {
              name: `${
                complaintDetails?.name === null ? 'جارى التحميل ....' : complaintDetails?.name
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
              <Title>الشكاوى و المقترحات </Title>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الاسم</SubTitle>
                  {complaintDetails?.name}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>رقم الهاتف</SubTitle>
                  {complaintDetails?.phoneNumber}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>البريد الإلكتروني</SubTitle>
                  {complaintDetails?.email}
                </Grid>
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <SubTitle>الوصف</SubTitle>
                {complaintDetails?.detail}
              </Grid>
              <Grid item xs={12} md={12} lg={12}>
                <SubTitle>نوع</SubTitle>
                {complaintDetails?.type === 'complaint' ? 'شكوى' : 'مقترح'}
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <SubTitle>تاريخ الإنشاء </SubTitle>
                <Typography dir="ltr" align="left">
                  {complaintDetails?.createdDate
                    ? moment(complaintDetails?.createdDate)
                        .locale('ar')
                        .format('DD-MM-YYYY HH:mm A')
                    : '-'}
                </Typography>
              </Grid>
              <Grid item xs={12} md={3} lg={3}>
                <SubTitle>تاريخ التعديل</SubTitle>
                <Typography dir="ltr" align="left">
                  {complaintDetails?.updatedDate
                    ? moment(complaintDetails?.updatedDate)
                        .locale('ar')
                        .format('DD-MM-YYYY HH:mm A')
                    : '-'}
                </Typography>
              </Grid>
            </Box>
          </Card>
        </Fragment>
      </Container>
    </Page>
  );
}
