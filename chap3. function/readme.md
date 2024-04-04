<

<!-- > ## 목차
>
> > 1. 함수 (Function)
> > 2. [읽기전용 프로퍼티(Readonly Property)](#🏀-읽기전용-프로퍼티readonly-property)
> > 3. [초과 프로퍼티 검사(Excess Property Check)](#🏀-초과-프로퍼티-검사excess-property-check)
> > 4. [함수 타입](#🏀-함수-타입)
> > 5. [인덱서블 타입(Indexable Type)](#🏀-인덱서블-타입-indexable-types) -->

<br/>

### 🏀 함수(Function)

---

> TypeScript 함수는 JavaScript와 마찬가지로 기명 함수(named function)과 익명 함수(anonymous function)로 만들 수 있음.

```ts
// 기명 함수
fucntion add(x, y) {
  return x + y;
}

// 익명 함수
let myAdd = function(x, y) { return x + y };
```

> JavaScript에서처럼, 함수는 함수 외부의 변수를 참조할 수 있습니다. 이런 경우를, 변수를 캡처(capture) 한다고 함.

```ts
let z = 100;

function addToZ(x, y) {
  return x + y + z;
}
```

<br />

### 🏀 함수 타입(Function Types)

---

### &nbsp;&nbsp;⭐️&nbsp;함수의 타이핑 (Typing the function)

```ts
// 기염 함수
function add(x: number, y: number): number {
  return x + y;
}
// 익명 함수
let myAdd = function (x: number, y: number): number {
  return x + y;
};
```

> 각 파라미터와 함수 자신의 반환될 타입을 정해줄 수 있음. 반환 문을 보고 반환 타입을 파악할 수 있으므로 반환 타입을 생략가능.

### &nbsp;&nbsp;⭐️&nbsp;함수 타입 작성하기 (Writing the function type)

```ts
let myAdd: (x: number, y: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

> 함수의 타입은 매개변수의 타입과 반환 타입이 있음. 전체 함수 타입을 작성하고자 한다면 이 두 가지 타입이 필요. 매개변수 목록처럼 각 매개변수에 이름과 타입 타입을 작성.

```ts
// 함수 타입에 이름을 붙여도 됨.
let myAdd: (baseValue: number, increment: number) => number = function (
  x: number,
  y: number
): number {
  return x + y;
};
```

> 매개변수의 타입들이 올바르게 나열되어 있다면 함수 타입에 이름을 붙이더라도 유효한 타입으로 간주

> 매개변수 타입들과 반환 타입 사이에 '화살표 표기'( => )를 써서 반환 타입을 분명히 할 수 있음. 함수가 값을 반환하지 않는다면 비워두는 대신 void를 써서 표시.

<br />

### &nbsp;&nbsp;⭐️&nbsp;타입의 추론 (Inferring the types)

---

```ts
// myAdd는 전체 함수 타입을 가집니다
let myAdd = function (x: number, y: number): number {
  return x + y;
};

// 매개변수 x 와 y는 number 타입을 가집니다
let myAdd2: (baseValue: number, increment: number) => number = function (x, y) {
  return x + y;
};
```

> TypeScript 컴파일러가 **_방정식의 한쪽에만 타입이 있더라도 타입을 알아낼 수 있음_**.
> <br> myAdd2는 x와 y에 대한 타입 추론이 됨. 프로그램 타입 유지에 대한 노력을 줄일 수 있음.

<br />

### 🏀 선택적 매개변수와 기본 매개변수 (Optional and Default Parameter)

---

> TypeScript에서는 **모든 매개변수가 함수에 필요하다고 가정**. 함수가 호출될 때, 컴파일러는 **각 매개변수에 대해 사용자가 값을 제공했는지를 검사**. 또한, 컴파일러는 매개변수들이 함수로 전달될 유일한 매개변수라고 가정. 요약하자면, **_함수에 주어진 인자의 수는 함수가 기대하는 매개변수의 수와 일치_**해야 함.

```ts
function buildName(firstName: string, lastName: string) {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob"); // 오류, 너무 적은 매개변수
let result2 = buildName("Bob", "Adams", "Sr."); // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams"); // 정확함
```

> TypeScript에서도 선택적 매개변수를 원한다면 매개변수 이름 끝에 ? 를 붙임으로써 해결. 선택적 매개변수는 필수 매개변수 뒤에 위치해야됨.

```ts
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}

let result1 = buildName("Bob"); // 지금은 바르게 동작
let result2 = buildName("Bob", "Adams", "Sr."); // 오류, 너무 많은 매개변수
let result3 = buildName("Bob", "Adams"); // 정확함
```

> 어느 선택적 **_매개변수든 반드시 매개변수 정의가 필요_**

> TypeScript에서는 유저가 값을 제공하지 않거나 undefined로 했을 때에 할당될 매개변수의 값을 정해 놓을 수도 있음. 이것을 **기본-초기화 매개변수**라고 합니다. 이전 예시에서 lastName을 "Smith" 라고 지정해 보겠습니다.

```ts
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}

let result1 = buildName("Bob"); // 올바르게 동작, "Bob Smith" 반환
let result2 = buildName("Bob", undefined); // 여전히 동작, 역시 "Bob Smith" 반환
let result3 = buildName("Bob", "Adams", "Sr."); // 오류, 너무 많은 매개변수
let result4 = buildName("Bob", "Adams"); // 정확함
```

<br />

### 🏀 나머지 매개변수 (Rest Parameters)

---

> 필수, 선택적, 기본 매개변수는 한 번에 하나의 매개변수만을 다룸. 다수의 매개변수를 그룹 지어 작업하거나, 함수가 최종적으로 얼마나 많은 매개변수를 취할지 모를 때 모든 함수 내부에 위치한 arguments라는 변수를 사용해 직접 인자를 가지고 작업 가능.

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// employeeName 은 "Joseph Samuel Lucas MacKinzie" 가 될것입니다.
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

> 나머지 매개변수는 선택적 매개변수들의 수를 무한으로 취급. 나머지 매개변수로 인자들을 넘겨줄 때 원하는 만큼 전달 or 아무것도 넘겨주지 않을 수도 있음.

> 생략 부호는 나머지 매개변수가 있는 함수의 타입에도 사용됨.

```ts
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

let buildNameFun: (fname: string, ...rest: string[]) => string = buildName;
```

<br />

### 🏀 오버로드 (Overloads)

---

> 하나의 JavaScript 함수가 전달된 인자의 형태에 따라 다른 타입의 객체들을 반환하는 것도 가능함.

```ts
let suits = ["hearts", "spades", "clubs", "diamonds"];

function pickCard(x): any {
  // 인자가 배열 또는 객체인지 확인
  // 만약 그렇다면, deck이 주어지고 card를 선택합니다.
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // 그렇지 않다면 그냥 card를 선택합니다.
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}

let myDeck = [
  { suit: "diamonds", card: 2 },
  { suit: "spades", card: 10 },
  { suit: "hearts", card: 4 },
];
let pickedCard1 = myDeck[pickCard(myDeck)];
alert("card: " + pickedCard1.card + " of " + pickedCard1.suit);

let pickedCard2 = pickCard(15);
alert("card: " + pickedCard2.card + " of " + pickedCard2.suit);
```
