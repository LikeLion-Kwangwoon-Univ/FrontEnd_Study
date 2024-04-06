## 🐽 함수의 타이핑

TypeScript를 사용하여 함수의 매개변수와 반환 값에 타입을 지정할 수 있다.<br/><br/>

예를 들어, 두 숫자를 더하는 함수는 다음과 같이 작성할 수 있다.

```TypeScript
function add(x: number, y: number): number {
    return x + y;
}
```

<br/>
이와 유사하게, 익명 함수를 사용할 때도 매개변수와 반환 값에 타입을 지정할 수 있다.

```TypeScript
let myAdd = function(x: number, y: number): number {
    return x + y;
};
```

<br/>
함수에서 반환 타입은 TypeScript 컴파일러가 함수 내부의 반환 문을 통해 추론할 수 있기 때문에 생략할 수도 있다.<br/>
하지만 명시적으로 타입을 선언함으로써 코드의 의도를 더 명확하게 전달할 수 있다.

<br/><br/>

## 🐽 함수 타입 작성하기

함수의 전체 타입을 작성할 때는 매개변수의 타입과 함수의 반환 타입을 함께 명시한다.

```TypeScript
let myAdd: (x: number, y: number) => number =
    function(x: number, y: number): number { return x + y; };
```

<br/>
여기서 함수 타입은 (x: number, y: number) => number와 같이 표현되며, 매개변수 이름과 타입, 그리고 반환 타입을 포함한다.<br/>
매개변수의 이름은 함수 타입을 더 쉽게 이해할 수 있게 도와주지만, 함수 타입의 유효성에 영향을 주지는 않는다.<br/>

```TypeScript
let myAdd: (baseValue: number, increment: number) => number =
    function(x: number, y: number): number { return x + y; };
```

<br/>
함수가 값을 반환하지 않을 때는 반환 타입을 void로 명시한다.

<br/><br/>

## 🐽 타입의 추론

TypeScript는 "contextual typing"을 통해 코드의 한 부분에서 타입을 추론하여 다른 부분의 타입을 결정할 수 있다.

```TypeScript
// myAdd는 전체 함수 타입을 가집니다
let myAdd = function(x: number, y: number): number { return x + y; };

// 타입 추론을 통해 x와 y의 타입이 number로 결정됩니다
let myAdd: (baseValue: number, increment: number) => number =
    function(x, y) { return x + y; };
```

<br/>
이러한 방식으로 TypeScript는 함수의 매개변수 타입을 명시적으로 선언하지 않아도 해당 정보를 추론할 수 있다.<br/>
이는 코드를 더 간결하게 유지하면서도 타입의 안정성을 보장하는 데 도움이 된다.
