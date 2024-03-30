## 멋쟁이사자 프론트엔드 나무반🌳 타입스크립트 스터디

# 1장. 기본 타입

### 1. 불리언 (Boolean)

> 가장 기본적인 데이터 타입으로 _boolean_ 값이라고 일컫는 참/거짓(true/false) 값.

```ts
let isDone: boolean = false;
let isRight: boolean = true;
```

<br />

### 2. 숫자 (Number)

---

> TypeScript의 모든 숫자는 부동 소수 값임. 부동 소수에는 *number*라는 타입이 붙혀짐. TypeScript는 16진수, 10진수 리터럴에 더불어, ECMAScript 2015에 소개된 2진수, 8진수 리터럴도 지원함.

```ts
let decimal: number = 6;
let hex: number = 0xf00d;
let binary: number = 0b1010;
let octal: number = 0o744;
```

<br />

### 3. 문자열 (String)

---

> 텍스트 데이터 타입을 *string*으로 표현. **큰따옴표 (")나 작은따옴표 (')를 문자열 데이터를 감싸는데 사용**.

```ts
let color: string = "blue";
color = "red";
```

> _템플릿 문자열_ 을 사용하면 **여러 줄에 걸쳐 문자열을 작성**할 수 있으며, **표현식을 포함**시킬 수도 있음. **이 문자열은 백틱/백쿼트 (` ) 문자로 감싸지며, ${ expr }과 같은 형태로 표현식을 포함**시킬 수 있음.

```ts
let fullName: string = `Bob Bobbington`;
let age: number = 37;
let sentence: string = `Hello, my name is ${fullName}.
I'll be ${age + 1} years old next month.`;
```

<br />

### 4. 배열 (Array)

---

> 배열 타입은 두 가지 방법으로 쓸 수 있음. 첫 번째 방법은, **배열 요소들을 나타내는 타입 뒤에 []를 쓰는 것.**

```ts
let list: number[] = [1, 2, 3];
```

> 두 번째 방법은 **제네릭 배열 타입을 쓰는 것.**

```ts
let list: Array<number> = [1, 2, 3];
```

<br/>

### 5. 튜플 (Tuple)

---

> 요소의 타입과 개수가 고정된 배열을 표현. 요소들의 타입이 모두 같을 필요는 없음.

```ts
// 튜플 타입으로 선언
let x: [string, number];

// 초기화
x = ["hello", 10]; // 성공

// 잘못된 초기화
x = [10, "hello"]; // 오류
```

> 정해진 인덱스에 위치한 요소에 접근하면 해당 타입이 나타남.

```ts
console.log(x[0].substring(1)); // 성공
console.log(x[1].substring(1)); // 오류, 'number'에는 'substring' 이 없음.
```

> 정해진 인덱스 외에 다른 인덱스에 있는 요소에 접근하면, 오류가 발생.

```ts
x[3] = "world"; // 오류

console.log(x[5].toString()); // '[string, number]' 타입에는 프로퍼티 '5'가 없음.
```

<br/>

### 6. 열거 (Enum)

---

<br/>

### 7. Any

---

> **알지 못하는 타입을 표현해야 할 때 사용**. 사용자로부터 받은 데이터나 서드 파티 라이브러리 같은 동적인 컨텐츠에서 올 수 있음. 이 경우 **_타입 검사를 하지 않고, 그 값들이 컴파일 시간에 검사를 통과하길 원함_**. 이를 위해, any 타입을 사용할 수 있습니다

```ts
let notSure: any = 4;
notSure = "maybe a string instead";
notSure = false; // 성공
```

> **any 타입은 기존에 JavaScript로 작업할 수 있는 강력한 방법**. 컴파일 중에 점진적으로 타입 검사를 하거나 하지 않을 수 있음.
> <br/>Object가 비슷한 역할을 할 수 있을 것 같다고 생각할 수도 있지만, **_Object로 선언된 변수들은 오직 어떤 값이든 그 변수에 할당할 수 있게 해주지만 실제로 메서드가 존재하더라도, 임의로 호출할 수는 없음_**

```ts
let notSure: any = 4;
notSure.ifItExists(); // 성공, ifItExists 는 런타임엔 존재.
notSure.toFixed(); // 성공, toFixed는 존재합니다. (하지만 컴파일러는 검사하지 않음)

let prettySure: Object = 4;
prettySure.toFixed(); // 오류: 프로퍼티 'toFixed'는 'Object'에 존재하지 않습니다.
```

> 또한, **타입의 일부만 알고 전체는 알지 못할 때 유용**. 예를 들어, 여러 다른 타입이 섞인 배열을 다룰 수 있음.

```ts
let list: any[] = [1, true, "free"];

list[1] = 100;
```

<br />

### 8. Void

---

> 어떤 타입도 존재할 수 없음을 나타내기 때문에, any의 반대 타입. void는 **보통 함수에서 반환 값이 없을 때 반환 타입을 표현하기 위해 쓰임.**

```ts
function warnUser(): void {
  console.log("This is my warning message");
}
```

<br/>

### 9. Null and Undefined

---

<br />

### 10. Never

---

> 절대 발생할 수 없는 타입. 예를 들어 **함수 표현식이나 화살표 함수 표현식에서 항상 오류를 발생시키거나 절대 반환하지 않는 반환 타입**으로 쓰임. **변수 또한 타입 가드에 의해 아무 타입도 얻지 못하게 좁혀지면 never 타입을 얻게 될 수 있음**.
> <br>
> never타입은 모든 타입에 할당 가능한 하위 타입. 하지만 반대로 어떤 타입도 never에 할당할 수 있거나, 하위 타입이 아님.(never 자신은 제외) 심지어 any 도 never에 할당할 수 없음.

```ts
// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function error(message: string): never {
  throw new Error(message);
}

// 반환 타입이 never로 추론된다.
function fail() {
  return error("Something failed");
}

// never를 반환하는 함수는 함수의 마지막에 도달할 수 없다.
function infiniteLoop(): never {
  while (true) {}
}
```

<br/>

### 11. 객체 (Object)

---

> 원시 타입이 아닌 타입. _number, string, boolean, bigint, symbol, null, 또는 undefined 가 아닌 나머지_.

```ts
declare function create(o: object | null): void;

create({ prop: 0 }); // 성공
create(null); // 성공

create(42); // 오류
create("string"); // 오류
create(false); // 오류
create(undefined); // 오류
```

<br />

### 12. 타입 단언 (Type assertions)

---

> **_Typescript보다 개발자가 값에 대해 더 잘 알고 있을 때 컴파일러에게 "날 믿어, 난 내가 뭘 하고 있는지 알아"라고 말해주는 방법_**. 런타임에 영향을 미치지 않으며, 온전히 컴파일러만 이를 사용. 타입 스크립트는 개발자가 필요한 어떤 특정 검사를 수행했다고 인지

<br />

> 타입 단언에는 두 가지 형태가 있음. 하나는, **_"angle-bracket" 문법_**

```ts
let someValue: any = "this is a string";

let strLength: number = (<string>someValue).length;
```

> 다른 하나는 **_as-문법_**

```ts
let someValue: any = "this is a string";

let strLength: number = (someValue as string).length;
```

> TypeScript를 JSX와 함께 사용할 때는, as-스타일의 단언만 허용.

<br/>

---

### 출처

[TypeScript-Handbook 한글 문서][id]

[id]: (https://typescript-kr.github.io/pages/basic-types.html) "Optional Title here"
