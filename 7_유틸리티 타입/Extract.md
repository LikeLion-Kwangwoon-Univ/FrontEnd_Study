## 🐽 Extract<TYPE1, TYPE2>

유니언 TYPE1에서 유니언 TYPE2 과 겹치는 부분을 추출한다.<br/>

```TypeScript
type Type1 = string | number | object | null;
type Type2 = number | boolean;

type Extract_Type = Extract<Type1, Type2>; // 유니온 Type1에서 유니온 Type2 와 일치하는 타입 number만 추출
/*
type Extract_Type = number
*/
```
