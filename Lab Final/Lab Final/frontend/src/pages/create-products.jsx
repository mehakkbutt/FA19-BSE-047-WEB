import { Helmet } from 'react-helmet-async';

import { CreateProductView } from 'src/sections/createProduct';

export default function CreateProductPage() {
  return (
    <>
      <Helmet>
        <title> Create Product | Demo </title>
      </Helmet>

      <CreateProductView />
    </>
  );
}
