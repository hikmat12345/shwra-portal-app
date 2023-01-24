// material
import { styled } from '@mui/material/styles';
import { Box, Card, Container, Typography } from '@mui/material';
// routes
// layouts
import AuthLayout from '../../layouts/AuthLayout';
import AccountPopover from '../../layouts/dashboard/AccountPopover';
// components
import Page from '../../components/Page';
import { MHidden } from '../../components/@material-extend';

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
  justifyContent: 'center',
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

export default function AccountBlocked() {
  return (
    <RootStyle title="استكمال الملف الشخصى | شورى">
      <AuthLayout>
        <AccountPopover />
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
                هذا الحساب تم تعطيله
              </Typography>
            </Box>
          </Box>
        </ContentStyle>
      </Container>
    </RootStyle>
  );
}
