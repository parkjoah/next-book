# section 5

## 페이지 캐싱

### Full Route Cache

Next 서버측에서 빌드 타임에 특정 페이지의 렌더링 결과를 캐싱하는 기능

=> 자동으로 정적페이지:Static Page / 동적페이지:Dynamic Page 로 분리 됨

정적페이지에만 풀 라우트 캐시가 적용 됨

특정 페이지가 접속 요청을 받을 때 마다 매번 변화가 생기거나, 데이터가 달라질 경우 자동 동적페이지로 분류

- 캐시되지 않는 data fetching 사용할 경우
- 동적 함수(쿠키, 헤더, 쿼리스트링)을 사용하는 컴포넌트가 있을 때

![alt text](image-1.png)

- static page에만 적용 됨

---

Full Route Cache에서도 ISR처럼 일정 주기로 업데이트 되도록 설정 가능함

- fetch, revalidate : 3 => 데이터가 갱신될때, 페이지 캐시도 함께 갱신되어서 업데이트 됨

---

section04 -> build error message 오류원인

```
⨯ useSearchParams() should be wrapped in a suspense bound
```

useSearchParams() => 쿼리스트링의 값을 꺼내옴 : build 타임에 값을 절대 알 수 없음!

-> 사전 렌더링과정에서 빠지도록, 오직 클라이언트 측에서만 실행이 되도록 설정해야함

#### Suspense 태그로 감싸기

Suspense : 미완성

- 사전 렌더링 과정에서 배제됨

=> fallback으로 설정해두면, 비동기작업이 종료될 때까지 유지됨

```
<div>
  <Searchbar />
  {children}
</div>

<div>
  <Suspense fallback={<div>Loading...</div>}>
    <Searchbar />
  </Suspense>
  {children}
</div>
```

---

---

> search page

여기서 search page는 searchParams를 불러와서 dynamic 페이지

-> 풀 라우트 캐시는 못하고 캐시를 "force-cache"로 설정해서
한번 검색 했던 결과에 대해서 빠르게 나오도록 설정...

> book [id] page

#### generateStaticParams

- 문자열로만
- 무조건 강제로 static으로 설정이 됨
- getStaticPaths의 appRouter 버전 느낌

```
export function generateStaticParams() {
  return [{ id: "1" }, { id: "2" }, { id: "3" }];
}
```

추가해주면 해당 params의 페이지를 static으로 설정 가능
(build시에 /book/1 , /book/2, /book/3 생기는 것을 확인 가능)

---

#### dynamicParams

```
export const dynamicParams =false;
```

이렇게 하면 해당 페이지의 params가 dynamic 하지 않음.

generateStaticParams로 내보내진 값을 제외하고는 404 !

---
