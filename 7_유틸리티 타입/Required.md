## 🐽 Required<T>

TYPE의 모든 속성을 옵셔널에서 필수(required)로 변경한 새로운 타입을 반환한다.

```TypeScript
interface User {
   name?: string;
   age?: number;
   phone: number;
}

type Required_User = Required<User>; // 인터페이스 User의 속성을 모두 일반 타입으로
/*
type Required_User = {
    name: string;
    age: number;
    phone: number;
}
*/

const user: Required<User> = {
   name: '홍길동',
   age: 22,
   phone: 111,
};
```
