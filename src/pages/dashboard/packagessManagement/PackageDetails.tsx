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
import { getPackageDetails } from 'redux/slices/packages';
import createAvatar from 'utils/createAvatar';

export default function PackageDetails() {
  const dispatch = useDispatch();

  const systemTheme = useTheme();
  const { packageId = '' } = useParams();

  const { packageDetails, isLoading } = useSelector((state: RootState) => state.packages);
  useEffect(() => {
    dispatch(getPackageDetails(packageId));
  }, [dispatch, packageId]);

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
    <Page title={`المواعيد: تفاصيل الباقة   | Shwra`}>
      <Container maxWidth={packageDetails ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'تفاصيل الباقة'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الباقات', href: PATH_DASHBOARD.packages.list },
            {
              name: `${
                packageDetails?.name_Arabic === null
                  ? 'جارى التحميل ....'
                  : packageDetails?.name_Arabic
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
              <Title>الباقة </Title>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الاسم</SubTitle>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        src={packageDetails?.iconURL}
                        alt={packageDetails?.name}
                        color={
                          packageDetails?.iconURL
                            ? 'default'
                            : createAvatar(packageDetails?.name).color
                        }
                      />
                      <Typography variant="body1" display="block" sx={{ py: 1 }}>
                        {packageDetails?.name_Arabic}
                      </Typography>
                    </Stack>
                  )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الوصف</SubTitle>
                  {packageDetails?.description_Arabic}
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تاريخ الإنشاء </SubTitle>
                  <Typography dir="ltr" align="left">
                    {moment(packageDetails?.createdDate).locale('ar').format('DD-MM-YYYY HH:mm A')}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تم الإنشاء بواسطة</SubTitle>
                  {packageDetails?.createdBy}
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تاريخ آخر تعديل</SubTitle>
                  <Typography dir="ltr" align="left">
                    {moment(packageDetails?.lastModifiedDate)
                      .locale('ar')
                      .format('DD-MM-YYYY HH:mm A')}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تم التعديل بواسطة</SubTitle>
                  {packageDetails?.lastModifiedBy}
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  {' '}
                  <SubTitle>الحالة</SubTitle>
                  <Label
                    variant={systemTheme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={packageDetails.isActive ? 'success' : 'error'}
                  >
                    {packageDetails.isActive ? 'نشط' : 'غير نشط'}
                  </Label>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <SubTitle>متابعة</SubTitle>
                  <Label
                    variant={systemTheme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={packageDetails.isFollowUp ? 'success' : 'error'}
                  >
                    {packageDetails.isFollowUp ? 'نعم' : 'لا'}
                  </Label>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <SubTitle>وقت المتابعة</SubTitle>

                  {packageDetails.followUpTimeDuration}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>المقدار</SubTitle>
                  {packageDetails.amount}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Fragment>
      </Container>
    </Page>
  );
}
