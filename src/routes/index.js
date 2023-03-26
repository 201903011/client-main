import { Suspense, lazy } from 'react';
import { Navigate, useRoutes, useLocation } from 'react-router-dom';
import CustomNavigate from './decide';
// layouts
import MainLayout from '../layouts/main';
import DashboardLayout from '../layouts/dashboard';
import LogoOnlyLayout from '../layouts/LogoOnlyLayout';
import AppLayout from '../layouts/app';
import AdminAppLayout from '../layouts/admin';
// guards
import GuestGuard from '../guards/GuestGuard';
import AuthGuard from '../guards/AuthGuard';
import RoleBasedGuard from '../guards/RoleBasedGuard';
// hooks

// config
import { PATH_AFTER_LOGIN, PATH_AFTER_LOGIN_ADMIN } from '../config';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

const Loadable = (Component) => (props) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { pathname } = useLocation();

  return (
    <Suspense fallback={<LoadingScreen isDashboard={pathname.includes('/lmsapp')} />}>
      <Component {...props} />
    </Suspense>
  );
};

export default function Router() {
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
          ),
        },
        {
          path: 'loginadmin',
          element: (
            <GuestGuard>
              <LoginAdmin />
            </GuestGuard>
          ),
        },
        {
          path: 'register',
          element: (
            <GuestGuard>
              <Register />
            </GuestGuard>
          ),
        },
        { path: 'login-unprotected', element: <Login /> },
        { path: 'register-unprotected', element: <Register /> },
        { path: 'reset-password', element: <ResetPassword /> },
        { path: 'verify', element: <VerifyCode /> },
      ],
    },

    // Main PAge Routes
    {
      path: 'lmsapp',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['student']}>
            <AppLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN} replace />, index: true },
        { path: 'app', element: <BookList /> },
        { path: 'customsearch', element: <CustomSearch /> },
        { path: 'statistics', element: <Statistics /> },
        { path: 'fine', element: <Fine /> },
        { path: 'issue', element: <Issue /> },

        {
          path: 'user',
          children: [
            { element: <Navigate to="/lmsapp/user/profile" replace />, index: true },
            { path: 'profile', element: <AppUserProfile /> },
            { path: 'issued', element: <AppUserIssued /> },
            { path: 'history', element: <AppUserHistory /> },
            { path: 'account', element: <AppUserAccount /> },
          ],
        },
        { path: 'watchlist', element: <WatchList /> },
        { path: 'notifications', element: <Notification /> },
      ],
    },

    // Admin Page Routes
    {
      path: 'admin',
      element: (
        <AuthGuard>
          <RoleBasedGuard accessibleRoles={['librarian']}>
            <AdminAppLayout />
          </RoleBasedGuard>
        </AuthGuard>
      ),
      children: [
        { element: <Navigate to={PATH_AFTER_LOGIN_ADMIN} replace />, index: true },
        {
          path: 'app',
          element: <AdminBookList />,
        },
        {
          path: 'books',
          children: [
            { element: <Navigate to="/admin/books/add" replace />, index: true },
            { path: 'add', element: <AdminBookAdd /> },
            { path: 'update', element: <AdminBookUpdate /> },
          ],
        },
        {
          path: 'circulation',
          children: [
            { element: <Navigate to="/admin/circulation/issue" replace />, index: true },
            { path: 'issue', element: <AdminBookIssue /> },
            { path: 'return', element: <AdminBookReturn /> },
          ],
        },
        { path: 'analytics', element: <AdminAnalytics /> },
        { path: 'payment', element: <AdminPayment /> },
        { path: 'report', element: <AdminReport /> },

        {
          path: 'student',
          children: [
            { element: <Navigate to="/admin/student/authorize" replace />, index: true },
            { path: 'authorize', element: <AdminStudAuthorize /> },
            { path: 'list', element: <AdminStudList /> },
            { path: 'fine', element: <AdminStudFine /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/admin/user/profile" replace />, index: true },
            { path: 'profile', element: <AdminProfile /> },
            { path: 'account', element: <AdminAccount /> },
          ],
        },
      ],
    },

    // Dashboard Routes
    {
      path: 'dashboard',
      element: (
        <AuthGuard>
          <DashboardLayout />
        </AuthGuard>
      ),
      children: [
        { element: <CustomNavigate />, index: true },
        { path: 'app', element: <GeneralApp /> },
        { path: 'ecommerce', element: <GeneralEcommerce /> },
        { path: 'analytics', element: <GeneralAnalytics /> },
        { path: 'banking', element: <GeneralBanking /> },
        { path: 'booking', element: <GeneralBooking /> },

        {
          path: 'e-commerce',
          children: [
            { element: <Navigate to="/dashboard/e-commerce/shop" replace />, index: true },
            { path: 'shop', element: <EcommerceShop /> },
            { path: 'product/:name', element: <EcommerceProductDetails /> },
            { path: 'list', element: <EcommerceProductList /> },
            { path: 'product/new', element: <EcommerceProductCreate /> },
            { path: 'product/:name/edit', element: <EcommerceProductCreate /> },
            { path: 'checkout', element: <EcommerceCheckout /> },
          ],
        },
        {
          path: 'user',
          children: [
            { element: <Navigate to="/dashboard/user/profile" replace />, index: true },
            { path: 'profile', element: <UserProfile /> },
            { path: 'cards', element: <UserCards /> },
            { path: 'list', element: <UserList /> },
            { path: 'new', element: <UserCreate /> },
            { path: ':name/edit', element: <UserCreate /> },
            { path: 'account', element: <UserAccount /> },
          ],
        },
        {
          path: 'invoice',
          children: [
            { element: <Navigate to="/dashboard/invoice/list" replace />, index: true },
            { path: 'list', element: <InvoiceList /> },
            { path: ':id', element: <InvoiceDetails /> },
            { path: ':id/edit', element: <InvoiceEdit /> },
            { path: 'new', element: <InvoiceCreate /> },
          ],
        },
        {
          path: 'blog',
          children: [
            { element: <Navigate to="/dashboard/blog/posts" replace />, index: true },
            { path: 'posts', element: <BlogPosts /> },
            { path: 'post/:title', element: <BlogPost /> },
            { path: 'new', element: <BlogNewPost /> },
          ],
        },
        {
          path: 'mail',
          children: [
            { element: <Navigate to="/dashboard/mail/all" replace />, index: true },
            { path: 'label/:customLabel', element: <Mail /> },
            { path: 'label/:customLabel/:mailId', element: <Mail /> },
            { path: ':systemLabel', element: <Mail /> },
            { path: ':systemLabel/:mailId', element: <Mail /> },
          ],
        },
        {
          path: 'chat',
          children: [
            { element: <Chat />, index: true },
            { path: 'new', element: <Chat /> },
            { path: ':conversationKey', element: <Chat /> },
          ],
        },
        // { path: 'calendar', element: <Calendar /> },
        // { path: 'kanban', element: <Kanban /> },
      ],
    },

    // Main Routes
    {
      path: '*',
      element: <LogoOnlyLayout />,
      children: [
        { path: 'coming-soon', element: <ComingSoon /> },
        { path: 'maintenance', element: <Maintenance /> },
        { path: 'pricing', element: <Pricing /> },
        { path: 'payment', element: <Payment /> },
        { path: '500', element: <Page500 /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" replace /> },
      ],
    },
    {
      path: '/',
      element: <MainLayout />,
      children: [
        { element: <HomePage />, index: true },
        { path: 'about-us', element: <About /> },
        { path: 'contact-us', element: <Contact /> },
        { path: 'faqs', element: <Faqs /> },
      ],
    },
    { path: '*', element: <Navigate to="/404" replace /> },
  ]);
}

