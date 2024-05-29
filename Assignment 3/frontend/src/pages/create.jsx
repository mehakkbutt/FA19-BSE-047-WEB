import { Helmet } from 'react-helmet-async';

import { CreateView } from 'src/sections/create';

export default function CreatePage() {
  return (
    <>
      <Helmet>
        <title> Create Post | Demo </title>
      </Helmet>

      <CreateView />
    </>
  );
}
