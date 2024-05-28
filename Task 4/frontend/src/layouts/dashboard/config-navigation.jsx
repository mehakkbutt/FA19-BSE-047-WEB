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
    title: 'All Post',
    path: '/posts',
    icon: icon('ic_user'),
  },
  {
    title: 'Create Post',
    path: '/create',
    icon: icon('ic_cart'),
  },
];

export default navConfig;
