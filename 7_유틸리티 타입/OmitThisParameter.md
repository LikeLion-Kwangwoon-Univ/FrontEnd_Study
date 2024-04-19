## 🐽 OmitThisParameter<T>

함수를 제네릭 TYPE으로 받아, 명시적 this 매개변수를 제거한 타입을 반환한다.<br/>
만일 함수에 명시적 this 매개변수가 없는 경우 알 수 없는 타입(Unknown)을 반환한다.<br/><br/>

이 타입은 --strictFunctionTypes 옵션이 활성화되었을 때만 올바르게 동작한다.

```TypeScript
interface ICat {
   age: number;
}

function getAge(this: ICat): number {
   return this.age;
}

const cats = {
   age: 12, // Number
};

// cats 타입 { age: number } 가 명시적 this의 타입 ICat 인터페이스와 일치하니 문제없이 동작
getAge.call(cats); // 12

/* --------------------------------------------------------------- */

const dogs = {
   age: '13', // String
};
const mice = {
   age: false, // Boolean
};

// 하지만 { age: number } 와 { age: number } 는 인터페이스 타입 형식에 맞지 않아 에러를 일으킴
getAge.call(dogs); // TS2345: Argument of type '{ age: string; }' is not assignable to parameter of type '{ age: number; }'.
getAge.call(mice); // TS2345: Argument of type '{ age: boolean; }' is not assignable to parameter of type '{ age: number; }'.
```

<br/>
위 예제에서 데이터 cats을 기준으로 설계한 함수 getAge는 일부 다른 타입을 가지는 새로운 데이터 dogs 나 mice를 this로 사용할 수 없다.<br/><br/>

하지만 OmitThisParameter를 통해 명시적 this를 제거한 새로운 타입의 함수를 만들 수 있기 때문에,getAge를 직접 수정하지 않고 데이터 dog를 사용할 수 있게 된다.<br/>
주의할점은 명시적 this 타입을 제거했기 때문에, this의 타입은 any가 된다는 점이다.

```TypeScript
type Type = OmitThisParameter<typeof getAge>; // 명시적 this 매개변수를 제외한 함수 타입을 반환
/*
type Type = (this: any) => number
*/

const getAgeForDog: OmitThisParameter<typeof getAge> = getAge; // 명시적 this 매개변수를 제외한 함수 타입을 반환

// 명시적 this 매개변수의 타입을 제외했으니, this의 타입은 any가 되서 아무 타입이나 다 들어갈 수 있게 된다.
getAgeForDog.call(dogs); // '13'
getAgeForDog.call(mice); // false
```
