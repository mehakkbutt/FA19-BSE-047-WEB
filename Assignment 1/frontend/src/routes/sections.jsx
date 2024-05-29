import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import ProtectedRoutes from './protectedRoutes';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UpdatePage = lazy(() => import('src/pages/update'));
export const PostPage = lazy(() => import('src/pages/post'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const CreatePage = lazy(() => import('src/pages/create'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        {
          element: (
            <ProtectedRoutes>
              <IndexPage />
            </ProtectedRoutes>
          ),
          index: true,
        },
        {
          path: 'posts',
          element: (
            <ProtectedRoutes>
              <PostPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'create',
          element: (
            <ProtectedRoutes>
              <CreatePage />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'update/:postId',
          element: (
            <ProtectedRoutes>
              <UpdatePage />
            </ProtectedRoutes>
          ),
        },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'register',
      element: <RegisterPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);

  return routes;
}
