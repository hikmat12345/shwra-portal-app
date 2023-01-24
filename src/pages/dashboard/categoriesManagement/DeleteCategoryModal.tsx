import { Button, Typography, DialogContent, IconButton, Box } from '@mui/material';

import Close from '@mui/icons-material/Close';
import 'moment/locale/ar';
import { DialogAnimate } from 'components/animate';
import { useDispatch } from 'react-redux';
import { deleteCategory } from 'redux/slices/categories';

type DeleteCategoryModalProps = {
  open: boolean;
  setOpen: (open: boolean) => void;
  category: { name: string; id: string | number };
};
export default function DeleteCategoryModal({ open, setOpen, category }: DeleteCategoryModalProps) {
  const dispatch = useDispatch();
  return (
    <DialogAnimate
      open={open}
      onClose={() => {
        setOpen(false);
      }}
      PaperProps={{
        sx: { width: '50%', maxWidth: '90%' }
      }}
    >
      <DialogContent>
        <IconButton
          onClick={() => {
            setOpen(false);
          }}
          aria-label="delete"
          size="small"
        >
          <Close sx={{ color: 'text.primary' }} />
        </IconButton>
        <Box>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            هل انت متاكد من حذف تصنيف {category?.name}
          </Typography>{' '}
        </Box>
        <Box sx={{ p: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {' '}
          <Button
            onClick={() => {
              dispatch(deleteCategory(category?.id));
              setOpen(false);
            }}
            variant="contained"
            color="success"
            sx={{
              color: '#229A16',
              backgroundColor: 'rgba(84, 214, 44, 0.16)',
              boxShadow: '0 6px 8px 0 rgb(242 242 242)',
              '&:hover': {
                color: 'white'
              }
            }}
          >
            تأكيد{' '}
          </Button>
          <Button
            onClick={() => {
              setOpen(false);
            }}
            color="error"
            variant="contained"
            sx={{
              color: '#B72136',
              backgroundColor: 'rgba(255, 72, 66, 0.16)',
              mx: '5px',
              boxShadow: '0 6px 8px 0 rgb(242 242 242)',
              '&:hover': {
                color: 'white'
              }
            }}
          >
            {' '}
            الغاء{' '}
          </Button>
        </Box>
      </DialogContent>
    </DialogAnimate>
  );
}
