## 🐽 Exclude<TYPE1, TYPE2>

유니언 TYPE1에서 유니언 TYPE2를 제외한 나머지 타입을 반환한다.<br/>

```TypeScript
type Type = string | number | object;

type Exclude_Type = Exclude<Type, number>; // 유니온 Type의 string | number | object 에서 number을 제외
/*
type Exclude_Type = string | object
*/
```
