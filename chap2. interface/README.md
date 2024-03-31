# 2장. 인터페이스

```ts
interface LabeledValue {
  label: string;
}

function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj);
```

### 🏀 선택적 프로퍼티(Optional Property)

---

> **인터페이스의 모든 프로퍼티가 필요하지 않을 때** 사용. 객체 안에 몇 개의 프로퍼티만 채워 함수에 전달하는 "option bags" 같은 패턴 만들 때 유용.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  let newSquare = { color: "white", area: 100 };
  if (config.color) {
    newSquare.color = config.color;
  }
  if (config.width) {
    newSquare.area = config.width * config.width;
  }
  return newSquare;
}

let mySquare = createSquare({ color: "black" });
```

> 선택적 프로퍼티는 선언에서 **프로퍼티 끝에 ?를 붙여 표시**함.
> **인터페이스에 속하지 않는 프로퍼티 사용을 방지**할 수 있음.

<br />

### 🏀 읽기전용 프로퍼티(Readonly Property)

---

> _**객체가 처음 생성될 때만 수정**_ 가능. **readonly를 넣어 지정**.

```ts
interface Point {
  readonly x: number;
  readonly y: number;
}
```

> 객체 리터럴을 통해 _**할당한 이후, 수정 불가**_

```ts
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // 오류!
```

> 모든 변경 메서드(Mutating Methods)가 제거된 Array<T>와 동일한 _**ReadonlyArray<T> 타입을 제공**_. 생성 후에 _**배열을 변경하지 않음 보장**_

```ts
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 오류!
ro.push(5); // 오류!
ro.length = 100; // 오류!
a = ro; // 오류
```

> ReadonlyArray를 _**일반 배열에 재할당하는 것 불가능**_. 하지만 _**타입 단언으로 오버라이딩은 가능**_.

```ts
a = ro as number[]; // 성공
```

> readonly와 const 중 _**변수는 const를 사용하고 프로퍼티는 readonly를 사용**_.

<br />

### 🏀 초과 프로퍼티 검사(Excess Property Check)

---

> 인터페이스의 첫 번째 예제처럼 { label: string; }을 기대해도 { size: number; label: string; }를 넣는 것 가능. 하지만 선택적 프로퍼티와 결합시 에러 발생 가능.

```ts
interface SquareConfig {
  color?: string; // 선택적 프로퍼티
  width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
  // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
```

> **_객체 리터럴은 다른 변수에 할당할 때나 인수로 전달할 때 초과 프로퍼티 검사 (excess property checking)를 받음_**. 만약 객체 리터럴이 "**대상 타입 (target type)"이 갖고 있지 않은 프로퍼티를 갖고 있으면, 에러가 발생**.

```ts
// error: Object literal may only specify known properties, but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });
```

### 오류 해결 방법 3가지

> 1. **타입 단언**으로 해결.

```ts
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

> 2. **문자열 인덱스 서명**(string index signatuer) 추가.

```ts
interface SquareConfig {
  color?: string;
  width?: number;
  [propName: string]: any; // 문자열 인덱스 서명
}
```

> 3. **객체를 다른 변수에 할당**. squareOptions와 SquareConfig 사이에 공통 프로퍼티가 있는 경우에만 위와 같은 방법 사용 가능.

```ts
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

<br />

### 🏀 함수 타입

---

> 인터페이스로 JavaScript 객체가 가질 수 있는 넓은 범위의 형태를 기술가능. 프로퍼티로 객체를 기술하는 것 외에, 함수 타입을 설명 가능.

> 함수 타입을 기술하기 위해, **_인터페이스에 호출 서명 (call signature)를 전달_**. 매개변수 목록과 반환 타입만 주어진 함수 선언과 비슷합니다. **각 매개변수는 이름과 타입이 모두 필요**.

```ts
interface SearchFunc {
  (source: string, substring: string): boolean;
}
```
