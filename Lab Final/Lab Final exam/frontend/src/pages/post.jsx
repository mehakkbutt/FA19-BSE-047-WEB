import { Helmet } from 'react-helmet-async';

import { PostView } from 'src/sections/post';

export default function Posts() {
  return (
    <>
      <Helmet>
        <title>Posts | Demo </title>
      </Helmet>

      <PostView />
    </>
  );
}
