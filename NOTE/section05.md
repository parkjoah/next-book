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
