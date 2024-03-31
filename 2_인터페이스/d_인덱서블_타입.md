# 🐽 인덱서블 타입 (Indexable Types)

## 인덱서블 타입의 기본

배열이나 객체에 인덱스를 사용해 접근하는 방법을 이미 알고 있을 것이다.<br/>
TypeScript에서는 이를 타입 시스템에 통합하여 더 안정적인 코드를 작성할 수 있게 한다.<br/>

예를 들어, 문자열 배열을 정의할 때 인덱스 시그니처를 사용하여 각 인덱스에 해당하는 값이 문자열이 될 것임을 명시할 수 있다.

```TypeScript
interface StringArray {
    [index: number]: string;
}

let myArray: StringArray;
myArray = ["Bob", "Fred"];

let myStr: string = myArray[0];
```

<br/>

이 예제에서 StringArray 인터페이스는 숫자 인덱스를 사용해 접근하면 문자열을 반환한다는 것을 명시한다.
<br/>

## 인덱스 시그니처의 타입

인덱스 시그니처에는 숫자와 문자열 두 가지 타입이 있다.<br/><br/>

하지만 두 타입을 동시에 사용할 때 주의해야 한다.<br/>
숫자 인덱스의 반환 타입은 문자열 인덱스의 반환 타입의 하위 타입이어야 한다.<br/>
이는 JavaScript에서 숫자 인덱스를 실제로 문자열로 변환하여 처리하기 때문이다.

```TypeScript
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

<br/>

## 인덱스 시그니처와 프로퍼티 타입

문자열 인덱스 시그니처를 사용하면 객체가 "사전"처럼 동작하게 만들 수 있지만, 이 경우 모든 프로퍼티의 타입이 인덱스 시그니처의 반환 타입과 일치해야 한다. 만약 일치하지 않는 프로퍼티가 있다면, 타입 체크에서 에러가 발생한다.<br/><br/>

그러나 인덱스 시그니처의 반환 타입이 여러 타입의 합집합이라면, 다양한 타입의 프로퍼티를 가질 수 있다.

```TypeScript
interface NumberOrStringDictionary {
    [index: string]: number | string;
    length: number;    // 성공, length는 숫자입니다
    name: string;      // 성공, name은 문자열입니다
}
```

<br/>

## 읽기 전용 인덱스 시그니처

때로는 객체의 인덱스를 통한 값의 변경을 원치 않을 때가 있다.<br/>
이런 경우에는 인덱스 시그니처를 readonly로 선언하여 값을 읽을 수만 있게 만들 수 있다.<br/>

```TypeScript
interface ReadonlyStringArray {
    readonly [index: number]: string;
}
let myArray: ReadonlyStringArray = ["Alice", "Bob"];
myArray[2] = "Mallory"; // 오류!
```

<br/>
이렇게 readonly 인덱스 시그니처를 사용하면, 배열이나 객체의 특정 인덱스를 통해 값을 변경하는 것이 금지된다.
