import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Link, Container, Typography, Tabs, Tab } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import RegisterForm from '../../components/authentication/register/client/RegisterForm';
import { Fragment, useState } from 'react';
import LawyerRegisterForm from 'components/authentication/register/lawyer/RegisterForm';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 464,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'flex-start',
  margin: theme.spacing(2, 0, 2, 2)
}));

const ContentStyle = styled('div')(({ theme }) => ({
  maxWidth: 480,
  margin: 'auto',
  display: 'flex',
  minHeight: '100vh',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

const TabsWrapperStyle = styled('div')(({ theme }) => ({
  width: '100%',
  display: 'flex',
  marginBottom: '1rem',
  backgroundColor: theme.palette.background.paper,
  [theme.breakpoints.up('sm')]: {
    justifyContent: 'center'
  },
  [theme.breakpoints.up('md')]: {
    justifyContent: 'flex-start',
    paddingRight: theme.spacing(3)
  }
}));

export default function Register() {
  const [currentTab, setCurrentTab] = useState('adminRegistration');

  const registrationTabs = [
    {
      value: 'adminRegistration',
      label: 'إنشاء حساب جديد للعميل',
      icon: <> </>,
      component: <RegisterForm />
    },
    {
      value: 'clientRegistration',
      label: 'إنشاء حساب جديد للمحامي',
      icon: <> </>,
      component: <LawyerRegisterForm formGrid={12} imageGrid={12} />
    }
  ];

  return (
    <RootStyle title="انشاء حساب فى شورى | شورى">
      <AuthLayout>
        {' لديك حساب بالفعل؟'}&nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.login}>
          تسجيل الدخول
        </Link>
      </AuthLayout>

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5 }}>
            شورى للأعمال
          </Typography>
          <img alt="register" src="/logo.svg" />
        </SectionStyle>
      </MHidden>

      <Container>
        <ContentStyle>
          <Box sx={{ mb: 5, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ flexGrow: 1 }}>
              <Typography variant="h4" gutterBottom>
                انشاء حساب فى شورى.
              </Typography>
            </Box>
          </Box>
          <RootStyle>
            {/*  */}
            <TabsWrapperStyle>
              <Tabs
                value={currentTab}
                scrollButtons="auto"
                variant="scrollable"
                allowScrollButtonsMobile
                onChange={(e, value) => setCurrentTab(value)}
              >
                {registrationTabs.map((tab) => (
                  <Tab
                    disableRipple
                    key={tab.value}
                    label={tab.label}
                    icon={tab.icon}
                    value={tab.value}
                  />
                ))}
              </Tabs>
            </TabsWrapperStyle>
          </RootStyle>

          {registrationTabs.map((tab) => {
            const isMatched = tab.value === currentTab;
            return isMatched && <Fragment key={tab.value}>{tab.component}</Fragment>;
          })}

          <MHidden width="smUp">
            <Typography variant="subtitle2" sx={{ mt: 3, textAlign: 'center' }}>
              لدى حساب بالفعل ?&nbsp;
              <Link to={PATH_AUTH.login} component={RouterLink}>
                تسجيل الدخول
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
