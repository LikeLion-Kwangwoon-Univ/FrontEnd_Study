# 함수 타입 (Function Types)

## 🐽 함수 타입 인터페이스 정의

함수 타입을 설명하기 위해서는 인터페이스에 "호출 서명"을 포함시켜야 한다.<br/>
호출 서명은 함수의 매개변수 목록과 그 매개변수들의 타입, 그리고 함수가 반환할 값의 타입을 정의한다.<br/><br/>

예를 들어, 두 문자열을 받아 첫 번째 문자열에서 두 번째 문자열을 검색하여 결과를 불린 값으로 반환하는 함수 타입은 다음과 같이 정의할 수 있다.

```TypeScript
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

<br/><br/>

## 🐽 함수 타입 인터페이스 사용

이 인터페이스를 구현하는 함수를 작성할 때, TypeScript는 함수가 인터페이스의 구조와 일치하는지 검사한다.<br/>
매개변수 이름이 인터페이스에서 정의한 이름과 다를 필요는 없지만, 타입과 순서, 반환 타입은 일치해야 한다.

```TypeScript
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```

<br/><br/>

## 🐽 문맥상 타이핑 (Contextual Typing)

TypeScript는 문맥상 타이핑을 통해 함수의 매개변수 타입을 자동으로 추론할 수 있다.<br/>
이는 코드를 더 간결하게 작성할 수 있게 해준다.<br/>
타입을 명시적으로 적지 않아도, 함수가 SearchFunc 타입 변수에 할당되면 매개변수의 타입을 추론할 수 있다.

```TypeScript
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

<br/><br/>

## 🐽 반환 타입 검사

함수의 반환 타입은 인터페이스에서 정의한 반환 타입과 정확히 일치해야 한다.<br/>
만약 함수가 다른 타입의 값을 반환하려고 하면, TypeScript는 타입 에러를 발생시킨다.<br/>
이는 함수가 인터페이스의 계약을 준수하도록 강제한다.

```TypeScript
let mySearch: SearchFunc;

// error: Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// Type 'string' is not assignable to type 'boolean'.
mySearch = function(src, sub) {
  let result = src.search(sub);
  return "string";
};
```
