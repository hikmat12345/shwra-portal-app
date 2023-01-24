// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// components
import SvgIconStyle from '../../components/SvgIconStyle';
import Iconify from '../../components/Iconify';
// ----------------------------------------------------------------------

const getIcon = (name: string , extentions?: string) => (
  <SvgIconStyle src={`/static/icons/navbar/${name}.${extentions ||'svg'}`} sx={{ width: '100%', height: '100%' }} />
);


const ICONS = {
  main: getIcon('pie-chart','png'),
  user: getIcon('ic_user'),
  request: getIcon('ic_ticket'),
  appointment: getIcon('ic_calendar'),
  schedule: getIcon('ic_schedule-send'),
  categories: getIcon('ic_category','png'),
  packages: getIcon('package','png'),
  features: getIcon('features','png'),
  promotions:getIcon('promotions','png'),
  complaint: getIcon('complaint','png')
};



export const clientSidebarConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'لوحة التحكم',
    items: [
      // MANAGEMENT : request
      {
        title: 'الطلبات',
        path: PATH_DASHBOARD.request.clientRoot,
        icon: ICONS.request,
      }
    ]
  }
];




export const lawyerSidebarConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'لوحة التحكم',
    items: [
      // MANAGEMENT : request
      {
        title: 'الرئيسية',
        path: PATH_DASHBOARD.main,
        icon: ICONS.main,
      },
      {
        title: 'الطلبات',
        path: PATH_DASHBOARD.request.lawyerRoot,
        icon: ICONS.request,
      },
      /*
      {
        title: 'جداول التذاكر المحجوزة',
        path: PATH_DASHBOARD.calendar.root,
        icon: ICONS.request,
      },
      */
      {
        title: 'الجداول ',
        path: PATH_DASHBOARD.availability.root,
        icon: ICONS.schedule,
      },
      {
        title: ' المواعيد',
        path: PATH_DASHBOARD.appointments.root,
        icon: ICONS.appointment,
      }
    ]
  }
];




export const adminSidebarConfig = [
  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'لوحة التحكم',
    items: [
      // MANAGEMENT : request
      {
        title: 'الرئيسية',
        path: PATH_DASHBOARD.main,
        icon: ICONS.main,
      },
      {
        title: 'الطلبات',
        path: PATH_DASHBOARD.request.adminRoot,
        icon: ICONS.request,
      },
      {
        title: 'ادارة المحامين',
        path:  PATH_DASHBOARD.lawyer.list,
        icon: ICONS.user,
      },
      {
        title: 'ادارة العملاء',
        path:  PATH_DASHBOARD.client.list,
        icon:  ICONS.user,
      },
      {
        title: 'ادارة التصنيفات',
        path:  PATH_DASHBOARD.categories.admin,
        icon:  ICONS.categories,
      },
      {
        title: ' المواعيد',
        path: PATH_DASHBOARD.appointments.admin,
        icon: ICONS.appointment,
      },
      {
        title: 'ميزات الباقة',
        path: PATH_DASHBOARD.features.root,
        icon: ICONS.features,
      },
      {
        title: 'الباقات',
        path: PATH_DASHBOARD.packages.root,
        icon: ICONS.packages,
      },
      {
        title: 'أكواد الخصم',
        path: PATH_DASHBOARD.promotions.root,
        icon: ICONS.promotions,
      },
      {
        title: 'الشكاوى و المقترحات',
        path: PATH_DASHBOARD.complaints.root,
        icon: ICONS.complaint,
      },

    ]
  }
];