// AUTHENTICATION
const Login = Loadable(lazy(() => import('../pages/auth/Login')));
const LoginAdmin = Loadable(lazy(() => import('../pages/auth/LoginAdmin')));
const Register = Loadable(lazy(() => import('../pages/auth/Register')));
const ResetPassword = Loadable(lazy(() => import('../pages/auth/ResetPassword')));
const VerifyCode = Loadable(lazy(() => import('../pages/auth/VerifyCode')));

// LMSAPP

// GENERAL
const BookList = Loadable(lazy(() => import('../pages/lmsapp/BookList')));
const CustomSearch = Loadable(lazy(() => import('../pages/lmsapp/CustomBookList')));
const Statistics = Loadable(lazy(() => import('../pages/lmsapp/new')));
const Fine = Loadable(lazy(() => import('../pages/lmsapp/new')));
const Issue = Loadable(lazy(() => import('../pages/lmsapp/BookIssue')));
//
const WatchList = Loadable(lazy(() => import('../pages/lmsapp/new')));
const Notification = Loadable(lazy(() => import('../pages/lmsapp/new')));

// USER
const AppUserProfile = Loadable(lazy(() => import('../pages/lmsapp/UserProfile')));
const AppUserAccount = Loadable(lazy(() => import('../pages/lmsapp/UserAccount')));
const AppUserIssued = Loadable(lazy(() => import('../pages/lmsapp/InvoiceList')));
const AppUserHistory = Loadable(lazy(() => import('../pages/lmsapp/UserList')));

