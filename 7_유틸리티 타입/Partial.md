## 🐽 Partial<T>

TYPE의 모든 속성을 선택적으로 변경한 새로운 타입을 반환한다.<br/>
모든 속성 타입을 옵셔널으로 만드는건 좋지않기 때문에 PICK 이나 OMIT 유틸리티 타입을 더 활용하는 편이다.

```TypeScript
interface User {
   name: string;
   age: number;
   phone: number;
}

type Partial_User = Partial<User> // 인터페이스 User의 속성을 모두 optional 설정
/*
type Partial_User = {
    name?: string | undefined;
    age?: number | undefined;
    phone?: number | undefined;
}
*/

const user: Partial<User> = {
   name: 'B',
};
```
