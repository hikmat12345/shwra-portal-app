// material
import {
  Avatar,
  Divider,
  ListItem,
  Typography,
  ListItemText,
  ListItemAvatar,
  ListItemProps
} from '@mui/material';
// utils
import { fDate } from '../../../../utils/formatTime';
import FilePreviewList from '../../../file/FilePreviewList';
// ----------------------------------------------------------------------

interface TicketCommentItemProps extends ListItemProps {
  name: string;
  avatarUrl?: string;
  message: string;
  postedAt: Date| number| string;
  attachments: string[]
}

export default function RequestCommentItem({
  name,
  avatarUrl,
  message,
  postedAt,
  attachments
}: TicketCommentItemProps) {

  
  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled'
                }}
              >
                {fDate(postedAt)}
              </Typography>

              <div dangerouslySetInnerHTML={{ __html: message }} /> 

              { attachments && attachments.length > 0  && (
                <FilePreviewList attachments={attachments} />
              )}
              
            </>
          }
        />
        

      </ListItem>


      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`
        }}
      />
    </>
  );
}
