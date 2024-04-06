## 🐽 함수 (Function)

TypeScript에서 함수를 만드는 방법은 JavaScript와 유사하다.<br/>
함수를 정의하는 데에는 주로 기명 함수(named function)와 익명 함수(anonymous function) 방식이 있다.<br/>

```TypeScript
// 기명 함수
function add(x, y) {
  return x + y;
}

// 익명 함수
let myAdd = function(x, y) {
  return x + y;
};
```

<br/>
함수 내에서는 함수 외부에 선언된 변수를 참조할 수 있는데, 변수를 '캡처한다'고 한다.<br/>
캡처 기능은 함수가 정의된 범위 바깥에 있는 변수에 접근할 수 있게 해주며, 이를 통해 다양한 프로그래밍 패턴을 구현할 수 있다.

```TypeScript
let z = 100;

function addToZ(x, y) {
  return x + y + z;
}
```

<br/>
이 경우 addToZ 함수는 매개변수 x와 y 뿐만 아니라 함수 외부에 선언된 z 변수도 사용한다.<br/>
이렇게 함수가 외부 변수를 사용할 수 있게 해주는 캡처 메커니즘은 함수가 더 유연하게 동작할 수 있도록 해준다.
