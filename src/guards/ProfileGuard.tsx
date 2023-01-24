import { useState, ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
//
import { PATH_AUTH, PATH_DASHBOARD, PATH_PAGE } from '../routes/paths';
// pages
import ProfileComplete from '../pages/authentication/ProfileComplete';

// ----------------------------------------------------------------------


type ProfileGuardProps = {
  children: ReactNode;
};


export default function ProfileGuard({ children }: ProfileGuardProps) {
  const { user } = useAuth();
  const { pathname } = useLocation();

  const isProfileComplete = user && user.isCompleted;
  
  const isProfile = pathname.includes('profile/complete');

  switch (isProfileComplete){
    case false: {

      if(!isProfile) return <Navigate to={PATH_AUTH.completeProfile} />;
      return <>{children}</>

    }
    case true: { 

      if(isProfile) return <Navigate to={PATH_DASHBOARD.root} />;
      return <>{children}</>

    }
    default: { 
      return <Navigate to={PATH_PAGE.page404} />;
    } 
  }

}
