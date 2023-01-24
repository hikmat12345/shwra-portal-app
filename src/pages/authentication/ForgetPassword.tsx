import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
// material
import { styled } from '@mui/material/styles';
import { Box, Button, Container, Typography } from '@mui/material';
// layouts
import LogoOnlyLayout from '../../layouts/LogoOnlyLayout';
// routes
import { PATH_AUTH } from '../../routes/paths';
// components
import Page from '../../components/Page';
import { ForgetPasswordForm } from '../../components/authentication/forget-password';
//
import { SentIcon } from '../../assets';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center',
  justifyContent: 'center',
  padding: theme.spacing(12, 0)
}));

// ----------------------------------------------------------------------

export default function ForgetPassword() {
  const [email, setEmail] = useState('');
  const [sent, setSent] = useState(false);

  return (
    <RootStyle title="اعادة تعيين كلمة المرور | شورى">
      <LogoOnlyLayout />

      <Container>
        <Box sx={{ maxWidth: 480, mx: 'auto' }}>
          {!sent ? (
            <>
              <Typography variant="h3" paragraph>
                {'نسيت كلمة المرور؟'}
              </Typography>
              <Typography sx={{ color: 'text.secondary', mb: 5 }}>
                {'يرجى إدخال عنوان البريد الإلكتروني المرتبط بحسابك وسنرسل لك عبر البريد الإلكتروني رابطًا لإعادة تعيين كلمة المرور الخاصة بك.'}
              </Typography>

              <ForgetPasswordForm
                onSent={() => setSent(true)}
                onGetEmail={(value) => setEmail(value)}
              />

              <Button
                fullWidth
                size="large"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 1 }}
              >
                {'العودة إلى صفحة الدخول'}
              </Button>
            </>
          ) : (
            <Box sx={{ textAlign: 'center' }}>
              <SentIcon sx={{ mb: 5, mx: 'auto', height: 160 }} />

              <Typography variant="h3" gutterBottom>
                {'تم إرسال رابط إعادة تعيين كلمة المرور إلى عنوان البريد الإلكتروني المدخل.'}
              </Typography>
              <Typography>
                {' &nbsp;'}
                <strong>{email}</strong>
                <br />
                {'برجاء التحقق من البريد الإلكتروني الخاص بك.'}
              </Typography>

              <Button
                size="large"
                variant="contained"
                component={RouterLink}
                to={PATH_AUTH.login}
                sx={{ mt: 5 }}
              >
                {'العودة إلى صفحة الدخول'}
              </Button>
            </Box>
          )}
        </Box>
      </Container>
    </RootStyle>
  );
}
