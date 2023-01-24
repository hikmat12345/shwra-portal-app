import { saveAs } from 'file-saver';

import { List } from '@mui/material';

// components
import FilePreview from './FilePreview';

type CommentAttachmentProps = {
  attachments: string[];
};

const saveFile = ({ fileName, fileURL }: { fileName: string; fileURL: string }): void => {
  saveAs(fileURL, fileURL);
};

type FilePreviewListProps = {
  attachments: string[];
};

export default function FilePreviewList({ attachments }: FilePreviewListProps) {
  return (
    <List>
      {attachments.map((file, index) => (
        <FilePreview key={index} src={file} />
      ))}
    </List>
  );
}
