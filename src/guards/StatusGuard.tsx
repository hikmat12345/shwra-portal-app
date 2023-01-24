import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
//
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from '../routes/paths';
// ----------------------------------------------------------------------

enum AccountStatus {
  APPROVED = "Approved",
  BLOCKED = "Blocked",
  PENDING = "Pending"
}

type ProfileGuardProps = {
  children: ReactNode;
};

export default function StatusGuard({ children }: ProfileGuardProps) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const userStatus = user && user.status;
  // console.log("userStatus", userStatus)

  const isPendingPath = pathname.includes('account/pending');

  const isBlockedPath = pathname.includes('account/blocked');
  
  

  switch (userStatus){
    case AccountStatus.APPROVED: {
      if(isPendingPath) return <Navigate to={PATH_DASHBOARD.root}  />;
      if(isBlockedPath) return <Navigate to={PATH_DASHBOARD.root}  />;
      return <>{children}</>
    }
    case AccountStatus.PENDING: {
      if(!isPendingPath) return <Navigate to={PATH_AUTH.accountPending} />;
      return <>{children}</>
    }
    case AccountStatus.BLOCKED: {
      if(!isBlockedPath) return <Navigate to={PATH_AUTH.accountBlocked} />;
      return <>{children}</>
    }
    default: { 
      return <Navigate to={PATH_PAGE.page404} />;
    } 
  }


}
