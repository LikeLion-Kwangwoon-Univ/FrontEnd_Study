## 🐽 초과 프로퍼티 검사 (Excess Property Checks)

```TypeScript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): { color: string; area: number } {
    // ...
}

let mySquare = createSquare({ colour: "red", width: 100 });
```

<br/>
`createSquare`의 매개변수가 color대신 colour로 전달되었다. 이 경우 JavaScript에선 조용히 오류가 발생한다.<br/>
width 프로퍼티는 적합하고, color 프로퍼티는 없고, 추가 colour 프로퍼티는 중요하지 않기 때문에 이 프로그램이 올바르게 작성되었다고 생각할 수 있다.<br/><br/>

하지만, TypeScript는 이 코드에 버그가 있을 수 있다고 생각한다.<br/>
객체 리터럴은 다른 변수에 할당할 때나 인수로 전달할 때, 특별한 처리를 받고, 초과 프로퍼티 검사를 받는다.<br/>
만약 객체 리터럴이 "대상 타입 (target type)"이 갖고 있지 않은 프로퍼티를 갖고 있으면 에러가 발생한다.

```TypeScript
// error: Object literal may only specify known properties,
// but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });
```

<br/>
타입 단언을 사용하면 이 검사를 피할 수 있다.

```TypeScript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

<br/>

하지만 특별한 경우에, 추가 프로퍼티가 있음을 확신한다면, 문자열 인덱스 서명을 추가하는 것이 더 나은 방법이다.<br/>
만약 SquareConfig color와 width 프로퍼티를 위와 같은 타입으로 갖고 있고, 또한 다른 프로퍼티를 가질 수 있다면, 다음과 같이 정의할 수 있다.

```TypeScript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

<br/>

검사를 피하는 마지막 방법은 객체를 다른 변수에 할당하는 것이다.<br/>
`squareOptions`가 추가 프로퍼티 검사를 받지 않기 때문에, 컴파일러는 에러를 주지 않는다.<br/>

```TypeScript
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```

<br/>
