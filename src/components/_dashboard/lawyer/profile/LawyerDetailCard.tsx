import { Box, Card, Divider, Grid, List, ListItem, Typography } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import FilePreview from 'components/file/FilePreview';
import SubTitle from 'components/SubTitles';
import RequestActionManage from 'components/_dashboard/request/details/RequestActionManage';
import moment from 'moment';
import { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { updateLawyerStatus } from 'redux/slices/lawyer';
import { genderOptions, typesOptions } from 'utils/enums';
import { colorizeLawyerStatus } from 'utils/functions';
import { getFullName } from '../../../../utils/helper';
import Label from '../../../Label';

// ----------------------------------------------------------------------

type LawyerDetailCardProps = {
  lawyer: any;
  isLoading?: boolean;
};

export default function LawyerDetailCard({ lawyer, isLoading }: LawyerDetailCardProps) {
  const theme = useTheme();
  const dispatch = useDispatch();
  return (
    <Card
      sx={{
        mb: 3,
        p: { xs: 3, md: 5 },
        position: 'relative'
      }}
    >
      <Grid
        container
        spacing={1}
        sx={{
          mb: { xs: 4, md: 4 },
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'flex-end'
        }}
      >
        <RequestActionManage
          dropDownText={'إدارة حالة المحامي'}
          changeRequestStatus={(id) => {
            dispatch(updateLawyerStatus(lawyer?.lawyerId, parseInt(id?.actionId)));
          }}
          list={
            lawyer.status === 0
              ? [
                  { id: 2, name: 'رفض' },
                  { id: 1, name: 'قبول' }
                ]
              : lawyer.status === 1
              ? [{ id: 2, name: 'رفض' }]
              : [{ id: 1, name: 'قبول' }]
          }
          buttonDisabled={isLoading}
        />
      </Grid>
      <Divider sx={{ mb: { xs: 4, md: 4 } }} />

      <Grid container spacing={2} sx={{ mb: { xs: 4, md: 4 } }}>
        <Grid item xs={6} md={3} lg={3}>
          <SubTitle> اسم المحامى </SubTitle>
          {getFullName(lawyer)}
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <SubTitle> البريد الالكترونى </SubTitle>
          {lawyer?.email}
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: { xs: 4, md: 4 } }}>
        <Grid item xs={6} md={3} lg={3}>
          <SubTitle> الجنس </SubTitle>
          {genderOptions?.map((gender, i) => {
            return <Fragment key={i}>{gender.value === lawyer.gender && gender.label}</Fragment>;
          })}
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <SubTitle> الحالة </SubTitle>
          <Label
            variant={theme.palette.mode === 'light' ? 'ghost' : 'filled'}
            color={colorizeLawyerStatus(lawyer.status)}
          >
            {lawyer.status === 0
              ? 'قيد الإنتظار'
              : lawyer?.status === 1
              ? 'مقبول'
              : lawyer?.status === 2
              ? 'مرفوض'
              : '-'}
          </Label>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: { xs: 4, md: 4 } }}>
        <Grid item xs={6} md={3} lg={3}>
          <SubTitle> النوع </SubTitle>
          {typesOptions?.map((type, i) => {
            return <Fragment key={i}>{type.value === lawyer.type && type.label}</Fragment>;
          })}
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          {' '}
          <SubTitle> رقم الهاتف </SubTitle>
          {lawyer.phone || '-'}
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ mb: { xs: 4, md: 4 } }}>
        <Grid item xs={6} md={3} lg={3}>
          <SubTitle> تاريخ الاضافة </SubTitle>
          <Typography dir="ltr" align="left">
            {lawyer?.createdDate
              ? moment(lawyer?.createdDate).locale('ar').format('DD-MM-YYYY HH:mm A')
              : '-'}
          </Typography>
        </Grid>
        <Grid item xs={6} md={3} lg={3}>
          <SubTitle> تاريخ التعديل </SubTitle>

          <Typography dir="ltr" align="left">
            {lawyer?.lastModifiedDate
              ? moment(lawyer?.lastModifiedDate).locale('ar').format('DD-MM-YYYY HH:mm A')
              : '-'}
          </Typography>
        </Grid>
      </Grid>
      <Box>
        <SubTitle
          style={{
            marginBottom: 0
          }}
        >
          {' '}
          رخصة المحامي
        </SubTitle>{' '}
        <List>
          {' '}
          {lawyer?.lawyerLicense ? (
            <>
              <FilePreview src={lawyer?.lawyerLicense} />
            </>
          ) : (
            '-'
          )}
        </List>
      </Box>
      <Box>
        <SubTitle
          style={{
            marginBottom: 0
          }}
        >
          السيرة الذاتية
        </SubTitle>{' '}
        <List>
          {' '}
          {lawyer?.cv ? (
            <>
              <FilePreview src={lawyer?.cv} />
            </>
          ) : (
            '-'
          )}
        </List>
      </Box>
      <Box>
        <SubTitle
          style={{
            marginBottom: 0
          }}
        >
          {' '}
          الشهادات التعليمية
        </SubTitle>{' '}
        <List>
          {' '}
          {lawyer?.educationalCertificates?.length > 0 ? (
            <>
              {lawyer?.educationalCertificates?.map((certificate: any, i: number) => {
                return <FilePreview key={i} src={certificate} />;
              })}
            </>
          ) : (
            '-'
          )}
        </List>
      </Box>
      <Box>
        <SubTitle
          style={{
            marginBottom: 0
          }}
        >
          ملفات أخرى
        </SubTitle>{' '}
        <List>
          {' '}
          {lawyer?.otherDocuments?.length > 0 ? (
            <>
              {lawyer?.otherDocuments?.map((doc: any, i: number) => {
                return <FilePreview key={i} src={doc} />;
              })}
            </>
          ) : (
            '-'
          )}
        </List>
      </Box>
      <Grid container spacing={2} sx={{ mb: { xs: 4, md: 4 } }}>
        <Grid item xs={6} md={3} lg={3}>
          <SubTitle>التصنيفات</SubTitle>
          {lawyer?.categories?.length > 0 ? (
            <List>
              {lawyer?.categories?.map((category: any) => {
                return (
                  <ListItem key={category?.mobileRequestCategoryId}>{category?.name}</ListItem>
                );
              })}
            </List>
          ) : (
            '-'
          )}
        </Grid>
      </Grid>
    </Card>
  );
}
