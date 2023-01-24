import { Button, Typography, DialogContent, IconButton, Box } from '@mui/material';

import { updateLawyerStatus } from '../../../redux/slices/lawyer';
import Close from '@mui/icons-material/Close';
import 'moment/locale/ar';
import { DialogAnimate } from 'components/animate';
import { useDispatch } from 'react-redux';

type ChangeStatusModalProps = {
  type: 'approve' | 'decline' | 'delete' | '';
  open: boolean;
  setOpen: (open: boolean) => void;
  lawyer: { name: string; id: string; statusId: number };
};
export default function ChangeStatusModal({ type, open, setOpen, lawyer }: ChangeStatusModalProps) {
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
          {type === 'approve' ? (
            <>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                هل انت متاكد من قبول طلب المحامي {lawyer?.name}
              </Typography>{' '}
            </>
          ) : type === 'decline' ? (
            <>
              <Typography variant="h5" sx={{ textAlign: 'center' }}>
                هل انت متاكد من رفض طلب المحامي {lawyer?.name}
              </Typography>{' '}
            </>
          ) : (
            type === 'delete' && (
              <>
                <Typography variant="h5" sx={{ textAlign: 'center' }}>
                  هل انت متاكد من حذف المحامي {lawyer?.name}
                </Typography>{' '}
              </>
            )
          )}
        </Box>
        <Box sx={{ p: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          {' '}
          <Button
            onClick={() => {
              dispatch(updateLawyerStatus(lawyer.id, lawyer.statusId));
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
