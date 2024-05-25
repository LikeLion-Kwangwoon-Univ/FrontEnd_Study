# 5장. 제네릭

### 🏀 제네릭의 Hello World (Hello World of Generics)

---

```ts
function identity<T>(arg: T): T {
  return arg;
}
```

`any` 대신 identity 함수에 `T` 타입 변수를 추가해, 인수와 반환 타입이 같은 타입으로 사용한다는 것을 보장할 수 있음.

```ts
let output = identity<string>("myString"); // 출력 타입은 'string'입니다.
```

함수에 인수 타입 인수를 포함한 모든 인수들을 전달해 함수 호출 가능.

```ts
let output = identity("myString"); //출력 타입은 'string'입니다.
```

혹은 `타입 인수 추론`을 사용해 컴파일러가 `T`의 값을 자동으로 정하게 하여 함수 호출 가능.

### 🏀 제네릭 타입 변수 작업 (Working with Generic Type Variables)

---

컴파일러는 제네릭 함수 작성 시, 함수 본문에 제네릭 타입화된 매개변수를 쓰도록 강요함.

```ts
function loggingIdentity<T>(arg: T): T {
  console.log(arg.length); // 오류: T에는 .length 가 없습니다.
  return arg;
}
```

다음 코드에서 `arg`가 number일 경우 `.length` 호출이 불가능하기 때문에 오류가 발생할 수 있기 때문에 오류 발생

```ts
function loggingIdentity<T>(arg: T[]): T[] {
  console.log(arg.length); // 배열은 .length를 가지고 있습니다. 따라서 오류는 없습니다.
  return arg;
}
```

하지만 함수가 `T`가 아닌 `T`의 배열에서 동작하도록 작성했다면, 배열로 사용하기 때문에 `.length` 멤버 사용 가능.

```ts
function loggingIdentity<T>(arg: Array<T>): Array<T> {
  console.log(arg.length); // 배열은 .length를 가지고 있습니다. 따라서 오류는 없습니다.
  return arg;
}
```

### 🏀 제네릭 타입 (Generic Types)

---

제네릭 함수의 타입은 함수 선언과 유사하게 타입 매개변수가 먼저 나열되는, 비-제네릭 함수의 타입과 비슷

```ts
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <T>(arg: T) => T = identity;
```

타입 변수의 수와 타입 변수가 사용되는 방식에 따라 타입의 _제네릭 타입 매개변수에 다른 이름을 사용할 수도 있음_.

```ts
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: <U>(arg: U) => U = identity;
```

제네릭 타입을 객체 리터럴 타입의 함수 호출 시그니처로 작성할 수도 있습니다.

```ts
function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: { <T>(arg: T): T } = identity;
```

이것들로 첫 번째 제네릭 인터페이스를 작성할 수 있습니다. 앞서 예제의 객체 리터럴을 인터페이스로 가져옵니다:

```ts
interface GenericIdentityFn {
  <T>(arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn = identity;
```

비슷한 예제에서, 제네릭 매개변수를 전체 인터페이스의 매개변수로 옮기고 싶을지도 모릅니다. 이를 통해 제네릭 타입을 확인할 수 있습니다 (예 - Dictionary 가 아닌 Dictionary<string>). 이렇게 하면 인터페이스의 다른 모든 멤버가 타입 매개변수를 볼 수 있습니다.

```ts
interface GenericIdentityFn<T> {
  (arg: T): T;
}

function identity<T>(arg: T): T {
  return arg;
}

let myIdentity: GenericIdentityFn<number> = identity;
```

### 🏀 제네릭 제약조건 (Generic Constraints)

---

```tsx
interface Lengthwise {
  length: number;
}

function loggingIdentity<T extends Lengthwise>(arg: T): T {
  console.log(arg.length); // 이제 .length 프로퍼티가 있는 것을 알기 때문에 더 이상 오류가 발생하지 않습니다.
  return arg;
}
```

any와 모든 타입에서 동작하는 대신에, .length 프로퍼티가 있는 any와 모든 타입들에서 작동하는 것으로 제한하고 싶습니다. 타입이 이 멤버가 있는 한 허용하지만, 최소한 .length 가 있어야 합니다. 그렇게 하려면 T 가 무엇이 될 수 있는지에 대한 제약 조건을 나열해야 합니다.

이를 위해 우리의 제약조건이 명시하는 인터페이스를 만듭니다. 여기 하나의 프로퍼티 .length를 가진 인터페이스를 생성하였고, 우리의 제약사항을 extends 키워드로 표현한 인터페이스를 이용해 명시합니다:
