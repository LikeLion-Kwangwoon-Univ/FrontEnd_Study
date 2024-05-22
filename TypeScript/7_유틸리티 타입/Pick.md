## 🐽 Pick<TYPE, KEY>

제네릭 TYPE으로 부터 제네릭 KEY에 해당하는 속성을 선택하여 따로 모아 타입을 반환한다.<br/>
제네릭 TYPE은 속성을 가지는 인터페이스나 객체 타입이다.

```TypeScript
interface User {
   name: string;
   age: number;
   email: string;
   isValid: boolean;
}

type Key = 'name' | 'email';

type Pick_User = Pick<User, Key>; // User 인터페이스의 속성에서 'name', 'email' 만 선택
/*
type Pick_User = {
    name: string;
    email: string;
}
*/

const user: Pick<User, Key> = {
   name: 'inpa',
   email: 'inpa@naver.com',
};
```
