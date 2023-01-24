import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PATH_DASHBOARD } from 'routes/paths';
import { Card, Container, Typography } from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
// import { getPromotionDetails } from 'redux/slices/promotions';

export default function PromotionDetails() {
  const dispatch = useDispatch();

  const systemTheme = useTheme();
  const { promotionId = '' } = useParams();

  const { promotionDetails, isLoading } = useSelector((state: RootState) => state.promotions);
  useEffect(() => {
    // dispatch(getPromotionDetails(promotionId));
  }, [dispatch, promotionId]);

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
    <Page title={`أكواد الخصم: تفاصيل كود الخصم   | Shwra`}>
      <Container maxWidth={promotionDetails ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'تفاصيل كود الخصم'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'الباقات', href: PATH_DASHBOARD.promotions.list },
            {
              name: `${
                promotionDetails?.codeId === null
                  ? 'جارى التحميل ....'
                  : promotionDetails?.codeId
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
            {/* <Box sx={{ mb: { xs: 4, md: 4 } }}>
              <Title>كود الخصم </Title>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الاسم</SubTitle>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        src={promotionDetails?.iconURL}
                        alt={promotionDetails?.name}
                        color={
                          promotionDetails?.iconURL
                            ? 'default'
                            : createAvatar(promotionDetails?.name).color
                        }
                      />
                      <Typography variant="body1" display="block" sx={{ py: 1 }}>
                        {promotionDetails?.codeId}
                      </Typography>
                    </Stack>
                  )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الوصف</SubTitle>
                  {promotionDetails?.description_Arabic}
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تاريخ الإنشاء </SubTitle>
                  <Typography dir="ltr" align="left">
                    {moment(promotionDetails?.createdDate).locale('ar').format('DD-MM-YYYY HH:mm A')}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تم الإنشاء بواسطة</SubTitle>
                  {promotionDetails?.createdBy}
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تاريخ آخر تعديل</SubTitle>
                  <Typography dir="ltr" align="left">
                    {moment(promotionDetails?.lastModifiedDate)
                      .locale('ar')
                      .format('DD-MM-YYYY HH:mm A')}
                  </Typography>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  {' '}
                  <SubTitle>تم التعديل بواسطة</SubTitle>
                  {promotionDetails?.lastModifiedBy}
                </Grid>

                <Grid item xs={12} md={12} lg={12}>
                  {' '}
                  <SubTitle>الحالة</SubTitle>
                  <Label
                    variant={systemTheme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={promotionDetails.isActive ? 'success' : 'error'}
                  >
                    {promotionDetails.isActive ? 'نشط' : 'غير نشط'}
                  </Label>
                </Grid>

                <Grid item xs={12} md={6} lg={6}>
                  <SubTitle>متابعة</SubTitle>
                  <Label
                    variant={systemTheme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={promotionDetails.isFollowUp ? 'success' : 'error'}
                  >
                    {promotionDetails.isFollowUp ? 'نعم' : 'لا'}
                  </Label>
                </Grid>
                <Grid item xs={12} md={6} lg={6}>
                  <SubTitle>وقت المتابعة</SubTitle>

                  {promotionDetails.followUpTimeDuration}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>المقدار</SubTitle>
                  {promotionDetails.amount}
                </Grid>
              </Grid>
            </Box> */}
          </Card>
        </Fragment>
      </Container>
    </Page>
  );
}
