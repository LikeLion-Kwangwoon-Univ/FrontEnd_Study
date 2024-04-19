## 🐽 Readonly<T>

TYPE의 모든 속성을 읽기 전용(readonly)으로 변경한 새로운 타입을 반환한다.

```TypeScript
interface User {
   name?: string;
   age?: number;
   phone: number;
}

type Readonly_User = Readonly<User>; // 인터페이스 User의 속성을 모두 readonly 설정
/*
type Required_User = {
    readonly name?: string | undefined;
    readonly age?: number | undefined;
    readonly phone: number;
}
*/

const user: Readonly<User> = {
   name: '홍길동',
   age: 22,
   phone: 111,
};

user.age = 11; // ERROR !!
```
