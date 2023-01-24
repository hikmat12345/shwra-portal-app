import ReactQuill, { ReactQuillProps } from 'react-quill';
// material
import { styled } from '@mui/material/styles';
import { Box, BoxProps } from '@mui/material';
//
import EditorToolbar, { formats, redoChange, undoChange } from './QuillEditorToolbar';

// ----------------------------------------------------------------------

const RootStyle = styled(Box)(({ theme }) => ({
  borderRadius: theme.shape.borderRadius,
  border: `solid 1px ${theme.palette.grey[500_32]}`,
  '& .ql-container.ql-snow': {
    borderColor: 'transparent',
    ...theme.typography.body1,
    fontFamily: theme.typography.fontFamily
  },
  '& .ql-editor': {
    textAlign: 'left',
    minHeight: 200,
    '&.ql-blank::before': {
      fontStyle: 'normal',
      color: theme.palette.text.disabled
    },
    '& pre.ql-syntax': {
      ...theme.typography.body2,
      padding: theme.spacing(2),
      borderRadius: theme.shape.borderRadius,
      backgroundColor: theme.palette.grey[900]
    }
  }
}));

// ----------------------------------------------------------------------

interface QuillEditorProps extends ReactQuillProps {
  id?: string;
  error?: boolean;
  simple?: boolean;
  sx?: BoxProps;
}

export default function QuillEditor({
  id = 'minimal-quill',
  error,
  value,
  onChange,
  simple = false,
  sx,
  ...other
}: QuillEditorProps) {
  const modules = {
    toolbar: {
      container: `#${id}`,
      handlers: {
        undo: undoChange,
        redo: redoChange
      }
    },
    history: {
      delay: 500,
      maxStack: 100,
      userOnly: true
    },
    syntax: true,
    clipboard: {
      matchVisual: false
    }
  };

  return (
    <RootStyle
      sx={{
        ...(error && {
          border: (theme) => `solid 1px ${theme.palette.error.main}`
        }),
        ...sx
      }}
    >
      <EditorToolbar id={id} isSimple={simple} />
      <ReactQuill
        value={value}
        onChange={onChange}
        modules={modules}
        formats={formats}
        placeholder="اكتب هنا....."
        {...other}
      />
    </RootStyle>
  );
}
