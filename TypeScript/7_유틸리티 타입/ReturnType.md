## 🐽 ReturnType<T>

클래스를 제네릭 TYPE으로 받아, 클래스 생성자의 매개변수 타입을 새로운 튜플 타입으로 반환한다.<br/>

```TypeScript
function fn(str: string): number {
   return +str;
}

type Type = ReturnType<typeof fn>; // 함수의 리턴 타입을 반환
/*
type Type = number
*/

const a: ReturnType<typeof fn> = 1234;
const b: ReturnType<typeof fn> = 'Only string'; // TS2322: Type '123' is not assignable to type 'string'.
```
