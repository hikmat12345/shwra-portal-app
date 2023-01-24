// mui
import { Paper, Stack, Grid, Typography } from '@mui/material';
// @types
import { Attachment } from '../../../../@types/appointment';
// Components
import Iconify from '../../../Iconify';

type AppointmentActionAttachmentProps = {
  attachments: Attachment[];
};

export default function AppointmentActionAttachment({
  attachments
}: AppointmentActionAttachmentProps) {
  const hasAttachments = attachments.length > 0;

  const openInNewTab = (url: string) => {
    const newWindow = window.open(url, '_blank', 'noopener,noreferrer');
    if (newWindow) newWindow.opener = null;
  };

  return (
    <Grid container spacing={2}>
      {attachments.map((attachment) => (
        <Grid item xs={6} key={attachment.id}>
          <Paper variant="outlined" sx={{ p: 1 }} onClick={() => openInNewTab(attachment.url)}>
            <Stack direction="row" spacing={2}>
              <Iconify icon="teenyicons:attachment-outline" />

              <Typography variant="body2">{attachment.name}</Typography>
            </Stack>
          </Paper>
        </Grid>
      ))}

      {!hasAttachments && (
        <Grid item xs={12}>
          {' '}
          لا يوجد مرفقات{' '}
        </Grid>
      )}
    </Grid>
  );
}
