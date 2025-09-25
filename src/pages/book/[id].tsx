// book/33

// [...id].tsx => catch all seg-
// 경로가 book/33 아닌 여러개가 나열돼서 오는 경우
// book/33/22/233/221
// id에 배열형태로 저장이 됨!

// [[...id]].tsx => optional catch allseg-
// /book 까지 커버 가능

// import { useRouter } from "next/router";
// import BookItem from "@/components/book-item";
import style from "./[id].module.css";
import {
  // GetServerSidePropsContext,
  GetStaticPathsContext,
  // InferGetServerSidePropsType,
  InferGetStaticPropsType,
} from "next";
import fetchOneBook from "@/lib/fetch-one-book";
import { useRouter } from "next/router";
import { notFound } from "next/navigation";

export const getStaticPaths = () => {
  return {
    paths: [
      { params: { id: "1" } },
      { params: { id: "2" } },
      { params: { id: "3" } },
    ],
    fallback: true, // 대체, 대비책, 보험 느낌...
    // false -> 존재 x -> 404로..
    // blocking -> 즉시 생성
    // true -> 즉시 생성 + 데이터 없는 콜백 상태의 페이지먼저 반환
  };
};

export const getStaticProps = async (context: GetStaticPathsContext) => {
  const id = context.params!.id;
  console.log(id);
  const book = await fetchOneBook(Number(id));

  if (!book) {
    return { notFound: true };
  }
  return { props: { book } };
};

export default function Page({
  book,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  const router = useRouter();
  if (router.isFallback) return "로딩중입니다";

  if (!book) return "문제가 발생했습니다. 다시 시도해주세요";

  const { id, title, subTitle, description, author, publisher, coverImgUrl } =
    book;

  return (
    <div className={style.container} key={id}>
      <div
        style={{ backgroundImage: `url('${coverImgUrl}')` }}
        className={style.cover_img_container}
      >
        <img src={coverImgUrl} />
      </div>
      <div className={style.title}>{title}</div>
      <div className={style.subTitle}>{subTitle}</div>
      <div className={style.author}>
        {author} | {publisher}
      </div>
      <div className={style.description}> {description}</div>
    </div>
  );
}

// export default function Page() {
//   const router = useRouter();
//   console.log(router);

//   const { id } = router.query;

//   return <h1> Book {id}</h1>;
// }
