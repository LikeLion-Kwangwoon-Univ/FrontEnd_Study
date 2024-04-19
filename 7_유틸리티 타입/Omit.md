## 🐽 Omit<TYPE, KEY>

Pick과 반대 버전으로, 제네릭 TYPE으로 부터 제네릭 KEY에 해당하는 속성을 제외한 나머지들을 따로 모아 타입을 반환]한다.<br/>
제네릭 TYPE은 속성을 가지는 인터페이스나 객체 타입이다.

```TypeScript
interface User {
   name: string;
   age: number;
   email: string;
   isValid: boolean;
}

type Key = 'name' | 'email';

type Omit_User = Omit<User, Key>; // User 인터페이스의 속성에서 'name', 'email' 제외
/*
type Omit_User = {
    age: number;
    isValid: boolean;
}
*/

const user: Omit<User, Key> = {
   age: 44,
   isValid: true,
};
```
