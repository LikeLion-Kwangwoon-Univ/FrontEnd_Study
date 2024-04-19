## 🐽 Record<KEY, TYPE>
제네릭의 KEY를 속성으로, 제네릭의 TYPE를 속성값의 타입으로 지정하는 새로운 타입을 반환한다.<br/>
{ KEY: TYPE, ... } 형태로 반환한다.<br/><br/>

이 유틸리티는 타입의 프로퍼티들을 다른 타입에 매핑시키는 데 사용한다.<br/>

```TypeScript
type Key = 'name' | 'age' | 'phone';

type Record_User = Record<Key, number>; // 유니온 Key의 'name', 'age', 'phone' 타입들을 속성으로 하여 number 타입으로 설정
/*
type Record_User = {
    name: number;
    age: number;
    phone: number;
}
*/

const user: Record<Key, number> = {
   name: 9999,
   age: 22,
   phone: 111,
};
```
