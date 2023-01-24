import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Card, Stack, Link, Alert, Container, Typography } from '@mui/material';
// routes
import { PATH_AUTH } from '../../routes/paths';
// layouts
import AuthLayout from '../../layouts/AuthLayout';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';
import { LoginForm } from '../../components/authentication/login';
import { padding } from '@mui/system';
import Logo from 'components/Logo';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  [theme.breakpoints.up('md')]: {
    display: 'flex'
  }
}));

const SectionStyle = styled(Card)(({ theme }) => ({
  width: '100%',
  maxWidth: 497,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  margin: theme.spacing(2, 0, 2, 2),
  padding:theme.spacing(4)
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

export default function Login() {

  return (
    <RootStyle title="تسجيل الدخول | شورى">
      {/* <AuthLayout>
        {'ليس لديك حساب؟'}&nbsp;
        <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
        سجل الآن 
        </Link>
      </AuthLayout> */}

      <MHidden width="mdDown">
        <SectionStyle>
          <Typography variant="h3" sx={{ px: 5, mt: 10, mb: 5, display:"flex" }}>
          <span><Logo/></span> <span>شورى للأعمال </span> 
          </Typography>
          <Typography variant="h4" gutterBottom>
                تسجيل الدخول الى شورى
              </Typography>
          {/* <img alt="register" src="/logo.svg" /> */}
          <LoginForm />
           <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {'ليس لديك حساب؟'}&nbsp;
              <Link underline="none" variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
              سجل الآن 
              </Link>
          </Typography> 
        </SectionStyle>
 
      </MHidden>

      <Container maxWidth="sm">
        <ContentStyle>
          <Stack direction="row" alignItems="center" sx={{ mb: 5 }}>
            <Box sx={{ flexGrow: 1 }}>
              
            </Box>
          </Stack>
         
          <MHidden width="smUp">
            <Typography variant="body2" align="center" sx={{ mt: 3 }}>
              {'ليس لدى حساب؟'}&nbsp;
              <Link variant="subtitle2" component={RouterLink} to={PATH_AUTH.register}>
                ابدأ الان
              </Link>
            </Typography>
          </MHidden>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
