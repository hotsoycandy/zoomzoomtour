# zoomzoomtour pretest

줌줌투어 사전과제

## API Spec

### 공통 - 회원가입

```
[POST] /users/signup
```

- Body

  - email
  - password

### 공통 - 로그인

```
[POST] /users/signin
```

- Body
  - email
  - password

### 공통 - 투어 목록 조회

```
[GET] /tours
```

### 공통 - 투어 일정 조회

```
[GET] /tours/:tourId
```

---

### 고객 - 투어 예약 신청

```
[POST] /tours/:tourId/books
```

### 고객 - 투어 예약 신청 취소

```
[DELETE] /tours/:tourId/books
```

### 고객 - 나의 투어 예약 신청 목록 조회

```
[GET] /tours/books/me
```

---

### 판매자 - 투어 생성

```
[POST] /tours
```

- Body
  - title
  - description

### 판매자 - 투어 예약 신청 목록 조회

```
[GET] /tours/:tourId/books
```

### 판매자 - 투어 예약 승인

```
[POST] /tours/:tourId/books/:bookId
```

### 판매자 - 투어 예약 승인 토큰 조회

```
[GET] /tours/:tourId/books/token
```

### 판매자 - 투어 휴일 지정

```
[POST] /tours/:tourId/dayoff
```

- Body
  - type
  - day
  - date

### 판매자 - 투어 휴일 지정 취소

```
[DELETE] /tours/:tourId/dayoff/:dayoffId
```
