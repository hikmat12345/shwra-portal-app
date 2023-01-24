// ----------------------------------------------------------------------

function path(root: string, sublink: string) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  register: path(ROOTS_AUTH, '/register'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
  forgetPassword: path(ROOTS_AUTH, '/forget-password'),
  verify: path(ROOTS_AUTH, '/verify'),

  completeProfile: path(ROOTS_AUTH, '/profile/complete'),

  accountPending: path(ROOTS_AUTH, '/account/pending'),
  accountBlocked: path(ROOTS_AUTH, '/account/blocked')
};

export const PATH_PAGE = {
  page404: '/404',
  page500: '/500'
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  main: path(ROOTS_DASHBOARD, '/general-dashboard'),
  general: {
    app: path(ROOTS_DASHBOARD, '/app')
  },
  packages: {
    root: path(ROOTS_DASHBOARD, '/packages'),
    list: path(ROOTS_DASHBOARD, '/packages/list'),
    add: path(ROOTS_DASHBOARD, '/packages/new')
  },
  features: {
    root: path(ROOTS_DASHBOARD, '/features'),
    list: path(ROOTS_DASHBOARD, '/features/list'),
    add: path(ROOTS_DASHBOARD, '/features/new')
  },
  promotions: {
    root: path(ROOTS_DASHBOARD, '/promotions'),
    list: path(ROOTS_DASHBOARD, '/promotions/list'),
    add: path(ROOTS_DASHBOARD, '/promotions/new')
  },
  request: {
    root: path(ROOTS_DASHBOARD, '/request'),
    adminRoot: path(ROOTS_DASHBOARD, '/request/list/admin'),
    clientRoot: path(ROOTS_DASHBOARD, '/request/list/client'),
    lawyerRoot: path(ROOTS_DASHBOARD, '/request/list/lawyer'),
    newRequest: path(ROOTS_DASHBOARD, '/request/new')
  },

  lawyer: {
    root: path(ROOTS_DASHBOARD, '/lawyer'),
    profile: path(ROOTS_DASHBOARD, '/lawyer/profile'),
    list: path(ROOTS_DASHBOARD, '/lawyer/list'),
    newLawyer: path(ROOTS_DASHBOARD, '/lawyer/new'),
    editById: path(ROOTS_DASHBOARD, `/lawyer/reece-chung/edit`)
  },

  client: {
    root: path(ROOTS_DASHBOARD, '/client'),
    profile: path(ROOTS_DASHBOARD, '/client/profile'),
    list: path(ROOTS_DASHBOARD, '/client/list'),
    newClient: path(ROOTS_DASHBOARD, '/client/new'),
    editById: path(ROOTS_DASHBOARD, `/client/reece-chung/edit`)
  },

  calendar: {
    root: path(ROOTS_DASHBOARD, '/calendar')
  },

  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    editById: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    configurations: path(ROOTS_DASHBOARD, '/user/configurations')
  },

  availability: {
    root: path(ROOTS_DASHBOARD, '/availability/schedules')
  },

  appointments: {
    root: path(ROOTS_DASHBOARD, '/appointments'),
    admin: path(ROOTS_DASHBOARD, '/admin-appointments')
  },
  categories: {
    admin: path(ROOTS_DASHBOARD, '/categories'),
    createNew: path(ROOTS_DASHBOARD, '/categories/new')
  },
  complaints: {
    root: path(ROOTS_DASHBOARD, '/complaints'),
    list: path(ROOTS_DASHBOARD, '/complaints/list'),
  }
};
