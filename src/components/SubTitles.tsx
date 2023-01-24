import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
import { ReactNode } from 'react';
import { CSSProperties } from '@mui/system';

const StyledSubTitle = styled(Typography)(({ theme, style }) => ({
  ...theme.typography.subtitle2,
  color: theme.palette.text.secondary,
  marginBottom: theme.spacing(1),
  ...style
}));
type SubTitleProps = {
  children: ReactNode | string;
  style?: CSSProperties;
};
export default function SubTitle({ children, style = {} }: SubTitleProps) {
  // @ts-ignore
  return <StyledSubTitle style={style}>{children}</StyledSubTitle>;
}
