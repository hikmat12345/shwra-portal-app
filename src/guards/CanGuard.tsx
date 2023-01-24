import { ReactNode } from 'react';

import useAuth from '../hooks/useAuth';

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

export default function CanGuard({ accessibleRoles, children }: RoleBasedGuardProp) {
  const currentRole = useCurrentRole();

  if (!accessibleRoles.includes(currentRole)) {
    return <></>;
  }

  return <>{children}</>;
}
