import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
// layouts
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
import ProfileGuard from '../guards/ProfileGuard';
import StatusGuard from '../guards/StatusGuard';
// hooks
import useAuth from './../hooks/useAuth';
// components
import LoadingScreen from '../components/LoadingScreen';
import ConfigurationForm from 'pages/dashboard/configurationManagement/ConfigurationForm';
import AdminGeneralDahboard from 'pages/dashboard/adminGeneralDashboard/AdminGeneralDahboard';
import LawyerGeneralDahboard from 'pages/dashboard/lawyerGeneralDashboard/LawyerGeneralDahboard';
// ----------------------------------------------------------------------

enum AppRole {
  Client = 'client',
  Admin = 'admin',
  Lawyer = 'lawyer'
}

type IAppRole = 'Client' | 'Admin' | 'Lawyer';

const Loadable = (Component: React.ElementType) => (props: any) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();
  const isDashboard = pathname.includes('/dashboard');

  return (
    <Suspense
      fallback={
        <LoadingScreen
          sx={{
            ...(!isDashboard && {
              top: 0,
              left: 0,
              width: 1,
              zIndex: 9999,
              position: 'fixed'
            })
          }}
        />
      }
    >
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
  const { user } = useAuth();
  const userRole = AppRole[user?.role as IAppRole];

  return useRoutes([
    {
      path: 'auth',
      children: [
        {
          path: 'login',
          element: (
            <GuestGuard>
              <Login />
            </GuestGuard>
          )
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          )
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },

        { path: 'forget-password', element: <ForgetPassword /> },

        {
          path: 'profile/complete',
          element: (
            <AuthGuard>
              <ProfileGuard>
                <ProfileComplete />
              </ProfileGuard>
            </AuthGuard>
          )
        },

        {
          path: 'account/pending',
          element: (
            <AuthGuard>
              <ProfileGuard>
                <StatusGuard>
                  <AccountPending />
                </StatusGuard>
              </ProfileGuard>
            </AuthGuard>
          )
        },
        {
          path: 'account/blocked',
          element: (
            <AuthGuard>
              <ProfileGuard>
                <StatusGuard>
                  <AccountBlocked />
                </StatusGuard>
              </ProfileGuard>
            </AuthGuard>
          )
        }
      ]
    },

    // pages
    {
      path: '/',
      element: (
        <AuthGuard>
          <ProfileGuard>
            <StatusGuard>
              <DashboardLayout />
            </StatusGuard>
          </ProfileGuard>
        </AuthGuard>
      ),
      children: [{ element: <Navigate to={`/dashboard/request/list/${userRole}`} replace /> }]
    },

    // Dashboard Routes
    {
      path: '/dashboard',
      element: (
        <AuthGuard>
          <ProfileGuard>
            <StatusGuard>
              <DashboardLayout />
            </StatusGuard>
          </ProfileGuard>
        </AuthGuard>
      ),
      children: [
        {
          element:
            userRole?.toLowerCase() === 'admin' || userRole?.toLowerCase() === 'lawyer' ? (
              <Navigate to={`/dashboard/general-dashboard`} replace />
            ) : (
              <Navigate to={`/dashboard/request/list/${userRole}`} replace />
            )
        },

        // { element: <Navigate to="/dashboard/app" replace /> },
        {
          path: 'general-dashboard',
          element:
            userRole?.toLowerCase() === 'admin' ? (
              <RoleBasedGuard accessibleRoles={['Admin']}>
                <AdminGeneralDahboard />
              </RoleBasedGuard>
            ) : userRole?.toLowerCase() === 'lawyer' ? (
              <RoleBasedGuard accessibleRoles={['Lawyer']}>
                <LawyerGeneralDahboard />
              </RoleBasedGuard>
            ) : (
              <RoleBasedGuard accessibleRoles={['Admin', 'Lawyer']}>Client</RoleBasedGuard>
            )
        },
        {
          path: 'request',
          children: [
            { path: ':requestId/detail', element: <RequestDetail /> },

            { path: 'consulting', element: <RequestListClient /> },
            { path: 'contract', element: <RequestListClient /> },

            {
              path: 'list/admin',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <RequestListAdmin />
                </RoleBasedGuard>
              )
            },

            {
              path: 'list/client',
              element: (
                <RoleBasedGuard accessibleRoles={['client', 'Client']}>
                  <RequestListClient />
                </RoleBasedGuard>
              )
            },

            {
              path: 'list/lawyer',
              element: (
                <RoleBasedGuard accessibleRoles={['Lawyer']}>
                  <RequestListLawyer />
                </RoleBasedGuard>
              )
            },

            {
              path: 'new',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin', 'Client']}>
                  <RequestCreate />
                </RoleBasedGuard>
              )
            },

            { path: ':requestId/edit', element: <RequestCreate /> }
          ]
        },
        {
          path: 'client',
          children: [
            { element: <Navigate to="/dashboard/client/list" replace /> },
            {
              path: ':clientId/profile',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <ClientProfile />
                </RoleBasedGuard>
              )
            },
            {
              path: 'list',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <ClientList />
                </RoleBasedGuard>
              )
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <ClientCreate />
                </RoleBasedGuard>
              )
            },
            {
              path: ':name/edit',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <ClientCreate />
                </RoleBasedGuard>
              )
            }
          ]
        },

        {
          path: 'lawyer',
          children: [
            { element: <Navigate to="/dashboard/lawyer/list" replace /> },
            {
              path: ':lawyerId/profile',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <LawyerProfile />
                </RoleBasedGuard>
              )
            },
            {
              path: 'list',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <LawyerList />
                </RoleBasedGuard>
              )
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <LawyerCreate />
                </RoleBasedGuard>
              )
            },
            {
              path: ':name/edit',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <LawyerCreate />
                </RoleBasedGuard>
              )
            }
          ]
        },

        {
          path: 'calendar',
          element: (
            <RoleBasedGuard accessibleRoles={['Lawyer']}>
              <LawyerCalendar />
            </RoleBasedGuard>
          )
        },

        {
          path: 'availability/schedules',
          element: (
            <RoleBasedGuard accessibleRoles={['Lawyer']}>
              <LawyerAvailability />
            </RoleBasedGuard>
          )
        },

        {
          path: 'appointments',
          element: (
            <RoleBasedGuard accessibleRoles={['Lawyer']}>
              <LawyerAppointments />
            </RoleBasedGuard>
          )
        },
        {
          path: 'appointments/:appointmentId/details',
          element: <AppointmentDetails role={'lawyer'} />
        },
        {
          path: 'admin-appointments',
          children: [
            { element: <Navigate to="/dashboard/admin-appointments/list" replace /> },
            {
              path: 'list',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <AdminAppointments />
                </RoleBasedGuard>
              )
            },
            { path: ':appointmentId/details', element: <AppointmentDetails /> }
          ]
        },

        {
          path: 'categories',
          children: [
            { element: <Navigate to="/dashboard/categories/list" replace /> },
            { path: 'list', element: <CategoriesList /> },
            { path: ':categoryId/details', element: <CategoryDetails /> },
            {
              path: 'new',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <CategoryForm />
                </RoleBasedGuard>
              )
            },
            {
              path: ':categoryId/edit',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <CategoryForm />
                </RoleBasedGuard>
              )
            }
          ]
        },

        {
          path: 'packages',
          children: [
            { element: <Navigate to="/dashboard/packages/list" replace /> },
            { path: 'list', element: <PackagesList /> },
            { path: ':packageId/details', element: <PackageDetails /> },
            {
              path: 'new',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <PackageForm />
                </RoleBasedGuard>
              )
            },
            {
              path: ':packageId/edit',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <PackageForm />
                </RoleBasedGuard>
              )
            }
          ]
        },

        {
          path: 'features',
          children: [
            { element: <Navigate to="/dashboard/features/list" replace /> },
            {
              path: 'list',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <FeaturesList />
                </RoleBasedGuard>
              )
            },
            {
              path: ':featureId/details',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <FeatureDetails />{' '}
                </RoleBasedGuard>
              )
            },
            {
              path: 'new',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <FeatureForm />
                </RoleBasedGuard>
              )
            },
            {
              path: ':featureId/edit',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <FeatureForm />
                </RoleBasedGuard>
              )
            }
          ]
        },
        {
          path: 'promotions',
          children: [
            { element: <Navigate to="/dashboard/promotions/list" replace /> },
            {
              path: 'list',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <PromotionsList />
                </RoleBasedGuard>
              )
            },
            // {
            //   path: ':promotionId/details',
            //   element: (
            //     <RoleBasedGuard accessibleRoles={['Admin']}>
            //       <PromotionDetails />{' '}
            //     </RoleBasedGuard>
            //   )
            // },
            {
              path: 'new',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <PromotionForm />
                </RoleBasedGuard>
              )
            },
            {
              path: ':promotionId/edit',
              element: (
                <RoleBasedGuard accessibleRoles={['Admin']}>
                  <PromotionForm />
                </RoleBasedGuard>
              )
            }
          ]
        },
        {
          path: 'complaints',
          children: [
            { element: <Navigate to="/dashboard/complaints/list" replace /> },
            { path: 'list', element: <ComplaintsList /> },
            { path: ':complaintId/details', element: <ComplaintsDetails /> }
          ]
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace /> },
            { path: 'profile', element: <UserProfile /> },
            { path: 'account', element: <UserAccount /> },
            { path: 'configurations/new', element: <ConfigurationForm /> },
            { path: 'configurations/edit', element: <ConfigurationForm /> }
          ]
        }
      ]
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> }
      ]
    },
    { path: '*', element: <Navigate to="/404" replace /> }
  ]);
}
// IMPORT COMPONENTS

