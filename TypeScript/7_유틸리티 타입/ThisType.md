## 🐽 ThisType<T>

함수를 제네릭 TYPE으로 받아, this 컨텍스트(Context)를 TYPE으로 명시한다.<br/>
이 유틸리티를 사용하기 위해선 --noImplicitThis 플래그를 사용해야 한다.

```TypeScript
interface IUser {
   name: string;
   getName: () => string;
}

// methods 매개변수로 들어온 객체의 this를 IUser 타입으로 설정해준다.
function makeNeo(methods: ThisType<IUser>) {
   return {
      name: '홍길동',
      ...methods,
   } as IUser; // 그리고 반환 객체값에 대한 타입을 IUser로 단언한다.
}

const person = makeNeo({
   getName() {
      return this.name;
   }
}); // → const person: IUser = { name: 'Neo', getName() { return this.name; } }

const isname = person.getName(); // return this.name이 실행되서 현재 neo 객체의 'Neo'가 반환된다.
console.log('isname: ', isname); // '홍길동'
```
