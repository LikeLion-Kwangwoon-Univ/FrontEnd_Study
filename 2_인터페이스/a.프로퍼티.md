## 🐽 첫 번째 인터페이스

간단한 예제를 확인해보자.

```TypeScript
function printLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}

let myObj = {size: 10, label: "Size 10 Object"};
printLabel(myObj);
```

<br/>
타입 검사는 `printLabel` 호출을 확인한다. `printLabel` 함수는 string 타입 label을 갖는 객체를 하나의 매개변수로 가진다.<br/>
이 객체가 실제로는 더 많은 프로퍼티를 갖고 있지만, 컴파일러는 최소한 필요한 프로퍼티가 있는지와 타입이 잘 맞는지만 검사한다.<br/><br/>

이번엔 같은 예제를, 문자열 타입의 프로퍼티 label을 가진 인터페이스로 다시 작성해보자.

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
`LabeledValue` 인터페이스는 여전히 문자열 타입의 label 프로퍼티 하나를 가진다는 것을 의미한다.<br/> 
여기서 중요한 것은 형태뿐이다. 함수에 전달된 객체가 나열된 요구 조건을 충족하면 허용된다.<br/><br/>

타입 검사는 프로퍼티들의 순서를 요구하지 않는다. 단지 인터페이스가 요구하는 프로퍼티들이 존재하는지와 프로퍼티들이 요구하는 타입을 가졌는지만을 확인한다.<br/>

<br/>

## 🐽 선택적 프로퍼티 (Optional Properties)

인터페이스의 모든 프로퍼티가 필요한 것은 아니다.<br/>
선택적 프로퍼티들은 객체 안의 몇 개의 프로퍼티만 채워 함수에 전달하는 "option bags" 같은 패턴을 만들 때 유용하다.<br/><br/>

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
선택적 프로퍼티를 가지는 인터페이스는 다른 인터페이스와 비슷하게 작성되고, 선택적 프로퍼티는 선언에서 프로퍼티 이름 끝에 ?를 붙여 표시한다.<br/>
선택적 프로퍼티의 이점은 인터페이스에 속하지 않는 프로퍼티의 사용을 방지하면서, 사용 가능한 속성을 기술하는 것이다.<br/><br/>

예를 들어, `createSquare`안의 color 프로퍼티 이름을 잘못 입력하면, 오류 메시지로 알려준다.

```TypeScript
if (config.clor) {
    // Error: Property 'clor' does not exist on type 'SquareConfig'
    newSquare.color = config.clor;
}
```

<br/>

## 🐽 읽기전용 프로퍼티 (Readonly properties)

일부 프로퍼티들은 객체가 처음 생성될 때만 수정 가능해야한다. 이는 프로퍼티 이름 앞에 readonly를 넣어서 이를 지정할 수 있다.

```TypeScript
interface Point {
    readonly x: number;
    readonly y: number;
}
```

<br/>
객체 리터럴을 할당하여 Point를 생성하면, 할당 후에 x, y를 수정할 수 없다.

```TypeScript
let p1: Point = { x: 10, y: 20 };
p1.x = 5; // 오류!
```

<br/>

TypeScript에서는 모든 변경 메서드(Mutating Methods)가 제거된 Array<T>와 동일한 ReadonlyArray<T> 타입을 제공한다.<br/>
그래서 생성 후에 배열을 변경하지 않음을 보장할 수 있다.<br/>

```TypeScript
let a: number[] = [1, 2, 3, 4];
let ro: ReadonlyArray<number> = a;
ro[0] = 12; // 오류!
ro.push(5); // 오류!
ro.length = 100; // 오류!
a = ro; // 오류!
```

<br/>
예제 마지막 줄에서 ReadonlyArray를 일반 배열에 재할당이 불가능한 것을 확인할 수 있다. 타입 단언(type assertion)으로 오버라이드하는 것은 가능하다.<br/>

```TypeScript
a = ro as number[];
```