// Authentication
const Login = Loadable(lazy(() => import('../pages/authentication/Login')));
const Register = Loadable(lazy(() => import('../pages/authentication/Register')));
const ForgetPassword = Loadable(lazy(() => import('../pages/authentication/ForgetPassword')));
const ProfileComplete = Loadable(lazy(() => import('../pages/authentication/ProfileComplete')));
const VerifyCode = Loadable(lazy(() => import('../pages/authentication/VerifyCode')));
const ResetPassword = Loadable(lazy(() => import('../pages/authentication/ResetPassword')));

// account
const AccountPending = Loadable(lazy(() => import('../pages/authentication/AccountPending')));
const AccountBlocked = Loadable(lazy(() => import('../pages/authentication/AccountBlocked')));

// Dashboard
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));

//-------------------------------------------------------------------------------------/
const RequestCreate = Loadable(lazy(() => import('../pages/dashboard/RequestCreate')));
const RequestDetail = Loadable(lazy(() => import('../pages/dashboard/RequestDetail')));

const RequestListClient = Loadable(lazy(() => import('../pages/dashboard/RequestListClient')));
const RequestListLawyer = Loadable(lazy(() => import('../pages/dashboard/RequestListLawyer')));
const RequestListAdmin = Loadable(lazy(() => import('../pages/dashboard/RequestListAdmin')));

