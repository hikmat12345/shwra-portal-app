import { useEffect, ReactNode } from 'react';
// material
import { useTheme } from '@mui/material/styles';


import {
    List,
    ListItem,
    ListItemText,
    ListItemAvatar,
    Avatar
} from '@mui/material';

import ImageIcon from '@mui/icons-material/Image';
import WorkIcon from '@mui/icons-material/Work';
import BeachAccessIcon from '@mui/icons-material/BeachAccess';
// ----------------------------------------------------------------------

type PasswordCeckListProps = {
};

export default function PasswordCeckList() {
  const theme = useTheme();

  return (
    <List sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
    <ListItem>
      <ListItemAvatar>
          <ImageIcon />
      </ListItemAvatar>
      <ListItemText primary="Photos" />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
          <WorkIcon />
      </ListItemAvatar>
      <ListItemText primary="Work"  />
    </ListItem>
    <ListItem>
      <ListItemAvatar>
          <BeachAccessIcon />
      </ListItemAvatar>
      <ListItemText primary="Vacation" />
    </ListItem>
  </List>
  )

}
