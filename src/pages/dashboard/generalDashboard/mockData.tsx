import { Icon } from '@iconify/react';
import peapleIcon from '@iconify/icons-eva/people-outline';
import {
  VolunteerActivism,
  PendingActionsOutlined,
  DescriptionOutlined,
  MonetizationOnOutlined,
  AccountBalanceOutlined,
  GavelOutlined
} from '@mui/icons-material';

export const chartData = [
  { month: 'Jan', earnings: 10000 },
  { month: 'Feb', earnings: 20000 },
  { month: 'Mar', earnings: 25000 },
  { month: 'Apr', earnings: 30000 },
  { month: 'May', earnings: 10000 },
  { month: 'Jun', earnings: 15000 },
  { month: 'Jul', earnings: 14250 },
  { month: 'Aug', earnings: 15000 },
  { month: 'Sep', earnings: 25000 },
  { month: 'Oct', earnings: 6000 },
  { month: 'Nov', earnings: 30000 },
  { month: 'Dec', earnings: 27000 }
];
export const reproduceChartData = chartData?.map((data) => {
  return {
    month: data?.month,
    earnings: data?.earnings / 1000
  };
});
export const appointmentData: any = [
  {
    id: 1,
    lawyerName: 'اسم المحامي',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 2,
    lawyerName: 'اسم المحامي',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 3,
    lawyerName: 'اسم المحامي',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 4,
    lawyerName: 'اسم المحامي',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 5,
    lawyerName: 'اسم المحامي',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 6,
    lawyerName: 'اسم المحامي',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 7,
    lawyerName: 'اسم المحامي',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  }
];

export const clientAppointmentData: any = [
  {
    id: 1,
    lawyerName: 'اسم المستخدم',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 2,
    lawyerName: 'اسم المستخدم',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 3,
    lawyerName: 'اسم المستخدم',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 4,
    lawyerName: 'اسم المستخدم',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 5,
    lawyerName: 'اسم المستخدم',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 6,
    lawyerName: 'اسم المستخدم',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  },
  {
    id: 7,
    lawyerName: 'اسم المستخدم',
    time: '02:30:54',
    category: 'الإستشارات القانونية'
  }
];
export const incomesData: any = [
  {
    id: 1,
    lawyerName: 'اسم المحامي',
    aptms: '20',
    lastApmts: '20 July 2022',
    incomes: '1,200',
    statusName: 'متوفرة',
    statusId: 1
  },
  {
    id: 2,
    lawyerName: 'اسم المحامي',
    aptms: '20',
    lastApmts: '20 July 2022',
    incomes: '1,200',
    statusName: 'غير متوفرة',
    statusId: 2
  },
  {
    id: 3,
    lawyerName: 'اسم المحامي',
    aptms: '20',
    lastApmts: '20 July 2022',
    incomes: '1,200',
    statusName: 'متوفرة',
    statusId: 1
  },
  {
    id: 4,
    lawyerName: 'اسم المحامي',
    aptms: '20',
    lastApmts: '20 July 2022',
    incomes: '1,200',
    statusName: 'متوفرة',
    statusId: 1
  },
  {
    id: 5,
    lawyerName: 'اسم المحامي',
    aptms: '20',
    lastApmts: '20 July 2022',
    incomes: '1,200',
    statusName: 'متوفرة',
    statusId: 1
  },
  {
    id: 6,
    lawyerName: 'اسم المحامي',
    aptms: '20',
    lastApmts: '20 July 2022',
    incomes: '1,200',
    statusName: 'متوفرة',
    statusId: 1
  },
  {
    id: 7,
    lawyerName: 'اسم المحامي',
    aptms: '20',
    lastApmts: '20 July 2022',
    incomes: '1,200',
    statusName: 'غير متوفرة',
    statusId: 2
  }
];