//--------------------------------------------------------------------------------------
const LawyerProfile = Loadable(
  lazy(() => import('../pages/dashboard/lawyersManagement/LawyerProfile'))
);
const LawyerList = Loadable(lazy(() => import('../pages/dashboard/lawyersManagement/LawyerList')));
const LawyerCreate = Loadable(
  lazy(() => import('../pages/dashboard/lawyersManagement/LawyerCreate'))
);
const LawyerCalendar = Loadable(
  lazy(() => import('../pages/dashboard/lawyersManagement/LawyerCalendar'))
);
const LawyerAvailability = Loadable(
  lazy(() => import('../pages/dashboard/lawyersManagement/LawyerAvailability'))
);
const LawyerAppointments = Loadable(
  lazy(() => import('../pages/dashboard/lawyersManagement/LawyerAppointments'))
);

//--------------------------------------------------------------------------------------
const AdminAppointments = Loadable(lazy(() => import('../pages/dashboard/AdminAppointments')));
const AppointmentDetails = Loadable(lazy(() => import('../pages/dashboard/AppointmentDetails')));

//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
const CategoriesList = Loadable(
  lazy(() => import('../pages/dashboard/categoriesManagement/CategoriesList'))
);
const CategoryDetails = Loadable(
  lazy(() => import('../pages/dashboard/categoriesManagement/CategoryDetails'))
);
const CategoryForm = Loadable(
  lazy(() => import('../pages/dashboard/categoriesManagement/CategoryForm'))
);

//--------------------------------------------------------------------------------------

//--------------------------------------------------------------------------------------
const PackagesList = Loadable(
  lazy(() => import('../pages/dashboard/packagessManagement/PackagesList'))
);
const PackageDetails = Loadable(
  lazy(() => import('../pages/dashboard/packagessManagement/PackageDetails'))
);
const PackageForm = Loadable(
  lazy(() => import('../pages/dashboard/packagessManagement/PackageForm'))
);

//--------------------------------------------------------------------------------------

const ClientProfile = Loadable(lazy(() => import('../pages/dashboard/ClientProfile')));
const ClientList = Loadable(lazy(() => import('../pages/dashboard/ClientList')));
const ClientCreate = Loadable(lazy(() => import('../pages/dashboard/ClientCreate')));

// Main
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));

const ComplaintsList = Loadable(
  lazy(() => import('../pages/dashboard/complaintsManagement/ComplaintsList'))
);
const ComplaintsDetails = Loadable(
  lazy(() => import('../pages/dashboard/complaintsManagement/ComplaintsDetails'))
);

const PromotionForm = Loadable(
  lazy(() => import('../pages/dashboard/promotionsManagement/PromotionsForm'))
);
// const PromotionDetails = Loadable(
//   lazy(() => import('../pages/dashboard/promotionsManagement/PromotionDetails'))
// );
const PromotionsList = Loadable(
  lazy(() => import('../pages/dashboard/promotionsManagement/PromotionsList'))
);


const FeatureForm = Loadable(
  lazy(() => import('../pages/dashboard/featuresManagement/FeatureForm'))
);
const FeatureDetails = Loadable(
  lazy(() => import('../pages/dashboard/featuresManagement/FeatureDetails'))
);
const FeaturesList = Loadable(
  lazy(() => import('../pages/dashboard/featuresManagement/FeaturesList'))
);
