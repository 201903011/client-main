// routes
import { PATH_APP, PATH_DASHBOARD, PATH_DOCS } from '../../../routes/paths';
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
  book: getIcon('ic_book'),
  documents: getIcon('ic_doc'),
  search: getIcon('ic_search'),
  watchlist: getIcon('ic_watchlist'),
  notification: getIcon('ic_not'),
};

const navConfig = [
  // GENERAL
  // ----------------------------------------------------------------------
  {
    subheader: 'general',
    items: [
      { title: 'books', path: PATH_APP.general.app, icon: ICONS.book },
      { title: 'custom search', path: PATH_APP.general.customsearch, icon: ICONS.search },
      { title: 'statistics', path: PATH_APP.general.statistics, icon: ICONS.analytics },
      { title: 'pay fine', path: PATH_APP.general.fine, icon: ICONS.banking },
      { title: 'issue', path: PATH_APP.general.issue, icon: ICONS.banking },
    ],
  },

  // MANAGEMENT
  // ----------------------------------------------------------------------
  {
    subheader: 'management',
    items: [
      // USER
      {
        title: 'user',
        path: PATH_APP.user.root,
        icon: ICONS.user,
        children: [
          { title: 'profile', path: PATH_APP.user.profile },
          { title: 'issued books', path: PATH_APP.user.issued },
          // { title: 'history', path: PATH_APP.user.history },
        ],
      },

      // E-COMMERCE
      {
        title: 'watchlist',
        path: PATH_APP.general.watchlist,
        icon: ICONS.watchlist,
      },

      // INVOICE
      {
        title: 'Notifications',
        path: PATH_APP.general.notifications,
        icon: ICONS.notification,
      },
    ],
  },

  // SETTINGS
  // ----------------------------------------------------------------------
  {
    subheader: 'others',
    items: [
      // USER
      { title: 'setting', path: PATH_APP.user.account, icon: ICONS.calendar },
      { title: 'Profile', path: PATH_APP.user.profile, icon: ICONS.user },
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
