import { BookData } from "@/types";

export default async function fetchOneBook(
  id: number
): Promise<BookData | null> {
  const url = `https://onebite-books-server-main-kappa-five.vercel.app/book/${id}`;

  try {
    const res = await fetch(url);
    if (!res) {
      throw new Error();
    }
    return await res.json();
  } catch (error) {
    console.log(error);
    return null;
  }
}
