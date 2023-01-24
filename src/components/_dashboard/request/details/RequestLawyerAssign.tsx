import { Typography, Avatar, Stack } from '@mui/material';
// @types
import { Request } from '../../../../@types/request';
// component
import RequestLawyerAssignDialog from './RequestLawyerAssignDialog';
// guard
import CanGuard from '../../../../guards/CanGuard';

function getFullName({ firstName, lastName }: { firstName: string; lastName: string }) {
  return `${firstName} ${lastName}`;
}

type RequestLawyerAssignProps = {
  request: Request;
};

export default function RequestLawyerAssign({ request }: RequestLawyerAssignProps) {
  return (
    <>
      {request.lawyer ? (
        <Stack direction="row" spacing={2}>
          <Avatar />

          <Typography variant="body1" display="block" sx={{ py: 1 }}>
            {getFullName(request.lawyer)}
          </Typography>

          <CanGuard accessibleRoles={['Admin']}>
            <RequestLawyerAssignDialog
              title="اعادة تعيين "
              requestId={request?.requestId as string}
            />
          </CanGuard>
        </Stack>
      ) : (
        <>
          <CanGuard accessibleRoles={['Client']}>
            <Typography variant="body1" display="block" sx={{ py: 1 }}>
              فى انتظار تعيين محامى
              <br />
              <Typography variant="caption" display="block" sx={{ color: '#e3586c' }} gutterBottom>
                {'سوف يتم التواصل معكم خلال ٦ ساعات'}
              </Typography>
            </Typography>
          </CanGuard>

          <CanGuard accessibleRoles={['Admin']}>
            <RequestLawyerAssignDialog
              title="تعيين محامى"
              requestId={request?.requestId as string}
              lawyer={request.lawyer}
            />
          </CanGuard>
        </>
      )}
    </>
  );
}
