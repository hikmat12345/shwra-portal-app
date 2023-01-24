import { useState } from 'react';
// material
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
// redux
// redux
import { useDispatch } from '../../../../redux/store';
import { assignLawyerToRequest } from '../../../../redux/slices/request';
// Complonents
import RequestLawyerAssignForm from './RequestLawyerAssignForm';

type RequestLawyerAssignDialogProps = {
  requestId: string;
  title: string;
  lawyer?: any;
};

export default function RequestLawyerAssignDialog({
  requestId,
  lawyer,
  title
}: RequestLawyerAssignDialogProps) {
  const [selectedLawyer, setSelectedLawyer] = useState('');

  /*
  if(lawyer){
    setSelectedLawyer(lawyer.lawyerId)
  }
*/

  function handleSelectedLawyer({ lawyerId }: { lawyerId: string }) {
    setSelectedLawyer(lawyerId);
  }

  // redux
  const dispatch = useDispatch();

  // Lawyer Assign Method
  function handleAssignLawyer() {
    try {
      dispatch(
        assignLawyerToRequest({
          requestId: requestId,
          lawyerId: selectedLawyer
        })
      );

      handleClose();
    } catch (e) {
      console.log(e);
    }
  }

  // dailog
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Button variant="outlined" onClick={handleClickOpen}>
        {title}
      </Button>

      <Dialog open={open} onClose={handleClose}>
        <DialogTitle> {title} </DialogTitle>
        <DialogContent>
          {/*
            <DialogContentText>
              To subscribe to this website, please enter your email address here. We
              will send updates occasionally.
            </DialogContentText>
*/}

          <RequestLawyerAssignForm requestId={requestId} onLawyerSelected={handleSelectedLawyer} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleAssignLawyer}> تعيين محامى </Button>
          <Button onClick={handleClose}> الغاء </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
