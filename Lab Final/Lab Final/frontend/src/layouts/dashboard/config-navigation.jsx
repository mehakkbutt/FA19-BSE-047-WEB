import SvgColor from 'src/components/svg-color';

const icon = (name) => (
  <SvgColor src={`/assets/icons/navbar/${name}.svg`} sx={{ width: 1, height: 1 }} />
);

const navConfig = [
  {
    title: 'dashboard',
    path: '/',
    icon: icon('ic_analytics'),
  },
  {
    title: 'All Posts',
    path: '/posts',
    icon: icon('ic_user'),
  },
  {
    title: 'Create Post',
    path: '/create',
    icon: icon('ic_cart'),
  },
  {
    title: 'All Products',
    path: '/products',
    icon: icon('ic_user'),
  },
  {
    title: 'Create Product',
    path: '/create-product',
    icon: icon('ic_cart'),
  },
  {
    title: 'Visited Products',
    path: '/visited-product',
    icon: icon('ic_user'),
  },
];

export default navConfig;
