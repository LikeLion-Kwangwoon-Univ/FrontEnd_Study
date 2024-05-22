## 🐽 InstanceType<T>

클래스를 제네릭 TYPE으로 받아, 클래스의 생성자 인스턴스를 타입으로 반환한다.<br/>
즉, new를 사용하여 생성된 인스턴스의 내용들을 타입으로 반환한다.

```TypeScript
class User {
   constructor(public name: string, public age: number) {}
}

type Instance_Type = InstanceType<typeof User>; // 클래스의 생성자 인스턴스로 타입으로 변환해서 반환
/*
type Instance_Type = User
type Instance_Type = { name: string, age: number }
*/

const user: InstanceType<typeof User> = {
   name: '홍길동',
   age: 55,
};
```
