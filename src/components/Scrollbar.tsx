import SimpleBarReact, { Props } from 'simplebar-react';
// material
import { alpha, styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  flexGrow: 1,
  height: '100%',
  overflow: 'hidden'
}));

const SimpleBarStyle = styled(SimpleBarReact)(
  ({
    theme,
    // @ts-ignore
    scrollStyles
  }) => ({
    maxHeight: '100%',
    '& .simplebar-scrollbar': {
      '&:before': {
        backgroundColor: scrollStyles?.bar?.backgroundColor
          ? scrollStyles?.bar?.backgroundColor
          : alpha(theme.palette.grey[600], 0.48)
      },
      '&.simplebar-visible:before': {
        opacity: 1
      }
    },
    '& .simplebar-track.simplebar-vertical': {
      width: scrollStyles?.track?.width ? scrollStyles?.track?.width : 10,
      backgroundColor: scrollStyles?.track?.backgroundColor
        ? scrollStyles?.track?.backgroundColor
        : 'transparent'
    },
    '& .simplebar-track.simplebar-horizontal .simplebar-scrollbar': {
      height: 6
    },
    '& .simplebar-mask': {
      zIndex: 'inherit'
    }
  })
);

// ----------------------------------------------------------------------

export default function Scrollbar({ children, sx, ...other }: BoxProps & Props) {
  const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
    navigator.userAgent
  );

  if (isMobile) {
    return (
      <Box sx={{ overflowX: 'auto', ...sx }} {...other}>
        {children}
      </Box>
    );
  }

  return (
    <RootStyle>
      <SimpleBarStyle timeout={500} clickOnTrack={false} sx={sx} {...other}>
        {children}
      </SimpleBarStyle>
    </RootStyle>
  );
}
