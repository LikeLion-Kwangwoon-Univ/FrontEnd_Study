# 프로퍼티

## 첫 번째 인터페이스

타입스크립트를 사용해 함수가 특정 형태의 객체를 요구하도록 지정할 수 있다.<br/>
예를 들어, printLabel 함수가 문자열 타입의 label 프로퍼티를 갖는 객체를 요구한다고 가정해보자.

```TypeScript
function printLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

<br/>
여기서 printLabel 함수는 label이라는 프로퍼티를 가진 객체를 매개변수로 받는다.<br/>
이 객체는 실제로 더 많은 프로퍼티를 가질 수 있으며, 타입스크립트는 필요한 최소한의 프로퍼티가 존재하는지만을 검사한다.<br/><br/>

이 예제를 인터페이스를 사용하여 다시 작성할 수 있다.

```TypeScript
interface LabeledValue {
    label: string;
}

function printLabel(labeledObj: LabeledValue) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

<br/>
LabeledValue 인터페이스는 문자열 타입의 label 프로퍼티를 요구한다.<br/>
타입스크립트는 객체의 형태만을 검사하므로, printLabel 함수에 전달된 객체가 이 요구 사항을 충족한다면 어떠한 추가 프로퍼티가 있어도 문제가 되지 않는다.

<br/>

## 선택적 프로퍼티 (Optional Properties)

인터페이스는 필수가 아닌 프로퍼티도 정의할 수 있으며, 이를 선택적 프로퍼티라고 한다.<br/>
선택적 프로퍼티는 객체에서 일부 프로퍼티만 사용될 수 있음을 의미하며, 프로퍼티 이름 뒤에 ?를 붙여 표시한다.<br/>

```TypeScript
interface SquareConfig {
    color?: string;
    width?: number;
}

function createSquare(config: SquareConfig): {color: string; area: number} {
    let newSquare = {color: "white", area: 100};
    if (config.color) {
        newSquare.color = config.color;
    }
    if (config.width) {
        newSquare.area = config.width * config.width;
    }
    return newSquare;
}

let mySquare = createSquare({color: "black"});
```

<br/>
이렇게 하면 SquareConfig 인터페이스를 사용하는 코드는 color와 width 프로퍼티 중 하나 혹은 둘 다 있거나 없을 수 있다.

## 읽기전용 프로퍼티 (Readonly properties)

일부 프로퍼티는 객체가 생성될 때만 값을 할당받고 그 후에는 변경되지 않아야 할 때가 있다.<br/>
이럴 때는 프로퍼티 앞에 readonly를 붙여 해당 프로퍼티를 읽기 전용으로 만들 수 있다.

```TypeScript
interface Point {
    readonly x: number;
    readonly y: number;
}

let p1: Point = { x: 10, y: 20 };
p1.x = 5; // 오류! x는 읽기 전용입니다.
```

<br/>
타입스크립트는 또한 ReadonlyArray<T> 타입을 제공하여 배열이 생성된 후 변경되지 않도록 보장한다.

```TypeScript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 오류!
ro.push(5); // 오류!
ro.length = 100; // 오류!
a = ro; // 오류!
```
