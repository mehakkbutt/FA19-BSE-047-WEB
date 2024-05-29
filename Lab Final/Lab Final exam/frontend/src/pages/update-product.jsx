import { Helmet } from 'react-helmet-async';

import { UpdateProductView } from 'src/sections/updateProduct';

export default function UpdateProductPage() {
  return (
    <>
      <Helmet>
        <title>Update Product | Demo </title>
      </Helmet>

      <UpdateProductView />
    </>
  );
}
