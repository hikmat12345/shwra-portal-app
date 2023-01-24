import { ReactNode } from 'react';
import { Container, Alert, AlertTitle } from '@mui/material';

import useAuth from './../hooks/useAuth';


// ----------------------------------------------------------------------

type RoleBasedGuardProp = {
  accessibleRoles: string[];
  children: ReactNode | string;
};

const useCurrentRole = () => {
  const { user } = useAuth();

  const role = user?.role;
  return role;
};

export default function RoleBasedGuard({ accessibleRoles, children }: RoleBasedGuardProp) {
  const currentRole = useCurrentRole();
  if (!accessibleRoles.includes(currentRole)) {
    return (
      <Container>
        <Alert severity="error">
          <AlertTitle>تم رفض الإذن</AlertTitle>
          ليس لديك الصلاحية لدخول هذه الصفحة
        </Alert>
      </Container>
    );
  }

  return <>{children}</>;
}