export const categoryAssignments: any = [
  {
    id: 1,
    icon: <Icon icon={peapleIcon} />,
    category: 'الاستشارات القانونية',
    number: '20'
  },
  {
    id: 2,
    icon: (
      <PendingActionsOutlined
        sx={{
          fontSize: '12px',
          color: '#637381'
        }}
      />
    ),
    category: 'خدمات العقود',
    number: '20'
  },
  {
    id: 3,
    icon: (
      <MonetizationOnOutlined
        sx={{
          fontSize: '12px',
          color: '#637381'
        }}
      />
    ),
    category: 'الطلبات المالية',
    number: '20'
  },
  {
    id: 4,
    icon: (
      <GavelOutlined
        sx={{
          fontSize: '12px',
          color: '#637381'
        }}
      />
    ),
    category: 'القضايا',
    number: '20'
  },
  {
    id: 5,
    icon: (
      <DescriptionOutlined
        sx={{
          fontSize: '12px',
          color: '#637381'
        }}
      />
    ),
    category: 'المذكرات القانونية',
    number: '20'
  },
  {
    id: 6,
    icon: (
      <GavelOutlined
        sx={{
          fontSize: '12px',
          color: '#637381'
        }}
      />
    ),
    category: 'القضايا الأخرى',
    number: '20'
  }
];

export const allMessages: any = [
  {
    id: 1,
    img: "/static/illustrations/illustration_invite.png",
    user_name: 'اسم المستخدم',
    number: '20'
  },
  {
    id: 2,
    img: "/static/illustrations/illustration_components.png",
    user_name: 'اسم المستخدم',
    number: '20'
  },
  {
    id: 3,
    img: "/static/illustrations/illustration_invite.png",
    user_name: 'اسم المستخدم',
    number: '20'
  },
  {
    id: 4,
    img: "/static/illustrations/illustration_invite.png",
    user_name: 'اسم المستخدم',
    number: '20'
  },
  {
    id: 5,
    img: "/static/illustrations/illustration_components.png",
    user_name: 'اسم المستخدم',
    number: '20'
  },
  {
    id: 6,
    img: "/static/illustrations/illustration_invite.png",
    user_name: 'اسم المستخدم',
    number: '20'
  }
];
export const cardsData = [
  {
    id: 1,
    title: 'متخصص قانوني',
    number: 12,
    isUpword: true,
    percentage: '2.1',
    cardColor: '#e8f9ff',
    icon: <Icon icon={peapleIcon} />,
    textColor: '#637381'
  },
  {
    id: 2,
    title: 'عملاؤنا',
    number: 20,
    isUpword: true,
    percentage: '2.1',
    cardColor: '#f9f5e9',
    textColor: '#d49e24',
    icon: (
      <VolunteerActivism
        sx={{
          fontSize: '12px',
          color: '#d49e24'
        }}
      />
    )
  },
  {
    id: 3,
    title: 'التقارير',
    number: 1500,
    isUpword: false,
    percentage: '2.1',
    cardColor: '#f4f9f9',
    textColor: '#637381',
    icon: (
      <PendingActionsOutlined
        sx={{
          fontSize: '12px',
          color: '#637381'
        }}
      />
    )
  },
  {
    id: 4,
    title: 'مرفوض',
    number: 12,
    isUpword: false,
    percentage: '2.1',
    cardColor: '#fbe9e9',
    textColor: '#ff3844',
    icon: (
      <DescriptionOutlined
        sx={{
          fontSize: '12px',
          color: '#ff3844'
        }}
      />
    )
  }
];
export const incomeData = [
  {
    id: 1,
    income: 35,
    isUpword: true,
    percentage: '2.1',
    cardColor: '#f4f9f9',
    textColor: '#d49e24',
    time: 'yearly',
    icon: (
      <MonetizationOnOutlined
        sx={{
          fontSize: '16px',
          color: '#637381'
        }}
      />
    )
  },
  {
    id: 2,
    income: 35,
    isUpword: true,
    percentage: '2.1',
    cardColor: '#fff',
    textColor: '#d49e24',
    time: 'monthly',

    icon: (
      <AccountBalanceOutlined
        sx={{
          fontSize: '16px',
          color: '#fff'
        }}
      />
    )
  }
];

export const TABLE_HEAD = [
  { id: 'name', label: 'الاسم', alignRight: false },
  { id: 'aptms', label: 'مجموع aptms', alignRight: false },
  { id: 'ladtAptms', label: 'آخر aptms', alignRight: false },
  { id: 'incomes', label: 'الإيرادات', alignRight: false },
  { id: 'statusName', label: 'الحالة', alignRight: false }
];

export const pieChart = [
  { id: 'Jan', value: 40, color: '#d49e24' },
  { id: 'Feb', value: 30, color: '#8b8a9a' },
  { id: 'Mar', value: 20, color: '#d3d8db' },
  { id: 'Apr', value: 10, color: '#f4f9f9' }
];
