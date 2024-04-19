## 🐽 ConstructorParameters<T>

클래스를 제네릭 TYPE으로 받아, 클래스 생성자의 매개변수 타입을 새로운 튜플 타입으로 반환한다.<br/>

```TypeScript
class User {
   static father = '홍길동';
   readonly mother = '귀부인';

   constructor(public name: string, private age: number) {}

   add() {}
}
const neo = new User('Neo', 12);

type Type = ConstructorParameters<typeof User> // 오로지 클래스 생성자의 매개변수들을 타입으로 변환
/*
type Type = [string, number]
*/

const a: ConstructorParameters<typeof User> = ['Neo', 12];
```
