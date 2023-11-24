# zoomzoomtour

## API Spec

### 공통 - 회원가입

```
[POST] /users/signup
```

회원가입 API입니다.

이메일은 중복될 수 없습니다.

비밀번호는 영대문자, 영소문자, 숫자, 특수문자를 포함해야 합니다.

- Body
  - email: string
  - password: string (Max 30)

### 공통 - 로그인

```
[POST] /users/signin
```

로그인 API입니다.

로그인 성공 시 JWT 토큰을 반환합니다.
토큰 유지 시간은 1일입니다.

- Body
  - email
  - password

### 공통 - 투어 목록 조회

```
[GET] /tours
```

모든 투어 상품 목록을 조회할 수 있는 API입니다.

### 공통 - 투어 일정 조회

```
[GET] /tours/:tourIdx/year/:year/month/:month
```

투어의 예약 가능 일정을 월단위로 조회할 수 있는 API입니다.

일정에 변동이 없을 경우 캐시된 일정을 불러옵니다.

---

### 고객 - 투어 예약 신청

```
[POST] /tours/:tourIdx/books
```

[로그인이 필요]

투어 예약을 할 수 있는 API입니다.

같은 날에 예약된 투어가 5건 이하라면 자동으로 승인됩니다.

- Body
  - schedule: string (date)

### 고객 - 투어 예약 신청 취소

```
[DELETE] /tours/books/:booIdx
```

[로그인이 필요]

투어 예약을 취소할 수 있는 API입니다.

투어 예정일보다 3일 전에만 취소할 수 있습니다.

### 고객 - 나의 투어 예약 신청 목록 조회

```
[GET] /tours/books/me
```

[로그인이 필요]

내가 예약한 투어 목록을 확인할 수 있는 API입니다.

---

### 판매자 - 투어 생성

```
[POST] /tours
```

[로그인이 필요]

투어를 생성할 수 있는 API입니다.

- Body
  - title: string (Max 100)
  - description: string (Max 1000)

### 판매자 - 투어 예약 신청 목록 조회

```
[GET] /tours/:tourIdx/books
```

[로그인이 필요]

내가 생성한 투어의 예약 목록을 확인할 수 있는 API입니다.

### 판매자 - 투어 예약 승인

```
[PUT] /tours/:tourIdx/books/:bookIdx/confirm
```

[로그인이 필요]

고객이 신청한 투어 예약 승인을 할 수 있는 API입니다.

이미 승인된 예약은 다시 승인할 수 없습니다.

### 판매자 - 투어 예약 승인 토큰 조회

```
[GET] /tours/books/token/:token
```

[로그인이 필요]

예약 승인 토큰으로 예약 여부를 확인할 수있는 API입니다.

### 판매자 - 투어 휴일 지정

```
[POST] /tours/:tourIdx/dayoff
```

[로그인이 필요]

투어의 휴일을 지정할 수 있는 API입니다.

특정 월, 일 혹은 요일을 지정할 수 있습니다.

- Body
  - type: string ('DATE' | 'DAY')
  - month: number (1 ~ 12. required when type is 'DATE')
  - date: number (1 ~ 31. required when type is 'DATE')
  - day: number (0[sunday] ~ 6[saturday]. required when type is 'DAY')

### 판매자 - 투어 휴일 목록 조회

```
[GET] /tours/:tourIdx/dayoff
```

[로그인이 필요]

투어의 휴일 목록을 조회할 수 있는 API입니다.

### 판매자 - 투어 휴일 지정 취소

```
[DELETE] /tours/:tourIdx/dayoff/:dayoffIdx
```

[로그인이 필요]

투어의 휴일 지정을 취소할 수 있는 API입니다.