// ADMIN

// GENERAL
const AdminBookList = Loadable(lazy(() => import('../pages/admin/BookList')));
const AdminAnalytics = Loadable(lazy(() => import('../pages/admin/Analytics')));
const AdminPayment = Loadable(lazy(() => import('../pages/admin/Payment')));
const AdminReport = Loadable(lazy(() => import('../pages/admin/Report')));

// BOOKS
const AdminBookAdd = Loadable(lazy(() => import('../pages/admin/BookAdd')));
const AdminBookUpdate = Loadable(lazy(() => import('../pages/admin/BookUpdate')));

// CIRCULATION
const AdminBookIssue = Loadable(lazy(() => import('../pages/admin/BookList')));
const AdminBookReturn = Loadable(lazy(() => import('../pages/admin/ReturnBook')));

// STUDENT
const AdminStudAuthorize = Loadable(lazy(() => import('../pages/admin/StudentAuth')));
const AdminStudList = Loadable(lazy(() => import('../pages/admin/StudentList')));
const AdminStudFine = Loadable(lazy(() => import('../pages/admin/StudentFine')));

// USERS
const AdminProfile = Loadable(lazy(() => import('../pages/admin/UserProfile')));
const AdminAccount = Loadable(lazy(() => import('../pages/admin/UserAccount')));

// USER

// DASHBOARD

// GENERAL
const GeneralApp = Loadable(lazy(() => import('../pages/dashboard/GeneralApp')));
const GeneralEcommerce = Loadable(lazy(() => import('../pages/dashboard/GeneralEcommerce')));
const GeneralAnalytics = Loadable(lazy(() => import('../pages/dashboard/GeneralAnalytics')));
const GeneralBanking = Loadable(lazy(() => import('../pages/dashboard/GeneralBanking')));
const GeneralBooking = Loadable(lazy(() => import('../pages/dashboard/GeneralBooking')));

// ECOMMERCE
const EcommerceShop = Loadable(lazy(() => import('../pages/dashboard/EcommerceShop')));
const EcommerceProductDetails = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductDetails')));
const EcommerceProductList = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductList')));
const EcommerceProductCreate = Loadable(lazy(() => import('../pages/dashboard/EcommerceProductCreate')));
const EcommerceCheckout = Loadable(lazy(() => import('../pages/dashboard/EcommerceCheckout')));

// INVOICE
const InvoiceList = Loadable(lazy(() => import('../pages/dashboard/InvoiceList')));
const InvoiceDetails = Loadable(lazy(() => import('../pages/dashboard/InvoiceDetails')));
const InvoiceCreate = Loadable(lazy(() => import('../pages/dashboard/InvoiceCreate')));
const InvoiceEdit = Loadable(lazy(() => import('../pages/dashboard/InvoiceEdit')));

// BLOG
const BlogPosts = Loadable(lazy(() => import('../pages/dashboard/BlogPosts')));
const BlogPost = Loadable(lazy(() => import('../pages/dashboard/BlogPost')));
const BlogNewPost = Loadable(lazy(() => import('../pages/dashboard/BlogNewPost')));

// USER
const UserProfile = Loadable(lazy(() => import('../pages/dashboard/UserProfile')));
const UserCards = Loadable(lazy(() => import('../pages/dashboard/UserCards')));
const UserList = Loadable(lazy(() => import('../pages/dashboard/UserList')));
const UserAccount = Loadable(lazy(() => import('../pages/dashboard/UserAccount')));
const UserCreate = Loadable(lazy(() => import('../pages/dashboard/UserCreate')));

// APP
const Chat = Loadable(lazy(() => import('../pages/dashboard/Chat')));
const Mail = Loadable(lazy(() => import('../pages/dashboard/Mail')));
const Calendar = Loadable(lazy(() => import('../pages/dashboard/Calendar')));
const Kanban = Loadable(lazy(() => import('../pages/dashboard/Kanban')));

// MAIN
const HomePage = Loadable(lazy(() => import('../pages/Home')));
const About = Loadable(lazy(() => import('../pages/About')));
const Contact = Loadable(lazy(() => import('../pages/Contact')));
const Faqs = Loadable(lazy(() => import('../pages/Faqs')));
const ComingSoon = Loadable(lazy(() => import('../pages/ComingSoon')));
const Maintenance = Loadable(lazy(() => import('../pages/Maintenance')));
const Pricing = Loadable(lazy(() => import('../pages/Pricing')));
const Payment = Loadable(lazy(() => import('../pages/Payment')));
const Page500 = Loadable(lazy(() => import('../pages/Page500')));
const NotFound = Loadable(lazy(() => import('../pages/Page404')));
