import { MouseEvent, useState } from 'react';
import { saveAs } from 'file-saver';
import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';
import deleteIcon from '@iconify/icons-eva/trash-outline';
import eyeOutline from '@iconify/icons-eva/eye-outline';

import arrowCircleDownOutline from '@iconify/icons-eva/arrow-circle-down-outline';
// utils
import {
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip
} from '@mui/material';
//
import { MIconButton } from './../@material-extend';

function getFileExtension(filename: string) {
  return /[.]/.exec(filename) ? /[^.]+$/.exec(filename) : undefined;
}

export async function createFileUrl({
  fileName,
  type = 'file',
  action
}: {
  fileName: string;
  type?: 'image' | 'file';
  action?: 'download' | 'view';
}) {
  // delete axios.defaults.headers.common['Content-Type'];
  let fileUrl = '';
  if (fileName) {
    const response = await fetch(
      `https://shwraapidevops.azurewebsites.net/api/Files/DownloadFile?fileName=${fileName}`,
      {
        method: 'GET', // *GET, POST, PUT, DELETE, etc.
        mode: 'cors', // no-cors, *cors, same-origin
        cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
          //'Content-Type': 'application/json'
          // 'Content-Type': 'application/x-www-form-urlencoded',
        },
        redirect: 'follow', // manual, *follow, error
        referrerPolicy: 'no-referrer' // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      }
    )
      .then((res) => {
        fileUrl = res.url;
        return res.blob();
      })
      .then((myBlob) => {
        const fileType = getFileExtension(fileName);
        if (type === 'image') {
          let reader = new FileReader();
          reader.readAsDataURL(myBlob);
          return reader;
        } else {
          const url = window.URL.createObjectURL(
            new Blob([myBlob], { type: `application/${fileType}` })
          );
          if (
            action === 'view' &&
            fileType &&
            fileType?.length > 0 &&
            (fileType[0] === 'jpeg' ||
              fileType[0] === 'png' ||
              fileType[0] === 'jpg' ||
              fileType[0] === 'svg')
          ) {
            let reader = new FileReader();
            reader.readAsDataURL(myBlob);
            reader.onload = function () {
              var image = new Image();
              // @ts-ignore
              image.src = reader.result;
              var w = window.open('');
              w?.document.write(image.outerHTML);
            };
          } else if (action === 'view') {
            window.open(url);
          }
          return url;
        }
      });
    if (action === 'download') {
      return fileUrl;
    } else {
      return response;
    }
  }
}

type FilePreviewProps = {
  src: string;
  isDelete?: boolean;
  handleDelete?: (e: MouseEvent<HTMLButtonElement>, file: any) => void;
};

export default function FilePreview({ src, isDelete = false, handleDelete }: FilePreviewProps) {
  async function createFile(fileInfo: any) {
    const fileData = await createFileUrl(fileInfo);
    if (fileInfo?.action === 'download' && fileData) {
      // @ts-ignore
      window.location.href = fileData;
    }
  }
  return (
    <ListItem
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
        primary={src}
        primaryTypographyProps={{ variant: 'subtitle2' }}
        secondaryTypographyProps={{ variant: 'caption' }}
      />

      <ListItemSecondaryAction>
        <Tooltip title="معاينة">
          <MIconButton
            sx={{ mx: 1 }}
            edge="end"
            size="small"
            onClick={() => {
              createFile({
                fileName: src,
                type: 'file',
                action: 'view'
              });
            }}
          >
            <Icon icon={eyeOutline} />
          </MIconButton>
        </Tooltip>

        <Tooltip title="تحميل">
          <MIconButton
            sx={{ mx: 1 }}
            edge="end"
            size="small"
            onClick={() => {
              createFile({
                fileName: src,
                type: 'file',
                action: 'download'
              });
            }}
          >
            <Icon icon={arrowCircleDownOutline} />
          </MIconButton>
        </Tooltip>
        {isDelete && (
          <Tooltip title="حذف">
            <MIconButton
              sx={{ mx: 1 }}
              edge="end"
              size="small"
              onClick={handleDelete ? (e) => handleDelete(e, src) : () => {}}
            >
              <Icon icon={deleteIcon} />
            </MIconButton>
          </Tooltip>
        )}
      </ListItemSecondaryAction>
    </ListItem>
  );
}
