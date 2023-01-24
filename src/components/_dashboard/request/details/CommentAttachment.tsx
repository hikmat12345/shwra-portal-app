import { saveAs } from 'file-saver';
import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';
import arrowCircleDownOutline from '@iconify/icons-eva/arrow-circle-down-outline';

import { List, ListItem, ListItemIcon, ListItemText, ListItemSecondaryAction } from '@mui/material';
//
import { MIconButton } from '../../../@material-extend';

type CommentAttachmentProps = {
  attachments: string[];
};

const saveFile = ({ fileName, fileURL }: { fileName: string; fileURL: string }): void => {
  saveAs(fileURL, fileURL);
};

export default function CommentAttachment({ attachments }: CommentAttachmentProps) {
  return (
    <List>
      {attachments.map((file, index) => (
        <ListItem
          key={index}
          sx={{
            my: 1,
            py: 0.75,
            px: 2,
            borderRadius: 1,
            border: (theme) => `solid 1px ${theme.palette.divider}`,
            bgcolor: 'background.paper'
          }}
        >
          <ListItemIcon>
            <Icon icon={fileFill} width={28} height={28} />
          </ListItemIcon>

          <ListItemText
            primary="المرفقات"
            //secondary={isString(file) ? '' : fData(file.size || 0)}
            primaryTypographyProps={{ variant: 'subtitle2' }}
            secondaryTypographyProps={{ variant: 'caption' }}
          />

          <ListItemSecondaryAction>
            {/* <Link to={file} download target="_self"> */}
            <MIconButton
              edge="end"
              size="small"
              onClick={() => saveFile({ fileName: `${file}-${index}`, fileURL: file })}
            >
              <Icon icon={arrowCircleDownOutline} />
            </MIconButton>
            {/* </Link>*/}
          </ListItemSecondaryAction>
        </ListItem>
      ))}
    </List>
  );
}
