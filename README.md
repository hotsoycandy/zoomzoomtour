# zoomzoomtour pretest

줌줌투어 사전과제

## API Spec

### 공통 - 회원가입

```
[POST] /auth/signup
```

- Body

  - email
  - password
  - nickname

- Error
  - 이메일 중복
  - 비밀번호 정규식
  - 닉네임 중복

### 공통 - 로그인

```
[POST] /auth/signin
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
[POST] /tours/:tourId/register
```

### 고객 - 투어 예약 신청 취소

```
[DELETE] /tours/:tourId/register
```

### 고객 - 나의 투어 예약 신청 목록 조회

```
[GET] /tours/register/me
```

---

### 판매자 - 투어 생성

```
[POST] /tours
```

- Body
  - title

### 판매자 - 투어 예약 신청 목록 조회

```
[GET] /tours/:tourId/register
```

### 판매자 - 투어 예약 승인

```
[POST] /tours/:tourId/register/:registerId
```

### 판매자 - 투어 예약 승인 토큰 조회

```
[GET] /tours/:tourId/register/token
```

### 판매자 - 투어 휴일 지정

```
[POST] /tour/:tourId/day-off
```

- Body
  - dayOffDate

### 판매자 - 투어 휴일 지정 취소

```
[DELETE] /tour/:tourId/day-off
```

- Body
  - dayOffDate
