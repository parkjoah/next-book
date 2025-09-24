// search?q=검색어 --> router query

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router);

  const { q } = router.query;

  return <h1>Search {q}</h1>;
}
