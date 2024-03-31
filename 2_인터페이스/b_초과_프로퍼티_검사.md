# 초과 프로퍼티 검사 (Excess Property Checks)

## 🐽 초과 프로퍼티 검사 예시

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

여기서 createSquare 함수를 호출하면서 color 대신에 오타가 있는 colour 프로퍼티를 전달하는 경우를 생각해보자.

```TypeScript
// error: Object literal may only specify known properties,
// but 'colour' does not exist in type 'SquareConfig'. Did you mean to write 'color'?
let mySquare = createSquare({ colour: "red", width: 100 });
```

<br/>

JavaScript에서는 이러한 실수를 무시하지만, TypeScript는 객체 리터럴이 "대상 타입"에 선언되지 않은 프로퍼티를 가지고 있다면 에러를 발생시킨다. 이는 코드에 버그가 있을 수 있다는 신호이다.

<br/><br/><br/>

## 🐽 초과 프로퍼티 검사 피하기

1. 타입 단언 사용
   타입 단언을 사용하여 TypeScript 컴파일러에게 명시적으로 타입을 알려주면 초과 프로퍼티 검사를 피할 수 있다.

```TypeScript
let mySquare = createSquare({ width: 100, opacity: 0.5 } as SquareConfig);
```

<br/>

2. 문자열 인덱스 서명 추가
   만약 인터페이스가 다양한 프로퍼티를 가질 수 있다면, 문자열 인덱스 서명을 추가하여 어떤 프로퍼티도 받을 수 있음을 명시할 수 있다.
   이 방법은 추가 프로퍼티가 유효하다고 확신할 때 유용하다.

```TypeScript
interface SquareConfig {
    color?: string;
    width?: number;
    [propName: string]: any;
}
```

<br/>

3. 변수에 할당
   초과 프로퍼티 검사를 피하는 다른 방법은 객체를 별도의 변수에 할당하는 것이다.<br/>
   TypeScript는 이 경우 검사를 덜 엄격하게 적용한다.<br/>
   이 방법은 코드의 가독성을 해치지 않으면서 검사를 우회할 수 있는 간단한 방법이다.

```TypeScript
let squareOptions = { colour: "red", width: 100 };
let mySquare = createSquare(squareOptions);
```
