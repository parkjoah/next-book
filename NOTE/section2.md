# 섹션 2

## pageRouter

```
<<pages>>
index.js ---- ~/
about.js ---- ~/about
item.js  ---- ~/mypage

```

> pages폴더 안의 파일명 기반으로 자동 페이지 라우팅
>
> 폴더의 이름으로도 가능 ~

![alt text](image-6.png)

### 동적 경로 (Dynamic ROUTES)

~/item/1 같은 동적경로도 가능

![alt text](image-7.png)

---

- search?q=검색어 --> router query
- book/33

  [...id].tsx => catch all seg-
  경로가 book/33 아닌 여러개가 나열돼서 오는 경우
  book/33/22/233/221
  => id에 배열형태로 저장이 됨!

  [[...id]].tsx => optional catch allseg-

  => /book 까지 커버 가능

---

### 프리페칭 (Pre-Fetching)

이동 가능성 있는 모든 페이지를 사전에 미리 불러오는 거 (빠른 이동을 위해)

- Link 태그로 작성한 부분만 가능
- router.prefetch를 이용해서 추가해줄 수도 있음
- Link에서 prefetch 기능을 없앨 수 있음
  ```
  <Link href={"/search"} prefetch = {false}>search</Link>
  ```

---

npm run build

npm run start

---

### API Routes

Next.js에서 API를 구축할 수 있게 해주는 기능

![alt text](image-8.png)

---

### css modlue

---

### Global Layout

---

### 데이터 페칭

#### 01 기존의 react app 에서의 데이터 페칭

![alt text](image-9.png)

=> 초기 접속 요청부터 데이터 로딩까지 오랜 시간이 걸림

#### 02 next app 에서의 데이터 페칭

=> 사전 렌더링
![alt text](image-11.png)

---> 만약 요청이 오래걸리면 ?

그런 요청들은 next가 build 타임에 미리 사전렌더링을 마춰두도록 설정함...

![alt text](image-12.png)

---

### NEXT.JS 사전 렌더링

- SSR (서버사이드 렌더링)
  - 가장 기본적인 사전 렌더링 방식
  - 요청이 들어올 때 마다 사전 렌더링 진행
- SSG (정적 사이트 생성)
  - 빌드 타임에 미리 페이지를 사전렌더링 해 둠
- ISR (증분 정적 재생성)
  - 향후에 다룰 사전 렌더링 방식

---

## SSR (서버 사이드 렌더링)

- 가장 기본적인 사전 렌더링 방식
- 요청이 들어올 때 마다 사전 렌더링 진행

```
export const getServerSideProps = () => {

  // 컴포넌트보다 먼저 실행되어서, 컴포넌트에 필요한 데이터 불러오는 함수

  const data = "hello";

  return {
    props: {
      data,
    },
  };
};
```

=> 객체 형태로 return

---

#### window, document 같은 브라우저 전역을 서버에서 접근하면 에러가 날 수 있음

- console.log(window), window.location 등
- Next.js는 먼저 서버에서 렌더(SSR/프리렌더) 후에 클라이언트에서 하이드레이션한다.

  그래서 서버 단계에선 브라우저 API가 없다 → 접근 시 ReferenceError/크래시 가능.

  => 해결: 클라이언트에서만 실행되게 보장

  - useEffect 안에서 실행(마운트 이후, 브라우저에서만 동작)

---

#### SSR props 타입을 어떻게 줘야할지 ?

`InferGetServerSidePropsType<typeof getServerSideProps>`

InferGetServerSidePropsType => 자동으로 추론해줌

![alt text](image-13.png)

---

### promise.all 병렬 실행

#### 01 기존 방식

```
const allBooks = await fetchBooks();
const recoBooks = await fetchRandomBooks();

```

=> fetchBooks()가 끝날 때까지 기다린 뒤 → fetchRandomBooks() 실행

실행 순서 보장은 되지만, 두 함수가 서로 의존하지 않는 경우에는 불필요하게 느려짐

#### 02 Promise.all 병렬 실행

```
const [allBooks, recoBooks] = await Promise.all([
  fetchBooks(),
  fetchRandomBooks(),
]);
```

=> 두 함수를 동시에 실행 → 서로 의존하지 않는 비동기 작업이면 병렬 처리로 시간 절약 가능

---
