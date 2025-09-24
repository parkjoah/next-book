// book/33

// [...id].tsx => catch all seg-
// 경로가 book/33 아닌 여러개가 나열돼서 오는 경우
// book/33/22/233/221
// id에 배열형태로 저장이 됨!

// [[...id]].tsx => optional catch allseg-
// /book 까지 커버 가능

import { useRouter } from "next/router";

export default function Page() {
  const router = useRouter();
  console.log(router);

  const { id } = router.query;

  return <h1> Book {id}</h1>;
}
