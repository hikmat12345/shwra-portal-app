/* eslint-disable array-callback-return */
import { isString } from 'lodash';
import { Icon } from '@iconify/react';
import { useDropzone, DropzoneOptions } from 'react-dropzone';
import fileFill from '@iconify/icons-eva/file-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { motion, AnimatePresence } from 'framer-motion';
// material
import { alpha, Theme, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Paper,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@mui/material';
import { SxProps } from '@mui/system';
// utils
import { fData } from '../../utils/formatNumber';
//
import { MIconButton } from '../@material-extend';
import { varFadeInRight } from '../animate';
import { UploadIllustration } from '../../assets';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(5, 1),
  borderRadius: theme.shape.borderRadius,
  backgroundColor: theme.palette.background.neutral,
  border: `1px dashed ${theme.palette.grey[500_32]}`,
  '&:hover': { opacity: 0.72, cursor: 'pointer' },
  [theme.breakpoints.up('md')]: { textAlign: 'left', flexDirection: 'row' }
}));

// ----------------------------------------------------------------------

interface CustomFile extends File {
  path?: string;
  preview?: string;
}

interface UploadMultiFileProps extends DropzoneOptions {
  error?: boolean;
  files: (File | string)[];
  showPreview: boolean;
  onRemove: (file: File | string) => void;
  onRemoveAll: VoidFunction;
  sx?: SxProps<Theme>;
  dropBoxStyles?: SxProps<Theme>;
  imgStyles?: SxProps<Theme>;
  multiple?: boolean;
  hideFilePreview?: boolean;
}

const getFileData = (file: CustomFile | string) => {
  if (typeof file === 'string') {
    return {
      key: file
    };
  }

  return {
    key: file.name,
    name: file.name,
    size: file.size,
    preview: file.preview
  };
};

export default function UploadMultiFile({
  error,
  showPreview = false,
  hideFilePreview = false,
  files,
  onRemove,
  onRemoveAll,
  dropBoxStyles,
  imgStyles,
  sx,
  multiple = true,
  ...other
}: UploadMultiFileProps) {
  const hasFile = files?.length > 0;

  const { getRootProps, getInputProps, isDragActive, isDragReject, fileRejections } = useDropzone({
    multiple,
    ...other
  });

  const ShowRejectionItems = () => (
    <Paper
      variant="outlined"
      sx={{
        py: 1,
        px: 2,
        mt: 3,
        borderColor: 'error.light',
        bgcolor: (theme) => alpha(theme.palette.error.main, 0.08)
      }}
    >
      {fileRejections.map(({ file, errors }) => {
        const { path, size }: CustomFile = file;
        return (
          <Box key={path} sx={{ my: 1 }}>
            <Typography variant="subtitle2" noWrap>
              {path} - {fData(size)}
            </Typography>
            {errors.map((e) => (
              <Typography key={e.code} variant="caption" component="p">
                - {e.message}
              </Typography>
            ))}
          </Box>
        );
      })}
    </Paper>
  );

  return (
    <Box sx={{ width: '100%', ...sx }}>
      <DropZoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: 'error.main',
            borderColor: 'error.light',
            bgcolor: 'error.lighter'
          }),
          ...dropBoxStyles
        }}
      >
        <input {...getInputProps()} />

        <UploadIllustration sx={{ width: 220, ...imgStyles }} />

        <Box sx={{ p: 3, ml: { md: 2 } }}>
          <Typography gutterBottom variant="h5">
            إفلات أو تحديد ملف
          </Typography>

          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            قم بإسقاط {multiple ? 'الملفات' : 'الملف'} هنا أو انقر فوق&nbsp;
            <Typography
              variant="body2"
              component="span"
              sx={{ color: 'primary.main', textDecoration: 'underline' }}
            >
              تصفح
            </Typography>
            &nbsp;من الجهاز الخاص بك
          </Typography>
        </Box>
      </DropZoneStyle>

      {fileRejections.length > 0 && <ShowRejectionItems />}
      {files && (
        <List disablePadding sx={{ ...(hasFile && { my: 3 }) }}>
          <AnimatePresence>
            {files?.map((file) => {
              if (file) {
                const { key, name, size, preview } = getFileData(file as CustomFile);

                if (showPreview) {
                  return (
                    <ListItem
                      key={key}
                      component={motion.div}
                      {...varFadeInRight}
                      sx={{
                        p: 0,
                        m: 0.5,
                        width: 80,
                        height: 80,
                        borderRadius: 1.5,
                        overflow: 'hidden',
                        position: 'relative',
                        display: 'inline-flex'
                      }}
                    >
                      <Paper
                        variant="outlined"
                        component="img"
                        src={isString(file) ? file : preview}
                        sx={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'cover',
                          position: 'absolute'
                        }}
                      />
                      <Box sx={{ top: 6, right: 6, position: 'absolute' }}>
                        <MIconButton
                          size="small"
                          onClick={() => onRemove(file)}
                          sx={{
                            p: '2px',
                            color: 'common.white',
                            bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72),
                            '&:hover': {
                              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.48)
                            }
                          }}
                        >
                          <Icon icon={closeFill} />
                        </MIconButton>
                      </Box>
                    </ListItem>
                  );
                }
                if (!hideFilePreview) {
                  return (
                    <ListItem
                      key={key}
                      component={motion.div}
                      {...varFadeInRight}
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
                        primary={
                          <Typography
                            sx={{
                              overflowX: 'auto',
                              width: '90%',
                              '::-webkit-scrollbar': {
                                height: '2px',
                                backgroundColor: '#eee'
                              },
                              '::-webkit-scrollbar-thumb ': {
                                height: '2px',
                                backgroundColor: 'text.secondary'
                              }
                            }}
                          >
                            {isString(file) ? file : file.name}
                          </Typography>
                        }
                        secondary={isString(file) ? '' : fData(file?.size || 0)}
                        primaryTypographyProps={{ variant: 'subtitle2' }}
                        secondaryTypographyProps={{ variant: 'caption' }}
                      />
                      <ListItemSecondaryAction>
                        <MIconButton edge="end" size="small" onClick={() => onRemove(file)}>
                          <Icon icon={closeFill} />
                        </MIconButton>
                      </ListItemSecondaryAction>
                    </ListItem>
                  );
                }
              }
            })}
          </AnimatePresence>
        </List>
      )}
      {/*hasFile && (
        <Stack direction="row" justifyContent="flex-end">
          <Button onClick={onRemoveAll} sx={{ mr: 1.5 }}>
            Remove all
          </Button>
          <Button variant="contained">Upload files</Button>
        </Stack>
      )*/}
    </Box>
  );
}
