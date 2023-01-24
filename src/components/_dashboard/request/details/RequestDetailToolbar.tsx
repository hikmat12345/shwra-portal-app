import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
// @types
//
import RequestActionManage from './RequestActionManage';
import { changeRequestState } from 'redux/slices/request';
import { useDispatch } from 'react-redux';

const RootStyle = styled(Stack)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  marginBottom: theme.spacing(5)
}));

type RequestDetailToolbarProps = {
  requestId: string;
};

export default function RequestDetailToolbar({ requestId }: RequestDetailToolbarProps) {
  const dispatch = useDispatch();

  function changeRequestStatus({ actionId }: { actionId: string }) {
    dispatch(
      changeRequestState({
        requestId: requestId,
        actionId: String(actionId)
      })
    );
  }
  return (
    <RootStyle direction="row" spacing={2}>
      <RequestActionManage changeRequestStatus={changeRequestStatus} />
    </RootStyle>
  );
}
