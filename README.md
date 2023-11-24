# zoomzoomtour

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
[GET] /tours/:tourIdx/year/:year/month/:month
```

---

### 고객 - 투어 예약 신청

```
[POST] /tours/:tourIdx/books
```

### 고객 - 투어 예약 신청 취소

```
[DELETE] /tours/books/:booIdx
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
[GET] /tours/:tourIdx/books
```

### 판매자 - 투어 예약 승인

```
[PUT] /tours/:tourIdx/books/:bookIdx/confirm
```

### 판매자 - 투어 예약 승인 토큰 조회

```
[GET] /tours/books/token/:token
```

### 판매자 - 투어 휴일 지정

```
[POST] /tours/:tourIdx/dayoff
```

- Body
  - type
  - month
  - date
  - day

### 판매자 - 투어 휴일 지정 취소

```
[DELETE] /tours/:tourIdx/dayoff/:dayoffIdx
```
