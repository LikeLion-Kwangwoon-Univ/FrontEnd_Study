## 🐽 ThisParameterType<T>

함수를 제네릭 TYPE으로 받아, 명시적 this 매개변수 타입을 반환한다.<br/>
만일 함수에 명시적 this 매개변수가 없는 경우 알 수 없는 타입(Unknown)을 반환한다.<br/><br/>

이 타입은 --strictFunctionTypes 옵션이 활성화되었을 때만 올바르게 동작한다.

```TypeScript
interface ICat {
   name: string;
}

const cat: ICat = {
   name: 'Lucy',
};

function someFn(this: ICat, greeting: string) {
   console.log(`${greeting} ${this.name}`); // ok
}

type Type = ThisParameterType<typeof someFn>; // 함수의 명시적 this 매개변수의 타입을 반환
/*
type Type = ICat
*/

someFn.call(cat, 'Hello'); // Hello Lucy
```
