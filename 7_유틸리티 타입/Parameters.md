## 🐽 Parameters<T>

함수를 제네릭 TYPE으로 받아, 함수의 매개변수 타입을 튜플(Tuple) 타입으로 반환한다.<br/>

```TypeScript
function fn(a: string | number, b: boolean) {
   return `[${a}, ${b}]`;
}

type Parameters_Key = Parameters<typeof fn>; // 함수의 매개변수를 타입으로 변환
/*
type Parameters_Key = [string | number, boolean]
*/

const a: Parameters<typeof fn> = ['Hello', true];
const b: Parameters<typeof fn> = [123, false];
```
