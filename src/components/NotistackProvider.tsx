import { ReactNode } from 'react';
import { Icon, IconifyIcon } from '@iconify/react';
import { SnackbarProvider } from 'notistack';
// material
import { alpha, useTheme } from '@mui/material/styles';
import { Box, GlobalStyles } from '@mui/material';
// @types
import { ColorSchema } from '../@types/theme';

// ----------------------------------------------------------------------

function SnackbarStyles() {
  const theme = useTheme();
  // const isLight = theme.palette.mode === 'light';
  const isLight = true;

  return (
    <GlobalStyles
      styles={{
        '#root': {
          '& .SnackbarContent-root': {
            width: '100%',
            padding: theme.spacing(1.5),
            margin: theme.spacing(0.25, 0),
            boxShadow: theme.customShadows.z8,
            borderRadius: theme.shape.borderRadius
          },
          '& .SnackbarItem-message': {
            padding: '0 !important',
            fontWeight: theme.typography.fontWeightMedium
          },
          '& .SnackbarItem-action': {
            marginRight: 0,
            color: theme.palette.action.active,
            '& svg': { width: 20, height: 20 }
          }
        }
      }}
    />
  );
}

type SnackbarIconProps = {
  icon: IconifyIcon;
  color: ColorSchema;
};

function SnackbarIcon({ icon, color }: SnackbarIconProps) {
  return (
    <Box
      component="span"
      sx={{
        mr: 1.5,
        width: 40,
        height: 40,
        display: 'flex',
        borderRadius: 1.5,
        alignItems: 'center',
        justifyContent: 'center',
        color: `${color}.main`,
        bgcolor: (theme) => alpha(theme.palette[color].main, 0.16)
      }}
    >
      <Icon icon={icon} width={24} height={24} />
    </Box>
  );
}

type NotistackProviderProps = {
  children: ReactNode;
};

export default function NotistackProvider({ children }: NotistackProviderProps) {
  return (
    <>
      <SnackbarStyles />

      <SnackbarProvider
        dense
        maxSnack={5}
        // preventDuplicate
        autoHideDuration={3000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left'
        }}
        // iconVariant={{
        //   success: <SnackbarIcon icon={checkmarkCircle2Fill} color="success" />,
        //   error: <SnackbarIcon icon={infoFill} color="error" />,
        //   warning: <SnackbarIcon icon={alertTriangleFill} color="warning" />,
        //   info: <SnackbarIcon icon={alertCircleFill} color="info" />
        // }}
      >
        {children}
      </SnackbarProvider>
    </>
  );
}
