// search?q=검색어 --> router query

import SearchableLayout from "@/components/searchable-layout";
// import { useRouter } from "next/router";
import { ReactNode } from "react";
import books from "@/mock/books.json";
import BookItem from "@/components/book-item";

export default function Page() {
  // const router = useRouter();
  // console.log(router);
  // const { q } = router.query;
  // return <h1>Search {q}</h1>;
  return (
    <div>
      {books.map((book) => (
        <BookItem key={book.id} {...book} />
      ))}
    </div>
  );
}
Page.getLayout = (page: ReactNode) => {
  return <SearchableLayout>{page}</SearchableLayout>;
};
