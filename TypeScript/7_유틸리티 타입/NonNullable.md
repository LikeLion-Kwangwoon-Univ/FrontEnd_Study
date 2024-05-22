## 🐽 NonNullable<T>

유니온 Type에서 null과undefined를 제외한 타입을 반환한다.<br/>

```TypeScript
type Type1 = string | number | object | null;
type Type2 = number | undefined;

type NonNullable_Type1 = NonNullable<Type1>; // 유니온 Type1에서 null 이나 undefined 를 제외
/*
type NonNullable_Type = string | number | object
*/

type NonNullable_Type2 = NonNullable<Type2>; // 유니온 Type2에서 null 이나 undefined 를 제외
/*
type NonNullable_Type2 = number
*/
```
