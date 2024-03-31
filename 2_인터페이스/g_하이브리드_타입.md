# 하이브리드 타입 (Hybrid Types)

하이브리드 타입은 함수 호출과 함께 추가적인 프로퍼티나 메서드를 가질 수 있는 객체를 말한다.<br/>
아래 예제는 이러한 하이브리드 타입을 어떻게 정의하고 사용하는지 보여준다.

```TypeScript
interface Counter {
(start: number): string;
interval: number;
reset(): void;
}

function getCounter(): Counter {
let counter = (function (start: number) { }) as Counter;
counter.interval = 123;
counter.reset = function () { };
return counter;
}

let c = getCounter();
c(10);
c.reset();
c.interval = 5.0;
```

<br/>
이렇게 하이브리드 타입을 사용하면, JavaScript 라이브러리나 프레임워크에서 흔히 볼 수 있는 다양한 형태의 객체를 TypeScript에서도 정확하게 타입으로 표현할 수 있다.<br/>
이는 특히 외부 라이브러리와의 상호작용에서 유용하게 사용됩니다.
