// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`;
}

const ROOTS_AUTH = '/auth';
const ROOTS_DASHBOARD = '/dashboard';
const ROOTS_APP = '/lmsapp';
const ROOTS_APP_ADMIN = '/admin';

// ----------------------------------------------------------------------

export const PATH_AUTH = {
  root: ROOTS_AUTH,
  login: path(ROOTS_AUTH, '/login'),
  register: path(ROOTS_AUTH, '/register'),
  loginUnprotected: path(ROOTS_AUTH, '/login-unprotected'),
  registerUnprotected: path(ROOTS_AUTH, '/register-unprotected'),
  verify: path(ROOTS_AUTH, '/verify'),
  resetPassword: path(ROOTS_AUTH, '/reset-password'),
};

export const PATH_PAGE = {
  comingSoon: '/coming-soon',
  maintenance: '/maintenance',
  pricing: '/pricing',
  payment: '/payment',
  about: '/about-us',
  contact: '/contact-us',
  faqs: '/faqs',
  page404: '/404',
  page500: '/500',
  components: '/components',
};

export const PATH_APP = {
  root: ROOTS_APP,
  general: {
    app: path(ROOTS_APP, '/app'),
    customsearch: path(ROOTS_APP, '/customsearch'),
    statistics: path(ROOTS_APP, '/statistics'),
    fine: path(ROOTS_APP, '/fine'),
    watchlist: path(ROOTS_APP, '/watchlist'),
    notifications: path(ROOTS_APP, '/notifications'),
  },
  user: {
    root: path(ROOTS_APP, '/user'),
    profile: path(ROOTS_APP, '/user/profile'),
    issued: path(ROOTS_APP, '/user/issued'),
    history: path(ROOTS_APP, '/user/history'),
    account: path(ROOTS_APP, '/user/account'),
  },
};
export const PATH_APP_ADMIN = {
  root: ROOTS_APP_ADMIN,
  general: {
    app: path(ROOTS_APP_ADMIN, '/app'),
    analytics: path(ROOTS_APP_ADMIN, '/analytics'),
    payment: path(ROOTS_APP_ADMIN, '/payment'),
    report: path(ROOTS_APP_ADMIN, '/report'),
  },
  books: {
    books: path(ROOTS_APP_ADMIN, '/books'),
    booksadd: path(ROOTS_APP_ADMIN, '/books/add'),
    booksupd: path(ROOTS_APP_ADMIN, '/books/update'),
  },
  circulation: {
    circ: path(ROOTS_APP_ADMIN, '/circulation'),
    issue: path(ROOTS_APP_ADMIN, '/circulation/issue'),
    return: path(ROOTS_APP_ADMIN, '/circulation/return'),
  },
  student: {
    root: path(ROOTS_APP_ADMIN, '/student'),
    authorize: path(ROOTS_APP_ADMIN, '/student/authorize'),
    list: path(ROOTS_APP_ADMIN, '/student/list'),
    fine: path(ROOTS_APP_ADMIN, '/student/fine'),
  },
  user: {
    root: path(ROOTS_APP_ADMIN, '/user'),
    profile: path(ROOTS_APP_ADMIN, '/user/profile'),
    account: path(ROOTS_APP_ADMIN, '/user/account'),
  },
};

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    app: path(ROOTS_DASHBOARD, '/app'),
    ecommerce: path(ROOTS_DASHBOARD, '/ecommerce'),
    analytics: path(ROOTS_DASHBOARD, '/analytics'),
    banking: path(ROOTS_DASHBOARD, '/banking'),
    booking: path(ROOTS_DASHBOARD, '/booking'),
  },
  mail: {
    root: path(ROOTS_DASHBOARD, '/mail'),
    all: path(ROOTS_DASHBOARD, '/mail/all'),
  },
  chat: {
    root: path(ROOTS_DASHBOARD, '/chat'),
    new: path(ROOTS_DASHBOARD, '/chat/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/chat/${name}`),
  },
  calendar: path(ROOTS_DASHBOARD, '/calendar'),
  kanban: path(ROOTS_DASHBOARD, '/kanban'),
  user: {
    root: path(ROOTS_DASHBOARD, '/user'),
    new: path(ROOTS_DASHBOARD, '/user/new'),
    list: path(ROOTS_DASHBOARD, '/user/list'),
    cards: path(ROOTS_DASHBOARD, '/user/cards'),
    profile: path(ROOTS_DASHBOARD, '/user/profile'),
    account: path(ROOTS_DASHBOARD, '/user/account'),
    edit: (name) => path(ROOTS_DASHBOARD, `/user/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, `/user/reece-chung/edit`),
  },
  eCommerce: {
    root: path(ROOTS_DASHBOARD, '/e-commerce'),
    shop: path(ROOTS_DASHBOARD, '/e-commerce/shop'),
    list: path(ROOTS_DASHBOARD, '/e-commerce/list'),
    checkout: path(ROOTS_DASHBOARD, '/e-commerce/checkout'),
    new: path(ROOTS_DASHBOARD, '/e-commerce/product/new'),
    view: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}`),
    edit: (name) => path(ROOTS_DASHBOARD, `/e-commerce/product/${name}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-blazer-low-77-vintage/edit'),
    demoView: path(ROOTS_DASHBOARD, '/e-commerce/product/nike-air-force-1-ndestrukt'),
  },
  invoice: {
    root: path(ROOTS_DASHBOARD, '/invoice'),
    list: path(ROOTS_DASHBOARD, '/invoice/list'),
    new: path(ROOTS_DASHBOARD, '/invoice/new'),
    view: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}`),
    edit: (id) => path(ROOTS_DASHBOARD, `/invoice/${id}/edit`),
    demoEdit: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b1/edit'),
    demoView: path(ROOTS_DASHBOARD, '/invoice/e99f09a7-dd88-49d5-b1c8-1daf80c2d7b5'),
  },
  blog: {
    root: path(ROOTS_DASHBOARD, '/blog'),
    posts: path(ROOTS_DASHBOARD, '/blog/posts'),
    new: path(ROOTS_DASHBOARD, '/blog/new'),
    view: (title) => path(ROOTS_DASHBOARD, `/blog/post/${title}`),
    demoView: path(ROOTS_DASHBOARD, '/blog/post/apply-these-7-secret-techniques-to-improve-event'),
  },
};

export const PATH_DOCS = 'https://docs-minimals.vercel.app/introduction';
