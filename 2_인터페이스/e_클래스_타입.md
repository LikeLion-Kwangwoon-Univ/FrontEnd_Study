# 클래스 타입 (Class Types)

## 인터페이스 구현하기

TypeScript에서는 인터페이스를 사용하여 클래스가 특정 메서드와 프로퍼티를 가지도록 명시적으로 지정할 수 있다. 이는 클래스가 인터페이스에서 정의한 계약을 충족시키도록 강제한다.

```TypeScript
interface ClockInterface {
currentTime: Date;
setTime(d: Date): void;
}

class Clock implements ClockInterface {
currentTime: Date = new Date();
setTime(d: Date) {
this.currentTime = d;
}
constructor(h: number, m: number) { }
}
```

<br/>

인터페이스는 클래스의 public 멤버만을 기술한다.<br/>
따라서 클래스의 private 멤버는 인터페이스에 의해 강제되지 않는다.
<br/>

## 클래스의 스태틱과 인스턴스의 차이점

TypeScript에서 클래스를 다룰 때, 클래스는 스태틱 타입과 인스턴스 타입, 두 가지 타입을 가지고 있다는 것을 이해하는 것이 중요하다. 인터페이스를 사용해 클래스의 생성자를 정의하려고 할 때, 이 차이점 때문에 혼란이 생길 수 있다.

```TypeScript
interface ClockConstructor {
  new (hour: number, minute: number);
}

// 이 코드는 에러를 발생시킨다.
// 클래스가 인터페이스를 구현할 때, 클래스의 인스턴스 멤버만 검사하기 때문이다.
class Clock implements ClockConstructor {
  currentTime: Date;
  constructor(h: number, m: number) { }
}
```

<br/>

이 문제를 해결하기 위해, 클래스의 스태틱 부분을 직접 다룰 수 있다.<br/>
생성자 함수를 사용하여 특정 타입의 인스턴스를 생성하는 방법은 다음과 같다.

```TypeScript
interface ClockConstructor {
new (hour: number, minute: number): ClockInterface;
}
interface ClockInterface {
tick(): void;
}

function createClock(ctor: ClockConstructor, hour: number, minute: number): ClockInterface {
return new ctor(hour, minute);
}

class DigitalClock implements ClockInterface {
constructor(h: number, m: number) { }
tick() {
console.log("beep beep");
}
}
class AnalogClock implements ClockInterface {
constructor(h: number, m: number) { }
tick() {
console.log("tick tock");
}
}

let digital = createClock(DigitalClock, 12, 17);
let analog = createClock(AnalogClock, 7, 32);
```

<br/>

이 예제에서 createClock 함수는 ClockConstructor 타입의 생성자와 시간을 매개변수로 받아 해당 타입의 인스턴스를 생성한다. 이 방식을 통해, 스태틱 타입과 인스턴스 타입 사이의 구분을 명확히 할 수 있다.<br/><br/>

또 다른 방법은 클래스 표현식을 사용하는 것이다.<br/>
이 방법을 통해 클래스를 직접 정의하면서 동시에 인터페이스를 구현할 수 있다.<br/>

```TypeScript
interface ClockConstructor {
new (hour: number, minute: number);
}

interface ClockInterface {
tick();
}

const Clock: ClockConstructor = class Clock implements ClockInterface {
constructor(h: number, m: number) {}
tick() {
console.log("beep beep");
}
}
```
