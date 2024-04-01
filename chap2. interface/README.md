# 2장. 인터페이스

> ## 목차
>
> > 1. [선택적 프로퍼티(Optional Property)](#🏀-선택적-프로퍼티optional-property)
> > 2. [읽기전용 프로퍼티(Readonly Property)](#🏀-읽기전용-프로퍼티readonly-property)
> > 3. [초과 프로퍼티 검사(Excess Property Check)](#🏀-초과-프로퍼티-검사excess-property-check)
> > 4. [함수 타입](#🏀-함수-타입)
> > 5. [인덱서블 타입(Indexable Type)](#🏀-인덱서블-타입-indexable-types)

<br/>

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

> 실 사용 예시

```ts
let mySearch: SearchFunc; // interface 할당
mySearch = function (source: string, subString: string) {
  let result = source.search(subString);
  return result > -1;
};
```

> 올바른 함수 타입 검사를 위해, 매개변수의 이름이 같을 필요는 없음.

```ts
let mySearch: SearchFunc;
mySearch = function (src: string, sub: string): boolean {
  let result = src.search(sub);
  return result > -1;
};
```

> 타입을 전혀 지정하지 않고 싶다면, SearchFunc 타입의 변수로 직접 함수 값이 할당되었기 때문에 TypeScript의 문맥상 타이핑 (contextual typing)이 인수 타입을 추론할 수 있음. 이 예제에서, 함수 표현의 반환 타입이 반환하는 값으로 추론됩니다. (여기서는 false와 true)

```ts
let mySearch: SearchFunc;
mySearch = function (src, sub) {
  // 리턴 값 추론 b/c 타입 지정x
  let result = src.search(sub);
  return result > 1;
};
```

> 함수 표현식이 인터페이스에 지정한 boolean과 다른 형태 반환시, **_타입 검사는 반환 타입이 SearchFunc 인터페이스에 정의된 반환 타입과 일치하지 않는다는 에러를 발생_**시킵니다.

```ts
let mySearch: SearchFunc;

// error: Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// Type 'string' is not assignable to type 'boolean'.
mySearch = function (src, sub) {
  let result = src.search(sub);
  return "string";
};
```

<br />

### 🏀 인덱서블 타입 (Indexable Types)

---

> 인터페이스로 a[10] 이나 ageMap["daniel"] 처럼 타입을 "인덱스로" 기술가능. 인덱서블 타입은 **_인덱싱 할때 해당 반환 유형과 함께 객체를 인덱싱하는 데 사용할 수 있는 타입을 기술하는 인덱스 시그니처 (index signature)를 가지고 있음_**.

```ts
interface StringArray {
  [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0]; // "Bob"
```

> 위 인덱스 서명이 있는 StringArray 인터페이스의 인덱스 서명은 **_StringArray가 number로 색인화(indexed)되면 string을 반환_**할 것 나타냄.

> 인덱스 서명을 지원하는 타입에는 두 가지타입: 문자열과 숫자.

> 두 타입의 인덱서(indexer)를 모두 지원하는 것은 가능하나, 숫자 인덱서에서 반환된 타입은 반드시 문자열 인덱서에서 반환된 타입의 하위 타입(subtype)이어야 함. 이 이유는 number로 인덱싱 할 때, JavaScript는 실제로 객체를 인덱싱하기 전에 string으로 변환하기 때문입니다. 즉, 100 (number)로 인덱싱하는 것은 "100" (string)로 인덱싱하는 것과 같기 때문에, 서로 일관성 있어야 함.

```ts
class Animal {
  name: string;
}
class Dog extends Animal {
  breed: string;
}

// 오류: 숫자형 문자열로 인덱싱을 하면 완전히 다른 타입의 Animal을 얻게 될 것입니다!
interface NotOkay {
  [x: number]: Animal;
  [x: string]: Dog;
}
```

<br />

### 🏀 클래스 타입 (Class Type)

---

### 🏀 인터페이스 확장하기 (Extending Interfaces)

---

> 클래스처럼, **_인터페이스들도 확장(extend)이 가능_**. 이는 한 인터페이스의 멤버를 다른 인터페이스에 복사하는 것을 가능하게 해주는데, 인터페이스를 재사용성 높은 컴포넌트로 쪼갤 때, 유연함을 제공.

```ts
interface Shape {
  color: string;
}

interface Square extends Shape {
  sideLength: number;
}

let square = {} as Square;
square.color = "blue";
square.sideLength = 10;
```

> 인터페이스는 여러 인터페이스를 확장할 수 있어, 모든 인터페이스의 조합을 만들어낼 수 있음.

<br />

### 🏀 하이브리드 타입 (Hybrid Types)

---

> 인터페이스는 실제 JavaScript 세계에 존재하는 **_다양한 타입들을 기술할 수 있음_**. JavaScript의 동적이고 유연한 특성 때문에, 몇몇 타입의 조합으로 동작하는 객체를 기술할 때가 있음.

```ts
interface Counter {
  (start: number): string;
  interval: number;
  reset(): void;
}

function getCounter(): Counter {
  let counter = function (start: number) {} as Counter;
  counter.interval = 123;
  counter.reset = function () {};
  return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```
