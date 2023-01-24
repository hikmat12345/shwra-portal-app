import { Box, Card, Container, Grid, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Label from 'components/Label';
import SubTitle from 'components/SubTitles';
import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { getFeatureDetails } from 'redux/slices/features';
import { PATH_DASHBOARD } from 'routes/paths';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import { RootState, useDispatch, useSelector } from '../../../redux/store';

export default function FeatureDetails() {
  const dispatch = useDispatch();

  const systemTheme = useTheme();
  const { featureId = '' } = useParams();

  const { featureDetails, isLoading } = useSelector((state: RootState) => state.features);
  useEffect(() => {
    dispatch(getFeatureDetails(featureId));
  }, [dispatch, featureId]);

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
    <Page title={`ميزات الباقة : تفاصيل الميزة   | Shwra`}>
      <Container maxWidth={featureDetails ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'تفاصيل الميزة'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'ميزات الباقة', href: PATH_DASHBOARD.features.list },
            {
              name: `${
                featureDetails?.featureId === null ? 'جارى التحميل ....' : featureDetails?.featureId
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
              <Title>الميزة </Title>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الميزة</SubTitle>
                  {featureDetails?.detail}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الميزة بالعربية</SubTitle>
                  {featureDetails?.detailArabic}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  {' '}
                  <SubTitle>الحالة</SubTitle>
                  <Label
                    variant={systemTheme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={featureDetails.isActive ? 'success' : 'error'}
                  >
                    {featureDetails.isActive ? 'نشط' : 'غير نشط'}
                  </Label>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تم الإنشاء بواسطة</SubTitle>
                  {featureDetails?.createdBy || '-'}
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تاريخ الإنشاء </SubTitle>
                  <Typography dir="ltr" align="left">
                    {featureDetails?.createdDate
                      ? moment(featureDetails?.createdDate)
                          .locale('ar')
                          .format('DD-MM-YYYY HH:mm A')
                      : '-'}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تم التعديل بواسطة</SubTitle>
                  {featureDetails?.lastModifiedBy || '-'}
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تاريخ آخر تعديل</SubTitle>
                  <Typography dir="ltr" align="left">
                    {featureDetails?.lastModifiedDate
                      ? moment(featureDetails?.lastModifiedDate)
                          .locale('ar')
                          .format('DD-MM-YYYY HH:mm A')
                      : '-'}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <SubTitle>ميزات الحزمة</SubTitle>

                  {featureDetails.packageFeatures || '-'}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Fragment>
      </Container>
    </Page>
  );
}
