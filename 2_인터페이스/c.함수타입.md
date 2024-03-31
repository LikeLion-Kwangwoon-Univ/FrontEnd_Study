## 🐽 함수 타입 (Function Types)

인터페이스는 JavaScript 객체가 가질 수 있는 넓은 범위의 형태를 기술할 수 있다.<br/>
프로퍼티로 객체를 기술하는 것 외에 인터페이스는 함수 타입을 설명할 수 있다.<br/><br/>

인터페이스로 함수 타입을 기술하기 위해, 인터페이스에 호출 서명을 전달한다.<br/>
이는 매개변수 목록과 반환 타입만 주어진 함수 선언과 비슷하다.<br/>
각 매개변수는 이름과 타입이 모두 필요하다.

```TypeScript
interface SearchFunc {
    (source: string, subString: string): boolean;
}
```

<br/>

한번 정의되면, 함수 타입 인터페이스는 다른 인터페이스처럼 사용할 수 있다.<br/>
올바른 함수 타입 검사를 위해, 매개변수의 이름이 같을 필요는 없다.

```TypeScript
let mySearch: SearchFunc;
mySearch = function(source: string, subString: string) {
    let result = source.search(subString);
    return result > -1;
}
```

<br/>

함수 매개변수들은 같은 위치에 대응되는 매개변수끼리 한번에 하나씩 검사한다.<br/>
만약 타입을 전혀 지정하지 않고 싶다면, `SearchFunc` 타입의 변수로 직접 함수 값이 할당되었기 때문에 TypeScript의 문맥상 타이핑 (contextual typing)이 인수 타입을 추론할 수 있다.
이 예제에서, 함수 표현의 반환 타입이 반환하는 값으로 추론됩니다.

```TypeScript
let mySearch: SearchFunc;
mySearch = function(src, sub) {
    let result = src.search(sub);
    return result > -1;
}
```

<br/>

함수 표현식이 숫자나 문자열을 반환했다면, 타입 검사는 반환 타입이 SearchFunc 인터페이스에 정의된 반환 타입과 일치하지 않는다는 에러를 발생시킨다.

```TypeScript
let mySearch: SearchFunc;

// error: Type '(src: string, sub: string) => string' is not assignable to type 'SearchFunc'.
// Type 'string' is not assignable to type 'boolean'.
mySearch = function(src, sub) {
  let result = src.search(sub);
  return "string";
};
```
