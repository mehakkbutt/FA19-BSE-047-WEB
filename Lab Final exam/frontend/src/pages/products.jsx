import { Helmet } from 'react-helmet-async';

import { ProductView } from 'src/sections/product';

export default function Products() {
  return (
    <>
      <Helmet>
        <title>Products | Demo </title>
      </Helmet>

      <ProductView />
    </>
  );
}
