// routes
import { PATH_APP_ADMIN, PATH_DASHBOARD, PATH_DOCS } from '../../../routes/paths';
// components
import Label from '../../../components/Label';
import SvgIconStyle from '../../../components/SvgIconStyle';

// ----------------------------------------------------------------------

const getIcon = (name) => <SvgIconStyle src={`/icons/${name}.svg`} sx={{ width: 1, height: 1 }} />;

const ICONS = {
  blog: getIcon('ic_blog'),
  cart: getIcon('ic_cart'),
  chat: getIcon('ic_chat'),
  mail: getIcon('ic_mail'),
  student: getIcon('ic_stud'),
  user: getIcon('ic_user'),
  kanban: getIcon('ic_kanban'),
  banking: getIcon('ic_banking'),
  booking: getIcon('ic_booking'),
  invoice: getIcon('ic_invoice'),
  calendar: getIcon('ic_settings'),
  ecommerce: getIcon('ic_circ'),
  analytics: getIcon('ic_analytics'),
  dashboard: getIcon('ic_book'),
  documents: getIcon('ic_doc'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      {
        title: 'books',
        path: PATH_APP_ADMIN.books.books,
        icon: ICONS.dashboard,
        children: [
          { title: 'add', path: PATH_APP_ADMIN.books.booksadd },
          { title: 'update', path: PATH_APP_ADMIN.books.booksupd },
        ],
      },
      {
        title: 'Circulation',
        path: PATH_APP_ADMIN.circulation.circ,
        icon: ICONS.ecommerce,
        children: [
          { title: 'Issue book', path: PATH_APP_ADMIN.circulation.issue },
          { title: 'Return book', path: PATH_APP_ADMIN.circulation.return },
          // { title: 'Authorize student', path: PATH_APP_ADMIN.circulation.return },
        ],
      },
      { title: 'analytics', path: PATH_APP_ADMIN.general.analytics, icon: ICONS.analytics },
      { title: 'payment', path: PATH_APP_ADMIN.general.payment, icon: ICONS.banking },
      { title: 'report', path: PATH_APP_ADMIN.general.report, icon: ICONS.booking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'student',
        path: PATH_APP_ADMIN.student.root,
        icon: ICONS.student,
        children: [
          { title: 'Authorize', path: PATH_APP_ADMIN.student.authorize },
          { title: 'Student List', path: PATH_APP_ADMIN.student.list },
          { title: 'Fine', path: PATH_APP_ADMIN.student.fine },
        ],
      },

      // E-COMMERCE
      // {
      //   title: 'e-commerce',
      //   path: PATH_DASHBOARD.eCommerce.root,
      //   icon: ICONS.cart,
      //   children: [
      //     { title: 'shop', path: PATH_DASHBOARD.eCommerce.shop },
      //     { title: 'product', path: PATH_DASHBOARD.eCommerce.demoView },
      //     { title: 'list', path: PATH_DASHBOARD.eCommerce.list },
      //     { title: 'create', path: PATH_DASHBOARD.eCommerce.new },
      //     { title: 'edit', path: PATH_DASHBOARD.eCommerce.demoEdit },
      //     { title: 'checkout', path: PATH_DASHBOARD.eCommerce.checkout },
      //   ],
      // },

      // // INVOICE
      // {
      //   title: 'invoice',
      //   path: PATH_DASHBOARD.invoice.root,
      //   icon: ICONS.invoice,
      //   children: [
      //     { title: 'list', path: PATH_DASHBOARD.invoice.list },
      //     { title: 'details', path: PATH_DASHBOARD.invoice.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.invoice.new },
      //     { title: 'edit', path: PATH_DASHBOARD.invoice.demoEdit },
      //   ],
      // },

      // // BLOG
      // {
      //   title: 'blog',
      //   path: PATH_DASHBOARD.blog.root,
      //   icon: ICONS.blog,
      //   children: [
      //     { title: 'posts', path: PATH_DASHBOARD.blog.posts },
      //     { title: 'post', path: PATH_DASHBOARD.blog.demoView },
      //     { title: 'create', path: PATH_DASHBOARD.blog.new },
      //   ],
      // },
    ],
  },

  // SETTINGS
  // ----------------------------------------------------------------------
  {
    subheader: 'others',
    items: [
      // USER
      { title: 'setting', path: PATH_APP_ADMIN.user.account, icon: ICONS.calendar },
      { title: 'Profile', path: PATH_APP_ADMIN.user.profile, icon: ICONS.user },
      { title: 'documentation', path: PATH_DOCS, icon: ICONS.documents },
    ],
  },

  // APP
  // ----------------------------------------------------------------------
  // {
  //   subheader: 'app',
  //   items: [
  //     {
  //       title: 'mail',
  //       path: PATH_DASHBOARD.mail.root,
  //       icon: ICONS.mail,
  //       info: (
  //         <Label variant="outlined" color="error">
  //           +32
  //         </Label>
  //       ),
  //     },
  //     { title: 'chat', path: PATH_DASHBOARD.chat.root, icon: ICONS.chat },
  //     { title: 'calendar', path: PATH_DASHBOARD.calendar, icon: ICONS.calendar },
  //     { title: 'kanban', path: PATH_DASHBOARD.kanban, icon: ICONS.kanban },
  //   ],
  // },
];

export default navConfig;
