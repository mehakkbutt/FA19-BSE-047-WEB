import { Helmet } from 'react-helmet-async';

import { UpdateView } from 'src/sections/update';

export default function UpdatePage() {
  return (
    <>
      <Helmet>
        <title>Update Post | Demo </title>
      </Helmet>

      <UpdateView />
    </>
  );
}
