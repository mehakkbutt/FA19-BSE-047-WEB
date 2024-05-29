import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';

import ProtectedRoutes from './protectedRoutes';

export const IndexPage = lazy(() => import('src/pages/app'));
export const UpdatePage = lazy(() => import('src/pages/update'));
export const UpdateProductPage = lazy(() => import('src/pages/update-product'));
export const PostPage = lazy(() => import('src/pages/post'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const RegisterPage = lazy(() => import('src/pages/register'));
export const CreatePage = lazy(() => import('src/pages/create'));
export const CreateProductPage = lazy(() => import('src/pages/create-products'));
export const View = lazy(() => import('src/pages/create-products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ViewSingleProduct = lazy(() => import('src/pages/view-product'));
export const VisitedProductPage = lazy(() => import('src/pages/visited-products'));

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
        {
          path: 'update-product/:productId',
          element: (
            <ProtectedRoutes>
              <UpdateProductPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'view-product/:productId',
          element: (
            <ProtectedRoutes>
              <ViewSingleProduct />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'products',
          element: (
            <ProtectedRoutes>
              <ProductsPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'create-product',
          element: (
            <ProtectedRoutes>
              <CreateProductPage />
            </ProtectedRoutes>
          ),
        },
        {
          path: 'visited-product',
          element: (
            <ProtectedRoutes>
              <VisitedProductPage />
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
