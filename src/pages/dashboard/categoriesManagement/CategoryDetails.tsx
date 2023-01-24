import { Fragment, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { PATH_DASHBOARD } from 'routes/paths';
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Skeleton,
  Stack,
  Typography
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import Label from 'components/Label';
import HeaderBreadcrumbs from '../../../components/HeaderBreadcrumbs';
import Page from '../../../components/Page';
import { RootState, useDispatch, useSelector } from '../../../redux/store';
import SubTitle from 'components/SubTitles';
import { getCategoryDetails } from 'redux/slices/categories';
import createAvatar from 'utils/createAvatar';

export default function CategoryDetails() {
  const dispatch = useDispatch();

  const systemTheme = useTheme();
  const { categoryId = '' } = useParams();

  const { categoryDetails, isLoading } = useSelector((state: RootState) => state.categories);
  useEffect(() => {
    dispatch(getCategoryDetails(categoryId));
  }, [dispatch, categoryId]);

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
    <Page title={`المواعيد: تفاصيل التصنيف   | Shwra`}>
      <Container maxWidth={categoryDetails ? false : 'lg'}>
        <HeaderBreadcrumbs
          heading={'تفاصيل التصنيف'}
          links={[
            { name: 'الرئيسية', href: PATH_DASHBOARD.root },
            { name: 'التصنيفات', href: PATH_DASHBOARD.appointments.admin },
            {
              name: `${
                categoryDetails?.arabicName === null
                  ? 'جارى التحميل ....'
                  : categoryDetails?.arabicName
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
              <Title>التصنيف </Title>
              <Grid container spacing={2}>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الاسم</SubTitle>
                  {isLoading ? (
                    <Skeleton />
                  ) : (
                    <Stack direction="row" spacing={2}>
                      <Avatar
                        src={categoryDetails?.iconURL}
                        alt={categoryDetails?.name}
                        color={
                          categoryDetails?.iconURL
                            ? 'default'
                            : createAvatar(categoryDetails?.name).color
                        }
                      />
                      <Typography variant="body1" display="block" sx={{ py: 1 }}>
                        {categoryDetails?.arabicName}
                      </Typography>
                    </Stack>
                  )}
                </Grid>
                <Grid item xs={12} md={12} lg={12}>
                  <SubTitle>الوصف</SubTitle>
                  {categoryDetails?.arabicDescription}
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <SubTitle>تاريخ الإنشاء </SubTitle>
                  <Typography dir="ltr" align="left">
                    {moment(categoryDetails?.createdDate).locale('ar').format('DD-MM-YYYY HH:mm A')}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <SubTitle>تم الإنشاء بواسطة</SubTitle>
                  {categoryDetails?.createdBy}
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <SubTitle>تاريخ آخر تعديل</SubTitle>
                  <Typography dir="ltr" align="left">
                    {moment(categoryDetails?.lastModifiedDate)
                      .locale('ar')
                      .format('DD-MM-YYYY HH:mm A')}
                  </Typography>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <SubTitle>تم التعديل بواسطة</SubTitle>
                  {categoryDetails?.lastModifiedBy}
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <SubTitle>الحالة</SubTitle>
                  <Label
                    variant={systemTheme.palette.mode === 'light' ? 'ghost' : 'filled'}
                    color={categoryDetails.isActive ? 'success' : 'error'}
                  >
                    {categoryDetails.isActive ? 'نشط' : 'غير نشط'}
                  </Label>
                </Grid>
                <Grid item xs={12} md={3} lg={3}>
                  <SubTitle>الترتيب</SubTitle>
                  {categoryDetails?.sortOrder}
                </Grid>
              </Grid>
            </Box>
          </Card>
        </Fragment>
      </Container>
    </Page>
  );
}
